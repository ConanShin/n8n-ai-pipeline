
import React from 'react';
export const HitZone: React.FC = () => (
  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-row items-center h-full w-full" role="presentation" aria-hidden="true">
    <div className="absolute inset-0 h-full flex-1 bg-red-700/60 rounded-full" />
    <div className="absolute left-1/2 -translate-x-1/2 h-full flex flex-row items-center justify-center w-[70%] bg-blue-400" />
    <div className="absolute left-1/2 -translate-x-1/2 h-full flex flex-row items-center justify-center w-[44%] bg-green-400" />
    <div className="absolute left-1/2 -translate-x-1/2 h-full flex flex-row items-center justify-center w-[24%] bg-orange-400" />
    <div className="absolute left-1/2 -translate-x-1/2 h-full flex flex-row items-center justify-center w-[10%] bg-yellow-400 z-10" />
  </div>
);
