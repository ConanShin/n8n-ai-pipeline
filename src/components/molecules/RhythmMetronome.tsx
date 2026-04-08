
import React from 'react';

export interface RhythmMetronomeProps {
  bpm: number;
  active: boolean;
  beat: number;
}

export const RhythmMetronome: React.FC<RhythmMetronomeProps> = ({ bpm, active, beat }) => {
  return (
    <div 
      role="presentation" 
      aria-hidden="true"
      className="flex items-center justify-center gap-3 py-2"
    >
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => {
          const isActive = active && (beat % 3 === i);
          return (
            <span 
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-100 ${isActive ? 'bg-amber-400 scale-150 shadow-amber-300/70 shadow-md' : 'bg-gray-600 scale-100'}`}
            />
          );
        })}
      </div>
      <span className="text-xs text-gray-500 tabular-nums">{bpm} BPM</span>
    </div>
  );
};
