import React, { useState } from 'react';

export interface TeamAvatarProps {
  initials: string;
  teamColor?: string;
  size?: 'sm' | 'md' | 'lg';
  logoSrc?: string;
}

export const TeamAvatar: React.FC<TeamAvatarProps> = ({
  initials,
  teamColor = '#374151',
  size = 'md',
  logoSrc,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-xl',
  };

  const showImage = logoSrc && !imageError;

  return (
    <div
      role="img"
      aria-label={`${initials} 팀 로고`}
      className={`flex items-center justify-center rounded-full font-extrabold tracking-tight select-none shrink-0 overflow-hidden ${sizeMap[size]}`}
      style={{ backgroundColor: showImage ? 'transparent' : teamColor }}
    >
      {showImage ? (
        <img
          src={logoSrc}
          alt={`${initials} 팀 로고`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-white">{initials}</span>
      )}
    </div>
  );
};
