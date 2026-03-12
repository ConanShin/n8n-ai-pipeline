import React from 'react';

export interface DashboardHeaderProps {
  dashboardTitle: string;
  season?: string;
  teamLogoUrl?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ dashboardTitle, season, teamLogoUrl }) => {
  return (
    <header 
      className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-700 w-full"
      role="banner"
      aria-label="Dashboard header"
    >
      <div className="flex items-center gap-4">
        {teamLogoUrl && (
          <img src={teamLogoUrl} alt="Team Logo" className="w-10 h-10 object-contain" />
        )}
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{dashboardTitle}</h1>
      </div>
      {season && (
        <div className="text-sm font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          {season}
        </div>
      )}
    </header>
  );
};
