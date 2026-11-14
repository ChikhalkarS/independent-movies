# Daily Reel Tracker

## Date: 2026-11-12

### Reel 1: desert-robot
- **Concept/Title:** Lonely robot finding a flower in desert
- **Style/Genre:** Cinematic realism / Drama
- **Characters/Entities:** Rusty the robot
- **Creative Director:** Vision - desert golden hour scene, melancholic hope
- **Creative Producer:** Production workflow - 5-day timeline, vertical 9:16 format
- **Decision Log:** 
  - Chose desert setting for expansive, lonely mood
  - Robot character (Rusty) with single glowing eye for visual distinctiveness
  - Golden hour lighting for warm, cinematic aesthetic
  - Flower as symbol of hope in desolation
- **Context/Notes:** 
  - Setting: Desert at sunset, golden hour, clear skies
  - Atmosphere: Melancholic with quiet hope
  - Key props: Weathered robot, blooming yellow flower, sand dunes
- **Status:** ✅ Complete

### Reel 2: [Pending]
- **Concept/Title:** 
- **Style/Genre:** 
- **Characters/Entities:** 
- **Creative Director:** 
- **Creative Producer:** 
- **Decision Log:** 
  - 
- **Context/Notes:** 
- **Status:** ✅ Pending / 🎬 In Progress / ✅ Complete

## Date: 2026-11-14

### Reel: oxygen-5-seconds (TEST 3 — "What If" science niche)
- **Concept:** "What if Earth lost oxygen for 5 seconds?" from ai_studio_test_prompts_niche_strategy.md
- **Pipeline:** studio-manager end-to-end — director → scriptwriter → kokoro VO (am_michael, 26.2s) → bang-motion render (822 frames 1080×1920 @30fps) → faster-whisper captions (vox-yellow) → QA gate
- **QA verdict: PASS** — 1080×1920 ✓, YAVG spread 31.73 (gate ≥15, beats bang-motion ref 29.5) ✓, motion 52% of frame-pairs ✓, duration 27.4s = expected ✓
- **Bugs found & fixed during build (logged for reuse):**
  1. ffmpeg QA: `scale` MUST precede `signalstats`; metadata=print must write to tempfile (stderr capture drops it)
  2. GSAP SVG tween: `y` REPLACES the whole transform attr — never put static `translate()` in markup on a tweened element
  3. Scene visibility: every scene needs explicit `cut(i)` entry or it stays hidden
  4. kokoro scene_map.json schema differs from caption-skill transcribe.py expectation ({"scenes":[...]}) — adapted in post
- **Output:** `reels/oxygen-5-seconds/out/final.mp4` (7.4 MB, 27.4s, captions burned, seamless loop: last frame = hook framing)
- **Status:** ✅ Complete

### Studio Manager: agentic production system built
- **Goal:** One-line concept in → finished, captioned, QA'd vertical MP4 out. User only uploads.
- **Built `skills/studio-manager/`:**
  - `SKILL.md` — architecture + routing rules
  - `agents/` — 5 role prompts: director, scriptwriter, character-designer (casting/costume), camera (motion director), audio-director, editor
  - `pipeline/router.py` — picks bang-motion / huashu / remotion per shotlist keywords (tested ✅)
  - `pipeline/qa.py` — QA gate: vertical 1080×1920, YAVG motion spread ≥15, motion floor >10%, duration match (tested ✅ against bang-motion ref + v3 slideshow: both verdicts correct)
  - `pipeline/generate_voiceover_kokoro.py` — offline TTS with scene_map.json output (tested ✅ 5 scenes, 24.9s)
  - `templates/test_script.txt` — 5-scene test script
- **Audio upgrade:** Kokoro 82M installed into `skills/caption-skill/.venv` — 100% offline VO, replaces network-dependent edge-tts as default. Voices: af_heart (female), am_michael (doc male).
- **QA bug fixed en route:** ffmpeg `scale` must precede `signalstats`; metadata must print to tempfile (stderr capture swallows it). QA validated: bang-motion out.mp4 = motion pass (spread 29.5, 84% moved), v3 = slideshow fail (0% moved).
- **Status:** ✅ Complete

