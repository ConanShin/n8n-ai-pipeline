import React from 'react';

export interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover border-2 border-white shadow-sm block ${sizeClasses[size]}`}
      role="img"
      aria-label="User avatar"
    />
  );
};
