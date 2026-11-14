# Reel Generation System

## How This Works

### 1. User provides "nice" idea
User gives a concept or theme for a short video reel (e.g., "a lonely robot finding a flower in a desert").

### 2. System creates reel folder structure
```
reels/{reel_id}/
├── director/prompt.md    ← Video generation prompt
├── producer/brief.md     ← Production brief and timeline
├── character/profiles.md ← Character/entity definitions
├── context/world.md      ← Story world and setting
└── style/guidelines.md   ← Visual style and platform specs
```

### 3. Each role generates their output
- **Director**: Creates the video generation prompt
- **Producer**: Creates the production brief and timeline
- **Character**: Defines characters and entities
- **Context**: Sets the story world and setting
- **Style**: Defines visual aesthetics and platform optimization

### 4. Another agent uses the prompts
The generated prompts can be fed into video AI tools (Runway, Pika, etc.) to create the actual video.

## Quick Start Workflow

### Step 1: Provide Your "Nice" Idea
Share your concept for the reel. Example:
> "A vintage car driving along a coastal road at sunset, nostalgic feeling"

### Step 2: System Processes and Creates Structure
The agent will create the folder structure and template files filled with your idea.

### Step 3: Review and Refine
Each template guides you to provide the specific details needed for quality video generation:
- Director: Shot type, action, camera movement, lighting
- Producer: Objectives, constraints, success criteria
- Character: Who's in the video, their appearance, movement
- Context: Where/when it is, atmosphere, lighting
- Style: Visual aesthetic, color palette, camera work

### Step 4: Generate Video
Use the director's prompt with your preferred video AI tool.

### Step 5: Iterate
Based on results, refine the prompts and re-generate.

## Example: "Lonely Robot Finding a Flower in Desert"

### Director Prompt
```
VIDEO PROMPT:

[SHOT TYPE] Wide establishing shot of vast desert landscape
[SUBJECT] Small vintage robot figure, weathered and rusty
[ACTION] Slowly moving toward a blooming yellow flower, delicate motion
[CAMERA] Slow dolly left to right, revealing the scene
[LIGHTING] Golden hour sunlight, long shadows, warm color temperature
[STYLE] Cinematic, realistic, slightly vignetted
[SETTING] Endless desert dunes, horizon visible
[Mood/Emotion] Melancholic, hopeful, wondrous
[DURATION] 8s

NEGATIVE PROMPT: People, animals, modern technology, bright colors, fast motion

TECHNICAL SPECS:
- Resolution: 1080p
- Frame rate: 24fps
- Aspect ratio: 9:16 vertical
- Motion intensity: medium
```

### Producer Brief
- **Concept**: Lonely robot finding a flower in desert
- **Objectives**: Evoke emotion of hope in desolation
- **Constraints**: 5-10 seconds, vertical 9:16
- **Success**: Viewer feels moved, shares to social media

### Character Profile
- **Name**: Rusty
- **Role**: Lonely robot protagonist
- **Visual**: Weathered metal, rust orange/brown, single glowing eye, compact size
- **Movement**: Jerky but gentle, hydraulic sounds, curious posture

### Context
- **Setting**: Desert landscape at golden hour
- **Time**: Sunset, last light of day
- **Weather**: Clear, warm, gentle breeze
- **Atmosphere**: Melanchcholic with quiet hope

### Style Guide
- **Aesthetic**: Cinematic realism
- **Color palette**: Warm oranges, deep blues, golden hour lights
- **Camera**: Slow, deliberate movements
- **Platform**: TikTok/Reels vertical 9:16
- **Color grading**: Warm tint, slight film grain