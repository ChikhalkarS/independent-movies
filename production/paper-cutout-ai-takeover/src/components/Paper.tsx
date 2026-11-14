/* Paper.tsx: shared filters for paper cut-out look */

export const paperShadowFilter = `
  <filter id="sh" x="-10%" y="-10%" width="120%" height="130%">
    <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#4b3b2c" floodOpacity="0.38" />
  </filter>
`;

export const paperGrainFilter = `
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
    <feColorMatrix values="0 0 0 0 .4  0 0 0 0 .33  0 0 0 0 .27  0 0 0 .55 0" />
  </filter>
`;

export const Paper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <g filter="url(#sh)">
      {children}
    </g>
  );
};