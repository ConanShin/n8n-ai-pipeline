import React from 'react';

export interface GameTitleProps {
  title: string;
  subtitle?: string;
}

export const GameTitle: React.FC<GameTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center gap-2 text-center" role="heading" aria-label="야구 게임 타이틀" aria-level={1}>
      <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-400 tracking-widest drop-shadow-lg">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-300 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
