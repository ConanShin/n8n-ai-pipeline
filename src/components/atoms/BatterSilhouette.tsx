import React from 'react';

export interface BatterSilhouetteProps {
  isSwinging: boolean;
  result?: 'homerun' | 'triple' | 'double' | 'single' | 'strike' | null;
}

export const BatterSilhouette: React.FC<BatterSilhouetteProps> = ({ isSwinging, result }) => {
  return (
    <div
      role="img"
      aria-label="타자 실루엣"
      className="absolute bottom-20 right-4 md:right-16 flex items-center justify-center text-7xl md:text-8xl w-16 h-24 md:w-24 md:h-36"
    >
      <div className={`transition-transform duration-100 ${isSwinging ? 'rotate-[-30deg]' : 'rotate-0'} ${result === 'homerun' ? 'animate-bounce' : ''}`}>
        🤾‍♂️
      </div>
    </div>
  );
};
