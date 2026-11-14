#!/usr/bin/env python3
"""Burn .ass captions into a video with ffmpeg (or composite onto black bg for preview)."""
import argparse
import os
import shutil
import subprocess
import sys


def find_ffmpeg():
    """Prefer static-ffmpeg binary (has libass); fall back to system ffmpeg."""
    try:
        from static_ffmpeg import run as sf_run
        ffmpeg_path = sf_run.get_or_fetch_platform_executables_else_raise()[0]
        if os.path.exists(ffmpeg_path):
            return ffmpeg_path
    except Exception:
        pass
    return shutil.which("ffmpeg") or "ffmpeg"


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(f"ffmpeg failed:\n{r.stderr[-2000:]}")
    return r


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", help="input video to burn captions into")
    ap.add_argument("--ass", required=True, help="captions.ass")
    ap.add_argument("--out", required=True)
    ap.add_argument("--audio", help="optional voiceover/music track to mux")
    ap.add_argument("--duration", type=float, help="if no video: black bg preview length")
    ap.add_argument("--vertical", action="store_true", default=True)
    ap.add_argument("--horizontal", action="store_true")
    args = ap.parse_args()

    # ffmpeg filter paths: absolute + escape ':' (filter option separator)
    ass_escaped = os.path.abspath(args.ass).replace("\\", "/").replace(":", "\\:")
    ffmpeg = find_ffmpeg()
    audio = ["-i", args.audio] if args.audio else []

    if args.video:
        cmd = [ffmpeg, "-y", "-i", args.video, *audio,
               "-vf", f"ass='{ass_escaped}'",
               "-c:v", "libx264", "-preset", "medium", "-crf", "20",
               "-c:a", "aac" if args.audio else "copy",
               args.out]
    else:
        dur = args.duration or 10
        w, h = (1080, 1920) if not args.horizontal else (1920, 1080)
        cmd = [ffmpeg, "-y", "-f", "lavfi", "-i", f"color=c=black:s={w}x{h}:d={dur}",
               *audio,
               "-vf", f"ass='{ass_escaped}'",
               "-c:v", "libx264", "-preset", "medium", "-crf", "20",
               "-c:a", "aac" if args.audio else "an",
               "-shortest", args.out]

    run(cmd)
    print(f"written: {args.out}")


if __name__ == "__main__":
    main()
