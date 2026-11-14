#!/usr/bin/env python3
"""QA gate for studio-manager renders.
Exit 0 = PASS, exit 1 = FAIL (with reasons printed).
Checks (from PRODUCTION_DECISION_LOG.md + Archive Review 2026-11-14):
  1. Vertical 1080x1920
  2. Luma motion gate: YAVG spread >= 15 across sampled frames (visual shift every 2-3s)
  3. Duration sanity: 5s <= duration <= 90s
  4. Not a static slideshow (frame-difference floor)
Usage:
  python3 qa.py <video.mp4> [--expected-duration 18.0] [--tolerance 1.5]
"""
import json
import subprocess
import sys
import argparse
from pathlib import Path


def ffprobe_json(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-print_format", "json",
         "-show_format", "-show_streams", path],
        capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def frame_yavg(path, fps=2):
    """Sample YAVG (average luma) at fps frames/sec via signalstats.
    Uses metadata=print:file=<tempfile> because capture_output swallows
    ffmpeg stderr on some shells (verified 2026-11-14)."""
    import tempfile
    import os
    fd, tmpf = tempfile.mkstemp(suffix=".txt")
    os.close(fd)
    try:
        subprocess.run(
            ["ffmpeg", "-v", "error", "-i", path,
             "-vf", f"fps={fps},scale=64:36,format=gray,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file={tmpf}",
             "-f", "null", "-"],
            capture_output=True, check=True)
        vals = []
        for line in Path(tmpf).read_text().splitlines():
            line = line.strip()
            if line.startswith("lavfi.signalstats.YAVG="):
                try:
                    vals.append(float(line.split("=")[1]))
                except ValueError:
                    pass
        return vals
    finally:
        os.unlink(tmpf)


def frame_diff_floor(path, fps=2):
    """Return fraction of sampled consecutive frames that differ noticeably.
    A slideshow returns ~0; real motion returns > 0.1."""
    vals = frame_yavg(path, fps)
    if len(vals) < 2:
        return 0.0, vals
    diffs = [abs(b - a) for a, b in zip(vals, vals[1:])]
    moved = sum(1 for d in diffs if d > 0.5)
    return moved / len(diffs), vals


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--expected-duration", type=float, default=None)
    ap.add_argument("--tolerance", type=float, default=1.5)
    ap.add_argument("--min-spread", type=float, default=15.0,
                    help="min YAVG spread (motion gate)")
    args = ap.parse_args()

    failures = []
    info = ffprobe_json(args.video)
    videos = [s for s in info["streams"] if s["codec_type"] == "video"]
    if not videos:
        sys.exit(f"ERROR: no video stream in {args.video}")
    v = videos[0]
    w, h = int(v["width"]), int(v["height"])
    dur = float(info["format"]["duration"])

    # 1. Vertical check
    if (w, h) != (1080, 1920):
        failures.append(f"RESOLUTION: got {w}x{h}, need 1080x1920 vertical")

    # 3. Duration sanity
    if not (5.0 <= dur <= 90.0):
        failures.append(f"DURATION: {dur:.1f}s outside 5-90s")
    if args.expected_duration and abs(dur - args.expected_duration) > args.tolerance:
        failures.append(
            f"DURATION-MATCH: video {dur:.1f}s vs expected {args.expected_duration:.1f}s")

    # 2 + 4. Motion gate
    moved_frac, yavg = frame_diff_floor(args.video)
    spread = (max(yavg) - min(yavg)) if yavg else 0.0
    if spread < args.min_spread:
        failures.append(
            f"MOTION-SPREAD: YAVG spread {spread:.2f} < {args.min_spread} (static slideshow)")
    if moved_frac < 0.1:
        failures.append(
            f"MOTION-FLOOR: only {moved_frac:.0%} of frame-pairs show movement")

    print(json.dumps({
        "file": args.video,
        "resolution": f"{w}x{h}",
        "duration": round(dur, 2),
        "yavg_spread": round(spread, 2),
        "motion_fraction": round(moved_frac, 3),
        "verdict": "PASS" if not failures else "FAIL",
        "failures": failures,
    }, indent=2))
    sys.exit(0 if not failures else 1)


if __name__ == "__main__":
    main()
