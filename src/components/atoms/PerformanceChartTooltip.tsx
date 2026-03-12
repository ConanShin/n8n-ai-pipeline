import React from 'react';

export interface PerformanceChartTooltipProps {
  visible: boolean;
  date: string;
  opponent: string;
  stats: Record<string, string | number>;
  style?: React.CSSProperties;
}

export const PerformanceChartTooltip: React.FC<PerformanceChartTooltipProps> = ({
  visible,
  date,
  opponent,
  stats,
  style
}) => {
  if (!visible) return null;

  return (
    <div
      role="tooltip"
      aria-live="polite"
      className="flex flex-col gap-1 absolute z-10 bg-gray-900 text-white text-xs rounded-xl px-3 py-2 shadow-xl pointer-events-none min-w-[120px] -translate-x-1/2 -translate-y-full mb-2"
      style={style}
    >
      <div className="font-bold border-b border-gray-700 pb-1 mb-1">{date} vs {opponent}</div>
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="capitalize">{key}</span>
          <span className="font-semibold">{value}</span>
        </div>
      ))}
    </div>
  );
};
