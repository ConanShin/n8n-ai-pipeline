import React from 'react';

export interface DashboardHeaderProps {
  title: string;
  selectedSeason: string;
  seasons: string[];
  onSeasonChange?: (season: string) => void;
  onExport?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  selectedSeason,
  seasons,
  onSeasonChange,
  onExport
}) => {
  return (
    <div
      role="banner"
      aria-label="Dashboard header"
      className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20 w-full"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚾</span>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <select
          aria-label="Select season"
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          value={selectedSeason}
          onChange={(e) => onSeasonChange?.(e.target.value)}
        >
          {seasons.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={onExport}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Export
        </button>
      </div>
    </div>
  );
};
