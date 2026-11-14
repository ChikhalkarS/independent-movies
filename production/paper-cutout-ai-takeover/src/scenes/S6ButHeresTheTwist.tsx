import { Town, Sky, Sun, Scissors } from '../components';
import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';
import { Captions } from '../components/Captions';
import { script, type ScriptScene } from '../data/script';

export const S6ButHeresTheTwist = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const scene: ScriptScene = script[5];

  return (
    <svg width={1920} height={1080}>
      <Sky clouds={true} />
      <Sun />
      {/* One person looks up, takes scissors, snips a string. Strings drop one by one. */}
      <Town />
      {/* Person taking scissors */}
      <g transform="translate(200 600)">
        <Scissors />
      </g>
      {/* Person snipping string */}
      <g transform="translate(400 620)">
        <line x1={40} y1={0} x2={40} y2={30} stroke="#5a3b27" strokeWidth={2} />
      </g>
      {/* Dropping strings */}
      <g>
        <line x1={200} y1={620} x2={200} y2={580} stroke="#5a3b27" strokeWidth={1} opacity={0.8} />
        <line x1={220} y1={610} x2={220} y2={560} stroke="#5a3b27" strokeWidth={1} opacity={0.8} />
        <line x1={240} y1={600} x2={240} y2={540} stroke="#5a3b27" strokeWidth={1} opacity={0.8} />
      </g>
      <Captions text={scene.caption} startFrame={scene.startFrame} endFrame={scene.startFrame + scene.duration} />
    </svg>
  );
};