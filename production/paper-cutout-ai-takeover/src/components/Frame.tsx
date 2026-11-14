import { paperShadowFilter, paperGrainFilter } from './Paper';

export const Frame = ({ children }: { children: React.ReactNode }) => {
  return (
    <svg width={1920} height={1080}>
      <defs>
        {paperShadowFilter}
        {paperGrainFilter}
      </defs>
      {children}
      {/* Paper grain overlay on entire frame */}
      <rect width={1920} height={1080} filter="url(#grain)" opacity="0.25" pointerEvents="none" />
    </svg>
  );
};