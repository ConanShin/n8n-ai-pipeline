
import React from 'react';

export interface TimingBarProps {
  markerPosition: number;
  isActive: boolean;
}

export const TimingBar: React.FC<TimingBarProps> = ({ markerPosition, isActive }) => {
  return (
    <div 
      className={`absolute bottom-24 left-4 right-4 h-6 rounded-full bg-gray-800/80 overflow-hidden border border-gray-600 ${!isActive ? 'opacity-50' : ''}`}
      role="progressbar" aria-label="타이밍 게이지" aria-valuemin={0} aria-valuemax={100} aria-valuenow={markerPosition}
    >
      <div className="absolute left-[30%] w-[20%] h-full bg-green-500/40" />
      <div className="absolute left-[42%] w-[16%] h-full bg-yellow-400/70" />
      <div className="absolute left-[50%] w-[20%] h-full bg-green-500/40" />
      <div 
        className="absolute top-0 h-full w-1.5 rounded-full bg-white shadow-md shadow-white/60 transition-none"
        style={{ left: `${markerPosition}%`, transform: 'translateX(-50%)' }}
      />
    </div>
  );
};
