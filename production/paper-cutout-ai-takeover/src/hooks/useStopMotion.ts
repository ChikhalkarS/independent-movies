import { useCurrentFrame, useVideoConfig } from 'remotion';

export const useStopMotion = (posesPerSecond = 12) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = Math.max(1, Math.round(fps / posesPerSecond));
  return Math.floor(f / step) * step;
};