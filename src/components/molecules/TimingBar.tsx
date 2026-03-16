
import React from 'react';
import { TimingTrack } from '../atoms/TimingTrack';
import { HitZone } from '../atoms/HitZone';
import { TimingMarker } from '../atoms/TimingMarker';
export interface TimingBarProps { markerPosition: number; isActive: boolean; }
export const TimingBar: React.FC<TimingBarProps> = ({ markerPosition, isActive }) => (
  <div className={`relative w-4/5 max-w-sm sm:max-w-md h-8 mx-auto mb-4 rounded-full overflow-hidden ${!isActive ? 'opacity-50' : ''}`} role="meter" aria-label="타이밍 게이지" aria-valuemin={0} aria-valuemax={100} aria-valuenow={markerPosition}>
    <TimingTrack />
    <HitZone />
    <TimingMarker position={markerPosition} />
  </div>
);
