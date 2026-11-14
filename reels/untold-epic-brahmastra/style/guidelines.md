VISUAL STYLE:

Primary Aesthetic: Cinematic dark fantasy, hyper-realistic, high-end RPG trailer (Elden Ring / God of War Ragnarök / Diablo IV cinematic quality)

Color Palette:
- Primary colors:
  1. Brahmastra Gold: #E8B84D (shaft, shield structure)
  2. Plasma Cyan: #00FFFF (glyphs, energy core)
  3. Blue-White: #E8F4FF (plasma emission, explosion flash)
  4. Blood Red: #8B0000 (sky, ambient)
  5. Deep Ochre: #986928 (ground, battlefield)
- Secondary accents:
  - Sanskrit Amber: #FFB300 (manuscript glow)
  - Shield Gold: #FFD700 @ 0.3 opacity (containment field)
  - Ash Grey: #3D3D3D (dust, shadows)
- Mood colors:
  - Dread: Deep teal #004D4D (shadows)
  - Awe: Bright cyan #00FFFF (highlights)
  - Relief: Warm gold #FFD700 (post-detonation)
- Avoid: Neon green, magenta, pastel tones, pure white, saturated blue (non-cyan), cartoon brights

Lighting Style:
- Primary: Single-source emission from Brahmastra (blue-white plasma, variable intensity)
- Secondary: Rim from shield boundary (golden, thin)
- Ambient: Blood-red sky provides minimal fill (creates high contrast)
- Quality: Hard, dramatic, volumetric — god rays through particulate matter
- Color temperature: Weapon = 6500K (cool); Environment = 2000K (warm); Shield = 4500K (neutral gold)
- Light behavior: Inverse-square falloff from weapon; dust motes catch and scatter light

Camera & Movement:
- Shot types: Extreme close-up (glyphs), Close-up (weapon), Medium (weapon + manuscripts), Wide (battlefield + shield), Ultra-wide (detonation)
- Camera movements:
  1. Slow 360° orbital dolly (Scenes 1-3) — continuous, ~5s per orbit
  2. Pull-back dolly (Scene 2) — reveals context
  3. Crane up (Scene 3) — shows battlefield scale
  4. Static wide (Scene 4) — detonation impact
  5. Slow push-in (Scene 5) — parallel comparison
  6. Match-cut to Scene 1 (Scene 6) — seamless loop
- Movement speed: Slow, deliberate (0.5-1m/s dolly); no whip pans, no handheld shake (except subtle 0.5% drift for organic feel)
- Focus style: Shallow depth on glyphs (Scene 1); deep focus on battlefield (Scenes 3-4); rack focus glyph→shield (Scene 2)

Post-Processing:
- Color grading: Teal-orange split with gold accent; shadows pushed to teal #004D4D; highlights to gold #FFD700; midtones warm ochre
- Film grain: Static 25% opacity overlay (per PRODUCTION_DECISION_LOG.md) — no jitter
- VFX: Particle simulation (energy wisps, dust, embers, ionization); volumetric lighting (god rays); morphing shader (Devanagari text → blueprint lines); shockwave distortion at detonation
- Speed ramping: Normal (30fps) throughout; micro-slow-motion (60fps interpolated) only on detonation flash (frames 900-915)
- Transitions: Hard cuts between scenes; match-cut Scene 6→1; no fades, no dissolves, no wipes

---

PLATFORM OPTIMIZATION:

YouTube Shorts / TikTok / Instagram Reels (9:16 vertical):
- Duration: 60s (max for Shorts)
- Aspect ratio: 9:16 (1080×1920)
- Safe zones: Keep critical glyphs/text within center 70% horizontally, center 80% vertically
- Loop-friendly: Scene 6 (55-60s) matches Scene 1 (0-5s) framing exactly
- Audio: Deep male VO (authoritative), Sanskrit chanting bed, heavy bass drops at 5s, 15s, 30s, 45s, sharp transition SFX at scene boundaries
- Captions: Word-timed (caption-skill), yellow Vox-style with black outline, bottom third safe zone
- Thumbnail: Frame at 2.5s (glyph close-up with "OPPENHEIMER" text overlay)

---

STYLE CONSISTENCY CHECKLIST:
- [x] Color palette defined (5 primary, 3 secondary, 3 mood)
- [x] Aspect ratio set (9:16 vertical)
- [x] Lighting style specified (single-source emission, volumetric)
- [x] Camera movements documented (6 defined moves)
- [x] Post-processing notes included (grade, grain, VFX, ramping, transitions)
- [x] Platform specifications noted (Shorts/Reels/TikTok)
- [x] Per PRODUCTION_DECISION_LOG.md: 12fps element steps, no fades, static grain, visual shift every 2-3s