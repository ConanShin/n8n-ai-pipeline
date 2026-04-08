
import React from 'react';
import { ScoreBoard } from '../molecules/ScoreBoard';
import { RhythmMetronome } from '../molecules/RhythmMetronome';

export interface GameHUDProps {
  score: number;
  currentInning: number;
  usedChances: number;
  bpm: number;
  beat: number;
  gamePhase: string;
}

export const GameHUD: React.FC<GameHUDProps> = ({ score, currentInning, usedChances, bpm, beat, gamePhase }) => {
  return (
    <div 
      role="banner" 
      aria-label="게임 정보 헤더 — 점수, 타석, 기회, 박자"
      className="sticky top-0 z-30 flex flex-col gap-3 w-full px-4 pt-4 pb-3 bg-gray-950/90 backdrop-blur-md border-b border-gray-800"
    >
      <ScoreBoard score={score} currentInning={currentInning} usedChances={usedChances} />
      <RhythmMetronome bpm={bpm} active={gamePhase === 'playing'} beat={beat} />
    </div>
  );
};
