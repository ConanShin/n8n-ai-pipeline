import React from 'react';

export interface LegendItem {
  label: string;
  color: string;
}

export interface ChartLegendProps {
  items: LegendItem[];
}

export const ChartLegend: React.FC<ChartLegendProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-2" role="list" aria-label="Chart legend">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2" role="listitem">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
          <span className="text-sm text-slate-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