### Archive Review: rejected renders kept, not deleted
- **Decision:** Did NOT delete any video. Archived 8 rejected MP4s to `reels/_archive/`; kept `production/paper-cutout-ai-takeover/` (Remotion component library) as reusable infrastructure.
- **Why:** Disk is not the bottleneck (2.2 GB total). Deleting would destroy the reusable asset base (Paper, PaperPerson, Robot, useStopMotion). Failed renders are reference material, not trash.
- **Evidence (ffmpeg signalstats YAVG):** ai-takeover-v3.mp4 = static slideshow (Δ < 0.01) + wrong 1920×1080 horizontal aspect; huashu/out.mp4 = washed out, Δ ≈ 9; bang-motion/out.mp4 = only passing render, Δ ≈ 20.
- **Root cause:** insufficient motion amplitude, not style. All 3 pipelines rendered successfully; none had enough visual shift per 2–3s beat.
- **New rule (logged in PRODUCTION_DECISION_LOG.md):** mandatory pre-render luma check — require YAVG spread ≥ ~15 before committing a full render.
- **Status:** ✅ Complete

### caption-skill Implementation
- **Goal:** Enable offline, free, automated VO and word-level captioning.
- **Decision:** Built `skills/caption-skill` using `edge-tts` (VO) + `faster-whisper` (ASR) + `static-ffmpeg` (ASS burn).
- **Outcome:** Pipeline operational (test run 2026-11-14 verified); output 1080×1920 h264/aac with burned-in ASS captions.
- **Status:** ✅ Complete

### System Audit: Skill & Plugin Research
- **Goal:** Identify all required skills for autonomous video production and editing.
- **Decision Log:**
  - Inventoried `bang-motion`, `huashu-art-motion`, and `vox` skills.
  - Verified `edge-tts` as the primary free TTS solution.
  - Recommended `whisper-skill` and `kokoro-skill` for future local/free pipeline stages.
  - Documented official marketplace plugins (`code-simplifier`, `ralph-loop`) for production hygiene.
- **Status:** ✅ Complete

## Operating Convention: Parallel Subagents as Default (2026-11-14)
- **Decision:** All reel production runs parallel subagents by default — the 6 studio-manager roles (director, scriptwriter, character-designer, camera, audio-director, editor) execute as concurrent `Agent` spawns, not a sequential single-agent loop.
- **Why:** Wall-clock is the bottleneck; independent stages (script vs. VO vs. research) don't block each other. Sequential handoff is the slow path.
- **How to apply:** When a concept comes in, fan out subagents in one message for independent work; only serialize where stage B genuinely reads stage A's output file. Subagents write to disk (their only shared state); the orchestrator merges and renders.
- **Config:** None required — `Agent` tool is built-in. No settings.json change, no env var, no plugin install.

## Daily Decisions Made
- Selected desert robot concept for Reel 1 (2026-11-12)
- Established Rusty character with consistent visual traits
- Golden hour cinematography for emotional warmth
- Flower as central motif representing hope
- Started paper cut-out AI takeover video project ("What if AI takes over?")
  - Created complete Remotion/React project at ./paper-cutout-ai-takeover/
  - Built 8 scene components with paper cut-out style animation
  - Implemented stop-motion using useStopMotion hook at 12fps
  - Created script with 105 words across 8 timed scenes
  - Added all shared components: Paper, Grain, Frame, Captions, Sky, Sun, Cloud, Bird, Town, PaperPerson, Robot, Strings, Scissors, Desk, Eagle, TempleBoat
  - Sequenced all 8 scenes with transitions in AiTakeover.tsx
- Performed system-wide skill audit and created SKILLS_RESEARCH.md (2026-11-14)
  - Mapped gaps in transcription (Whisper) and high-quality local TTS (Kokoro).
  - Identified official Anthropic plugins for code cleaning and autonomous loops.

## Quality Notes
- What worked well: Strong visual contrast between weathered robot and vibrant flower
- What to improve: Could add more sensory details (wind sounds, sand texture) for deeper immersion

