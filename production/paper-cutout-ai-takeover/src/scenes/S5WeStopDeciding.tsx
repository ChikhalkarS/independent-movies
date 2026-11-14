import { Town, Sky, Sun, PaperPerson, Robot, PuppetStrings } from '../components';
import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';
import { Captions } from '../components/Captions';
import { script, type ScriptScene } from '../data/script';

export const S5WeStopDeciding = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const scene: ScriptScene = script[4];

  return (
    <svg width={1920} height={1080}>
      <Sky clouds={true} />
      <Sun />
      {/* People sit on benches with phones. Thin strings run from robot's raised hands to their heads and arms */}
      <Town />
      <g transform="translate(300 650)">
        <PaperPerson />
      </g>
      <g transform="translate(500 650)">
        <PaperPerson transform="translate(0 20)" />
      </g>
      <g transform="translate(700 650)">
        <PaperPerson transform="translate(0 40)" />
      </g>
      <PuppetStrings />
      {/* Robot looms bigger */}
      <g transform="translate(1000 500)">
        <Robot transform="scale(1.5)" />
      </g>
      <Captions text={scene.caption} startFrame={scene.startFrame} endFrame={scene.startFrame + scene.duration} />
    </svg>
  );
};