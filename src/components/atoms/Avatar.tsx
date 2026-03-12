import React, { useState } from 'react';

export interface AvatarProps {
  src?: string;
  alt: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, initials, size = 'md' }) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16 md:w-20 md:h-20',
    md: 'w-24 h-24 md:w-32 md:h-32',
    lg: 'w-32 h-32 md:w-40 md:h-40',
  };

  const baseClasses = `rounded-full object-cover border-4 border-blue-500 shadow-lg flex items-center justify-center bg-slate-700 text-white font-bold text-2xl ${sizeClasses[size]}`;

  if (!src || hasError) {
    return (
      <div className={baseClasses} role="img" aria-label={alt}>
        {initials || alt.substring(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={baseClasses}
      onError={() => setHasError(true)}
      role="img"
      aria-label={alt}
    />
  );
};
