# Director Template

## Role
The Director defines the creative vision, shot composition, and pacing for video reel generation.

## Input Requirements
- **Nice idea/concept** from user
- **Style preferences** (if any)
- **Duration** (typically 5-10 seconds for reels)

## Generated Output
### 1. Reel Folder Structure
```
reels/{reel_id}/
├── director/
│   └── prompt.md
├── producer/
│   └── brief.md
├── character/
│   └── profiles.md
├── context/
│   └── world.md
└── style/
    └── guidelines.md
```

### 2. Director Prompt for Video Generation
```
VIDEO PROMPT:

[SHOT TYPE] {shot_description}
[SUBJECT] {main_subject_description}
[ACTION] {action_description}
[CAMERA] {camera_movement}
[LIGHTING] {lighting_description}
[STYLE] {visual_style}
[SETTING] {environment/background}
[Mood/Emotion] {emotional_tone}
[DURATION] {seconds}s

NEGATIVE PROMPT: {what_to_avoid}

TECHNICAL SPECS:
- Resolution: 1080p or 4K
- Frame rate: 24fps or 30fps
- Aspect ratio: 9:16 (vertical) or 16:9 (horizontal)
- Motion intensity: {low/medium/high}
```

## Director Prompt Best Practices
- Be specific about camera movements (pan, tilt, zoom, dolly)
- Describe lighting quality (soft, hard, natural, dramatic)
- Define the visual style clearly (cinematic, comic book, painterly, etc.)
- Include emotional tone/subtext
- Keep actions physically plausible for believable motion