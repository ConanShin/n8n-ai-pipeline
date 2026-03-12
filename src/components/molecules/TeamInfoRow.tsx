import React from 'react';
import { TeamAvatar } from '../atoms';

export interface TeamInfoRowProps {
  teamName: string;
  teamShortName: string;
  initials: string;
  teamColor?: string;
  logoSrc?: string;
}

export const TeamInfoRow: React.FC<TeamInfoRowProps> = ({
  teamName,
  teamShortName,
  initials,
  teamColor,
  logoSrc,
}) => {
  return (
    <div
      role="rowheader"
      aria-label={teamName}
      className="flex items-center gap-2 sm:gap-3 min-w-[120px] sm:min-w-[160px] px-2 sm:px-3 h-9 sm:h-10 shrink-0"
    >
      <TeamAvatar initials={initials} teamColor={teamColor} size="sm" logoSrc={logoSrc} />
      <div className="flex flex-col min-w-0">
        <span className="hidden sm:block text-sm font-bold text-gray-100 truncate">
          {teamName}
        </span>
        <span className="sm:hidden text-sm font-bold text-gray-100 truncate">
          {teamShortName}
        </span>
      </div>
    </div>
  );
};
