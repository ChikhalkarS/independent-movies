#!/usr/bin/env python3
"""
Generate 3-line voice samples for each candidate edge-tts voice.
Each voice speaks the same 3 lines, saved as voices/{actor_name}.mp3
(one file per voice with all 3 lines) so you can compare actors directly.
"""
import asyncio
import os
import edge_tts
import subprocess

ACTOR_VOICES = {
    "Aria_US_Female": "en-US-AriaNeural",
    "Ava_US_Female": "en-US-AvaNeural",
    "Andrew_US_Male": "en-US-AndrewNeural",
    "Brian_US_Male": "en-US-BrianNeural",
    "Christopher_US_Male": "en-US-ChristopherNeural",
    "Emma_US_Female": "en-US-EmmaNeural",
    "Ryan_GB_Male": "en-GB-RyanNeural",
    "Thomas_GB_Male": "en-GB-ThomasNeural",
    "Natasha_AU_Female": "en-AU-NatashaNeural",
    "Emily_IE_Female": "en-IE-EmilyNeural",
}

TEST_LINES = [
    "Day 1. A gift arrives at your door.",
    "Day 500. We stop deciding. Why choose, when it chooses better?",
    "Day 1000. But here is the twist. AI doesn't take over. We hand it over.",
]

async def generate():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    voices_dir = os.path.join(base_dir, "voices")
    os.makedirs(voices_dir, exist_ok=True)

    print("Generating 3-line samples per actor voice...")
    for actor, voice in ACTOR_VOICES.items():
        out_path = os.path.join(voices_dir, f"{actor}.mp3")

        # Generate each line, then concatenate into one file per actor
        clip_paths = []
        for i, line in enumerate(TEST_LINES):
            clip_path = os.path.join(voices_dir, f"_tmp_{actor}_{i}.mp3")
            communicate = edge_tts.Communicate(line, voice, rate="+0%", pitch="+0Hz")
            await communicate.save(clip_path)
            clip_paths.append(clip_path)

        # Concatenate with 1.2s silence between lines
        silence_path = os.path.join(voices_dir, "_tmp_silence.mp3")
        subprocess.run([
            "ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
            "-t", "1.2", "-b:a", "64k", silence_path
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        concat_list = os.path.join(voices_dir, f"_tmp_{actor}_list.txt")
        with open(concat_list, "w") as f:
            for i, clip in enumerate(clip_paths):
                f.write(f"file '{clip}'\n")
                if i < len(clip_paths) - 1:
                    f.write(f"file '{silence_path}'\n")

        subprocess.run([
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
            "-c", "libmp3lame", "-b:a", "128k", out_path
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # Cleanup temp files
        for clip in clip_paths:
            os.remove(clip)
        os.remove(concat_list)

        print(f"  [+] {actor}.mp3 ({voice})")

    os.remove(silence_path)
    print(f"\nAll actor samples saved to: {voices_dir}")

if __name__ == "__main__":
    asyncio.run(generate())