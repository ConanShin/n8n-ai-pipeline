import React, { useState } from 'react';

export interface PlayerAvatarProps {
  src?: string;
  alt: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ src, alt, initials, size = 'md' }) => {
  const [hasError, setHasError] = useState(false);
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-20 h-20 text-xl',
    lg: 'w-28 h-28 text-3xl'
  };

  return (
    <div 
      className={`relative flex items-center justify-center rounded-full overflow-hidden bg-gray-200 shrink-0 ${sizeClasses[size]}`}
      role="img"
      aria-label="Player profile photo"
    >
      {src && !hasError ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
          onError={() => setHasError(true)} 
        />
      ) : (
        <span className="font-bold text-gray-500 uppercase">{initials}</span>
      )}
    </div>
  );
};