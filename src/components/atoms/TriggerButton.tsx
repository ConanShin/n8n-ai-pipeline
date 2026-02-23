import React from 'react';

export interface TriggerButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

export const TriggerButton: React.FC<TriggerButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      className={`inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      role="button"
      aria-label="Start E2E Test"
    >
      Start E2E Test
    </button>
  );
};
