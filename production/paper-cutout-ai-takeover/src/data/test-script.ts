/**
 * 10-second vertical test script for "What if AI takes over"
 * Vertical format: 1080x1920, 30fps, 300 frames
 */

export type ScriptScene = {
  id: number;
  startFrame: number;
  duration: number; // in frames at 30 fps
  narration: string;
  caption: string;
};

// 10 seconds = 300 frames at 30fps
// DAY 1 (0-100 frames = 3.33s)
// DAY 10 (100-200 frames = 3.33s)
// DAY 50 (200-300 frames = 3.33s)

export const testScript: ScriptScene[] = [
  {
    id: 1,
    startFrame: 0,
    duration: 100,
    narration: "Day 1. A gift arrives at your door.",
    caption: "DAY 1",
  },
  {
    id: 2,
    startFrame: 100,
    duration: 100,
    narration: "Day 10. It writes your emails. You say thank you.",
    caption: "DAY 10",
  },
  {
    id: 3,
    startFrame: 200,
    duration: 100,
    narration: "Day 50. It plans your day. You stop planning.",
    caption: "DAY 50",
  },
];