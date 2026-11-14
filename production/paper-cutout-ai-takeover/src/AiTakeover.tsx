/**
 * AiTakeover.tsx - Main composition sequencing all 8 scenes with transitions
 * Pure code: React + SVG + Remotion. No external image or video assets.
 * Everything is drawn as paper shapes in paper cut-out style.
 * Compatible with Remotion 4.0.543
 *
 * Rules adapted from Vox paper-collage grammar (huashu-art-motion):
 * - Two-layer frame rate: camera moves smooth, elements step at 12fps
 * - Camera easing: easeInOutSine for long moves, cubic-bezier(.33,0,.2,1) for reveals
 * - Paper grain is STATIC (no per-frame jitter)
 * - Transitions: push-through / hard cut, NOT torn paper
 * - 3-5 elements per scene that stack
 */

import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { script, type ScriptScene } from './data/script';
import { Captions } from './components/Captions';
import { S1Hook } from './scenes/S1Hook';
import { S2Unfold } from './scenes/S2Unfold';
import { S3EmailsPlansThankYou } from './scenes/S3EmailsPlansThankYou';
import { S4FasterCheaperNeverTired } from './scenes/S4FasterCheaperNeverTired';
import { S5WeStopDeciding } from './scenes/S5WeStopDeciding';
import { S6ButHeresTheTwist } from './scenes/S6ButHeresTheTwist';
import { S7KeepYourHandsOnTheWheel } from './scenes/S7KeepYourHandsOnTheWheel';
import { S8EndCard } from './scenes/S8EndCard';

// Scene transitions: push-through (whip) at 12 frames, easeInOutSine
const transitionDuration = 12;

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const getTransitionProgress = (currentFrame: number, sceneStartFrame: number): number => {
  const transitionStart = sceneStartFrame - transitionDuration;
  const transitionEnd = sceneStartFrame;

  if (currentFrame <= transitionStart) return 0;
  if (currentFrame >= transitionEnd) return 1;

  const t = (currentFrame - transitionStart) / transitionDuration;
  return easeOutCubic(t); // cubic-bezier(.33,0,.2,1) reveal style
};

// Two-layer frame rate: camera smooth, elements step at 12fps
const step = Math.max(1, Math.round(30 / 12));

export const AiTakeover = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine which scene we're in
  let currentScene: ScriptScene | undefined;
  let sceneIndex = 0;

  for (let i = 0; i < script.length; i++) {
    const endFrame = script[i].startFrame + script[i].duration;
    if (frame >= script[i].startFrame && frame < endFrame) {
      currentScene = script[i];
      sceneIndex = i;
      break;
    }
  }

  // If we're in the last scene, just render it
  if (!currentScene && frame >= script[script.length - 1].startFrame) {
    currentScene = script[script.length - 1];
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
      case 4:
        return <S4FasterCheaperNeverTired />;
      case 5:
        return <S5WeStopDeciding />;
      case 6:
        return <S6ButHeresTheTwist />;
      case 7:
        return <S7KeepYourHandsOnTheWheel />;
      case 8:
        return <S8EndCard />;
      default:
        return null;
    }
  };

  // Push-through transition: current scene slides in from right
  const translateX = interpolate(
    transitionProgress,
    [0, 1],
    [1920, 0],
    { easing: easeInOutSine }
  );

  return (
    <svg width={1920} height={1080}>
      {/* Sky background - paper color */}
      <rect width={1920} height={1080} fill={skyColor} />

      {/* Sun - animate across scenes, smooth camera layer */}
      <circle cx={150} cy={50} r={50} fill={sunColor} opacity={0.9} />

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