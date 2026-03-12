import React from 'react';

export interface AvatarImageProps {
  src?: string;
  alt: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt, initials, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl'
  };

  return (
    <div
      role="img"
      aria-label={`Player photo of ${alt}`}
      className={`inline-flex items-center justify-center rounded-full overflow-hidden bg-indigo-600 text-white font-bold select-none ${sizeClasses[size]}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials || alt.substring(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
};