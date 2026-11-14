# REEL GENERATION WORKFLOW: Untold Epic — Brahmastra

## Complete Folder Structure
```
reels/untold-epic-brahmastra/
├── director/prompt.md       ← Video generation prompt (READY)
├── producer/brief.md        ← Production brief & timeline (READY)
├── character/profiles.md    ← Entity definitions (READY)
├── context/world.md         ← World building & scene breakdown (READY)
├── style/guidelines.md      ← Visual style & platform specs (READY)
├── script.txt               ← VO script for caption-skill (TODO)
├── spec.json                ← huashu-art-motion spec (TODO)
├── src/                     ← Custom Three.js/Remotion code (if needed)
├── out/                     ← Render output
└── audio/                   ← VO + stems (from caption-skill)
```

---

## QUICK START: From Idea to Video

### Step 1: Verify All Templates Populated ✅
- [x] Director: `director/prompt.md` — 60s vertical prompt with technical specs
- [x] Producer: `producer/brief.md` — 5-phase timeline, resource allocation
- [x] Character: `character/profiles.md` — Brahmastra, battlefield, shield entities
- [x] Context: `context/world.md` — Kurukshetra twilight, 6-scene arc
- [x] Style: `style/guidelines.md` — Dark fantasy RPG trailer, platform specs

### Step 2: Create VO Script (`script.txt`)
Write `script.txt` matching the 6-scene arc from `context/world.md`:
- Target: ~150 words for 60s (2.5 wps = deep, dramatic pacing)
- Voice: Deep male, authoritative (en-US-DavisNeural or en-GB-RyanNeural)
- Include Sanskrit chant cues for caption-skill timing

### Step 3: Choose Render Pipeline

**Option A: huashu-art-motion (RECOMMENDED)**
- Parameterized `spec.json` from templates
- Token-cheapest for series consistency
- Playwright + Chromium render → MP4
- Best for: Dark fantasy, particle effects, morphing text

**Option B: bang-motion**
- Kinetic opener style
- HTML + GSAP + Three.js
- Good for: High-energy hook, but less suited for 60s narrative

**Option C: Custom Three.js/Remotion**
- Full control, reusable components
- `production/paper-cutout-ai-takeover/` components available
- Higher dev time

### Step 4: Execute Pipeline

#### If huashu-art-motion:
```bash
cd skills/huashu-art-motion
# Create spec.json from templates
# Render:
python3 render.py --spec /path/to/spec.json --out /path/to/out.mp4
```

#### If bang-motion:
```bash
cd skills/bang-motion
# Edit index.html with director prompt specs
python3 -m http.server 8080 &
node scripts/export-frames.mjs 8080 out.mp4 60
```

#### If custom:
```bash
cd reels/untold-epic-brahmastra
# Write src/main.js, src/shots.js per context/world.md scenes
npx remotion render src/entry.tsx Main out/brahmastra.mp4 --width 1080 --height 1920
```

### Step 5: Audio Pipeline (caption-skill)
```bash
cd skills/caption-skill
.venv/bin/python scripts/pipeline.py \
  --script /path/to/script.txt \
  --out /path/to/audio \
  --voice en-US-DavisNeural \
  --style vox-yellow
```
Outputs: `voiceover.mp3`, `captions.ass`, `scene_map.json`, preview MP4

### Step 6: Final Mux
```bash
cd reels/untold-epic-brahmastra
ffmpeg -y -i out/video_noaudio.mp4 -i audio/voiceover.mp3 \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest \
  out/untold-epic-brahmastra.mp4
```

### Step 7: QA Gate (MANDATORY per PRODUCTION_DECISION_LOG.md)
```bash
# Luma check
ffmpeg -i out/untold-epic-brahmastra.mp4 -vf signalstats -f null -

# Verify:
# - Vertical 1080×1920 ✓
# - Loops seamlessly (last frame ≈ first frame) ✓
# - Visual shift every 2-3s ✓
# - No fade transitions ✓
# - Static grain 25% opacity ✓
# - 12fps element steps visible ✓
```

### Step 8: Log & Track
- Update `daily-reel-tracker.md` with outcome
- Update `docs/strategy/PRODUCTION_DECISION_LOG.md` if new decisions
- Archive failed renders to `reels/_archive/`

---

## EXAMPLE: huashu-art-motion spec.json Structure

```json
{
  "meta": {
    "title": "Untold Epic — Brahmastra",
    "duration": 60,
    "resolution": [1080, 1920],
    "fps": 30,
    "style": "dark-fantasy-rpg-trailer"
  },
  "scenes": [
    {"id": "hook", "start": 0, "end": 5, "camera": "orbital-close", "focus": "glyphs"},
    {"id": "morph", "start": 5, "end": 15, "camera": "pullback", "fx": "text-to-blueprint"},
    {"id": "charge", "start": 15, "end": 30, "camera": "orbital-wide", "fx": "energy-buildup"},
    {"id": "detonate", "start": 30, "end": 45, "camera": "static-wide", "fx": "explosion-contained"},
    {"id": "parallel", "start": 45, "end": 55, "camera": "push-in", "fx": "side-by-side"},
    {"id": "loop", "start": 55, "end": 60, "camera": "match-cut", "focus": "glyphs"}
  ],
  "entities": {
    "brahmastra": {"model": "golden-arrow-glyphs", "shader": "plasma-pulse"},
    "shield": {"model": "hex-dome", "material": "energy-lattice"},
    "battlefield": {"model": "kuru-kshetra", "textures": ["cracked-earth", "chariot-debris"]}
  },
  "audio": {
    "vo": "deep-male-authoritative",
    "bed": "sanskrit-chanting-gayatri",
    "sfx": ["bass-drop", "transition-sharp", "energy-hum"]
  },
  "post": {
    "grade": "teal-orange-gold",
    "grain": {"opacity": 0.25, "static": true},
    "transitions": "hard-cut-only"
  }
}
```

---

## NEXT ACTIONS (Priority Order)

1. [ ] Write `script.txt` (150 words, 6 scenes, Sanskrit cues)
2. [ ] Generate `spec.json` for huashu-art-motion from templates
3. [ ] Run huashu render → `out/video_noaudio.mp4`
4. [ ] Run caption-skill → `audio/voiceover.mp3` + `captions.ass`
5. [ ] Mux final → `out/untold-epic-brahmastra.mp4`
6. [ ] QA gate → log → done

---

## REFERENCE: Key Files to Read Before Execution

- `director/prompt.md` — Visual specs
- `context/world.md` — Scene timing & world rules
- `style/guidelines.md` — Color, lighting, camera, platform
- `character/profiles.md` — Entity behavior & consistency
- `docs/strategy/PRODUCTION_DECISION_LOG.md` — Hard rules (12fps, no fades, static grain)
- `skills/huashu-art-motion/SKILL.md` — Spec schema & render commands