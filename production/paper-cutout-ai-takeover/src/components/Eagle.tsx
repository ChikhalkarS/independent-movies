import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const Eagle = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Eagle with flapping feather wings
  const body = (
    <path
      d="M0,0 C20,30 40,30 60,0 C40,-30 20,-30 0,0"
      fill='#2c5a71'
    />
  );

  // Wings - animated based on stop-motion pose
  const wingPosition = stop % 20 < 10 ? -15 : 15;

  const leftWing = (
    <polygon
      points={['0,0', '-20', wingPosition, '20']}
      fill='#5a3b27'
      transform='translate(20 0) rotate(-20)' />
  );
  const rightWing = (
    <polygon
      points={['0,0', '20', -wingPosition, '-20']}
      fill='#5a3b27'
      transform='translate(20 0) rotate(20)' />
  );

  // Head and beak
  const head = (
    <circle cx={30} cy={0} r={10} fill='#2c5a71' />
  );
  const beak = (
    <polygon
      points={['30,0', '50,5', '30,10']}
      fill='#e9b949'
    />
  );

  // Eye
  const eye = (
    <circle cx={35} cy={0} r={3} fill='#1f5a63' />
  );

  return (
    <g filter="url(#sh)">
      {body}
      {leftWing}
      {rightWing}
      {head}
      {beak}
      {eye}
    </g>
  );
};