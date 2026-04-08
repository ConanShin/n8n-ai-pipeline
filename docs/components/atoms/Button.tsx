import React, { ReactNode } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary', 
  icon, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-500',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};
