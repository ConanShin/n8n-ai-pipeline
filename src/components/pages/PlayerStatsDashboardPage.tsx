import React, { useState, useEffect } from 'react';
import { PlayerProfileCard } from '../molecules/PlayerProfileCard';
import { StatsTable } from '../organisms/StatsTable';
import { PerformanceChart } from '../organisms/PerformanceChart';
import { DashboardTemplate } from '../templates/DashboardTemplate';
import { EmptyState } from '../atoms/EmptyState';

export interface PlayerStatsDashboardPageProps {
  playerId: string;
}

const mockPlayerData = {
  playerName: "Shohei Ohtani",
  teamName: "Los Angeles Dodgers",
  teamLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Los_Angeles_Dodgers_Logo.svg/120px-Los_Angeles_Dodgers_Logo.svg.png",
  position: "DH/SP",
  jerseyNumber: "17",
  avatarUrl: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/39832.png",
  battingAverage: 0.304,
  homeRuns: 44,
  rbi: 95,
  season: "2024 Season"
};

const mockGameData = [
  { date: "Mar 01", opponent: "SD", atBats: 4, hits: 2, homeRuns: 1, rbi: 2, battingAverage: 0.500 },
  { date: "Mar 03", opponent: "SF", atBats: 3, hits: 1, homeRuns: 0, rbi: 0, battingAverage: 0.333 },
  { date: "Mar 05", opponent: "COL", atBats: 5, hits: 3, homeRuns: 2, rbi: 4, battingAverage: 0.600 },
  { date: "Mar 06", opponent: "COL", atBats: 4, hits: 1, homeRuns: 0, rbi: 1, battingAverage: 0.250 },
  { date: "Mar 08", opponent: "ARI", atBats: 3, hits: 0, homeRuns: 0, rbi: 0, battingAverage: 0.000 },
  { date: "Mar 09", opponent: "ARI", atBats: 4, hits: 2, homeRuns: 0, rbi: 1, battingAverage: 0.500 },
  { date: "Mar 10", opponent: "SD", atBats: 4, hits: 1, homeRuns: 0, rbi: 0, battingAverage: 0.250 },
  { date: "Mar 11", opponent: "SF", atBats: 4, hits: 2, homeRuns: 1, rbi: 3, battingAverage: 0.500 }
];

export const PlayerStatsDashboardPage: React.FC<PlayerStatsDashboardPageProps> = ({ playerId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [playerId]);

  const chartData = mockGameData.map(game => ({
    label: game.date,
    hits: game.hits,
    homeRuns: game.homeRuns,
    battingAverage: game.battingAverage
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" role="main" aria-label="Baseball player statistics dashboard page">
      <header className="w-full bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">StatsCenter</h1>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800" onClick={() => { setIsLoading(true); setHasError(false); setTimeout(() => setIsLoading(false), 1000); }}>
            Refresh
          </button>
        </div>
      </header>

      {hasError && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3 text-center text-red-700">
          <p>Failed to load player data. <button className="font-bold underline" onClick={() => { setIsLoading(true); setHasError(false); setTimeout(() => setIsLoading(false), 1000); }}>Try again</button></p>
        </div>
      )}

      <main className="flex-1 py-6">
        {hasError ? (
          <EmptyState icon="⚠️" message="Unable to load dashboard" subMessage="Please check your connection and try again." />
        ) : (
          <DashboardTemplate 
            isLoading={isLoading}
            profileCard={
              <PlayerProfileCard 
                {...mockPlayerData} 
                isLoading={isLoading} 
              />
            }
            performanceChart={
              <PerformanceChart 
                data={chartData} 
                isLoading={isLoading} 
              />
            }
            statsTable={
              <StatsTable 
                rows={mockGameData} 
                isLoading={isLoading} 
              />
            }
          />
        )}
      </main>
    </div>
  );
};