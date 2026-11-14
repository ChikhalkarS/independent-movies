# Claude Code Animation Skills Guide

This guide documents the available animation skills for Claude Code and provides instructions on how to discover and use them effectively.

## Available Animation Skills

The `claude-animation-skills` plugin provides **six animation skills** for creating various types of animations:

### Quick Skills (generate MP4 videos from JSON specs, ~10-90 seconds):

1. **`/graph`** — Minimal line graph with counting number
2. **`/minimalistic-graphics`** — Black-and-white line art animation
3. **`/map-route`** — 3D map route with ETA and destination card
4. **`/breakdown`** — 3D exploded view with labels

### Engine Skills (require full production workflows):

5. **`/stick-figure`** — Stick-figure explainer with captions and sound
6. **`/zach-d-films`** — 3D cartoon explainer with props and effects

## How to Discover All Available Skills

Claude can find all available skills using the **Skill tool**. Here's how:

### List All Skills

``` /skill-list ```

Or simply ask: "What animation skills are available?"

### Search for Specific Skills

To find skills related to a particular topic, use:
- `/skill search:animation`
- `/skill search:graph`
- `/skill search:graphics`

### Check Plugin Installation

To verify the animation skills plugin is installed:
```
/plugin list
```
Or check: "Is the animation-skills plugin installed?"

## When to Use Each Skill

### Use `/graph` when:
- You need a simple line chart or graph
- You want to show numerical data trends
- Creating educational content about data visualization

### Use `/minimalistic-graphics` when:
- You need black-and-white line art
- Creating subtle, professional animations
- Minimalist visual style is preferred

### Use `/map-route` when:
- Showing travel routes or journeys
- Creating location-based animations
- Adding ETA and destination information

### Use `/breakdown` when:
- 3D exploded views are needed
- Labeling components or parts
- Technical or mechanical demonstrations

### Use `/stick-figure` when:
- Stick-figure explanations are suitable
- Adding captions and sound is desired
- Full production workflow is available

### Use `/zach-d-films` when:
- 3D cartoon explainers are needed
- Props and special effects are desired
- Full production workflow including script writing and voiceover is available

## How to Use Skills Appropriately

### 1. **Identify the Right Skill**

Match your animation needs to the skill type:
- Quick demo/video → `/graph`, `/minimalistic-graphics`, `/map-route`, `/breakdown`
- Full production → `/stick-figure`, `/zach-d-films`

### 2. **Check Plugin Availability**

Before using a skill, verify the plugin is installed:
```
Is the animation-skills plugin installed?
```

If not installed, add it:
```
/plugin marketplace add artemnovitckii/claude-animation-skills
/plugin install animation-skills@claude-animation-skills
```

### 3. **Provide Proper Input**

Each skill requires specific JSON input. Example for `/graph`:

```json
{
  "type": "line",
  "data": {
    "labels": ["Jan", "Feb", "Mar", "Apr"],
    "datasets": [{
      "label": "Sales",
      "data": [65, 59, 80, 81],
      "fill": false,
      "borderColor": "blue"
    }]
  },
  "options": {
    "title": {
      "display": true,
      "text": "Monthly Sales"
    }
  }
}
```

### 4. **Execute the Skill**

Simply invoke the skill with your parameters:
```
/graph {"type": "line", ...}
```

Or ask Claude: "Create a line graph showing [your data]"

### 5. **Verify the Output**

Check that the generated animation meets your needs. Quick skills will produce MP4 videos and contact sheets.

## Finding Skills During Actions

When performing any action, Claude should:

1. **First check**: "Do I have a skill for this task?"
2. **Search**: Use `/skill search:` if unsure
3. **Ask**: "What skill should I use for [task]?"
4. **Apply**: Use the appropriate skill for the action

### Example Workflow:

**User**: "Create an animation showing a route from New York to Boston"

**Claude**:
1. Search for relevant skill: `/skill search:map-route`
2. Identify `/map-route` is appropriate
3. Execute: `/map-route {"origin": "New York", "destination": "Boston", ...}`
4. Provide the generated animation

## Installation

To install the animation skills plugin:

```
/plugin marketplace add artemnovitckii/claude-animation-skills
/plugin install animation-skills@claude-animation-skills
```

Then restart Claude Code or run:
```
/plugin reload
```

## Quick Reference

| Skill | Type | Output | Best For |
|-------|------|--------|----------|
| `/graph` | Quick | MP4 + contact sheet | Simple data visualization |
| `/minimalistic-graphics` | Quick | MP4 + contact sheet | Line art animations |
| `/map-route` | Quick | MP4 + contact sheet | Route/mapping animations |
| `/breakdown` | Quick | MP4 + contact sheet | 3D exploded views |
| `/stick-figure` | Engine | Full video | Stick-figure explainers |
| `/zach-d-films` | Engine | Full video | 3D cartoon explainers |

---

*Generated from the `claude-animation-skills` repository by artemnovitckii*