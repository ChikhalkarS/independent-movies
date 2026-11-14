# caption-skill — Free offline voiceover + word-level captions

Turn a script text into a captioned video track: neural TTS (edge-tts) → word-level timestamps (faster-whisper) → styled captions burned by ffmpeg. 100% local, no API keys.

## When to use
- Any reel needing narration + burned captions (vertical 1080×1920 or horizontal).
- Caption timing must match actual audio (not estimated).

## Environment
- venv: `.venv/` in this folder (python 3.12, faster-whisper + edge-tts installed)
- Requires `ffmpeg` on PATH (installed on this machine).

## Quick start (one command)

```bash
cd caption-skill
.venv/bin/python scripts/pipeline.py \
  --script /abs/path/to/script.txt \
  --out /abs/path/to/reelname \
  --voice en-US-ChristopherNeural \
  --style vox-yellow
```

Inputs:
- `--script` — plain text file. Blank lines separate scenes; each scene becomes one VO chunk + caption group.
- `--style` — caption style preset: `vox-yellow` (default, house style), `minimal-white`, `bold-outline`.

Outputs (in `--out` dir):
- `voiceover.mp3` — full concatenated narration
- `captions.ass` — word-timed ASS subtitle file (karaoke-style word highlight for vox-yellow)
- `scene_map.json` — per-scene start/end times (for video editing sync)
- `captions_preview.mp4` — black background + captions only (for QA or compositing)

## Step-by-step scripts

1. `generate_voiceover.py` — script.txt → per-scene `audio/scene_NN.mp3` + `voiceover.mp3`
   - Voices: any edge-tts neural voice. House defaults:
     - Documentary/mystery: `en-US-ChristopherNeural`
     - Energetic/explainer: `en-US-AriaNeural`
     - UK accent: `en-GB-RyanNeural`
2. `transcribe.py` — `voiceover.mp3` → word-level timestamps JSON (faster-whisper `base` model, CPU, ~free)
3. `build_captions.py` — timestamps + scene map + style → `captions.ass`
4. `burn_captions.py` — ffmpeg burn into any video: `burn_captions.py --video in.mp4 --ass captions.ass --out out.mp4`

## Caption styles (house rules)
- `vox-yellow`: white word + yellow highlight word-by-word, bold, centered lower-third, black outline. Static, no fade.
- No fade animations between caption groups (PRODUCTION_DECISION_LOG rule).
- Word highlight transitions are instant (no alpha ramps).

## Rules
- Always run `pipeline.py` end-to-end before compositing; use `scene_map.json` to cut video scenes to VO timings.
- 12fps visual element rule is separate — this skill only handles audio + captions.
- If whisper mishears a word, fix the script text and regenerate — never hand-edit timestamps.

## Cost
$0. All local. Model download (~140MB for `base`) happens on first run and is cached.
