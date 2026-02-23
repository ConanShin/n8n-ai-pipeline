import React from 'react';

export interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Sign in with ${provider}`}
    >
      <span className="sr-only">Sign in with {provider}</span>
      {icon}
    </button>
  );
};

export default SocialButton;
