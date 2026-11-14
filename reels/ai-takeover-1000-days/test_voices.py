#!/usr/bin/env python3
"""
Generate a single combined test audio file comparing multiple edge-tts voices
on the same sentence, so you can listen to all at once and pick the best.
"""
import asyncio
import os
import edge_tts
import subprocess

TEST_SENTENCE = "Day 1000. But here is the twist. AI doesn't take over. We hand it over."

CANDIDATE_VOICES = [
    "en-US-AriaNeural",
    "en-US-AvaNeural",
    "en-US-AndrewNeural",
    "en-US-BrianNeural",
    "en-US-ChristopherNeural",
    "en-US-EmmaNeural",
    "en-GB-RyanNeural",
    "en-GB-ThomasNeural",
    "en-AU-NatashaNeural",
    "en-IE-EmilyNeural",
]

async def generate():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    test_dir = os.path.join(base_dir, "voice_test")
    os.makedirs(test_dir, exist_ok=True)

    print("Generating test clips for candidate voices...")
    clips = []
    for voice in CANDIDATE_VOICES:
        out_path = os.path.join(test_dir, f"{voice}.mp3")
        communicate = edge_tts.Communicate(TEST_SENTENCE, voice, rate="+0%", pitch="+0Hz")
        await communicate.save(out_path)
        clips.append((voice, out_path))
        print(f"  [+] {voice}")

    # Combine all clips into one audio file with silence between them
    print("\nCombining into single audio file...")
    # Create a silent MP3 for gaps
    silence_path = os.path.join(test_dir, "silence.mp3")
    subprocess.run([
        "ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
        "-t", "2", "-b:a", "64k", silence_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    concat_list = os.path.join(test_dir, "concat_list.txt")
    with open(concat_list, "w") as f:
        for voice, path in clips:
            f.write(f"file '{path}'\n")
            f.write(f"file '{silence_path}'\n")

    combined_path = os.path.join(test_dir, "ALL_VOCES.mp3")
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
        "-c", "libmp3lame", "-b:a", "128k", combined_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print(f"\nCombined test audio saved to: {combined_path}")
    print(f"\nIndividual clips in: {test_dir}")
    print(f"\nVoice order in combined file:")
    for i, (voice, _) in enumerate(clips, 1):
        print(f"  {i}. {voice}")

if __name__ == "__main__":
    asyncio.run(generate())