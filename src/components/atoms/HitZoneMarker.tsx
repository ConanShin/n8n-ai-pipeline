
import React from 'react';

export interface HitZoneMarkerProps {
  hitZoneStart: number;
  hitZoneEnd: number;
  perfectZoneStart: number;
  perfectZoneEnd: number;
}

export const HitZoneMarker: React.FC<HitZoneMarkerProps> = ({
  hitZoneStart, hitZoneEnd, perfectZoneStart, perfectZoneEnd
}) => {
  return (
    <div role="presentation" aria-hidden="true" className="absolute inset-y-0 w-full pointer-events-none">
      <div 
        className="absolute inset-y-0 bg-green-400 opacity-40 rounded"
        style={{ left: `${hitZoneStart * 100}%`, width: `${(hitZoneEnd - hitZoneStart) * 100}%` }}
      />
      <div 
        className="absolute inset-y-0 bg-yellow-300 opacity-70 rounded"
        style={{ left: `${perfectZoneStart * 100}%`, width: `${(perfectZoneEnd - perfectZoneStart) * 100}%` }}
      />
    </div>
  );
};
