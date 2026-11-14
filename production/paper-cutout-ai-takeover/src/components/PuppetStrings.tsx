import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const PuppetStrings = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Puppet strings - thin dark paper strips from robot's hands to people's heads/arms
  return (
    <g stroke="#5a3b27" strokeWidth={1} opacity={0.8}>
      {/* Strings from robot to people's heads */}
      <line x1={50} y1={40} x2={80} y2={20} />
      <line x1={55} y1={70} x2={85} y2={30} />
      <line x1={60} y1={95} x2={90} y2={40} />
      <line x1={65} y1={120} x2={95} y2={50} />
    </g>
  );
};