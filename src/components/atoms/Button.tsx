import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  type = 'button', 
  disabled = false, 
  isLoading = false,
  ...props 
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`w-full flex items-center justify-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      role="button"
      aria-label="Submit Button"
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
      ) : (
        label
      )}
    </button>
  );
};
