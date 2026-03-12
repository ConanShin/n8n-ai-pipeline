import React, { useState } from 'react';

export interface PerformanceChartBarProps {
  value: number;
  maxValue: number;
  label: string;
  tooltipText?: string;
  color?: string;
  isActive?: boolean;
}

export const PerformanceChartBar: React.FC<PerformanceChartBarProps> = ({
  value, maxValue, label, tooltipText, color = 'bg-blue-500', isActive
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const heightPercent = maxValue > 0 ? Math.max((value / maxValue) * 100, 2) : 2;

  return (
    <div 
      className="flex flex-col items-center justify-end gap-1 h-full relative group w-full"
      role="img"
      aria-label="Performance bar chart item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isHovered || isActive) && tooltipText && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap pointer-events-none">
          {tooltipText}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
      <div className="w-full flex items-end justify-center h-full pb-1">
        <div 
          className={`w-4/5 rounded-t-sm transition-transform duration-150 ease-in-out ${color} ${isHovered || isActive ? 'scale-105 opacity-100' : 'opacity-80'}`}
          style={{ height: `${heightPercent}%` }}
        ></div>
      </div>
      <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">{label}</span>
    </div>
  );
};