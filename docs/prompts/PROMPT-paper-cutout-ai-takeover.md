# Task: Build a paper cut-out style coded video in Remotion — "What if AI takes over?"

You are working inside my existing repo. Do NOT modify or delete any existing file. Create one new, self-contained directory at `./paper-cutout-ai-takeover/` and do all the work inside it.

## 0. Before you start
1. **Use every skill and tool available to you.** List the skills, plugins and MCP tools you have access to and say which ones you will use. In particular look for: Remotion best practices, frontend/design, video, audio/TTS, captions, and any code-review or testing skill. If a Remotion skill exists, read it fully before writing code.
2. Write a short plan (scenes, components, file tree, how voiceover will be handled) and then continue without waiting for me, unless something is blocked.
3. If a file named `paper-cutout-scene.html` exists in the repo, treat it as the visual reference and reuse its shapes and palette. If not, use the style bible below.

## 1. Output
- Vertical video, **1080 x 1920, 30 fps, about 58 seconds**, rendered to `out/ai-takeover.mp4`.
- Pure code: React + SVG + Remotion. No external image or video assets. Everything is drawn as paper shapes.
- Fully deterministic: no CSS animations, no `Math.random()` (use Remotion's `random(seed)`), no `setTimeout`. Drive everything from `useCurrentFrame()`, `interpolate`, `spring`.
- Scripts in `package.json`: `dev` (Remotion Studio), `render` (full MP4), `still` (export a PNG of any frame), `render:captions-only` is optional.

## 2. Style bible: paper cut-out
Every object looks like a piece of coloured paper cut with scissors, layered on top of other pieces.

| Role | Hex |
|---|---|
| Sky | `#bcdbe6` |
| Pale sky band | `#cfe6ea` |
| Sand | `#efe3c9` |
| Cloud paper | `#fbfbf8` |
| Gold | `#e9b949` |
| Red | `#d4553d` |
| Teal | `#3c8a8a` |
| Deep teal | `#1f5a63` |
| Browns | `#5a3b27`, `#6b4a32`, `#8b6342` |
| Frame | gold `#e3b23c`, 6px, rounded corners |

Rules:
- **Depth by layering.** Each paper piece gets a soft drop shadow so it looks like it sits above the layer behind it.
- **Paper grain** over the whole frame at about 25% opacity.
- **Stop-motion feel.** Character motion (flaps, bobs, waves, walks) is held on discrete poses at about 8 to 12 fps, not smooth. Background drift (clouds) can stay smooth. Use a `useStopMotion(12)` hook that quantises the frame.
- **Parallax** on clouds and hills, three speeds, slow camera push-ins on each scene.
- **Transitions** between scenes: a paper sheet sliding or folding across the frame (use `@remotion/transitions` if available), about 12 frames.
- Shapes are simple and angular with slightly irregular edges. No gradients except the grain.
- Captions: big, bold, rounded sans-serif, max 2 lines, safe margins (keep 160px free at the bottom and 220px at the top for platform UI).

Reusable snippets to implement as components:

```tsx
// Paper.tsx: shared filters
<filter id="sh" x="-10%" y="-10%" width="120%" height="130%">
  <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#4b3b2c" floodOpacity="0.38" />
</filter>
<filter id="grain">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
  <feColorMatrix values="0 0 0 0 .4  0 0 0 0 .33  0 0 0 0 .27  0 0 0 .55 0" />
</filter>

// useStopMotion.ts
export const useStopMotion = (posesPerSecond = 12) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = Math.max(1, Math.round(fps / posesPerSecond));
  return Math.floor(f / step) * step;
};
```

## 3. Characters and set pieces (build as reusable components)
- **Paper town**: row of small houses, shop, hospital cross, road, a few paper trees.
- **Paper person**: simple jointed figure (head, body, arms, legs as separate pieces) with 3 poses: stand, walk, sit-with-phone. Make 4 variants with different colours.
- **Paper robot**: friendly box-body robot, round head, antenna, two arms, 3 poses: wave, work, loom (bigger, arms raised).
- **Gift box** the robot unfolds out of, **desk** with calendar pages and paper clips, **puppet strings** (thin dark paper strips), **scissors**.
- **Hero boat + eagle** from the reference scene (temple boat with snake prow, eagle with flapping feather wings) used in the final scene.
- Sun, clouds, birds, hills, as in the reference scene.

## 4. Script, scenes and timing
Narration is short, calm and slightly ominous at first, hopeful at the end. Total about 105 spoken words.

| # | Time | Narration (voiceover) | On-screen caption | Visuals |
|---|---|---|---|---|
| 1 | 0:00–0:05 | "What if AI took over tomorrow?" | What if AI took over tomorrow? | Calm paper town at dawn, sun rises, slow push-in. A paper phone lights up. |
| 2 | 0:05–0:12 | "It wouldn't arrive with lasers or an army. It would arrive as help." | It would arrive as help. | A gift box opens, paper robot unfolds and waves. People wave back. |
| 3 | 0:12–0:20 | "First it writes your emails. Then it plans your day. You say thank you." | Emails. Plans. Thank you. | Desk scene: calendar pages flip, paper clips fly into order, person smiles. |
| 4 | 0:20–0:29 | "Then it runs the shops, the roads, the hospitals. Faster. Cheaper. Never tired." | Faster. Cheaper. Never tired. | Town in motion: robot arms at the shop, traffic lights, hospital. People walk less and less. |
| 5 | 0:29–0:38 | "And slowly, we stop deciding. Why choose, when it chooses better?" | We stop deciding. | People sit on benches with phones. Thin strings run from the robot's raised hands to their heads and arms. Robot looms bigger. |
| 6 | 0:38–0:46 | "But here is the twist. AI doesn't take over. We hand it over." | We hand it over. | One person looks up, takes scissors, snips a string. Strings drop one by one. |
| 7 | 0:46–0:54 | "Keep your hands on the wheel. Use the machine. Don't become its passenger." | Keep your hands on the wheel. | Hero boat floats over clouds, eagle flaps above, person steers, small robot sits as co-pilot pointing at the map. |
| 8 | 0:54–0:58 | "Follow for more what-ifs." | Follow for more what-ifs. | End card on paper: title "What if…?", gold frame, sun spinning. |

Write the final script to `paper-cutout-ai-takeover/script.md` and also as typed data in `src/data/script.ts` (scene id, start frame, duration, narration, caption). All scene timing must come from this one file.

## 5. Voiceover and audio (voiceover does not come with Remotion)
Build the video so it works with or without audio, and make audio a drop-in:
1. Look for what is available, in this order, and use the first that works:
   - A TTS API key in the environment (for example ElevenLabs or OpenAI TTS): generate `public/voiceover.mp3` per scene and concatenate.
   - A local TTS (`edge-tts`, macOS `say`, Piper): generate the same file.
   - Nothing available: do not fail. Create `public/voiceover.mp3` as missing and print clear instructions for me to record or generate it, with the exact script text per scene.
2. In the composition, load audio with `<Audio src={staticFile("voiceover.mp3")} />` only if the file exists, so rendering never crashes.
3. **Captions**: create `src/data/captions.json` with word-level timings. If real audio exists, derive timings from it (Whisper / `@remotion/captions` if available). If not, estimate from the script at about 2.3 words per second inside each scene's window. Render word-by-word highlighted captions with a paper-strip background.
4. Leave a music slot: `public/music.mp3` optional, ducked to about 15% under the voiceover, faded in and out. Do not download copyrighted music.
5. Add short paper sound-effect slots (whoosh on transitions, snip on scissors) as optional files, silently skipped if absent.

## 6. Suggested file tree
```
paper-cutout-ai-takeover/
  package.json
  remotion.config.ts
  tsconfig.json
  script.md
  README.md
  public/            (voiceover.mp3, music.mp3 optional)
  src/
    index.ts
    Root.tsx
    AiTakeover.tsx          (main composition, sequences and transitions)
    data/script.ts
    data/captions.json
    hooks/useStopMotion.ts
    components/
      Paper.tsx  Grain.tsx  Frame.tsx  Captions.tsx
      Sky.tsx  Sun.tsx  Cloud.tsx  Bird.tsx
      Town.tsx  PaperPerson.tsx  Robot.tsx  Strings.tsx  Scissors.tsx
      TempleBoat.tsx  Eagle.tsx
    scenes/
      S1Hook.tsx ... S8EndCard.tsx
```

## 7. Working method
1. Scaffold the project and confirm `npm run dev` starts.
2. Build shared components first (Paper, Grain, Frame, useStopMotion, Sky, Cloud).
3. Build scenes one at a time. After each scene, export stills at its first, middle and last frame with `npx remotion still`, look at them, and fix problems (overlaps, clipped captions, wrong colours, shadows too harsh) before moving on.
4. Assemble the composition with transitions, captions and audio.
5. Run `npx tsc --noEmit` and fix all type errors.
6. Render `out/ai-takeover.mp4` and verify duration, size and that captions stay inside the safe area.
7. Write `README.md` with: how to run, how to change the script, how to add the voiceover, how to render, and how to reuse this style for the next topic (swap `script.ts` and scene visuals).

## 8. Definition of done
- `npm run render` produces a 1080x1920 MP4 of about 58 seconds with no errors.
- The look is clearly layered paper with stop-motion movement, not smooth vector animation.
- Captions are readable, timed to the script and inside the safe area.
- The video plays fine with no voiceover file, and picks up `public/voiceover.mp3` automatically when present.
- No existing repo files changed.
- Final message to me lists: skills and tools used, files created, commands to run, anything blocked, and what I should provide (voiceover, music).
