# Agentic Setup for the Production Studio

One-command bootstrap: concept in → captioned, QA'd vertical MP4 out. Everything is local and free.

## 1. Verify the toolchain (one-time)

```bash
# Audio / captions (Python venv, already built)
./skills/caption-skill/.venv/bin/python -c "import kokoro, faster_whisper, edge_tts; print('audio ok')"
# → "audio ok" (kokoro prints a torch warning on macOS — ignore it)

# Video
ffmpeg -version | head -1
node --version && npx --version
```

All four are pre-installed on this machine (M2 Mac Air). Nothing to download at runtime — models are cached after first run.

## 2. The one command that runs a reel

```bash
cd /Applications/mish/independent-movies
python3 skills/studio-manager/pipeline/router.py --style kinetic-typography
```

This prints which pipeline to use and the exact render command. `--shotlist` auto-detects style from keywords; omit both and it exits with an error.

## 3. End-to-end flow (what actually happens)

| Step | Who / what | Artifact |
|---|---|---|
| Concept | you (1 line) | — |
| 1. Director | `agents/director.md` prompt | `reels/{name}/concept.md` |
| 2. Scriptwriter | `agents/scriptwriter.md` | `reels/{name}/script.md` + `script.txt` |
| 3. Voiceover | `pipeline/generate_voiceover_kokoro.py` | `audio/voiceover.mp3` + `scene_map.json` |
| 4. Captions | `caption-skill/scripts/pipeline.py` | `captions.ass` (word-timed) |
| 5. Route | `pipeline/router.py` | picks bang-motion / huashu / Remotion |
| 6. Render | skill-specific | `out/draft.mp4` |
| 7. QA | `pipeline/qa.py` | exit 0 = PASS |
| 8. Log | append to | `daily-reel-tracker.md` |

## 4. Render commands per pipeline

**bang-motion** (kinetic opener / hook):
```bash
cd skills/bang-motion && python3 -m http.server 8000 &
node scripts/export-frames.mjs   # 60fps PNGs → ffmpeg → out.mp4
```

**huashu-art-motion** (paper-cutout explainer, house primary):
write `spec.json`, then render via playwright + ffmpeg per the skill's SKILL.md.

**Remotion** (custom characters — Paper, PaperPerson, Robot):
```bash
npx remotion render src/entry.tsx <CompId> out.mp4 --width 1080 --height 1920
```

## 5. QA gate (must pass before "done")

```bash
python3 skills/studio-manager/pipeline/qa.py reels/{name}/out/final.mp4 \
  --expected-duration 27.0
```

Checks: vertical 1080×1920 · YAVG luma spread ≥ 15 (motion, not a slideshow) · motion floor > 10% · duration 5–90s. Exit 0 = PASS. On FAIL, fix the scene and re-render — max 3 loops.

## 6. House rules (read `docs/strategy/PRODUCTION_DECISION_LOG.md` first)

- Vertical 1080×1920 only. Horizontal only on request.
- No fade transitions — push-through / whip / hard cut only.
- Static grain at 25% opacity, no jitter.
- 12fps elements, 60fps camera. Visual shift every 2–3s.
- Max 2 text tiers per scene, 3–5 stacked elements.
- Pre-render luma check: YAVG spread ≥ 15 before committing a full render.

## 7. Cost

$0. All local. Kokoro (~330MB) and faster-whisper `base` (~140MB) cache on first run.