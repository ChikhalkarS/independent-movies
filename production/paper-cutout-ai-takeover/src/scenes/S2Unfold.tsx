import { Town, Sky, Sun, Cloud, Bird, Robot } from '../components';
import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';
import { Captions } from '../components/Captions';
import { script, type ScriptScene } from '../data/script';

export const S2Unfold = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const scene: ScriptScene = script[1];

  return (
    <svg width={1920} height={1080}>
      <Sky clouds={true} />
      <Sun />
      <Town />
      {/* Gift box opens */}
      <g transform="translate(100 600)">
        <rect x={0} y={0} width={60} height={80} fill="#efe3c9" filter="url(#sh)" />
        <rect x={0} y={80} width={60} height={60} fill="#e9b949" filter="url(#sh)" />
      </g>
      {/* Paper robot unfolds and waves */}
      <Robot />
      <Captions text={scene.caption} startFrame={scene.startFrame} endFrame={scene.startFrame + scene.duration} />
    </svg>
  );
};