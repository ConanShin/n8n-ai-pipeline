import React from 'react';

export interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: string;
  icon: string;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, icon, disabled, ...props }) => {
  return (
    <button
      type="button"
      className={`w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 active:bg-gray-100'
      }`}
      role="button"
      aria-label={`Login with ${provider}`}
      disabled={disabled}
      {...props}
    >
      <span className="w-5 h-5 flex items-center justify-center text-lg">{icon}</span>
      <span className="hidden sm:inline">Continue with {provider}</span>
      <span className="sm:hidden">{provider}</span>
    </button>
  );
};
