import React from 'react';
import { ChartTooltip, ChartTooltipProps } from './ChartTooltip';

export interface PerformanceChartBarProps {
  label: string;
  value: number; // 0 to 1
  rawValue: string | number;
  color?: string;
  tooltipData: ChartTooltipProps;
}

export const PerformanceChartBar: React.FC<PerformanceChartBarProps> = ({ label, value, rawValue, color = 'bg-indigo-500', tooltipData }) => {
  const heightPercent = Math.max(5, value * 100);
  
  return (
    <div
      role="graphics-symbol"
      aria-label={`Bar for ${label}: ${rawValue}`}
      className="flex flex-col items-center justify-end gap-1 flex-1 group relative h-full"
    >
      <ChartTooltip {...tooltipData} />
      <div 
        className={`w-full max-w-[40px] rounded-t-sm transition-all duration-300 ${color} group-hover:brightness-125`}
        style={{ height: `${heightPercent}%` }}
      />
      <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center mt-1">
        {label}
      </span>
    </div>
  );
};