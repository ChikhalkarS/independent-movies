import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const Bird = ({ x = 0, y = 0 }) => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Bird shape - simple angular bird
  return (
    <g>
      <polygon
        points={[
          `${x},${y}`,
          `${x + 30},${y - 20}`,
          `${x + 50},${y}`,
          `${x + 30},${y + 20}`,
        ]}
        fill="#5a3b27"
      />
    </g>
  );
};