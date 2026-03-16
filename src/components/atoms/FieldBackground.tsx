
import React from 'react';
export const FieldBackground: React.FC = () => (
  <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-green-700 via-green-600 to-green-500" role="img" aria-label="야구장 배경" aria-hidden="true">
    <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-700/60 rounded-full"></div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2/5 bg-amber-800/40 rounded-t-full"></div>
  </div>
);
