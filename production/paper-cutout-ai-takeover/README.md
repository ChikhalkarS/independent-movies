# Paper Cut-out AI Takeover

Vertical video, 1080x1920, 30 fps, ~58 seconds. Paper cut-out style animation built with Remotion + React.

## Output

- `npm run render` produces `out/ai-takeover.mp4` (1080x1920, ~58s, 30fps)
- `npm run still` exports a PNG of any frame
- `npm run dev` starts Remotion Studio

## How to run

```bash
# Install dependencies
npm install

# Start Remotion Studio (interactive preview)
npm run dev

# Render the final MP4
npm run render
```

## How to change the script

1. Edit `script.md` — update narration, captions, and scene timing
2. Run `npm run render` to regenerate the video

## How to add voiceover

1. Place `public/voiceover.mp3` (concatenated scenes)
2. The `Root.tsx` will auto-load it if present: `<Audio src={staticFile("voiceover.mp3")} />`
3. Optional: `public/music.mp3` ducked to 15% under voiceover, faded in/out

## How to add captions

- Captions are generated from `src/data/captions.json` with word-level timings
- If voiceover exists, derive timings with Whisper or `@remotion/captions`
- Otherwise, estimate at ~2.3 words/second inside each scene's window

## Reusing this style for the next topic

1. Swap `src/data/script.ts` with new scene data
2. Update visual components in `src/components/` to match new theme
3. Keep `useStopMotion`, `Paper.tsx`, `Grain.tsx`, `Frame.tsx` as reusable defaults
4. Adjust colour palette if needed (see paper cut-out style bible)

## Colours (paper cut-out style bible)

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