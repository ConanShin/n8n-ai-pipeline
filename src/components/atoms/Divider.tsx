import React from 'react';

export const Divider: React.FC = () => {
  return (
    <div 
      className="relative flex items-center py-5 w-full before:flex-grow before:border-t before:border-gray-300 after:flex-grow after:border-t after:border-gray-300"
      role="separator"
      aria-label="or"
    >
      <span className="px-4 text-sm text-gray-500">or</span>
    </div>
  );
};
