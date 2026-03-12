
import React from 'react';

export interface DiamondBaseMapProps {
  basesOccupied: { first: boolean; second: boolean; third: boolean };
}

export const DiamondBaseMap: React.FC<DiamondBaseMapProps> = ({ basesOccupied }) => {
  return (
    <div className="relative w-16 h-16" role="img" aria-label="베이스 점유 현황 다이아몬드">
      <div 
        data-occupied={basesOccupied.second}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-2 border-white/60 data-[occupied=true]:bg-yellow-400 data-[occupied=false]:bg-transparent transition-colors"
      />
      <div 
        data-occupied={basesOccupied.third}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 rotate-45 border-2 border-white/60 data-[occupied=true]:bg-yellow-400 data-[occupied=false]:bg-transparent transition-colors"
      />
      <div 
        data-occupied={basesOccupied.first}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 rotate-45 border-2 border-white/60 data-[occupied=true]:bg-yellow-400 data-[occupied=false]:bg-transparent transition-colors"
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white/80" />
    </div>
  );
};