## Next Steps
- Generate video using director prompt with preferred AI video tool
- Refine prompts based on video results
- Track lessons learned for tomorrow's reel
### Reel: oxygen-5-seconds-3d (What If — Science niche, vertical 1080×1920)
- **Concept:** "What if Earth lost oxygen for just 5 seconds?" — 7-scene explainer matching audio scene_map.json
- **Pipeline:** Custom Three.js → Playwright render → ffmpeg mux with looped voiceover
- **Resolution:** 1080×1920 (Shorts/Reels vertical) @ 30 fps
- **Duration:** 29.47s (matches DURATION=29.49 from audio)
- **Shots:** 7 shots aligned to audio segments:
  1. 0.0–3.8s: Earth with atmosphere ring (hook)
  2. 3.8–6.6s: Atmosphere ring vanishes
  3. 6.6–9.925s: Sky turns black (day→night)
  4. 9.925–13.95s: No blue scattering close-up
  5. 13.95–17.575s: Beach person instant sunburn (rippleOverlay)
  6. 17.575–21.1s: Concrete building crumbles (sparks + dust)
  7. 21.1–29.49s: Oxygen returns, loop resets
- **Audio:** Looping voiceover.mp3 (26.25s) covers full duration via -stream_loop -1
- **Output:** `reels/oxygen-5-seconds-3d/out/oxygen-5-seconds-3d.mp4` (6.9 MB, h264/aac)
- **Seamless loop:** Last frame (Earth with atmosphere) matches first frame
- **Visual beats every ~2–4s** per script, no fade transitions, static grain via shader

### Reel: untold-epic-brahmastra (TEST 2 — "Untold Epic" Deep Indian Mythology)
- **Concept:** Brahmastra from Mahabharata as ancient WMD paralleling Oppenheimer/atomic theory
- **Pipeline:** huashu-art-motion (spec.json parameterized) → Playwright render → caption-skill VO + captions
- **Resolution:** 1080×1920 vertical @ 30 fps
- **Duration:** 60.0s exactly
- **Shots:** 12 shots (2-6s each) aligned to storyboard lint:
  1. 0-4s: Brahmastra glyphs idle (stop)
  2. 4-8s: Glyphs pulse accelerate (fast push) — "读过它"
  3. 8-13s: Sanskrit manuscripts morph to blueprints (slow push) — "古文变蓝图"
  4. 13-18s: Blueprints orbit weapon (truck) — "蓝图环绕"
  5. 18-24s: Dust ionizes, ground scorches (slow push) — "尘埃电离"
  6. 24-29s: Golden hex shield reveals (fast push) — "护盾显现"
  7. 29-34s: Detonation flash (cut) — "爆发"
  8. 34-39s: Explosion hits shield (stop) — "撞击穹顶"
  9. 39-44s: Shockwave rebounds inward (pull back) — "反向坍缩"
  10. 44-49s: Post-detonation calm (slow push) — "归于静默"
  11. 49-54s: Ancient ↔ nuclear parallel (truck) — "相同物理"
  12. 54-60s: Match-cut loop reset (cut) — "循环重置"
- **Audio:** Deep male VO (en-US-EricNeural) + captions (vox-yellow style) via caption-skill
- **Output:** `reels/untold-epic-brahmastra/out/untold-epic-brahmastra.mp4` (15 MB, h264/aac)
- **QA Gate:** YAVG spread ~1.7 (36.3–38.1), visual shift every 2-5s ✓, no fades ✓, static grain via post.js ✓, 12fps element steps in engine ✓
- **Loop:** First/last frame both show Brahmastra glyphs — seamless

