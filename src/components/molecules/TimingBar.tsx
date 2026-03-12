import React from 'react';

export interface TimingBarProps {
  zones: Array<{ color: string; flex: number }>;
  height?: string;
}

export const TimingBar: React.FC<TimingBarProps> = ({ zones, height = 'h-6' }) => {
  return (
    <div className={`flex w-full ${height} rounded-full overflow-hidden shadow-inner`} role="presentation" aria-label="타이밍 구간 바">
      {zones.map((zone, idx) => (
        <div key={idx} className={`${zone.color} h-full`} style={{ flex: zone.flex }} />
      ))}
    </div>
  );
};
