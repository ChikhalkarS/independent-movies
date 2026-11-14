import { useCurrentFrame } from 'remotion';

export const Captions = ({ text, startFrame, endFrame }: { text: string; startFrame: number; endFrame: number }) => {
  const frame = useCurrentFrame();
  const show = frame >= startFrame && frame <= endFrame;

  if (!show) return null;

  // Paper strip background with bold rounded sans-serif text
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 160,
        left: 20,
        right: 20,
        background: 'rgba(251, 251, 248, 0.8)',
        backdropFilter: 'blur(4px)',
        borderRadius: '12px',
        padding: '8px 12px',
        color: '#1f5a63',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        fontSize: '28px',
        fontWeight: '600',
        lineHeight: '1.4',
        maxWidth: 'calc(100% - 40px)',
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  );
};