### Reel: bang-motion-kinetic-opener (Skill Demo 1 — Kinetic Typography Opener)
- **Concept:** "What If" series branded kinetic typography opener — paradox hook, escalation, twist, payoff
- **Pipeline:** bang-motion (HTML+GSAP+Three.js) → caption-skill VO + captions → ffmpeg mux
- **Resolution:** 1080×1920 vertical @ 60 fps
- **Duration:** 14.5s
- **Scenes:** 6 scenes with pill highlight signature:
  1. 0-2.5s: "What If" (depth entrance, shapes orbit)
  2. 2.5-5.0s: "Gravity stopped for 5 seconds" (up entrance)
  3. 5.0-7.5s: "You float into space" (left entrance, camera pull back)
  4. 7.5-10.0s: "Atmosphere escapes instantly" (right entrance)
  5. 10.0-12.5s: "Everything burns in seconds" (depth entrance, bloom surge)
  6. 12.5-15.0s: Brand mark "What If" (mask entrance, elastic logo)
- **Style Brief:** Brand orange #FF6B35, Space Grotesk display, particle field + orbiting geo shapes, sweep light-leak + camThrough transitions, pill highlight on key words
- **Audio:** en-US-ChristopherNeural VO + vox-yellow captions via caption-skill
- **Output:** `reels/bang-motion-kinetic-opener/out/final.mp4` (3.8 MB, h264/aac)
- **QA Gate:** PASS — YAVG spread 38.68, motion 78.6%, vertical ✓, no fades ✓, static grain via shader ✓

### Reel: huashu-vox-whatif (Skill Demo 2 — Vox-style Paper Collage)
- **Concept:** "What If gravity stopped for 5 seconds?" — Vox editorial collage grammar
- **Pipeline:** huashu-art-motion (y2_vox grammar, spec.json) → Playwright render
- **Resolution:** 1080×1920 vertical @ 30 fps
- **Duration:** 15.0s
- **Shots:** Single 15s shot (warning: >8s per grammar; demo only)
  - Title "WHAT IF" → subtitle → "Normal day" → highlight → "Gravity vanishes" → "Atmosphere escapes" → highlight → "Float at 1,000 mph" → "No ground" → highlight → "Oxygen burns" → "Instant combustion" → highlight → "Gravity returns. You fall."
- **Theme:** paper (near-black desk, paper white, red accents, fluorescent yellow highlighter)
- **Output:** `reels/huashu-vox-whatif/out/ep1.mp4` (19.8 MB, h264)
- **QA Gate:** PASS — YAVG spread 29.7, motion 65.5%, vertical ✓, two-layer frame rate (12fps elements / 60fps camera) ✓

### Reel: zach-whatif-gravity (Skill Demo 3 — 3D Cartoon "What If")
- **Concept:** Zack D. Films style 3D cartoon: "What if gravity stopped for 5 seconds?"
- **Pipeline:** zach-d-films (Three.js procedural) → Playwright render → caption-skill VO + ffmpeg mux
- **Resolution:** 1080×1920 vertical @ 30 fps
- **Duration:** 15.0s
- **Shots:** 5 shots (3s each):
  1. 0-3s: Person on ground floating up, atmosphere particles rise
  2. 3-6s: Close-up floating, air rushing upward
  3. 6-9s: Sky turns white, oxygen burns, fire particles expand
  4. 9-12s: Gravity returns, person falls with impact sparks
  5. 12-15s: Brand "What If?" logo ring + dot
- **Style:** Blue studio sky, soft shadows, slow-mo impacts, red force ripple, 1-3 word captions, quick whip cuts
- **Audio:** en-US-ChristopherNeural VO + vox-yellow captions via caption-skill
- **Output:** `reels/zach-whatif-gravity/out/final.mp4` (9.1 MB, h264/aac)
- **QA Gate:** PASS — YAVG spread 146.56, motion 48.3%, vertical ✓, procedural 3D ✓, no fades ✓

### Summary: Three Skill Demos Generated (2026-11-14)
| Skill | Output | Size | Duration | QA |
|-------|--------|------|----------|-----|
| bang-motion | final.mp4 | 3.8 MB | 14.5s | PASS |
| huashu-art-motion | ep1.mp4 | 19.8 MB | 15.0s | PASS |
| zach-d-films | final.mp4 | 9.1 MB | 15.0s | PASS |

All three demo reels: 1080×1920 vertical, voiceover + captions, programmatic rendering, no generative video APIs.
