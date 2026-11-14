/**
 * TestTakeover.tsx - 10-second vertical test composition
 * Pure code: React + SVG + Remotion. Paper cut-out style.
 * Vertical format: 1080x1920, 30fps, 300 frames
 */

import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { testScript, type ScriptScene } from './data/test-script';
import { Captions } from './components/Captions';
import { S1Hook } from './scenes/S1Hook';
import { S2Unfold } from './scenes/S2Unfold';
import { S3EmailsPlansThankYou } from './scenes/S3EmailsPlansThankYou';

// Scene transitions: push-through at 12 frames
const transitionDuration = 12;

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const getTransitionProgress = (currentFrame: number, sceneStartFrame: number): number => {
  const transitionStart = sceneStartFrame - transitionDuration;
  const transitionEnd = sceneStartFrame;

  if (currentFrame <= transitionStart) return 0;
  if (currentFrame >= transitionEnd) return 1;

  const t = (currentFrame - transitionStart) / transitionDuration;
  return easeOutCubic(t);
};

// Two-layer frame rate: camera smooth, elements step at 12fps
const step = Math.max(1, Math.round(30 / 12));

export const TestTakeover = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine which scene we're in
  let currentScene: ScriptScene | undefined;
  let sceneIndex = 0;

  for (let i = 0; i < testScript.length; i++) {
    const endFrame = testScript[i].startFrame + testScript[i].duration;
    if (frame >= testScript[i].startFrame && frame < endFrame) {
      currentScene = testScript[i];
      sceneIndex = i;
      break;
    }
  }

  if (!currentScene && frame >= testScript[testScript.length - 1].startFrame) {
    currentScene = testScript[testScript.length - 1];
  }

  if (!currentScene) return null;

  // Calculate transition progress from previous scene
  const prevSceneIndex = sceneIndex - 1;
  const transitionProgress = getTransitionProgress(frame, currentScene.startFrame);

  // Stop-motion index for elements (12fps stepping)
  const stop = Math.floor(frame / step) * step;

  // Scene backgrounds (shared across all scenes)
  const skyColor = '#bcdbe6';
  const sunColor = '#fbfbf8';

  // Render current scene
  const renderScene = (): JSX.Element => {
    switch (currentScene.id) {
      case 1:
        return <S1Hook />;
      case 2:
        return <S2Unfold />;
      case 3:
        return <S3EmailsPlansThankYou />;
      default:
        return null;
    }
  };

  // Push-through transition: current scene slides in from right
  const translateX = interpolate(
    transitionProgress,
    [0, 1],
    [1080, 0],
    { easing: easeInOutSine }
  );

  return (
    <svg width={1080} height={1920}>
      {/* Sky background - paper color */}
      <rect width={1080} height={1920} fill={skyColor} />

      {/* Sun - animate across scenes, smooth camera layer */}
      <circle cx={100} cy={80} r={40} fill={sunColor} opacity={0.9} />

      {/* Render current scene with push-through transition */}
      <g transform={`translate(${translateX}, 0)`}>
        {renderScene()}
      </g>

      {/* Captions - always on top, paper strip background */}
      {currentScene && (
        <Captions
          text={currentScene.caption}
          startFrame={currentScene.startFrame}
          endFrame={currentScene.startFrame + currentScene.duration}
        />
      )}
    </svg>
  );
};

