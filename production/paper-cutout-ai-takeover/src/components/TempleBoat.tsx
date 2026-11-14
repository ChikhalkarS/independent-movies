import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const TempleBoat = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Temple boat with snake prow - traditional paper cut-out boat shape
  const prow = (
    <polygon
      points={['0,0', '30,-20', '60,0']}
      fill='#5a3b27'
      transform='translate(30 0)'
    />
  );

  const hull = (
    <path
      d="M0,0 C20,40 40,40 60,0 C40,-40 20,-40 0,0"
      fill="#efe3c9"
      transform='translate(30 30)'
    />
  );

  // Oars
  const oars = (
    <g stroke="#5a3b27" strokeWidth={2} fill="none">
      <line x1={10} y1={20} x1={10} y2={50} />
      <line x1={30} y1={20} x1={30} y2={50} />
      <line x1={50} y1={20} x1={50} y2={50} />
    </g>
  );

  return (
    <g filter="url(#sh)">
      {prow}
      {hull}
      {oars}
    </g>
  );
};