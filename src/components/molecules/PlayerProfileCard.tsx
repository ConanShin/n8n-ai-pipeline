import React from 'react';
import { PlayerAvatar } from '../atoms/PlayerAvatar';
import { StatBadge } from '../atoms/StatBadge';

export interface PlayerProfileCardProps {
  playerName: string;
  teamName: string;
  teamLogoUrl?: string;
  position: string;
  jerseyNumber: string | number;
  avatarUrl?: string;
  battingAverage: number;
  homeRuns: number;
  rbi: number;
  season?: string;
  isLoading?: boolean;
  error?: boolean;
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  playerName, teamName, teamLogoUrl, position, jerseyNumber, avatarUrl, battingAverage, homeRuns, rbi, season, isLoading, error
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-white rounded-2xl shadow-md border border-gray-100 w-full animate-pulse">
        <div className="w-28 h-28 bg-gray-200 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-3 flex-1 w-full">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-20 h-16 bg-gray-200 rounded-xl"></div>
            <div className="w-20 h-16 bg-gray-200 rounded-xl"></div>
            <div className="w-20 h-16 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 bg-red-50 rounded-2xl border border-red-100 w-full text-red-600">
        Failed to load player profile.
      </div>
    );
  }

  const initials = playerName.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-white rounded-2xl shadow-md border border-gray-100 w-full" role="region" aria-label="Player profile">
      <div className="shrink-0">
        <PlayerAvatar src={avatarUrl} alt={playerName} initials={initials} size="lg" />
      </div>
      <div className="flex flex-col gap-3 flex-1 w-full text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{playerName}</h1>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="text-xl text-gray-500">#{jerseyNumber}</span>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-700">{position}</span>
          <span>•</span>
          {teamLogoUrl && <img src={teamLogoUrl} alt={teamName} className="w-5 h-5 object-contain" />}
          <span>{teamName}</span>
          {season && (
            <>
              <span>•</span>
              <span>{season}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
          <StatBadge label="AVG" value={battingAverage.toFixed(3).replace(/^0/, '')} variant="blue" />
          <StatBadge label="HR" value={homeRuns} variant="green" />
          <StatBadge label="RBI" value={rbi} variant="yellow" />
        </div>
      </div>
    </div>
  );
};