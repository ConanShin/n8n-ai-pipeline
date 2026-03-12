
import React from 'react';

export const FieldBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-green-900 to-green-950" aria-hidden="true">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-48 border-2 border-white/10 rotate-45 origin-bottom" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-white/20 bg-yellow-900/30" />
    </div>
  );
};
