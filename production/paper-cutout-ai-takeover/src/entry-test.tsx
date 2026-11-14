import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import { TestTakeover } from './TestTakeover';
import { testScript } from './data/test-script';

const totalFrames = testScript[testScript.length - 1].startFrame + testScript[testScript.length - 1].duration;

registerRoot(() => (
  <Composition
    id="TestTakeover"
    component={TestTakeover}
    durationInFrames={totalFrames}
    fps={30}
    width={1080}
    height={1920}
  />
));