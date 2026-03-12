import React from 'react';
import { AvatarImage } from '../atoms/AvatarImage';
import { StatBadge } from '../atoms/StatBadge';

export interface PlayerProfileCardProps {
  playerName: string;
  teamName: string;
  position: string;
  jerseyNumber?: number;
  avatarSrc?: string;
  battingAverage: number;
  homeRuns: number;
  rbi: number;
  gamesPlayed?: number;
  isLoading?: boolean;
  hasError?: boolean;
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  playerName,
  teamName,
  position,
  jerseyNumber,
  avatarSrc,
  battingAverage,
  homeRuns,
  rbi,
  isLoading,
  hasError
}) => {
  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 rounded-2xl h-32 w-full"></div>;
  }
  if (hasError) {
    return <div className="p-6 bg-red-50 text-red-500 rounded-2xl w-full text-center">Failed to load profile</div>;
  }

  const formatAvg = (avg: number) => {
    return avg.toFixed(3).replace(/^0+/, '');
  };

  return (
    <div
      role="region"
      aria-label={`Player profile card for ${playerName}`}
      className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6 bg-white rounded-2xl shadow-md border border-gray-100 w-full"
    >
      <AvatarImage src={avatarSrc} alt={playerName} initials={playerName.charAt(0)} size="lg" />
      <div className="flex flex-col gap-1 flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{playerName}</h2>
        <p className="text-sm text-gray-500 font-medium">#{jerseyNumber} · {position} · {teamName}</p>
      </div>
      <div className="flex flex-row sm:flex-col gap-3 flex-wrap justify-center sm:justify-end">
        <StatBadge label="AVG" value={formatAvg(battingAverage)} variant="primary" />
        <StatBadge label="HR" value={homeRuns} variant="warning" />
        <StatBadge label="RBI" value={rbi} variant="success" />
      </div>
    </div>
  );
};
