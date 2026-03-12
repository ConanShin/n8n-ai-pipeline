import React, { useState } from 'react';

export interface AvatarProps {
  src?: string;
  alt: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, initials, size = 'md' }) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-lg',
    xl: 'w-32 h-32 text-2xl',
  };

  const displayInitials = initials || alt.slice(0, 2).toUpperCase();

  return (
    <div 
      className={`relative flex items-center justify-center rounded-full overflow-hidden bg-gray-200 shrink-0 ${sizeClasses[size]}`}
      role="img"
      aria-label={alt}
    >
      {src && !hasError ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
          onError={() => setHasError(true)} 
        />
      ) : (
        <span className="font-semibold text-gray-500">{displayInitials}</span>
      )}
    </div>
  );
};
