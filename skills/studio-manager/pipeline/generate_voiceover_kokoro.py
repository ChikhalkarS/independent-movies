#!/usr/bin/env python3
"""Offline voiceover generation via Kokoro for studio-manager.
Replaces the edge-tts step in caption-skill when offline autonomy is needed.
Blank lines in script.txt separate scenes; each becomes one WAV + combined MP3.

Usage:
  .venv/bin/python3 generate_voiceover_kokoro.py \
      --script /abs/reels/name/script.txt \
      --out /abs/reels/name/audio \
      --voice af_heart

Voices (kokoro 'a' = American English):
  af_heart (warm female, default)  am_michael (doc male)  af_bella (bright female)
  am_adam (deep male)              bf_emma (British female)  bm_george (British male)
Outputs: scene_01.wav... , voiceover.mp3, scene_map.json (same schema as caption-skill).
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path


VOICES = {
    "af_heart", "af_bella", "af_nicole", "ao_sky",
    "am_michael", "am_adam", "am_fenrir",
    "bf_emma", "bf_isabella", "bm_george", "bm_lewis",
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--script", required=True, type=Path)
    ap.add_argument("--out", required=True, type=Path)
    ap.add_argument("--voice", default="af_heart")
    ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--lang", default="a", help="kokoro lang_code: a=US, b=UK")
    args = ap.parse_args()

    if args.voice not in VOICES:
        sys.exit(f"unknown voice '{args.voice}'. Valid: {sorted(VOICES)}")
    if not args.script.exists():
        sys.exit(f"script not found: {args.script}")

    text = args.script.read_text().strip()
    scenes = [s.strip() for s in text.split("\n\n") if s.strip()]
    if not scenes:
        sys.exit("script.txt has no scenes (blank-line separated)")

    args.out.mkdir(parents=True, exist_ok=True)

    from kokoro import KPipeline
    import soundfile as sf
    import numpy as np

    pipeline = KPipeline(lang_code=args.lang)

    scene_map = []
    t_offset = 0.0
    wav_files = []

    for i, scene_text in enumerate(scenes, 1):
        chunks = []
        for _gs, _ps, audio in pipeline(scene_text, voice=args.voice,
                                        speed=args.speed):
            chunks.append(audio)
        if not chunks:
            sys.exit(f"kokoro produced no audio for scene {i}")
        full = np.concatenate(chunks)
        dur = len(full) / 24000.0
        wav_path = args.out / f"scene_{i:02d}.wav"
        sf.write(wav_path, full, 24000)
        wav_files.append(wav_path)
        scene_map.append({
            "scene": i,
            "text": scene_text,
            "start": round(t_offset, 3),
            "end": round(t_offset + dur, 3),
            "duration": round(dur, 3),
            "file": wav_path.name,
        })
        t_offset += dur
        print(f"scene {i}: {dur:.2f}s  ({len(scene_text.split())} words)")

    # Concat to voiceover.mp3 via ffmpeg
    mp3_path = args.out / "voiceover.mp3"
    if len(wav_files) == 1:
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(wav_files[0]),
                        "-codec:a", "libmp3lame", "-q:a", "2", str(mp3_path)],
                       check=True)
    else:
        # Filter-concat keeps single encode pass
        inputs = []
        for f in wav_files:
            inputs += ["-i", str(f)]
        fc = "".join(f"[{n}:a]" for n in range(len(wav_files))) + \
            f"concat=n={len(wav_files)}:v=0:a=1[out]"
        subprocess.run(["ffmpeg", "-y", "-v", "error", *inputs,
                        "-filter_complex", fc, "-map", "[out]",
                        "-codec:a", "libmp3lame", "-q:a", "2", str(mp3_path)],
                       check=True)

    (args.out / "scene_map.json").write_text(json.dumps(scene_map, indent=2))
    total = scene_map[-1]["end"]
    print(f"OK: {len(scenes)} scenes, total {total:.1f}s -> {mp3_path}")


if __name__ == "__main__":
    main()
