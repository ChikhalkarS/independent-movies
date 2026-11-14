import { Town, Sky, Sun, PaperPerson } from '../components';
import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';
import { Captions } from '../components/Captions';
import { script, type ScriptScene } from '../data/script';

export const S4FasterCheaperNeverTired = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const scene: ScriptScene = script[3];

  return (
    <svg width={1920} height={1080}>
      <Sky clouds={true} />
      <Sun />
      {/* Town in motion - robot arms at shop, traffic lights, hospital */}
      <Town />
      {/* Robot arms at shop */}
      <g transform="translate(200 600)">
        <rect x={0} y={0} width={30} height={80} fill="#3c8a8a" filter="url(#sh)" />
        <rect x={40} y={0} width={30} height={80} fill="#3c8a8a" filter="url(#sh)" />
      </g>
      {/* Traffic lights */}
      <g transform="translate(500 500)">
        <circle cx={10} cy={0} r={15} fill="#d4553d" />
        <circle cx={10} cy={30} r={15} fill="#e9b949" />
        <circle cx={10} cy={60} r={15} fill="#3c8a8a" />
      </g>
      {/* People walking less */}
      <g transform="translate(800 650)">
        <PaperPerson transform="translate(0 0)" />
        <PaperPerson transform="translate(30 0)" />
        <PaperPerson transform="translate(60 0)" />
      </g>
      <Captions text={scene.caption} startFrame={scene.startFrame} endFrame={scene.startFrame + scene.duration} />
    </svg>
  );
};