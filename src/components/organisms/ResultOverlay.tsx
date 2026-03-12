
import React from 'react';
import { ResultTitle } from '../atoms/ResultTitle';
import { FinalScoreDisplay } from '../molecules/FinalScoreDisplay';
import { HitSummaryTable } from '../molecules/HitSummaryTable';
import { RestartButton } from '../atoms/RestartButton';

export interface ResultOverlayProps {
  isVisible: boolean;
  finalScore: number;
  summary: { homeruns: number; triples: number; doubles: number; singles: number; strikes: number };
  onRestart: () => void;
}

export const ResultOverlay: React.FC<ResultOverlayProps> = ({ isVisible, finalScore, summary, onRestart }) => {
  if (!isVisible) return null;
  
  const message = finalScore > 20 ? '대박이다!' : finalScore > 10 ? '게임 종료!' : '연습이 필요해!';

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-gray-950/95 backdrop-blur-md z-50 px-6 transition-opacity duration-400 ease-out" role="dialog" aria-modal="true" aria-label="게임 결과">
      <ResultTitle message={message} />
      <FinalScoreDisplay score={finalScore} />
      <HitSummaryTable summary={summary} />
      <RestartButton onClick={onRestart} />
    </div>
  );
};
