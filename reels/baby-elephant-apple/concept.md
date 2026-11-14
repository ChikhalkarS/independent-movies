# Concept: Baby Elephant & the Apple (TEST 1 — Children's Loop)

Niche: Cute Animal Animation (toonstories / kitten_narrative benchmark, 100M–700M views).
Full spec: `ai_studio_test_prompts_niche_strategy.md` TEST 1.

## Logline
A crying baby elephant can't reach an apple on a tree — until a tiny monkey drops it down and they share it, ending on a new ice-cream drop that loops back to the first frame.

## Style pick
`kinetic-typography` route via bang-motion — but flat-vector cartoon variant ("stage cartoon"
per bang-motion kartun-panggung exception): one continuous stage, characters act, camera static
per scene with push-whips between scenes. 3D Pixar look is NOT possible locally ($0 pipelines
only) — flat vector with soft pastel palette is the house-faithful substitute. Logged as
deviation in tracker: "3D Pixar style → flat pastel vector (local render constraint)".

## Palette (3 + neutrals)
- Background: `#BDE8D8` (soft mint forest haze)
- Accent 1: `#FFB7C5` (baby pink — elephant blush, apple shine)
- Accent 2: `#FF4D6D` (apple red / ice-cream strawberry)
- Ink: `#3A2E39` (soft charcoal outline)
- Neutral: `#FFF7EC` (cream belly, clouds)

## Protagonist
Baby elephant: round body, oversized head, huge glossy eyes (white + black pupil + pink blush),
tiny trunk, stub legs. Traits: big eyes / pink blush / droopy trunk when sad, perked when happy.
Secondary: tiny monkey (brown circle + tail) and the red apple + strawberry ice cream cone.

## Beat sheet (32s @30fps, shift every 2–3s, seamless loop)
| t | Beat | Visual shift |
|---|------|-------------|
| 0–3s | HOOK | Baby elephant face fills frame, tears dropping, lip wobble. Ice cream plop lands in mud at 2.0s with SFX beat. |
| 3–6s | PROBLEM | Cut wide: elephant vs tall apple tree, apple glints top-right. Trunk stretches, fails. |
| 6–9s | TRY HARDER | Elephant jumps 3 times (squash-stretch), apple doesn't budge. Tear drip #2. |
| 9–12s | MONKEY | Tiny monkey swings in on a vine from top-left, lands on branch, salutes. |
| 12–15s | RESCUE | Monkey pushes apple; it wobbles, drops in arc, bounces once on elephant's head (boing). |
| 15–18s | SHARE | Apple splits in two with a pop; both bite in sync; hearts pop up 12fps. |
| 18–22s | HAPPY | Both dance side to side; sparkles; sun winks. |
| 22–26s | NEW TREAT | Elephant pulls out a NEW ice cream cone from behind back; takes a happy bite. |
| 26–30s | THE DROP | Elephant trips (comedy beat) — ice cream flies up, frame freezes — SPLAT into mud, screen shake. |
| 30–32s | LOOP BRIDGE | Mud splash wipes down → baby elephant face, tears welling = frame 0. Seamless loop. |

## Constraints inherited
- Vertical 1080×1920. No fades — push-whip transitions 0.2s. Static grain 25%.
- Max 2 text tiers (only "AWW!" / "AGAIN?" stamps). Scene shift every 2–3s.
- Motion amplitude: every scene has ≥1 element ≥15% frame travel (vine swing, apple drop arc,
  ice-cream toss, mud wipe) → passes QA gate ≥15 spread.
- Audio: gentle "aww" ambience — VO is minimal (kids loop needs sound design > narration);
  3 soft VO lines only (kokoro af_bella, warm).
