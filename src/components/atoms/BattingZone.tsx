
import React from 'react';

export const BattingZone: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-10 pointer-events-none" aria-hidden="true">
      <div 
        className="w-full h-full bg-white/20 border-2 border-white/40 rounded-sm"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 50%)' }}
      />
    </div>
  );
};
