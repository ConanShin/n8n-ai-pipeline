
import React from 'react';
import { ResultGradeIcon, Grade } from '../atoms/ResultGradeIcon';
import { FinalScoreDisplay } from '../atoms/FinalScoreDisplay';
import { HitHistoryItem, HitResult } from '../atoms/HitHistoryItem';
import { RestartButton, HomeButton } from '../atoms/ActionButtons';

export interface ResultCardProps { finalScore: number; hits: HitResult[]; onRestart: () => void; onHome: () => void; }
export const ResultCard: React.FC<ResultCardProps> = ({ finalScore, hits, onRestart, onHome }) => {
  let grade: Grade = 'tryAgain';
  if (finalScore >= 8) grade = 'mvp';
  else if (finalScore >= 3) grade = 'good';
  
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700" role="document" aria-label="게임 결과 카드">
      <ResultGradeIcon grade={grade} />
      <FinalScoreDisplay score={finalScore} />
      <div className="flex flex-row items-center justify-center gap-3 w-full" role="list" aria-label="타석 결과 목록">
        {Array.from({ length: 3 }).map((_, i) => <HitHistoryItem key={i} inning={i + 1} result={hits[i] || 'none'} />)}
      </div>
      <div className="flex flex-col gap-3 w-full" role="group" aria-label="게임 결과 액션 버튼">
        <RestartButton onClick={onRestart} />
        <HomeButton onClick={onHome} />
      </div>
    </div>
  );
};
