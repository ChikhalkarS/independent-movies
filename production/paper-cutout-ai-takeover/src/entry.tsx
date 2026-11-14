import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import { AiTakeover } from './AiTakeover';
import { script } from './data/script';

// Re-export all components so scenes can import from '../'
export { Cloud } from './components/Cloud';
export { Bird } from './components/Bird';
export { Sun } from './components/Sun';
export { Sky } from './components/Sky';
export { Frame } from './components/Frame';
export { Grain } from './components/Grain';
export { Paper } from './components/Paper';
export { PaperPerson } from './components/PaperPerson';
export { PuppetStrings } from './components/PuppetStrings';
export { Robot } from './components/Robot';
export { Scissors } from './components/Scissors';
export { Strings } from './components/Strings';
export { TempleBoat } from './components/TempleBoat';
export { Town } from './components/Town';
export { Desk } from './components/Desk';
export { Eagle } from './components/Eagle';
export { Captions } from './components/Captions';

const totalFrames = script[script.length - 1].startFrame + script[script.length - 1].duration;

registerRoot(() => (
  <Composition
    id="AiTakeover"
    component={AiTakeover}
    durationInFrames={totalFrames}
    fps={30}
    width={1920}
    height={1080}
  />
));