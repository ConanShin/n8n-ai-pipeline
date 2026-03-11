
import React from 'react';

export interface BallIconProps {
  size?: number;
  variant?: 'active' | 'used' | 'flying';
  className?: string;
}

export const BallIcon: React.FC<BallIconProps> = ({ size = 24, variant = 'active', className = '' }) => {
  const baseClasses = "rounded-full shrink-0 inline-block";
  const variants = {
    active: "bg-white border-2 border-gray-300 shadow-inner",
    used: "bg-red-500 border-2 border-red-700 opacity-80 shadow-inner",
    flying: "bg-white border-4 border-gray-200 shadow-xl"
  };
  
  return (
    <div 
      role="img" 
      aria-label="야구공"
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
