
import React from 'react';
export interface BatterSilhouetteProps { isSwinging?: boolean; }
export const BatterSilhouette: React.FC<BatterSilhouetteProps> = ({ isSwinging }) => (
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-28 opacity-90 pointer-events-none" role="img" aria-label="타자 캐릭터" aria-hidden="true">
    <svg viewBox="0 0 100 120" className="w-full h-full fill-gray-800 stroke-gray-600">
      <circle cx="50" cy="20" r="15" />
      <rect x="35" y="40" width="30" height="50" rx="10" />
      <rect x={isSwinging ? "-20" : "60"} y={isSwinging ? "40" : "10"} width="8" height="60" rx="4" className="fill-yellow-600" transform={isSwinging ? "rotate(-45 50 60)" : "rotate(30 65 20)"} style={{transition: 'all 0.1s'}} />
    </svg>
  </div>
);
