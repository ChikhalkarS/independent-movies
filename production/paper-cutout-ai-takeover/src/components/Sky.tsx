import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const Sky = ({ clouds = true }) => {
  const frame = useCurrentFrame();
  const stopMotion = useStopMotion(12);

  // Sky background - solid paper color with shadow
  return (
    <rect
      width={1920}
      height={1080}
      fill="#bcdbe6"
      filter="url(#sh)"
    />
  );
};