import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

export const Desk = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Desk with calendar pages and paper clips
  const desk = (
    <rect x={0} y={80} width={1920} height={100} fill="#efe3c9" filter="url(#sh)" />
  );

  // Calendar pages
  const calendarPages = (
    <g>
      <rect x={20} y={85} width={30} height={30} fill="#d4553d" />
      <rect x={55} y={85} width={30} height={30} fill="#3c8a8a" />
      <rect x={90} y={85} width={30} height={30} fill="#1f5a63" />
      <rect x={125} y={85} width={30} height={30} fill="#efe3c9" />
    </g>
  );

  // Paper clips
  const paperClips = (
    <g stroke="#5a3b27" strokeWidth={1} fill="none">
      <line x1={100} y1={100} x2={110} y2={95} />
      <line x1={130} y1={100} x2={140} y2={95} />
    </g>
  );

  return (
    <g>
      {desk}
      {calendarPages}
      {paperClips}
    </g>
  );
};