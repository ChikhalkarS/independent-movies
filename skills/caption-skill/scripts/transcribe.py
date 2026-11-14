#!/usr/bin/env python3
"""voiceover.mp3 -> word-level timestamps JSON via faster-whisper (local, free).

Output: timestamps.json = [{"word": "...", "start": 1.23, "end": 1.45}, ...]
Also fills scene start/end in scene_map.json by matching word counts.
"""
import argparse
import json
import os

from faster_whisper import WhisperModel


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--audio", required=True, help="voiceover.mp3")
    ap.add_argument("--scene-map", required=True, help="scene_map.json from generate_voiceover.py")
    ap.add_argument("--model", default="base", help="whisper model size: tiny/base/small")
    ap.add_argument("--language", default="en")
    args = ap.parse_args()

    print(f"loading whisper model '{args.model}' (first run downloads ~140MB)...")
    model = WhisperModel(args.model, device="cpu", compute_type="int8")

    segments, info = model.transcribe(args.audio, language=args.language, word_timestamps=True)
    words = []
    for seg in segments:
        for w in seg.words or []:
            words.append({"word": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)})

    with open(os.path.join(os.path.dirname(args.audio), "timestamps.json"), "w") as f:
        json.dump(words, f, indent=2)
    print(f"{len(words)} words transcribed")

    # fill scene timings by walking word counts per scene
    with open(args.scene_map) as f:
        sm = json.load(f)

    # whisper text is lowercase-ish and punctuation varies; match by consuming words
    wi = 0
    for scene in sm["scenes"]:
        n = len(scene["text"].split())
        scene_words = words[wi:wi + n]
        if not scene_words:
            break
        scene["start"] = scene_words[0]["start"]
        scene["end"] = scene_words[-1]["end"]
        wi += n
    sm["word_count_matched"] = wi
    sm["whisper_word_count"] = len(words)

    with open(args.scene_map, "w") as f:
        json.dump(sm, f, indent=2)
    print(f"scene timings filled in {args.scene_map} (matched {wi}/{len(words)})")


if __name__ == "__main__":
    main()
