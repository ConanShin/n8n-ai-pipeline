
import React from 'react';
import { ResultBadge } from '../atoms/ResultBadge';
import { ScoreLabel } from '../atoms/ScoreLabel';

export interface ResultScreenProps {
  totalScore: number;
  history: Array<{ result: string; points: number }>;
  grade: 'legend' | 'great' | 'good' | 'out';
  onRestart: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ totalScore, history, grade, onRestart, onHome }) => {
  const gradeMap = {
    legend: { label: "전설의 타자!", icon: "🏆" },
    great: { label: "강타자!", icon: "💪" },
    good: { label: "선전했어요!", icon: "👍" },
    out: { label: "삼진 아웃...", icon: "😢" }
  };

  return (
    <main role="main" aria-label="게임 최종 결과 화면" className="flex flex-col items-center justify-center gap-8 w-full min-h-screen bg-gray-950 px-6 py-12">
      <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">게임 종료!</h2>
      
      <ResultBadge grade={grade} label={gradeMap[grade].label} icon={gradeMap[grade].icon} />

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {history.map((h, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-xl">
            <span className="text-gray-400 text-sm font-medium">{i + 1}타석</span>
            <ScoreLabel result={h.result as any} size="sm" />
            <span className="text-gray-300 text-sm font-bold tabular-nums">+{h.points}점</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full max-w-xs px-4 py-4 bg-gray-800 rounded-2xl border border-yellow-500/30">
        <span className="text-gray-300 font-bold text-lg">최종 점수</span>
        <span className="text-yellow-300 font-black text-3xl tabular-nums">{totalScore}점</span>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
        <button 
          role="button" aria-label="게임 다시 시작"
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 active:scale-95 text-white font-extrabold text-xl shadow-lg transition-all"
        >🔄 다시 도전</button>
        <button 
          role="button" aria-label="홈 화면으로 이동"
          onClick={onHome}
          className="w-full py-4 rounded-2xl bg-gray-700 hover:bg-gray-600 active:bg-gray-800 active:scale-95 text-gray-200 font-bold text-lg shadow transition-all"
        >🏠 홈으로</button>
      </div>
    </main>
  );
};
