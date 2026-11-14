#!/usr/bin/env python3
"""timestamps.json + scene_map.json -> styled ASS subtitles.

Styles:
  vox-yellow   — white words, yellow highlight per word (karaoke), bold, lower-third
  minimal-white — plain white words per caption group
No fade animations (house rule). Word highlight is instant.
"""
import argparse
import json
import os

ASS_HEADER = """[Script Info]
ScriptType: v4.00+
PlayResX: {res_x}
PlayResY: {res_y}
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Vox,Inter Black,{font_size},&H00FFFFFF,&H0000FFFF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,4,2,2,80,80,{margin_v},1
Style: Minimal,Inter Black,{font_size},&H00FFFFFF,&H0000FFFF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,3,0,2,80,80,{margin_v},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

MAX_WORDS_PER_GROUP = 5


def ts(sec):
    h = int(sec // 3600)
    m = int(sec % 3600 // 60)
    s = sec % 60
    return f"{h}:{m:02d}:{s:05.2f}"


def group_words(words, max_n):
    groups, cur = [], []
    for w in words:
        cur.append(w)
        if len(cur) >= max_n or w["word"].endswith((".", "!", "?")):
            groups.append(cur)
            cur = []
    if cur:
        groups.append(cur)
    return groups


def vox_yellow(words, style):
    events = []
    for group in group_words(words, MAX_WORDS_PER_GROUP):
        gstart, gend = group[0]["start"], group[-1]["end"]
        # karaoke-style: one event per word, primary white, highlight yellow
        parts = []
        prev = gstart
        for w in group:
            dur_cs = max(1, int((w["end"] - prev) * 100))
            # {\k} duration in centiseconds; color swap via secondary->primary
            parts.append(r"{\k%d}%s" % (dur_cs, w["word"]))
            prev = w["end"]
        text = r"{\2c&H0000FFFF&}" + " ".join(parts)
        events.append(f"Dialogue: 0,{ts(gstart)},{ts(gend)},{style},,0,0,0,,{text}")
    return events


def minimal_white(words, style):
    events = []
    for group in group_words(words, MAX_WORDS_PER_GROUP):
        text = " ".join(w["word"] for w in group)
        events.append(f"Dialogue: 0,{ts(group[0]['start'])},{ts(group[-1]['end'])},{style},,0,0,0,,{text}")
    return events


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--timestamps", required=True)
    ap.add_argument("--style", default="vox-yellow", choices=["vox-yellow", "minimal-white"])
    ap.add_argument("--out", required=True, help="output .ass path")
    ap.add_argument("--vertical", action="store_true", default=True)
    ap.add_argument("--horizontal", action="store_true")
    args = ap.parse_args()

    with open(args.timestamps) as f:
        words = json.load(f)

    res_x, res_y = (1080, 1920) if not args.horizontal else (1920, 1080)
    font_size = 64 if not args.horizontal else 56
    margin_v = int(res_y * 0.16) if not args.horizontal else int(res_y * 0.12)

    header = ASS_HEADER.format(res_x=res_x, res_y=res_y, font_size=font_size, margin_v=margin_v)
    style_name = "Vox" if args.style == "vox-yellow" else "Minimal"
    if args.style == "vox-yellow":
        events = vox_yellow(words, style_name)
    else:
        events = minimal_white(words, style_name)

    with open(args.out, "w") as f:
        f.write(header)
        f.write("\n".join(events))
    print(f"{len(events)} caption groups -> {args.out}")


if __name__ == "__main__":
    main()
