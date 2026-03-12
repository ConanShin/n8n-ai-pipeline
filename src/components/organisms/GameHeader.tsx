
import React from 'react';
import { ScoreDisplay } from '../molecules/ScoreDisplay';
import { CountBoard } from '../molecules/CountBoard';

export interface GameHeaderProps {
  score: number;
  strikes: number;
  outs: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ score, strikes, outs }) => {
  return (
    <header className="flex items-center justify-between w-full px-4 py-3 bg-gray-900 border-b border-gray-700 z-10" role="banner" aria-label="게임 상태 헤더">
      <ScoreDisplay score={score} />
      <CountBoard strikes={strikes} outs={outs} />
    </header>
  );
};
