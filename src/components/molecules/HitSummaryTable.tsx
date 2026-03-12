
import React from 'react';

export interface HitSummaryTableProps {
  summary: { homeruns: number; triples: number; doubles: number; singles: number; strikes: number };
}

export const HitSummaryTable: React.FC<HitSummaryTableProps> = ({ summary }) => {
  const items = [
    { label: 'HR', count: summary.homeruns },
    { label: '3B', count: summary.triples },
    { label: '2B', count: summary.doubles },
    { label: '1B', count: summary.singles },
    { label: 'ST', count: summary.strikes },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 w-full max-w-sm" role="table" aria-label="타격 결과 요약">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1 bg-gray-800 rounded-xl p-3">
          <span className="text-xs text-gray-400 font-medium">{item.label}</span>
          <span className="text-2xl font-black text-white">{item.count}</span>
        </div>
      ))}
    </div>
  );
};
