import React from 'react';
import { Avatar } from '../atoms/Avatar';
import { StatBadge } from '../atoms/StatBadge';

export interface PlayerProfileCardProps {
  playerId: string;
  fullName: string;
  teamName: string;
  teamLogoUrl?: string;
  position: string;
  jerseyNumber: number;
  avatarUrl?: string;
  nationality?: string;
  keyStats: Array<{ label: string; value: string | number; trend?: 'up' | 'down' | 'neutral' }>;
  isLoading?: boolean;
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  fullName, teamName, teamLogoUrl, position, jerseyNumber, avatarUrl, nationality, keyStats, isLoading
}) => {
  if (isLoading) {
    return (
      <div 
        className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 shadow-xl w-full h-48 animate-pulse"
      >
        <div className="w-32 h-32 bg-blue-800 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="h-8 bg-blue-800 rounded w-1/3"></div>
          <div className="h-6 bg-blue-800 rounded w-1/4"></div>
          <div className="flex gap-2 mt-auto">
            <div className="h-8 bg-blue-800 rounded w-20"></div>
            <div className="h-8 bg-blue-800 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-xl w-full"
      role="region"
      aria-label={`Player profile for ${fullName}`}
    >
      <Avatar src={avatarUrl} alt={fullName} size="xl" />
      <div className="flex flex-col items-center md:items-start flex-1 text-center md:text-left h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{fullName}</h1>
            <span className="text-blue-200 text-xl font-medium">#{jerseyNumber}</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100 mb-6">
            {teamLogoUrl && <img src={teamLogoUrl} alt={teamName} className="w-5 h-5 rounded-full bg-white object-contain p-0.5" />}
            <span>{teamName}</span>
            <span>•</span>
            <span>{position}</span>
            {nationality && (
              <>
                <span>•</span>
                <span>{nationality}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 md:mt-0">
          {keyStats.map((stat, idx) => (
            <StatBadge 
              key={idx} 
              label={stat.label} 
              value={stat.value} 
              trend={stat.trend} 
              variant="highlight" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
