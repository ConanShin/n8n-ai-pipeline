import React from 'react';

export const Divider: React.FC = () => {
  return (
    <div 
      className="flex items-center w-full gap-3 text-sm text-gray-500 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300"
      role="separator"
      aria-label="Divider"
    >
      or
    </div>
  );
};