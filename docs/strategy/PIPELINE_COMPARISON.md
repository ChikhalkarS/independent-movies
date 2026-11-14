# Pipeline Comparison: 10-Second Vertical Test Reel
**"What if AI takes over?" — Day 1 → Day 50 arc**

| Pipeline | Output File | Size | Dependencies | Token Cost (est.) | Vertical Ready |
|---|---|---|---|---|---|
| **bang-motion** | `reels/ai-takeover-1000-days/bang-motion/out.mp4` | 3.3 MB | ffmpeg, node, puppeteer | Low (single HTML) | ✅ 1080×1920 |
| **huashu-art-motion** | `reels/ai-takeover-1000-days/huashu/out.mp4` | 9.5 MB | ffmpeg, uv, playwright | Low (JSON spec) | ✅ 1080×1920 |
| **Remotion** | `paper-cutout-ai-takeover/out/test-takeover-vertical.mp4` | 49 KB | node | Medium (React code) | ✅ 1080×1920 |
| **vox-explainer-skill** | — | — | ATLASCLOUD_API_KEY ($3-8/film) | High (API calls) | ✅ Configurable |
| **vox-ai-motion** | — | — | MUAPI_API_KEY | High (API calls) | ✅ Configurable |

---

## Visual Quality Assessment

### bang-motion (HTML+GSAP)
**Look:** WebGL/GSAP motion graphics — smooth camera, kinetic text, layered cutouts with drop shadows and grain overlay.
**Strengths:** 
- Very smooth 60fps playback
- Built-in anti-PPT rules enforced
- Easy to iterate (edit HTML, reload browser)
- No build step for preview

**Weaknesses:**
- Export requires puppeteer + server + ffmpeg (3-step)
- "Web" aesthetic — slightly less "hand-crafted" than true paper cutout

### huashu-art-motion (Vox paper-collage grammar)
**Look:** True paper collage — static paper grain, 12fps element stepping, red highlighting, torn edges, highlight sweeps, handwritten labels.
**Strengths:**
- Highest "Vox" fidelity: two-layer frame rate, proper easing, static grain
- Parameterized: change spec.json, re-render
- Scene grammar (y2_vox) enforces editorial rules
- QA pipeline built-in (`qa.py`, `deliver.py`)

**Weaknesses:**
- Playwright setup heavier (Chromium download)
- Warning for >8s segments (we used 10s)
- Steeper learning curve for custom scenes

### Remotion (React+SVG, our existing project)
**Look:** Code-driven SVG with paper textures — push-through transitions, 12fps stop-motion on elements, grain overlay.
**Strengths:**
- Fastest render (49 KB in ~30s)
- Type-safe, component-based
- Integrates with existing `paper-cutout-ai-takeover` components
- Frame-accurate, deterministic

**Weaknesses:**
- Requires rebuilding scenes for new concepts (not parameterized like huashu)
- Horizontal scenes need vertical adaptation
- Smaller ecosystem for "editorial" grammar vs huashu

---

## Token Efficiency (for future reels)

| Pipeline | Setup tokens | Per-reel tokens | Notes |
|---|---|---|---|
| **bang-motion** | ~500 (style brief + starter) | ~200 (HTML edits) | Reuse starter, swap assets |
| **huashu** | ~300 (grammar + theme) | ~100 (spec.json) | Parameterized — best for volume |
| **Remotion** | ~800 (components + composition) | ~400 (new scenes) | Full code control, most verbose |
| **vox skills** | ~200 (prompt) | ~50 (API call) | But requires API keys + cost |

---

## Recommendation

**For our production house (vertical, social-first, "What If" series):**

1. **Primary: huashu-art-motion (y2_vox grammar)**
   - Matches our paper-cutout aesthetic exactly
   - Parameterized spec = low per-reel effort
   - Built-in quality gates (QA, deliver)
   - Vertical native (1080×1920)

2. **Secondary: bang-motion (kinetic opener style)**
   - Best for high-energy hooks/bumpers
   - Faster iteration cycle (browser reload)
   - Good for "DAY 1" hook cards

3. **Tertiary: Remotion (custom components)**
   - Use when we need specific character animation (our Robot, PaperPerson)
   - Integrate huashu/bang-motion exports as layers

4. **vox skills** — only when we have API budget and need full automation

---

## Next Steps

1. **Standardize on huashu y2_vox** for the "What If AI takes over" series
2. **Create a template spec** for the Day 1→1000 arc (split into 8-sec segments)
3. **Build a component library** in Remotion for recurring characters (Robot, PaperPerson) that can be composited into huashu renders
4. **Log style decisions** in `PRODUCTION_DECISION_LOG.md` per reel