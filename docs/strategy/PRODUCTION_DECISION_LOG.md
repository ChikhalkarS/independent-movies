# Production House Decision Log: Best Preferences

This log tracks our creative and technical standards to ensure consistent high-quality output across all reels.

| Date | Category | Decision | Rationale |
|---|---|---|---|
| 2026-11-14 | Frame Rate | **Two-Layer Frame Rate**: Camera smooth (60fps), Elements step at 12fps. | Achieves the "Vox" premium stop-motion feel; avoids "AI slop" look. |
| 2026-11-14 | Transitions | **No Fades**: Use Whips, Push-throughs, or Hard Cuts exclusively. | Fades look like PPTs; movement transitions maintain the "continuous world" feel. |
| 2026-11-14 | Text | **Max 2 Levels**: One massive key stat/word + one small label. | Prevents cognitive overload; ensures text is readable on small vertical screens. |
| 2026-11-14 | Aesthetic | **Static Grain**: 25% opacity grain overlay, static (no jitter). | Adds paper texture without creating distracting "AI noise." |
| 2026-11-14 | Workflow | **Skill Routing**: Always invoke `/huashu`, `/bang-motion`, or `/vox` before writing code. | Reuses proven animation grammars; ensures we don't rebuild standard components. |
| 2026-11-14 | Composition | **3-5 Elements per scene**: Layers must stack sequentially. | Stacking adds depth and narrative progression within a single shot. |
| 2026-11-14 | QA Gate | **Pre-render luma check mandatory**: sample frames, require YAVG spread ≥ ~15 and a visual shift every 2–3s before committing a full render. | All 3 test renders failed this: see Archive Review 2026-11-14. |
| 2026-11-14 | Archive | **Failed renders archived, never deleted**: `reels/_archive/` holds 8 rejected MP4s; `production/paper-cutout-ai-takeover/` (Remotion component library) retained as reusable infrastructure. | Disk is not the bottleneck (2.2 GB total); deleting the component library would destroy the reusable asset base. |

---

## Archive Review — 2026-11-14 (evidence, not opinion)

All 8 rendered MP4s were measured with `ffmpeg signalstats` (YAVG = average luma per frame) before any deletion decision.

| File | Duration | Resolution | YAVG spread | Verdict |
|---|---|---|---|---|
| `production/.../ai-takeover-v3.mp4` | 58s | **1920×1080 horizontal** | 175.645 → 175.644 (Δ < 0.01) | **Rejected.** Static slideshow. Also violates vertical-first rule. |
| `reels/ai-takeover-1000-days/huashu/out.mp4` | 10s | 1080×1920 vertical | 204 → 195 (Δ ≈ 9) | **Rejected.** Washed-out, motion too small to hold a 2–3s attention cycle. |
| `reels/ai-takeover-1000-days/bang-motion/out.mp4` | 10s | — | 187 → 167 (Δ ≈ 20) | **Only passing render.** Real motion. Reference for the next reel. |

**Root cause:** insufficient motion amplitude, not style. All three pipelines can render; none were given a scene with enough visual shift per beat. Fixed by the QA Gate rule above + using bang-motion's output as the motion reference.

**Kept as infrastructure (not archived):** `production/paper-cutout-ai-takeover/` — Paper, Frame, Town, PaperPerson, Robot, `useStopMotion` (12fps stop-motion hook). Reusable across all paper-cut reels. `skills/` — installed toolkits, not renders.
