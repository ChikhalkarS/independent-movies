# Claude Code Video Production: Skills & Tools Research

This document summarizes available skills, plugins, and free tools for the autonomous video production pipeline.

## 1. Existing Repo Inventory (Installed)

| Stage | Tool/Skill | Capabilities | Cost |
|---|---|---|---|
| **Animation** | `bang-motion` | HTML/GSAP/Three.js web-based motion | Free |
| **Animation** | `huashu-art-motion` | 36+ art styles, 9 explainer grammars | Free |
| **Animation** | `Remotion` | React-based video (paper-cut components) | Free |
| **Scripting** | `vox-explainer` | Auto-scripting from topic | Paid (Atlas) |
| **Voiceover** | `edge-tts` | Microsoft Neural voices (used in scripts) | Free |
| **Assembly** | `ffmpeg` | Script-based assembly recipes | Free |

## 2. Official Claude Plugins (Available via `/plugin`)

These plugins can be added to enhance the agent's autonomous behavior:

- **`code-simplifier`** (Agent): Refactor and clean up animation code.
- **`ralph-loop`** (Agent): Run autonomous loops ("render until it works").
- **`skill-creator`**: Generate new `SKILL.md` definitions for repetitive tasks.
- **`session-report`**: Track token usage and costs for the production run.
- **`feature-dev`**: Architecture agents for building new pipeline stages.

*Install command:* `/plugin marketplace add anthropics/claude-plugins-official`

## 3. Recommended Free Additions (Gap Analysis)

| Pipeline Stage | Tool/Skill | Why | Install/Link |
|---|---|---|---|
| **Transcription** | `whisper-skill` | Generate accurate captions from audio | [faster-whisper](https://github.com/SYSTRAN/faster-whisper) |
| **Voiceover** | `kokoro-skill` | High-quality local neural TTS (better than edge) | [Kokoro-ONNX](https://github.com/thebaer/kokoro-onnx) |
| **SFX Gen** | `audiogen-skill` | Generate foley/SFX via local AI models | [AudioGen](https://github.com/facebookresearch/audiocraft) |
| **Music Gen** | `stable-audio` | Generate local instrumental loops | [Stable Audio Open](https://huggingface.co/stabilityai/stable-audio-open-1.0) |
| **Image Gen** | `comfyui-mcp` | Generate scene backgrounds locally | [ComfyUI](https://github.com/comfyanonymous/ComfyUI) |

## 4. Claude's Native Capabilities (Built-in)

Claude Code (Sonnet 4.6) can handle these without extra plugins:
- **Script Writing**: High-level creative writing and pacing.
- **Code Generation**: Writing GSAP, Remotion, and CSS animations.
- **FFMPEG Logic**: Writing complex filter-graph commands for assembly.
- **SVG Design**: Creating vector assets for `bang-motion`.
- **Task Orchestration**: Using `TaskCreate`/`TaskUpdate` to manage the pipeline.

## 5. Next Steps for this Repository

1. **Standardize `edge-tts`**: Create a formal `tts-skill` that wraps the existing python script.
2. **Implement `whisper-skill`**: Add a local ASR skill for caption timing.
3. **Connect `ComfyUI`**: If local GPU allows, add an MCP server for background generation.

---
**Sources:**
- [Official Plugins Repo](https://github.com/anthropics/claude-plugins-official)
- [Remotion Docs](https://www.remotion.dev/)
- [faster-whisper](https://github.com/SYSTRAN/faster-whisper)
- [Kokoro TTS](https://huggingface.co/hexgrad/Kokoro-82M)
