# studio-manager — Autonomous Reel Production Orchestrator

Turns a one-line concept into a fully produced vertical reel (script → audio → captions → motion → render → QA → archive). The user only reviews the final MP4 and uploads.

## When to use
- User gives a concept ("a lonely robot finds a flower") and expects a finished 1080×1920 MP4.
- Any "make a reel about X" request.

## Architecture (all local, no paid APIs)

```
Concept (user, 1 line)
   │
   ▼
┌──────────────────────────────────────────────────┐
│ FAN OUT (single message, parallel subagents)      │
│                                                    │
│  ┌─ DIRECTOR ──────────────→ concept.md            │
│  │   (style, palette, 3-act beats)                 │
│  ├─ SCRIPTWRITER ──────────→ script.txt            │
│  │   + scenes.json (VO text per scene)             │
│  ├─ CHARACTER-DESIGNER ────→ characters.json       │
│  │   (casting + costume, no VO dep)                │
│  ├─ RESEARCH ──────────────→ research/benchmarks  │
│  │   (niche/context, no VO dep)                     │
│  └─ STYLE-CHECK ───────────→ decision log read     │
│                                                    │
│   SERIALIZED (depend on script.txt):               │
│    AUDIO (kokoro) → voiceover.mp3 + scene_map.json │
│    CAPTIONS (faster-whisper) → captions.ass        │
│    MOTION ROUTER → bang-motion | huashu | remotion │
│    RENDER → out/draft.mp4                          │
│    QA (pipeline/qa.py):                            │
│      - vertical 1080×1920?                         │
│      - luma YAVG spread ≥ 15? (motion check)       │
│      - duration == VO duration?                    │
│    PASS → out/final.mp4 + tracker log              │
│    FAIL → fix scene, re-render (max 3 loops)       │
└──────────────────────────────────────────────────┘
```

## Rules (inherited from PRODUCTION_DECISION_LOG.md)
- Vertical 1080×1920 only.
- No fade transitions. Static grain. 12fps elements / 60fps camera.
- Max 2 text levels per scene. 3–5 stacked elements per scene.
- Visual shift every 2–3s — enforced by QA luma gate before "final".
- All deliverables on disk. Never claim success without a verified MP4.

## Usage (Claude Code workflow)
1. Read `pipeline/router.py` to pick the pipeline for the concept.
2. Follow `agents/*.md` prompts in order; write every artifact into `reels/{name}/`.
3. Run `skills/caption-skill/scripts/pipeline.py` for VO + captions (kokoro backend if installed, edge-tts fallback).
4. Render, then run `pipeline/qa.py` — it must exit 0 before declaring the reel complete.
5. Update `daily-reel-tracker.md` with status + QA numbers.

## Cost
$0. All local. Kokoro model (~330MB) cached on first run; faster-whisper `base` (~140MB) cached already.
