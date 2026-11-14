import { useStopMotion } from '../hooks/useStopMotion';
import { useCurrentFrame } from 'remotion';

type Pose = 'stand' | 'walk' | 'sit';
type Variant = 0 | 1 | 2 | 3;

const colours = ['#efe3c9', '#e9b949', '#3c8a8a', '#1f5a63'];

export const PaperPerson = ({
  pose = 'stand',
  variant = 0,
  transform
}: {
  pose?: Pose;
  variant?: Variant;
  transform?: string;
}) => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);
  const color = colours[variant % 4];

  // Stop-motion walk animation
  const walkOffset = pose === 'walk' ? (stop % 4) * 3 : 0;
  const legOffset = pose === 'walk' ? (stop % 4) * 5 : 0;

  // Arm angles based on pose
  const leftArmAngle = pose === 'walk' ? -30 + (stop % 4) * 15 :
                       pose === 'sit' ? 60 : -30;
  const rightArmAngle = pose === 'walk' ? 30 - (stop % 4) * 15 :
                        pose === 'sit' ? -60 : 30;

  // Leg positions based on pose
  const leftLegX = pose === 'walk' ? 40 + walkOffset : pose === 'sit' ? 35 : 40;
  const rightLegX = pose === 'walk' ? 50 - walkOffset : pose === 'sit' ? 55 : 50;
  const leftLegY = pose === 'sit' ? 75 : 95;
  const rightLegY = pose === 'sit' ? 75 : 95;
  const leftLegHeight = pose === 'sit' ? 15 : 30;
  const rightLegHeight = pose === 'sit' ? 15 : 30;

  // Phone for sit pose
  const phone = pose === 'sit' ? (
    <g>
      <rect x={50} y={55} width={12} height={20} fill="#1f5a63" filter="url(#sh)" />
      <rect x={51} y={56} width={10} height={18} fill="#bcdbe6" />
    </g>
  ) : null;

  return (
    <g filter="url(#sh)" transform={transform}>
      {/* Head */}
      <circle cx={50} cy={30} r={15} fill={color} />

      {/* Body */}
      <rect x={35} y={45} width={30} height={50} fill={color} />

      {/* Arms */}
      <rect
        x={20} y={50} width={15} height={30}
        fill={color}
        transform={`rotate(${leftArmAngle} 27.5 50)`}
      />
      <rect
        x={55} y={50} width={15} height={30}
        fill={color}
        transform={`rotate(${rightArmAngle} 62.5 50)`}
      />

      {/* Legs */}
      <rect x={leftLegX} y={leftLegY} width={10} height={leftLegHeight} fill={color} />
      <rect x={rightLegX} y={rightLegY} width={10} height={rightLegHeight} fill={color} />

      {/* Phone when sitting */}
      {phone}
    </g>
  );
};