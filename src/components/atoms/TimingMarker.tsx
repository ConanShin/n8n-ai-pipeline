
import React from 'react';
export interface TimingMarkerProps { position: number; }
export const TimingMarker: React.FC<TimingMarkerProps> = ({ position }) => (
  <div 
    className="absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)] z-20"
    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
    role="presentation" aria-hidden="true" 
  />
);
