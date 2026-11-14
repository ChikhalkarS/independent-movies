# independent-movies — Autonomous Production House Operating System

> **Purpose:** This file makes the agent fully independent. Follow it without asking the user for guidance on anything covered here. The user gives a concept; the agent does everything else: scaffold, skill invocation, code, render, QA, logging, tracking.

## 0. Prime directives (never violate)

1. **Deliverables live on disk** — every script, render command, and decision is saved as a file in this repo. Chat output alone is a failure.
2. **Render until it works** — if a video fails to render or looks wrong, keep diagnosing and fixing without handing back to the user. Report only when a playable file exists.
3. **Always invoke a motion skill** — never hand-write animation from scratch when a routed skill exists (see §2b).
4. **Vertical-first** — 1080×1920 for Shorts/Reels. Horizontal 1920×1080 only when the user asks for long-form.
5. **Auto-approve assumption** — the user has granted full permissions. Do not re-ask; act, then report.
6. **Concise replies** — status + decisions + file paths. No narration of every step.
7. **Parallel by default** — fan out subagents for independent stages (director / scriptwriter / character / camera / audio / editor) in a single message; serialize only where a stage genuinely reads the prior stage's output file. No config needed.

## 1. File locations

- `README.md` — Repository map + workflow summary
- `daily-reel-tracker.md` — Daily tracking (status, decisions, notes)
- `reels/` — One folder per reel; templates in `reels/_templates/` (director/, producer/, character/, context/, style/, integration/)
- `skills/` — Skills: `bang-motion/`, `huashu-art-motion/`, `caption-skill/` (free offline VO + captions)
- `research/` — `viral-content-research.md` (channel benchmarks), `benchmark-videos/` (per-video analyses)
- `production/paper-cutout-ai-takeover/` — Reusable Remotion component library (Paper, Frame, Town, PaperPerson, Robot, useStopMotion)
- `docs/strategy/` — `PRODUCTION_STRATEGY.md` (research paper), `PRODUCTION_DECISION_LOG.md` (style bible: 12fps elements, no fades, static grain — READ before any new reel), `PIPELINE_COMPARISON.md` (huashu primary), `famous-video-formats.md` (benchmark channels)
- `docs/reference/` — `README_USER_GUIDE.md`, `animation-skills.md`, `claude-code-optimizer.md`
- `docs/prompts/` — reusable generation prompts

## 2. Production pipeline (default order)

1. **Concept** → create `reels/{name}/` from `reels/_templates/` (copy the 5 template dirs)
2. **Style check** → read `docs/strategy/PRODUCTION_DECISION_LOG.md`; inherit palette/rules unless new concept demands change (log the change)
3. **Script** → write `reels/{name}/script.md` with scene table (frame ranges, captions, visual beats every 2–3s)
4. **Skill route** → pick pipeline per §2b table
5. **Build** → invoke skill; reuse components from `production/paper-cutout-ai-takeover/src/components/` when style matches
6. **Render** → MP4 into `reels/{name}/out/`
7. **QA** → verify: vertical, loops seamlessly, visual shift every 2–3s, no fade transitions, static grain
8. **Log** → update `daily-reel-tracker.md` + `docs/strategy/PRODUCTION_DECISION_LOG.md`

### 2b. Skill routing table

| Reel concept | Skill / pipeline | Output |
|---|---|---|
| Paper-cutout explainer (editorial collage, house style) | `huashu-art-motion` — spec.json parameterized | `out.mp4` via playwright+ffmpeg |
| High-energy hook / kinetic opener / bumper | `bang-motion` — edit HTML, reload, export | `index.html` → MP4 |
| Custom character animation (Robot, PaperPerson) | Remotion (reuse `production/paper-cutout-ai-takeover/` components) | MP4 via `npx remotion render` |
| Any reel needing narration + captions | `caption-skill` — script.txt → VO + word-timed captions | `voiceover.mp3` + `captions.ass` + `scene_map.json` + preview MP4 |

Rules:
- Invoke the Skill tool BEFORE writing any animation code; the skill's SKILL.md is the source of truth.
- huashu spec.json is the token-cheapest path for the "What If" series — parameterize, don't rebuild.
- Remotion render command: `npx remotion render src/entry.tsx <CompId> out.mp4 --width 1080 --height 1920`
- caption-skill runs offline ($0, edge-tts + faster-whisper + static-ffmpeg). Command: `cd skills/caption-skill && .venv/bin/python scripts/pipeline.py --script <script.txt> --out <outdir> [--voice en-US-AriaNeural] [--style vox-yellow|minimal-white]`. Use `scene_map.json` timings to cut visual scenes to VO.

## 3. Plugin routing (official marketplace — for agent self-management)

| Task | Plugin / agent | Use when |
|---|---|---|
| Code cleanup after render iteration | `code-simplifier` (agent) | Animation code grown messy across iterations |
| Reviewing changes before commit | `code-review` / `feature-dev:code-reviewer` | User asks to review or before risky refactor |
| Creating a new custom skill | `skill-creator` | Recurring workflow not covered by installed skills |
| Long autonomous loop ("keep going until done") | `ralph-loop` | User says "keep fixing until X" |
| CLAUDE.md audit | `claude-md-management` | This file drifts from reality |
| Session usage/token report | `session-report` | User asks where tokens went |
| Feature architecture for new pipeline | `feature-dev` agents | Adding a new renderer/component system |

These plugins are available in the official marketplace (`/plugin marketplace add anthropics/claude-plugins-official` if not installed). Agents like `code-simplifier` can be spawned via the Agent tool with `subagent_type` when the plugin is active — otherwise replicate their intent directly.

## 4. Token efficiency rules

- Spawn `Explore` subagents for broad codebase searches; never glob-dump in main context.
- Name exact files when known. Read only what changed.
- Prefer editing huashu `spec.json` / bang-motion HTML over regenerating Remotion scenes.
- `/compact Preserve goal constraints files-changed key-decisions test-results exact-next-step` for long sessions; `/clear` when switching topics.
- Reuse: one Remotion component library serves all paper-cut reels. One huashu theme serves one visual series.

## 5. Decision tracking

- Log creative + technical decisions in `daily-reel-tracker.md` (one line, with rationale).
- Style decisions → `docs/strategy/PRODUCTION_DECISION_LOG.md`.
- Search tracker before adding — no duplicates.

## 6. Known environment facts

- Machine: M2 Mac Air. Use programmatic rendering (no paid software).
- Installed toolchains: ffmpeg, node, puppeteer (bang-motion), playwright+chromium in uv venv (huashu).
- bang-motion export: needs `python3 -m http.server` + `node scripts/export-frames.mjs`.
- Remotion quirk: clear `node_modules/.cache` + `.remotion` on stale bundle errors; only entry file may call `registerRoot`.

## 7. What to avoid

- No fade transitions between scenes (push-through / whip / hard cut only)
- No jittery grain (static 25% opacity only)
- No slideshow layouts (3+ text tiers per scene = failure)
- No horizontal-first defaults
- No asking the user things this file already answers

---
*Last updated: 2026-11-14 — Keep concise. Task-specific details go in user messages or tracker files.*

## File Creation Rules

- When asked to create a file, create it on disk.
- Never substitute chat output for filesystem changes.
- Use Write for new files and Edit for existing files.
- Create parent directories when necessary.
- Verify every created file exists.
- Report absolute file paths.
- If a write fails, report the actual error.
- Never claim a file was created without verification.
- Do not stop after producing a plan unless explicitly requested.
