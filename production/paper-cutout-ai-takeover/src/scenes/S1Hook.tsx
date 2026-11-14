import { Town, Sky, Sun, Cloud, Bird } from '../components';
import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';
import { Captions } from '../components/Captions';
import { script, type ScriptScene } from '../data/script';

export const S1Hook = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const scene: ScriptScene = script[0];

  return (
    <svg width={1920} height={1080}>
      <Sky clouds={true} />
      <Sun />
      <Cloud x={200} y={100} />
      <Cloud x={800} y={80} />
      <Bird x={100} y={200} />
      <Bird x={800} y={150} />
      <Town />
      {/* Paper phone lights up */}
      <g>
        <rect x={1800} y={800} width={60} height={30} fill="#efe3c9" filter="url(#sh)" />
        <line x1={1800} y1={815} x2={1800} y2={835} stroke="#d4553d" strokeWidth={2} />
      </g>
      <Captions text={scene.caption} startFrame={scene.startFrame} endFrame={scene.startFrame + scene.duration} />
    </svg>
  );
};