import React from 'react';
import { PitchBall } from '../atoms/PitchBall';
import { HitZoneBar, WindowRange } from '../atoms/HitZoneBar';

export interface PitchLaneProps {
  ballSpeedMs: number;
  isActive: boolean;
  ballProgress: number;
  hitQuality?: 'perfect' | 'good' | 'miss' | null;
  perfectWindow: WindowRange;
  goodWindow: WindowRange;
}

export const PitchLane: React.FC<PitchLaneProps> = ({
  ballSpeedMs,
  isActive,
  ballProgress,
  hitQuality,
  perfectWindow,
  goodWindow
}) => {
  return (
    <div 
      className="relative w-full flex-1 flex flex-col overflow-hidden"
      role="region"
      aria-label="투구 레인"
    >
      {/* Background Guideline */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600/40 to-transparent" />
      </div>

      {/* Batter Silhouette */}
      <div className="absolute top-1/2 -translate-y-1/2 left-8 sm:left-12 z-0">
        <span className="text-4xl sm:text-5xl select-none" aria-hidden="true" style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
          🏏
        </span>
      </div>

      {/* The Ball */}
      <PitchBall 
        speedMs={ballSpeedMs} 
        isActive={isActive} 
        hitQuality={hitQuality} 
      />

      {/* Hit Zone Indicator at bottom */}
      <div className="absolute bottom-2 left-4 right-4 z-10">
        <HitZoneBar 
          ballProgress={ballProgress} 
          perfectWindow={perfectWindow} 
          goodWindow={goodWindow} 
        />
      </div>
    </div>
  );
};
