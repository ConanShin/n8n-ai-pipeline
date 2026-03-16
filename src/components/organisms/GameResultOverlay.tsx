
import React from 'react';
import { ResultCard } from '../molecules/ResultCard';
import { HitResult } from '../atoms/HitHistoryItem';
export interface GameResultOverlayProps { isVisible: boolean; finalScore: number; hits: HitResult[]; onRestart: () => void; onHome: () => void; }
export const GameResultOverlay: React.FC<GameResultOverlayProps> = ({ isVisible, finalScore, hits, onRestart, onHome }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-6 transition-opacity duration-500" role="dialog" aria-modal="true" aria-label="게임 결과 화면">
      <div className="transform transition-transform duration-500 translate-y-0">
        <ResultCard finalScore={finalScore} hits={hits} onRestart={onRestart} onHome={onHome} />
      </div>
    </div>
  );
};
