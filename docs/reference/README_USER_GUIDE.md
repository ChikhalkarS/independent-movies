# independent-movies: Short Reel Creation System

## Overview
A structured system for creating 2 short video reels per day with consistent quality, tracked decisions, and video generation prompts.

## Project Structure
```
independent-movies/
├── README.md                    ← Project overview and weekly/monthly review
├── daily-reel-tracker.md        ← Daily tracking for 2 reels
├── reels/                       ← Generated reel folders
│   ├── director/              ← Director prompt templates
│   ├── producer/              ← Producer brief and workflow
│   ├── character/             ← Character/entity definitions
│   ├── context/               ← Story world and setting
│   └── style/                 ← Visual style and platform specs
├── README_USER_GUIDE.md         ← This guide
└── .git/                      ← Version control
```

## Daily Workflow

### 1. Morning: Provide Your "Nice" Idea
Share your reel concept. Be as descriptive or abstract as you like.
> Examples:
> - "A cyberpunk cat delivering packages at night"
> - "Two old friends meeting on a train platform"
> - "Abstract colors and shapes moving to music"

### 2. System Processes Idea
The agent will:
- Create a new reel folder under `reels/`
- Populate all template files (director, producer, character, context, style)
- Generate optimized video generation prompts
- Update the daily-reel-tracker.md

### 3. Review Generated Content
Check the created files:
- **director/prompt.md** - The prompt for video AI tools
- **producer/brief.md** - Production guidance
- **character/profiles.md** - Character consistency
- **context/world.md** - Setting and atmosphere
- **style/guidelines.md** - Visual style and platform opts

### 4. Generate Video
Use the director's prompt with your preferred video AI tool:
- Runway Gen-2
- Pika Art
- Sora (if available)
- Other text-to-video tools

### 5. Iterate and Refine
Based on video results:
- Refine prompts in director/prompt.md
- Adjust character descriptions in character/profiles.md
- Modify style settings in style/guidelines.md
- Re-generate until satisfied

### 6. Track and Review
- Update daily-reel-tracker.md with status
- Add notes to README.md weekly/monthly reviews
- Track patterns and improvements

## Role Templates

### Director (Creative Vision)
Creates the video generation prompt with specific details about:
- Shot type and composition
- Subject and action
- Camera movement
- Lighting and mood
- Visual style
- Technical specifications

### Producer (Organization)
Organizes the project with:
- Concept brief and objectives
- Timeline and checkpoints
- Resource allocation
- Success criteria

### Character (Entity Definition)
Defines consistent characters/entities:
- Visual appearance
- Movement style
- Personality traits
- Consistency notes for AI

### Context (World Building)
Sets the story world:
- Location and time period
- Atmosphere and mood
- Environmental details
- Lighting scheme

### Style (Visual Aesthetic)
Specifies visual parameters:
- Color palette
- Lighting style
- Camera work
- Platform optimization
- Post-processing

## Prompt Format for Video AI Tools

The director generates prompts in this standard format:

```
VIDEO PROMPT:

[SHOT TYPE] {description}
[SUBJECT] {description}
[ACTION] {description}
[CAMERA] {camera_movement}
[LIGHTING] {description}
[STYLE] {visual_style}
[SETTING] {environment}
[Mood/Emotion] {tone}
[DURATION] {seconds}s

NEGATIVE PROMPT: {what_to_avoid}

TECHNICAL SPECS:
- Resolution: 1080p or 4K
- Frame rate: 24fps or 30fps
- Aspect ratio: 9:16 (vertical) or 16:9 (horizontal)
- Motion intensity: {low/medium/high}
```

## Tips for Best Results

1. **Be specific but allow creativity** - Describe what you want but leave room for the AI's interpretation
2. **Use consistent terminology** - Stick with the template terms for better consistency across reels
3. **Iterate often** - Rarely is the first prompt perfect; plan for 2-3 refinement iterations
4. **Document what works** - Note successful prompt elements in the tracker for future reels
5. **Platform matters** - Always specify the target platform in style guidelines
6. **Negative prompts help** - Always include what you DON'T want to see

## Output Expectations

- **Per session**: 2 reels per day (as your goal states)
- **Quality**: Improves with each iteration and documented learning
- **Tracking**: All decisions and context saved in readme and tracker files
- **Reproducibility**: Consistent structure means you can rebuild successful reels

## Getting Started Today

1. Run: `claude` or use the VSCode extension
2. Provide your "nice" idea for reel 1
3. Wait for the agent to create the folder structure and templates
4. Review and refine the generated content
5. Generate video with your preferred tool
6. Repeat for reel 2
7. End of day: Review both reels in daily-reel-tracker.md

---
*Built for: Creating 2 short video reels per day with tracked decisions and context*
*Roles: Creative Director, Creative Producer, Character Designer, Context Specialist, Style Director*