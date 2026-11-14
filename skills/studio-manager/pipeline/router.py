#!/usr/bin/env python3
"""Pipeline router for studio-manager.

Reads a reel's shotlist.md (or takes a --style flag) and prints which
render pipeline to use, plus the exact command to run.

Routing table (PIPELINE_COMPARISON.md, verified 2026-11-14):
  kinetic-typography  -> bang-motion   (HTML+GSAP; only pipeline proven to produce motion)
  paper-cutout-vox    -> huashu y2_vox (spec.json; house primary)
  character-forward   -> Remotion      (production/paper-cutout-ai-takeover components)
  mixed               -> per-scene render + ffmpeg concat (hard cuts)

Usage:
  python3 router.py --style kinetic-typography
  python3 router.py --shotlist /abs/path/reels/name/camera/shotlist.md
"""
import argparse
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]

ROUTING = {
    "kinetic-typography": {
        "pipeline": "bang-motion",
        "skill_dir": REPO / "skills/bang-motion",
        "how": ("Edit HTML in skill_dir/assets or starter, preview in browser, "
                "export via python3 -m http.server + node scripts/export-frames.mjs, "
                "then ffmpeg frames -> mp4 (1080x1920)."),
    },
    "paper-cutout-vox": {
        "pipeline": "huashu-art-motion (y2_vox)",
        "skill_dir": REPO / "skills/huashu-art-motion",
        "how": ("Write spec.json (scenes, captions, palette), render via "
                "playwright+ffmpeg per SKILL.md. Cheapest per-reel path."),
    },
    "character-forward": {
        "pipeline": "remotion",
        "skill_dir": REPO / "production/paper-cutout-ai-takeover",
        "how": ("Reuse src/components (Paper, PaperPerson, Robot, useStopMotion). "
                "Render: npx remotion render src/entry.tsx <CompId> out.mp4 "
                "--width 1080 --height 1920"),
    },
    "minimal-moody": {
        "pipeline": "bang-motion",
        "skill_dir": REPO / "skills/bang-motion",
        "how": ("Dark palette variant of bang-motion flow. Static grain 25% "
                "mandatory. Audio design carries the scene (Mr. Nightmare model)."),
    },
    "mixed": {
        "pipeline": "per-scene + concat",
        "skill_dir": None,
        "how": ("Render each scene with its own pipeline, then ffmpeg concat "
                "demuxer with hard cuts (no transition filters)."),
    },
}

# Keywords in shotlist/concept that map to a style
KEYWORDS = {
    "kinetic-typography": ["typography", "kinetic", "stat", "number", "hook card"],
    "paper-cutout-vox": ["paper", "cutout", "collage", "vox"],
    "character-forward": ["robot", "character", "person", "remotion", "paperperson"],
    "minimal-moody": ["moody", "night", "dark", "horror", "minimal"],
}


def detect_style(text):
    text = text.lower()
    scores = {}
    for style, kws in KEYWORDS.items():
        scores[style] = sum(1 for k in kws if k in text)
    best = max(scores, key=scores.get)
    if scores[best] == 0:
        return "paper-cutout-vox"  # house default
    return best


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--style", choices=sorted(ROUTING))
    ap.add_argument("--shotlist", type=Path)
    args = ap.parse_args()

    if args.shotlist:
        if not args.shotlist.exists():
            sys.exit(f"shotlist not found: {args.shotlist}")
        style = detect_style(args.shotlist.read_text())
    elif args.style:
        style = args.style
    else:
        sys.exit("need --style or --shotlist")

    r = ROUTING[style]
    print(f"STYLE: {style}")
    print(f"PIPELINE: {r['pipeline']}")
    print(f"SKILL_DIR: {r['skill_dir'] or '(none)'}")
    print(f"HOW: {r['how']}")


if __name__ == "__main__":
    main()
