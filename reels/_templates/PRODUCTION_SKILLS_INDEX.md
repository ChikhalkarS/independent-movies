# Production Studio Skills Index

## Overview
This repository contains a complete set of production studio skills for creating short video reels (2 per day). Each skill is a template that guides the AI agent in generating specific outputs for video generation workflows.

## Available Production Studio Skills

### 1. Director Skill
**File**: `reels/director/template.md`
**Purpose**: Generates video generation prompts for text-to-video AI tools

**What it creates**:
- Video generation prompt in standardized format
- Shot type, subject, action, camera movement
- Lighting, style, setting, mood specifications
- Technical specs (resolution, fps, aspect ratio)
- Negative prompts (what to avoid)

**Usage**: Provide a "nice" idea → Director generates video prompt

**Example output format**:
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
```

---

### 2. Producer Skill
**File**: `reels/producer/template.md`
**Purpose**: Organizes the reel creation process and manages the production workflow

**What it creates**:
- Reel brief with concept and objectives
- Production timeline and checkpoints
- Resource allocation and constraints
- Success criteria and metrics

**Usage**: Provide concept → Producer creates brief and workflow

**Key outputs**:
- Reel brief document
- Production timeline
- Resource allocation table
- Checkpoints and approval points

---

### 3. Character/Entity Skill
**File**: `reels/character/template.md`
**Purpose**: Defines characters, subjects, or entities consistent across video generations

**What it creates**:
- Character profiles with visual appearance
- Movement style and mannerisms
- Consistency notes for AI generation
- Entity specifications (type, properties, behavior)

**Usage**: Define characters → Character skill profiles them for consistency

**Key outputs**:
- Physical traits and appearance
- Clothing/style description
- Movement and body language
- Consistency checklist

---

### 4. Context/World Skill
**File**: `reels/context/template.md`
**Purpose**: Sets the story world, setting, and environmental context

**What it creates**:
- World building (setting, time period, atmosphere)
- Scene context (location, purpose, story moment)
- Environmental details and sensory notes
- Lighting scheme and mood

**Usage**: Set the scene → Context skill defines world

**Key outputs**:
- Primary setting and location
- Time of day and weather
- Color palette and lighting
- Sensory details (sounds, smells, texture)

---

### 5. Style Skill
**File**: `reels/style/template.md`
**Purpose**: Defines the visual aesthetic and technical parameters

**What it creates**:
- Visual style (aesthetic classification)
- Color palette (primary, secondary, mood colors)
- Lighting style and color temperature
- Camera work and movement specifications
- Platform optimization (TikTok, Reels, YouTube Shorts)
- Post-processing guidelines

**Usage**: Set visual style → Style skill creates guidelines

**Key outputs**:
- 3-5 primary colors
- Lighting scheme description
- Camera movement types
- Platform-specific notes

---

### 6. Integration Skill
**File**: `reels/integration/template.md`
**Purpose**: Combines all other skills into a complete reel generation workflow

**What it creates**:
- Complete folder structure for a reel
- All five role templates populated with consistent data
- Example workflow from idea to video generation
- Quick start guide

**Usage**: Provide "nice" idea → Integration creates complete package

**Key outputs**:
- Full reel folder structure
- Populated director prompt
- Producer brief
- Character profiles
- Context world-building
- Style guidelines
- Example: "Lonely robot finding a flower in desert"

---

## How Skills Work Together

### Workflow Sequence

```
USER PROVIDES "NICE" IDEA
        |
        v
  [DIRECTOR] generates video prompt
  [PRODUCER] creates production brief
  [CHARACTER] defines entity profiles
  [CONTEXT] sets story world
  [STYLE] defines visual aesthetic
        |
        v
  [INTEGRATION] combines all into reel folder
        |
        v
  VIDEO AI TOOL uses director prompt
  RESULTS tracked in daily-reel-tracker.md
```

### Example: Complete Workflow

**User input**: "A vintage car driving along a coastal road at sunset, nostalgic feeling"

**Director output**: Video prompt with shot type, camera movement, lighting (golden hour), style (cinematic), duration (8s)

**Producer output**: Brief with objectives (evoke nostalgia), constraints (5-10s, vertical 9:16), success criteria (viewer feels nostalgic)

**Character output**: If needed - e.g., "Classic 1960s sedan as character" with visual specs

**Context output**: Coastal road at sunset, golden hour lighting, ocean view, warm atmosphere

**Style output**: Cinematic aesthetic, warm color palette (oranges, deep blues), camera movements (slow dolly), platform: TikTok/Reels 9:16

**Integration**: Creates folder structure with all above populated, generates combined guide

---

## Skills Quick Reference

| Skill | File | Primary Output | Best For |
|-------|------|----------------|----------|
| **Director** | `reels/director/template.md` | Video generation prompt | Creating the actual video AI prompt |
| **Producer** | `reels/producer/template.md` | Production brief & timeline | Organization and workflow management |
| **Character** | `reels/character/template.md` | Character profiles | Consistent character appearance/movement |
| **Context** | `reels/context/template.md` | World/setting documentation | Story world and atmosphere |
| **Style** | `reels/style/template.md` | Visual style guide | Visual aesthetics and platform opts |
| **Integration** | `reels/integration/template.md` | Complete reel package | Full workflow from idea to prompt |

---

## How to Use a Skill

1. **Identify which skill you need** based on what you're trying to accomplish
2. **Refer to the template file** for that skill's structure
3. **Provide your "nice" idea** or specific input
4. **The agent uses the template** to generate the appropriate output
5. **Review and refine** as needed
6. **Track results** in daily-reel-tracker.md

---

## Adding New Skills

To add a new production studio skill:

1. Create a new directory under `reels/`
2. Add a `template.md` file following the pattern of existing skills
3. Include these sections:
   - Role description
   - Input requirements
   - Generated output format
   - Best practices
   - Consistency checklist
4. Update `PRODUCTION_SKILLS_INDEX.md` to include the new skill
5. Test with a "nice" idea to verify workflow

---

## Production Studio Role Summary

**Creative Director** → Guided by Director skill (vision, shot composition, pacing)
**Creative Producer** → Guided by Producer skill (organization, timeline, resources)
**Character Designer** → Guided by Character skill (visual consistency, movement)
**Context Specialist** → Guided by Context skill (world-building, atmosphere)
**Style Director** → Guided by Style skill (visual aesthetic, platform optimization)

All skills work together through the Integration skill to create complete, consistent video reel projects from a single "nice" idea.

---
*Total skills: 6 production studio roles*
*Supported reels: 2 per day (as project goal)*
*Output format: Standardized video generation prompts*
*Tracking: daily-reel-tracker.md + README.md reviews*