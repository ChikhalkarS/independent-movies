import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const Scissors = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Scissors - simple shape
  return (
    <g>
      <polygon
        points={['30,5', '30,25', '55,15']}
        fill='#5a3b27'
        transform='translate(80 80)'
      />
      <line x1={30} y1={15} x2={55} y2={15} stroke='#5a3b27' strokeWidth={2} />
      <circle cx={30} cy={15} r={3} fill='#5a3b27' />
    </g>
  );
};