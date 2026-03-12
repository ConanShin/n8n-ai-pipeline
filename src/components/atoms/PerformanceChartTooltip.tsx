import React from 'react';

export interface PerformanceChartTooltipProps {
  date: string;
  value: number;
  opponent?: string;
  visible?: boolean;
}

export const PerformanceChartTooltip: React.FC<PerformanceChartTooltipProps> = ({ date, value, opponent, visible = true }) => {
  if (!visible) return null;

  return (
    <div 
      className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-gray-900 text-white text-xs shadow-xl pointer-events-none absolute z-50 transform -translate-x-1/2 -translate-y-full mb-2"
      role="tooltip"
      aria-label={`Chart tooltip: ${value} on ${date}`}
    >
      <div className="font-bold">{date}</div>
      <div>Value: {value}</div>
      {opponent && <div>vs {opponent}</div>}
    </div>
  );
};
