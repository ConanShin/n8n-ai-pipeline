
import React, { ReactNode } from 'react';

export interface GameTemplateProps {
  hud: ReactNode;
  stage: ReactNode;
}

export const GameTemplate: React.FC<GameTemplateProps> = ({ hud, stage }) => {
  return (
    <div 
      role="application" 
      aria-label="야구 게임 레이아웃"
      className="flex flex-col min-h-screen max-w-lg mx-auto w-full bg-gray-950 text-white overflow-hidden"
    >
      <div className="w-full flex-shrink-0">{hud}</div>
      <div className="flex-1 flex flex-col overflow-hidden">{stage}</div>
    </div>
  );
};
