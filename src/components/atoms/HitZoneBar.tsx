import React from 'react';

export interface WindowRange {
  start: number;
  end: number;
}

export interface HitZoneBarProps {
  ballProgress: number; // 0.0 ~ 1.0
  perfectWindow: WindowRange;
  goodWindow: WindowRange;
  visible?: boolean;
}

export const HitZoneBar: React.FC<HitZoneBarProps> = ({ 
  ballProgress, 
  perfectWindow, 
  goodWindow, 
  visible = true 
}) => {
  if (!visible) return null;

  const getStyle = (window: WindowRange) => {
    const left = `${window.start * 100}%`;
    const width = `${(window.end - window.start) * 100}%`;
    return { left, width };
  };

  const ballLeft = `${Math.min(Math.max(ballProgress * 100, 0), 100)}%`;

  return (
    <div 
      role="progressbar"
      aria-label="공 타이밍 게이지"
      aria-valuenow={Math.round(ballProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative w-full h-3 sm:h-4 rounded-full overflow-hidden bg-gray-800"
    >
      {/* Good Zone */}
      <div 
        className="absolute h-full bg-green-500/40 rounded-full transition-all duration-75"
        style={getStyle(goodWindow)}
      />
      {/* Perfect Zone */}
      <div 
        className="absolute h-full bg-yellow-400/70 rounded-full transition-all duration-75"
        style={getStyle(perfectWindow)}
      />
      {/* Ball Marker */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-white/80 shadow-md transition-all duration-75 -translate-x-1/2"
        style={{ left: ballLeft }}
      />
    </div>
  );
};
