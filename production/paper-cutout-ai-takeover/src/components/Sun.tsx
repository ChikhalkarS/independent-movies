import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const Sun = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Sun - simple yellow circle with slightly irregular edge concept
  return (
    <circle
      cx={100}
      cy={100}
      r={50}
      fill="#fbfbf8"
      opacity={0.9}
    />
  );
};