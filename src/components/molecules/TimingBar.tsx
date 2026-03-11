
import React from 'react';
import { HitZoneMarker } from '../atoms/HitZoneMarker';
import { TimingCursor } from '../atoms/TimingCursor';

export interface TimingBarProps {
  progress: number;
  hitZoneStart: number;
  hitZoneEnd: number;
  perfectZoneStart: number;
  perfectZoneEnd: number;
  active: boolean;
}

export const TimingBar: React.FC<TimingBarProps> = ({
  progress, hitZoneStart, hitZoneEnd, perfectZoneStart, perfectZoneEnd, active
}) => {
  const inHitZone = progress >= hitZoneStart && progress <= hitZoneEnd;
  const inPerfectZone = progress >= perfectZoneStart && progress <= perfectZoneEnd;

  return (
    <div 
      role="progressbar"
      aria-label="타이밍 바 — 공이 타격 존에 들어오면 배트를 휘두르세요"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="relative w-full h-8 rounded-full bg-gray-700 overflow-visible shadow-inner"
    >
      <HitZoneMarker 
        hitZoneStart={hitZoneStart}
        hitZoneEnd={hitZoneEnd}
        perfectZoneStart={perfectZoneStart}
        perfectZoneEnd={perfectZoneEnd}
      />
      {active && (
        <TimingCursor 
          progress={progress}
          inHitZone={inHitZone}
          inPerfectZone={inPerfectZone}
        />
      )}
    </div>
  );
};
