import React from 'react';
import { TimingBar } from '../molecules/TimingBar';
import { TimingCursor } from '../atoms/TimingCursor';

export interface TimingZoneProps {
  progress: number;
  zones: Array<{ label: string; color: string; rangeStart: number; rangeEnd: number }>;
}

export const TimingZone: React.FC<TimingZoneProps> = ({ progress, zones }) => {
  const barZones = zones.map(zone => ({
    color: zone.color,
    flex: zone.rangeEnd - zone.rangeStart
  }));

  return (
    <div className="flex flex-col items-center w-full px-6 py-6 gap-3 bg-gray-900 border-t border-gray-800 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.5)] z-10" role="progressbar" aria-label="타이밍 진행 바" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
      <div className="w-full flex justify-between px-2 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
        <span>Early</span>
        <span className="text-yellow-500 font-extrabold flex flex-col items-center gap-1">
          <span className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
          PERFECT
        </span>
        <span>Late</span>
      </div>
      
      <div className="relative w-full">
        <TimingBar zones={barZones} height="h-8 md:h-10" />
        <TimingCursor progress={progress} />
      </div>
    </div>
  );
};
