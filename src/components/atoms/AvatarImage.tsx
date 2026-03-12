import React, { useState } from 'react';

export interface AvatarImageProps {
  src?: string;
  alt: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt, initials, size = 'md' }) => {
  const [hasError, setHasError] = useState(false);
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
  };

  const showFallback = !src || hasError;

  return (
    <div
      role="img"
      aria-label={alt || "Player profile photo"}
      className={`flex items-center justify-center rounded-full overflow-hidden bg-gray-200 text-gray-600 font-bold shrink-0 ${sizeClasses[size]}`}
    >
      {showFallback ? (
        <span>{initials}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
