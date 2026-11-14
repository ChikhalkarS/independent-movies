import { createRoot } from 'react-dom';
import { Canvas } from 'remotion';
import { AiTakeover } from './AiTakeover';

// Validate that the After Effects composition has the same name
Canvas.verifyLayerExists('AiTakeover');

const container = document.getElementById('root');
createRoot(container!).render(<AiTakeover />);