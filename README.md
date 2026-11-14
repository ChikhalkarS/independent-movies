# independent-movies

AI-assisted production studio: 2 short vertical reels per day (1080×1920), built with programmatic animation pipelines instead of generative video.

## Repository map

```
independent-movies/
├── CLAUDE.md                     # Agent operating system (how Claude works here)
├── README.md                     # This file
├── daily-reel-tracker.md         # Daily production log + decisions
│
├── docs/
│   ├── strategy/                 # Business + pipeline strategy
│   │   ├── PRODUCTION_STRATEGY.md        # Research paper: code-based animation approach
│   │   ├── PRODUCTION_DECISION_LOG.md    # Style bible: 12fps, no fades, static grain...
│   │   ├── PIPELINE_COMPARISON.md        # Benchmark of all 4 render pipelines
│   │   └── famous-video-formats.md       # Benchmark channels + visual rules
│   ├── reference/                # Tooling reference
│   │   ├── README_USER_GUIDE.md          # Original reel-template system guide
│   │   ├── animation-skills.md           # Animation skills overview
│   │   └── claude-code-optimizer.md      # Claude Code tuning notes
│   └── prompts/                  # Reusable generation prompts
│       └── PROMPT-paper-cutout-ai-takeover.md
│
├── skills/                       # Motion/animation skills (free, local toolkits)
│   ├── bang-motion/              # HTML+GSAP motion graphics (openers, kinetic type)
│   ├── huashu-art-motion/        # 36 art styles, spec.json-driven (house primary)
│   ├── caption-skill/            # Free offline TTS (kokoro) + word-level captions (ffmpeg)
│   └── studio-manager/           # Agentic orchestrator: concept -> QA'd MP4
│       ├── agents/               # director, scriptwriter, character-designer, camera, audio, editor prompts
│       ├── pipeline/             # router.py (pipeline pick), qa.py (motion gate), kokoro VO
│       └── templates/            # test scripts
│
│
├── research/                     # Viral channel benchmarks
│   ├── viral-content-research.md         # Top AI Shorts channels + view benchmarks
│   └── benchmark-videos/                 # Per-video visual breakdowns
│
├── production/
│   └── paper-cutout-ai-takeover/ # Remotion component library (Paper, Frame, Robot,
│                                 #   PaperPerson, useStopMotion) — reusable across reels
│
└── reels/                        # One folder per reel
    ├── _templates/               # director/ producer/ character/ context/ style/ integration
    ├── desert-robot/
    └── ai-takeover-1000-days/
```

## Daily workflow

1. Pick a concept → scaffold `reels/{name}/` from `reels/_templates/`
2. Check `docs/strategy/PRODUCTION_DECISION_LOG.md` (house style rules)
3. Write `reels/{name}/script.md` (scene table, captions, beats every 2–3s)
4. Route to a pipeline (see table below) and build
5. Render MP4 → `reels/{name}/out/`
6. QA: vertical, loops, no fades, static grain
7. Log in `daily-reel-tracker.md`

## Pipeline routing

| Use case | Pipeline | Location |
|---|---|---|
| Artistic explainer (36 styles) — house primary | `huashu-art-motion` | `skills/huashu-art-motion/` |
| High-energy opener / kinetic typography | `bang-motion` | `skills/bang-motion/` |
| Custom character animation | Remotion (reuse components) | `production/paper-cutout-ai-takeover/` |
| Voiceover + word-level captions (free, offline) | `caption-skill` | `skills/caption-skill/` |

## Tracking

- Daily status + decisions: `daily-reel-tracker.md`
- Standing style decisions: `docs/strategy/PRODUCTION_DECISION_LOG.md`
