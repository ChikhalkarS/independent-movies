import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

type Pose = 'wave' | 'work' | 'loom';

export const Robot = ({
  pose = 'wave',
  transform,
  scale = 1
}: {
  pose?: Pose;
  transform?: string;
  scale?: number;
}) => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Base robot parts
  const headRadius = 18 * scale;
  const bodyWidth = 40 * scale;
  const bodyHeight = 50 * scale;
  const armWidth = 15 * scale;
  const armHeight = 25 * scale;

  const baseColor = '#3c8a8a';
  const eyeColor = '#1f5a63';
  const antennaColor = '#e9b949';

  // Wave animation
  const waveOffset = pose === 'wave' ? Math.sin(stop / 4) * 10 : 0;

  const size = 1 * scale;

  return (
    <g filter="url(#sh)" transform={transform} style={{ transform: `scale(${scale})` }}>
      {/* Antenna */}
      <line x1={50*size} y1={10*size} x2={50*size} y2={-5*size} stroke={antennaColor} strokeWidth={2*scale} />
      <circle cx={50*size} cy={-6*size} r={3*scale} fill={antennaColor} />

      {/* Head */}
      <circle cx={50*size} cy={30*size} r={headRadius} fill={baseColor} />

      {/* Eyes */}
      <circle cx={43*size} cy={27*size} r={2*scale} fill={eyeColor} />
      <circle cx={57*size} cy={27*size} r={2*scale} fill={eyeColor} />

      {/* Body */}
      <rect x={35*size} y={45*size} width={bodyWidth} height={bodyHeight} fill={baseColor} />

      {/* Arms based on pose */}
      {pose === 'wave' ? (
        <>
          <rect x={30*size} y={60*size} width={armWidth} height={armHeight} fill={baseColor}
            transform={`rotate(-45 ${37.5*size} ${72.5*size})`} />
          <rect x={60*size} y={60*size} width={armWidth} height={armHeight} fill={baseColor}
            transform={`rotate(${20 + waveOffset} ${67.5*size} ${72.5*size})`} />
        </>
      ) : pose === 'work' ? (
        <>
          <rect x={30*size} y={60*size} width={armWidth} height={armHeight} fill={baseColor}
            transform={`rotate(-30 ${37.5*size} ${72.5*size})`} />
          <rect x={60*size} y={60*size} width={armWidth} height={armHeight} fill={baseColor}
            transform={`rotate(30 ${67.5*size} ${72.5*size})`} />
        </>
      ) : (
        <>
          {/* Loom pose - bigger and arms up */}
          <rect x={30*size} y={60*size} width={armWidth} height={armHeight * 1.5} fill={baseColor}
            transform={`rotate(-70 ${37.5*size} ${72.5*size})`} />
          <rect x={60*size} y={60*size} width={armWidth} height={armHeight * 1.5} fill={baseColor}
            transform={`rotate(70 ${67.5*size} ${72.5*size})`} />
        </>
      )}

      {/* Legs */}
      <rect x={40*size} y={95*size} width={12*scale} height={25*scale} fill={baseColor} />
      <rect x={58*size} y={95*size} width={12*scale} height={25*scale} fill={baseColor} />
    </g>
  );
};