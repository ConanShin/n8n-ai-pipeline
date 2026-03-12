import React from 'react';

export interface ChartTooltipProps {
  date: string;
  avg: string;
  hits: number;
  hr: number;
  rbi: number;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ date, avg, hits, hr, rbi }) => {
  return (
    <div
      role="tooltip"
      aria-label={`Stats for ${date}`}
      className="hidden group-hover:flex flex-col gap-1 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-600 text-white text-xs rounded-lg p-3 shadow-xl z-10 whitespace-nowrap pointer-events-none"
    >
      <div className="font-bold border-b border-gray-700 pb-1 mb-1">{date}</div>
      <div className="flex justify-between gap-4"><span>AVG:</span> <span>{avg}</span></div>
      <div className="flex justify-between gap-4"><span>Hits:</span> <span>{hits}</span></div>
      <div className="flex justify-between gap-4"><span>HR:</span> <span>{hr}</span></div>
      <div className="flex justify-between gap-4"><span>RBI:</span> <span>{rbi}</span></div>
    </div>
  );
};