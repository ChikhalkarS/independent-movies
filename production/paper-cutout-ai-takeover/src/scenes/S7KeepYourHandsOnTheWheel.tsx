import { Town, Sky, Sun, PaperPerson, Robot } from '../components';
import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';
import { Captions } from '../components/Captions';
import { script, type ScriptScene } from '../data/script';

export const S7KeepYourHandsOnTheWheel = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const scene: ScriptScene = script[6];

  return (
    <svg width={1920} height={1080}>
      <Sky clouds={true} />
      <Sun />
      {/* Hero boat floats over clouds, eagle flaps above, person steers, small robot sits as co-pilot pointing at the map */}
      <Town />
      {/* Hero boat */}
      <g transform="translate(200 400)">
        <path d="M0,0 C50,100 150,100 200,0 C150,-100 50,-100 0,0" fill="#bcdbe6" />
      </g>
      {/* Eagle */}
      <g transform="translate(800 200)">
        <polygon
          points={['0,0', '30,-40', '60,0', '30,40']}
          fill="#2c5a71"
        />
        <line x1={30} y1={-40} x2={30} y2={-60} stroke="#1f5a63" strokeWidth={2} />
      </g>
      {/* Person steering */}
      <g transform="translate(100 550)">
        <PaperPerson transform="rotate(-20)" />
      </g>
      {/* Small robot as co-pilot */}
      <g transform="translate(130 530)">
        <Robot transform="scale(0.5)" />
      </g>
      <Captions text={scene.caption} startFrame={scene.startFrame} endFrame={scene.startFrame + scene.duration} />
    </svg>
  );
};