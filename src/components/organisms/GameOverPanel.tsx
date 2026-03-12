import React from 'react';

export interface HitSummary {
  homerun: number;
  triple: number;
  double: number;
  single: number;
  strike: number;
}

export interface GameOverPanelProps {
  finalScore: number;
  isNewRecord?: boolean;
  hitSummary: HitSummary;
  onRestart: () => void;
  onHome?: () => void;
  visible: boolean;
}

export const GameOverPanel: React.FC<GameOverPanelProps> = ({
  finalScore,
  isNewRecord = false,
  hitSummary,
  onRestart,
  onHome,
  visible
}) => {
  if (!visible) return null;

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-8 bg-gray-950/95 backdrop-blur-sm z-50 px-6 animate-[slideUp_400ms_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={`게임 종료 — 최종 점수 ${finalScore}점`}
    >
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">GAME OVER</p>
        {isNewRecord && (
          <p className="text-yellow-400 font-black text-lg tracking-wide animate-bounce">
            🎉 NEW RECORD!
          </p>
        )}
        <p className="text-6xl sm:text-7xl font-black text-white tabular-nums mt-2">{finalScore}</p>
        <p className="text-sm text-gray-500 mt-1">FINAL SCORE</p>
      </div>

      <div className="w-full max-w-xs grid grid-cols-5 gap-2 bg-gray-900 rounded-2xl p-4">
        {[
          { emoji: '🏆', value: hitSummary.homerun, label: '홈런', color: 'text-yellow-300' },
          { emoji: '🔥', value: hitSummary.triple, label: '3루타', color: 'text-orange-400' },
          { emoji: '⚡', value: hitSummary.double, label: '2루타', color: 'text-green-400' },
          { emoji: '✅', value: hitSummary.single, label: '1루타', color: 'text-blue-300' },
          { emoji: '✕', value: hitSummary.strike, label: '스트라이크', color: 'text-red-400' },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <span className="text-xl">{item.emoji}</span>
            <span className={`text-lg font-black ${item.color}`}>{item.value}</span>
            <span className="text-[10px] sm:text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button 
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-xl tracking-wide shadow-xl shadow-orange-500/40 hover:from-amber-300 hover:to-orange-400 active:scale-95 transition-all duration-150"
          role="button"
          aria-label="게임 다시 시작"
        >
          ⚾ 다시 하기
        </button>
        {!!onHome && (
          <button 
            onClick={onHome}
            className="w-full py-3 rounded-2xl bg-gray-800 text-gray-300 font-bold text-base hover:bg-gray-700 hover:text-white transition-colors"
            role="button"
            aria-label="홈 화면으로 이동"
          >
            🏠 홈으로
          </button>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0%); }
        }
      `}</style>
    </div>
  );
};
