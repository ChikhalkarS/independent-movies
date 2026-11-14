import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const Cloud = ({ x = 0, y = 0, width = 200, height = 80, parallax = 1 }) => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Slow drifting cloud
  const drift = (frame * 0.02 * parallax);

  // Cloud as paper cutout - overlapping circles with shadow
  return (
    <g filter="url(#sh)" transform={`translate(${drift},0)`}>
      <circle cx={x + width / 3} cy={y + height / 3} r={width / 4} fill="#fbfbf8" />
      <circle cx={x + width / 2} cy={y + height / 3} r={width / 4} fill="#fbfbf8" />
      <circle cx={x + width - width / 3} cy={y + height / 3} r={width / 4} fill="#fbfbf8" />
      <circle cx={x + width / 2.5} cy={y + height / 6} r={width / 5} fill="#fbfbf8" />
      <circle cx={x + width / 1.8} cy={y + height / 6} r={width / 5} fill="#fbfbf8" />
    </g>
  );
};