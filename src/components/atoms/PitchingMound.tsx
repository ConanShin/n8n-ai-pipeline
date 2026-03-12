import React from 'react';

export interface PitchingMoundProps {
  isWinding?: boolean;
}

export const PitchingMound: React.FC<PitchingMoundProps> = ({ isWinding }) => {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <span
        role="img"
        aria-label="투수 마운드"
        className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-4xl md:text-5xl ${isWinding ? 'animate-pulse' : ''}`}
      >
        🧑‍⚾
      </span>
      <div className="w-24 h-4 mt-2 bg-yellow-800/80 rounded-[50%] opacity-50 blur-sm" />
    </div>
  );
};
