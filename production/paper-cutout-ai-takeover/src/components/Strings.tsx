import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const Strings = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Thin dark paper strips connecting robot to people
  // Strings that run from robot's raised hands to people's heads/arms
  const stringYPositions = [60, 80, 100, 120, 140];

  return (
    <g stroke="#5a3b27" strokeWidth={1} opacity={0.8}>
      {stringYPositions.map((y) => (
        <line
          key={y}
          x1={80}
          y1={y}
          x2={150}
          y2={y + 20}
        />
      ))}
    </g>
  );
};