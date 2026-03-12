import React, { useState, useEffect } from 'react';
import { DashboardHeader, PlayerStatsTable, PerformanceChart } from '../organisms';
import { PlayerProfileCard } from '../molecules';
import { GameStat } from '../molecules/StatsTableRow';

export interface DashboardPageProps {
  playerId?: string;
}

const MOCK_PLAYER_DATA = {
  playerName: "Shohei Ohtani",
  team: "LAD",
  position: "DH",
  jerseyNumber: 17,
  avatarSrc: "https://i.pravatar.cc/150?u=shohei",
  stats: {
    avg: ".310",
    hr: 54,
    rbi: 130,
    ops: "1.036"
  }
};

const MOCK_GAMES: GameStat[] = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date(2026, 2, 30 - i);
  const hits = Math.floor(Math.random() * 4);
  const atBats = hits + Math.floor(Math.random() * 3) + 1;
  const hr = hits > 0 ? Math.floor(Math.random() * 2) : 0;
  const rbi = hr * 1 + Math.floor(Math.random() * 3);
  
  return {
    date: date.toISOString().split('T')[0],
    opponent: ['NYY', 'SF', 'SD', 'ARI', 'BOS', 'HOU'][Math.floor(Math.random() * 6)],
    result: Math.random() > 0.4 ? 'W' : 'L',
    atBats,
    hits,
    hr,
    rbi,
    avg: (Math.random() * 0.15 + 0.250).toFixed(3).replace('0.', '.')
  };
});

export const DashboardPage: React.FC<DashboardPageProps> = ({ playerId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [playerId]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div 
      role="main" 
      aria-label="Baseball player statistics dashboard"
      className={`${isDark ? 'dark bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen p-4 sm:p-6 lg:p-10`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        <DashboardHeader 
          onSearch={handleSearch} 
          onThemeToggle={toggleTheme} 
          isDark={isDark} 
        />
        
        <div className="col-span-1 lg:col-span-12">
          {isLoading ? (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gray-800 rounded-2xl shadow-lg w-full animate-pulse">
              <div className="w-24 h-24 bg-gray-700 rounded-full" />
              <div className="flex-1 space-y-4 w-full">
                <div className="h-8 bg-gray-700 rounded w-1/3" />
                <div className="h-4 bg-gray-700 rounded w-1/4" />
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-16 h-16 bg-gray-700 rounded-xl" />)}
                </div>
              </div>
            </div>
          ) : (
            <PlayerProfileCard {...MOCK_PLAYER_DATA} />
          )}
        </div>
        
        <div className="col-span-1 lg:col-span-5 flex h-full min-h-[350px]">
          {isLoading ? (
            <div className="bg-gray-800 rounded-2xl p-6 w-full h-full animate-pulse flex flex-col gap-4">
              <div className="h-6 bg-gray-700 rounded w-1/2" />
              <div className="flex-1 bg-gray-700/50 rounded-lg mt-4" />
            </div>
          ) : (
            <PerformanceChart games={MOCK_GAMES} />
          )}
        </div>
        
        <div className="col-span-1 lg:col-span-7 flex h-full min-h-[350px]">
          {isLoading ? (
            <div className="bg-gray-800 rounded-2xl p-6 w-full h-full animate-pulse flex flex-col gap-4">
              <div className="h-6 bg-gray-700 rounded w-1/3" />
              <div className="space-y-3 mt-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-700/50 rounded" />
                ))}
              </div>
            </div>
          ) : (
            <PlayerStatsTable rows={MOCK_GAMES} />
          )}
        </div>
      </div>
    </div>
  );
};