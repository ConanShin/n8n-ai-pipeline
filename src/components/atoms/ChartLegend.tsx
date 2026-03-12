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
    <ul className="flex flex-wrap items-center gap-4 text-sm text-gray-600" role="list" aria-label="Chart legend">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};
