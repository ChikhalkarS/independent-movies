/**
 * Main entry point for the paper-cutout-ai-takeover Remotion project.
 * Exports all components and hooks for use throughout the project.
 */

// Export hooks
export { useStopMotion } from './hooks/useStopMotion';

// Export shared components
export { Paper } from './components/Paper';
export { Grain } from './components/Grain';
export { Frame } from './components/Frame';
export { Captions } from './components/Captions';

// Export environment components
export { Sky } from './components/Sky';
export { Sun } from './components/Sun';
export { Cloud } from './components/Cloud';
export { Bird } from './components/Bird';

// Export character and set pieces
export { Town } from './components/Town';
export { PaperPerson } from './components/PaperPerson';
export { Robot } from './components/Robot';
export { Strings } from './components/Strings';
export { Scissors } from './components/Scissors';
export { Desk } from './components/Desk';
export { PuppetStrings } from './components/PuppetStrings';

// Export scenes
export { S1Hook } from './scenes/S1Hook';
export { S2Unfold } from './scenes/S2Unfold';
export { S3EmailsPlansThankYou } from './scenes/S3EmailsPlansThankYou';
export { S4FasterCheaperNeverTired } from './scenes/S4FasterCheaperNeverTired';
export { S5WeStopDeciding } from './scenes/S5WeStopDeciding';
export { S6ButHeresTheTwist } from './scenes/S6ButHeresTheTwist';
export { S7KeepYourHandsOnTheWheel } from './scenes/S7KeepYourHandsOnTheWheel';
export { S8EndCard } from './scenes/S8EndCard';

// Export main composition
export { AiTakeover } from './AiTakeover';

// Export script data
export { script, type ScriptScene } from './data/script';