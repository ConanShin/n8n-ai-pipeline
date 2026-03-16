
import React from 'react';
export interface PitchLaneProps { visible?: boolean; }
export const PitchLane: React.FC<PitchLaneProps> = ({ visible = true }) => {
  if (!visible) return null;
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center h-full" role="presentation" aria-hidden="true">
      <div className="w-1 h-full bg-white/10 rounded-full" />
    </div>
  );
};
