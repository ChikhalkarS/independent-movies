REEL BRIEF:

Concept: "Untold Epic" — The Brahmastra from the Mahabharata revealed as an ancient weapon of mass destruction paralleling modern atomic theory. Hook: "Oppenheimer didn't invent the deadliest weapon... he read about it."

Objectives:
- Primary goal: Educate and awe Indian diaspora + global mythology/science crossover audience with the Brahmastra's scientific parallels
- Target audience: Indian mythology enthusiasts (18-45), history/science crossover viewers, RPG/fantasy aesthetic fans
- Key message/theme: Ancient texts contain sophisticated WMD concepts; the Mahabharata describes environmental devastation and genetic damage matching nuclear fallout

Constraints:
- Maximum duration: 60 seconds (vertical Short)
- Technical: 1080×1920 @ 30fps, h.264 + AAC audio
- Content: No religious offense; frame as historical/scientific analysis; avoid sectarian interpretation
- Visual: Cinematic dark fantasy (not cartoon/anime), high-end game trailer quality
- Audio: Deep male VO, Sanskrit chanting bed, heavy bass drops, sharp transition SFX

Success Criteria:
- Viewer retention >60% at 30s mark
- Shareability: "Did you know?" factor triggers saves/shares
- Comment engagement: Mythology vs. science debate
- Loop potential: Final frame returns to weapon hover (matches opening)

Production Timeline:

Phase 1 (Day 1): Concept & Planning
- [x] Concept locked from ai_studio_test_prompts_niche_strategy.md TEST 2
- [ ] Director prompt written
- [ ] Character/entity profiles defined (Brahmastra, shield, battlefield elements)
- [ ] Context/world built (Kurukshetra, twilight, shield dome)
- [ ] Style guidelines locked (dark fantasy RPG trailer)

Phase 2 (Day 2): Pipeline Selection & Asset Prep
- [ ] Choose render pipeline: huashu-art-motion (spec.json) for parameterized dark fantasy, OR bang-motion for kinetic opener, OR custom Three.js/Remotion
- [ ] huashu preferred: parameterized spec.json is token-cheapest for "Untold Epic" series
- [ ] Prepare assets: Sanskrit glyph textures, particle shaders, environment HDRI

Phase 3 (Day 3): Video Generation
- [ ] Generate spec.json / HTML / Remotion entry
- [ ] Render frames → MP4
- [ ] QA: vertical, loops seamlessly, visual shift every 2-3s, no fade transitions, static grain

Phase 4 (Day 4): Audio & Final Mix
- [ ] caption-skill: script.txt → VO (deep male, en-US-DavisNeural or similar) + word-timed captions
- [ ] Sanskrit chanting bed layer
- [ ] Bass drops + transition SFX
- [ ] Mux with ffmpeg (-shortest)

Phase 5 (Day 5): Review & Delivery
- [ ] Final QA playback
- [ ] Log to daily-reel-tracker.md
- [ ] Update PRODUCTION_DECISION_LOG.md if new style decisions

Resource Allocation:
- AI video tool: huashu-art-motion (primary) / bang-motion (fallback)
- Audio: caption-skill (offline edge-tts + faster-whisper)
- Render: Playwright + Chromium (huashu) or Node + ffmpeg
- Time estimate: ~4-6 hours total across phases

Checkpoints:
- Concept approval: COMPLETE (from test prompt)
- Prompt refinement: Director prompt drafted
- First draft review: After Phase 3 render
- Final delivery: After Phase 4 mux