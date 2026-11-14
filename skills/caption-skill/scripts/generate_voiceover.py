#!/usr/bin/env python3
"""Script text -> per-scene MP3 chunks + full voiceover.mp3 via edge-tts.

Blank lines in the script separate scenes. Each scene = one VO chunk.
Outputs: audio/scene_01.mp3 ... + voiceover.mp3 + scene_map.json (durations only, timings filled by transcribe.py)
"""
import argparse
import asyncio
import json
import os
import subprocess

import edge_tts


def parse_scenes(path):
    with open(path, encoding="utf-8") as f:
        raw = f.read()
    scenes = [s.strip() for s in raw.split("\n\n") if s.strip()]
    return scenes


async def synth(text, voice, out_path):
    tts = edge_tts.Communicate(text, voice)
    await tts.save(out_path)


def duration(path):
    r = subprocess.run(
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
         "-of", "csv=p=0", path],
        capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--script", required=True, help="plain text script; blank line = scene break")
    ap.add_argument("--out", required=True, help="output directory")
    ap.add_argument("--voice", default="en-US-ChristopherNeural")
    ap.add_argument("--rate", default="+0%", help="e.g. +10%% faster, -5%% slower")
    args = ap.parse_args()

    out_dir = os.path.abspath(args.out)
    os.makedirs(out_dir, exist_ok=True)
    audio_dir = os.path.join(out_dir, "audio")
    os.makedirs(audio_dir, exist_ok=True)

    scenes = parse_scenes(args.script)
    print(f"{len(scenes)} scenes, voice={args.voice}")

    scene_map = []
    for i, text in enumerate(scenes, 1):
        mp3 = os.path.join(audio_dir, f"scene_{i:02d}.mp3")
        asyncio.run(synth(text, args.voice, mp3))
        scene_map.append({
            "scene": i,
            "text": text,
            "audio": mp3,
            "duration": duration(mp3),
        })
        print(f"  scene {i:02d}: {scene_map[-1]['duration']:.2f}s  {text[:50]}...")

    # concat all scene chunks into full voiceover
    concat_list = os.path.join(audio_dir, "concat.txt")
    with open(concat_list, "w") as f:
        for s in scene_map:
            f.write(f"file '{s['audio']}'\n")
    vo = os.path.join(out_dir, "voiceover.mp3")
    subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list, "-c", "copy", vo],
        check=True, capture_output=True)

    # placeholder timings; transcribe.py fills start/end
    for s in scene_map:
        s["start"], s["end"] = None, None
    with open(os.path.join(out_dir, "scene_map.json"), "w") as f:
        json.dump({"voice": args.voice, "scenes": scene_map}, f, indent=2)

    print(f"voiceover.mp3: {duration(vo):.2f}s total -> {vo}")


if __name__ == "__main__":
    main()
