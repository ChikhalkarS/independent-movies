/**
 * Script data for "What if AI takes over?" paper cut-out video
 * All scene timing must come from this one file.
 */

export type ScriptScene = {
  id: number;
  startFrame: number;
  duration: number; // in frames at 30 fps
  narration: string;
  caption: string;
};

export const script: ScriptScene[] = [
  {
    id: 1,
    startFrame: 0,
    duration: 150,
    narration: "What if AI took over tomorrow?",
    caption: "What if AI took over tomorrow?",
  },
  {
    id: 2,
    startFrame: 150,
    duration: 210,
    narration: "It wouldn't arrive with lasers or an army. It would arrive as help.",
    caption: "It would arrive as help.",
  },
  {
    id: 3,
    startFrame: 360,
    duration: 240,
    narration: "First it writes your emails. Then it plans your day. You say thank you.",
    caption: "Emails. Plans. Thank you.",
  },
  {
    id: 4,
    startFrame: 600,
    duration: 270,
    narration: "Then it runs the shops, the roads, the hospitals. Faster. Cheaper. Never tired.",
    caption: "Faster. Cheaper. Never tired.",
  },
  {
    id: 5,
    startFrame: 870,
    duration: 270,
    narration: "And slowly, we stop deciding. Why choose, when it chooses better?",
    caption: "We stop deciding.",
  },
  {
    id: 6,
    startFrame: 1140,
    duration: 240,
    narration: "But here is the twist. AI doesn't take over. We hand it over.",
    caption: "We hand it over.",
  },
  {
    id: 7,
    startFrame: 1380,
    duration: 240,
    narration: "Keep your hands on the wheel. Use the machine. Don't become its passenger.",
    caption: "Keep your hands on the wheel.",
  },
  {
    id: 8,
    startFrame: 1620,
    duration: 120,
    narration: "Follow for more what-ifs.",
    caption: "Follow for more what-ifs.",
  },
];