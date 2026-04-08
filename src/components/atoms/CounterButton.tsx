import React from 'react';

export interface CounterButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const CounterButton: React.FC<CounterButtonProps> = ({
  label,
  onClick,
  variant = 'primary'
}) => {
  const baseClasses = "flex justify-center items-center px-6 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105 active:scale-95 shadow-md";
  
  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = "bg-blue-500 hover:bg-blue-600";
  } else if (variant === 'secondary') {
    variantClasses = "bg-gray-500 hover:bg-gray-600";
  } else if (variant === 'danger') {
    variantClasses = "bg-red-500 hover:bg-red-600";
  }

  return (
    <button
      role="button"
      aria-label="Counter action button"
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
