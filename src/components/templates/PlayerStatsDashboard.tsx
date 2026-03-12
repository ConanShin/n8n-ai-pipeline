import React, { useState } from 'react';
import { DashboardHeader } from '../molecules/DashboardHeader';
import { PlayerProfileCard } from '../molecules/PlayerProfileCard';
import { StatsTable } from '../organisms/StatsTable';
import { StatFilterToggle } from '../molecules/StatFilterToggle';
import { PerformanceChart, GameData } from '../organisms/PerformanceChart';
import { StatsTableRowProps } from '../atoms/StatsTableRow';

export interface PlayerData {
  name: string;
  team: string;
  position: string;
  jerseyNumber: number;
  photoUrl?: string;
  stats: {
    avg: string;
    hr: number;
    rbi: number;
  };
  seasonStats: StatsTableRowProps[];
  recentGames: GameData[];
}

export interface PlayerStatsDashboardProps {
  player: PlayerData | null;
  isLoading?: boolean;
  error?: string;
}

export const PlayerStatsDashboard: React.FC<PlayerStatsDashboardProps> = ({ player, isLoading, error }) => {
  const [activeStat, setActiveStat] = useState<'hits' | 'homeRuns' | 'rbi'>('hits');

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6" role="main" aria-label="Error loading dashboard">
        <div className="bg-red-900/20 border border-red-500 text-red-400 p-6 rounded-2xl max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col" role="main" aria-label="Baseball player statistics dashboard">
      <DashboardHeader 
        dashboardTitle="Player Stats Dashboard" 
        season="2026 Season" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-6">
          <PlayerProfileCard 
            playerName={player?.name || ''}
            team={player?.team || ''}
            position={player?.position || ''}
            jerseyNumber={player?.jerseyNumber || 0}
            photoUrl={player?.photoUrl}
            stats={player?.stats || { avg: '.000', hr: 0, rbi: 0 }}
            isLoading={isLoading}
          />
        </div>
        
        {/* Main Content */}
        <div className="col-span-1 flex flex-col gap-6 w-full overflow-hidden">
          <StatsTable 
            rows={player?.seasonStats || []} 
            caption={`${player?.name || 'Player'} Batting Statistics`}
            isLoading={isLoading}
          />
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <StatFilterToggle 
                options={[
                  { value: 'hits', label: 'Hits' },
                  { value: 'homeRuns', label: 'Home Runs' },
                  { value: 'rbi', label: 'RBIs' }
                ]}
                activeOption={activeStat}
                onChange={(val) => setActiveStat(val as any)}
              />
            </div>
            <PerformanceChart 
              games={player?.recentGames || []} 
              activeStat={activeStat}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
