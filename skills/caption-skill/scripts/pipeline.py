#!/usr/bin/env python3
"""End-to-end: script.txt -> voiceover.mp3 + captions.ass + captions_preview.mp4 + scene_map.json

Orchestrates generate_voiceover.py, transcribe.py, build_captions.py, burn_captions.py.
"""
import argparse
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))


def run(cmd):
    print(">", " ".join(cmd))
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout[-1500:])
        print(r.stderr[-3000:], file=sys.stderr)
        raise SystemExit(f"step failed: {cmd[0]}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--script", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--voice", default="en-US-ChristopherNeural")
    ap.add_argument("--style", default="vox-yellow", choices=["vox-yellow", "minimal-white"])
    ap.add_argument("--horizontal", action="store_true")
    ap.add_argument("--skip-preview", action="store_true", help="skip captions_preview.mp4 render")
    args = ap.parse_args()

    py = sys.executable
    venv_python = os.path.join(HERE, "..", ".venv", "bin", "python")
    py = venv_python if os.path.exists(venv_python) else py

    audio = os.path.join(args.out, "voiceover.mp3")
    ts_json = os.path.join(args.out, "timestamps.json")
    ass = os.path.join(args.out, "captions.ass")

    run([py, os.path.join(HERE, "generate_voiceover.py"),
         "--script", args.script, "--out", args.out, "--voice", args.voice])
    run([py, os.path.join(HERE, "transcribe.py"),
         "--audio", audio, "--scene-map", os.path.join(args.out, "scene_map.json")])
    flags = ["--horizontal"] if args.horizontal else []
    run([py, os.path.join(HERE, "build_captions.py"),
         "--timestamps", ts_json, "--style", args.style, "--out", ass, *flags])

    if not args.skip_preview:
        import json
        with open(ts_json) as f:
            dur = json.load(f)[-1]["end"] + 1.0
        run([py, os.path.join(HERE, "burn_captions.py"),
             "--ass", ass, "--out", os.path.join(args.out, "captions_preview.mp4"),
             "--duration", str(dur),
             "--audio", audio] + (["--horizontal"] if args.horizontal else []))

    print("\nDONE. Outputs in", os.path.abspath(args.out))


if __name__ == "__main__":
    main()
