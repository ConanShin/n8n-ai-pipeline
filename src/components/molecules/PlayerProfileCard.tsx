import React from 'react';
import { Avatar } from '../atoms/Avatar';
import { PositionTag } from '../atoms/PositionTag';
import { StatBadge } from '../atoms/StatBadge';

export interface PlayerProfileCardProps {
  playerName: string;
  team: string;
  position: string;
  jerseyNumber: number;
  photoUrl?: string;
  stats: {
    avg: string;
    hr: number;
    rbi: number;
  };
  isLoading?: boolean;
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  playerName,
  team,
  position,
  jerseyNumber,
  photoUrl,
  stats,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl w-full animate-pulse" role="region" aria-label="Loading player profile">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-700"></div>
        <div className="h-6 w-32 bg-slate-700 rounded mt-2"></div>
        <div className="h-4 w-24 bg-slate-700 rounded"></div>
        <div className="flex gap-4 mt-4">
          <div className="w-20 h-16 bg-slate-700 rounded-xl"></div>
          <div className="w-20 h-16 bg-slate-700 rounded-xl"></div>
          <div className="w-20 h-16 bg-slate-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const initials = playerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div 
      className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl text-white w-full"
      role="region"
      aria-label={`Player profile card for ${playerName}`}
    >
      <Avatar src={photoUrl} alt={playerName} initials={initials} />
      
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-1 flex items-center justify-center gap-2">
          {playerName}
          <span className="text-slate-400 font-medium text-lg">#{jerseyNumber}</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="text-slate-300">{team}</span>
          <span className="text-slate-500">•</span>
          <PositionTag position={position} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-2 w-full">
        <StatBadge label="AVG" value={stats.avg} highlight />
        <StatBadge label="HR" value={stats.hr} />
        <StatBadge label="RBI" value={stats.rbi} />
      </div>
    </div>
  );
};
