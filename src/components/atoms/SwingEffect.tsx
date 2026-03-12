
import React from 'react';

export interface SwingEffectProps {
  isActive: boolean;
}

export const SwingEffect: React.FC<SwingEffectProps> = ({ isActive }) => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none z-10" aria-hidden="true">
      <div 
        data-active={isActive}
        className="w-full h-full rounded-full border-4 border-white/60 border-b-transparent rotate-[-30deg] opacity-0 data-[active=true]:opacity-100 data-[active=true]:animate-ping"
      />
    </div>
  );
};
