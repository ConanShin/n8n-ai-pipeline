
import React from 'react';
import { ScoreBadge } from '../atoms/ScoreBadge';
import { HitResultLabel, HitVariant } from '../atoms/HitResultLabel';
import { AttemptsIndicator } from '../molecules/AttemptsIndicator';
export interface GameHeaderProps { score: number; attemptsLeft: number; lastHitLabel?: string; lastHitVariant?: HitVariant; }
export const GameHeader: React.FC<GameHeaderProps> = ({ score, attemptsLeft, lastHitLabel, lastHitVariant }) => (
  <header className="flex flex-row items-center justify-between w-full px-4 py-3 bg-black/40 backdrop-blur-sm z-10" role="banner" aria-label="게임 정보 헤더">
    <ScoreBadge score={score} />
    <HitResultLabel label={lastHitLabel} variant={lastHitVariant} />
    <AttemptsIndicator total={3} remaining={attemptsLeft} />
  </header>
);
