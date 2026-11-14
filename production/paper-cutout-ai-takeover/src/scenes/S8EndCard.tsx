import { Sky, Sun } from '../components';
import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';
import { Captions } from '../components/Captions';
import { script, type ScriptScene } from '../data/script';

export const S8EndCard = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const scene: ScriptScene = script[7];

  return (
    <svg width={1920} height={1080}>
      <Sky clouds={true} />
      <Sun />
      {/* End card on paper: title "What if…?", gold frame, sun spinning */}
      <g>
        <rect x={800} y={540} width={320} height={100} fill="#fbfbf8" filter="url(#sh)" />
        <text x={960} y={570} textAnchor="middle" fill="#1f5a63" fontFamily="Inter, sans-serif" fontSize={40} fontWeight={600}>
          What if…?
        </text>
        <circle cx={960} cy={450} r={30} fill="#e9b949" />
      </g>
      <Captions text={scene.caption} startFrame={scene.startFrame} endFrame={scene.startFrame + scene.duration} />
    </svg>
  );
};