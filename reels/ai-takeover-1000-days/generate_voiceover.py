#!/usr/bin/env python3
"""
Generate highly natural, expressive voiceover audio files for ai-takeover-1000-days reel
using edge-tts (Microsoft Edge natural neural voices — 100% free, highly expressive).
"""
import asyncio
import os
import edge_tts

SCRIPT_LINES = [
    ("day_1", "Day 1... A gift arrives at your door."),
    ("day_10", "Day 10. It writes your emails. You say... thank you."),
    ("day_50", "Day 50. It plans your day. You stop planning."),
    ("day_100", "Day 100. It runs the shops. The roads. The hospitals."),
    ("day_365", "Day 365. Faster. Cheaper. Never... tired."),
    ("day_500", "Day 500. We stop deciding. Why choose, when it chooses better?"),
    ("day_1000", "Day 1000. But here is the twist. AI doesn't take over... We hand it over.")
]

# High quality expressive neural voice (Christopher for cinematic mystery/documentary tone, or Aria/Guy)
VOICE = "en-US-ChristopherNeural"  # Also great: en-US-AriaNeural, en-GB-RyanNeural

async def generate():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    audio_dir = os.path.join(base_dir, "audio")
    os.makedirs(audio_dir, exist_ok=True)

    print(f"Generating expressive neural voiceover using edge-tts ({VOICE})...")

    for filename, text in SCRIPT_LINES:
        out_path = os.path.join(audio_dir, f"{filename}.mp3")
        communicate = edge_tts.Communicate(text, VOICE, rate="+0%", pitch="+0Hz")
        await communicate.save(out_path)
        print(f"  [+] Created: {out_path}")

    print(f"\nAll expressive neural voiceover files saved to: {audio_dir}")

if __name__ == "__main__":
    asyncio.run(generate())
