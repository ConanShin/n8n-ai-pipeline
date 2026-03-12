import React from 'react';
import { SectionHeading } from '../atoms/SectionHeading';
import { StatsTableRow, StatsTableRowProps } from '../atoms/StatsTableRow';

export interface StatsTableProps {
  rows: StatsTableRowProps[];
  caption?: string;
  isLoading?: boolean;
}

export const StatsTable: React.FC<StatsTableProps> = ({ rows, caption, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto rounded-2xl bg-slate-800 shadow-lg p-6" role="table" aria-label="Loading batting statistics">
        <div className="h-6 w-48 bg-slate-700 rounded mb-6 animate-pulse"></div>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-10 w-full bg-slate-700 rounded"></div>)}
        </div>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="w-full rounded-2xl bg-slate-800 shadow-lg p-6 flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
        <p>No statistics available.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-slate-800 shadow-lg p-4 md:p-6">
      <SectionHeading title="Batting Statistics" />
      <table className="w-full text-sm mt-4 min-w-[800px]" role="table" aria-label={caption || "Batting statistics table"}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b-2 border-slate-700 text-slate-400 uppercase tracking-wider text-xs">
            <th scope="col" className="px-4 py-3 text-left font-semibold">Season</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">G</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">AB</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">H</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">2B</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">3B</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">HR</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">RBI</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">AVG</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">OBP</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">SLG</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">OPS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <StatsTableRow key={idx} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
