import React, { ReactNode } from 'react';

export interface GameTemplateProps {
  hud: ReactNode;
  field: ReactNode;
  overlay?: ReactNode;
}

export const GameTemplate: React.FC<GameTemplateProps> = ({ hud, field, overlay }) => {
  return (
    <div 
      className="relative flex flex-col w-full h-full min-h-[100dvh] max-w-sm mx-auto bg-gray-950 overflow-hidden"
      role="application"
      aria-label="야구 타이밍 배팅 게임"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-green-950/10 to-gray-950 pointer-events-none" />
      
      {/* Slots */}
      <div className="relative z-10 flex-shrink-0">
        {hud}
      </div>
      <div className="relative z-10 flex-1 w-full flex flex-col">
        {field}
      </div>
      
      {overlay && (
        <div className="absolute inset-0 z-50">
          {overlay}
        </div>
      )}
    </div>
  );
};
