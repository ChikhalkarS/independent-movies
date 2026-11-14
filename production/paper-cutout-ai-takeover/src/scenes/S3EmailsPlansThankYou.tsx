import { Sky, Sun, Desk, PaperPerson } from '../components';
import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';
import { Captions } from '../components/Captions';
import { script, type ScriptScene } from '../data/script';

export const S3EmailsPlansThankYou = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const scene: ScriptScene = script[2];

  return (
    <svg width={1920} height={1080}>
      <Sky clouds={true} />
      <Sun />
      {/* Desk scene */}
      <Desk />
      {/* Paper person at desk */}
      <g transform="translate(100 700)">
        <PaperPerson />
      </g>
      {/* Calendar pages flying into order */}
      <g>
        <line x1={100} y1={85} x2={70} y2={80} stroke="#d4553d" strokeWidth={2} />
        <line x1={135} y1={85} x2={95} y2={80} stroke="#3c8a8a" strokeWidth={2} />
      </g>
      <Captions text={scene.caption} startFrame={scene.startFrame} endFrame={scene.startFrame + scene.duration} />
    </svg>
  );
};