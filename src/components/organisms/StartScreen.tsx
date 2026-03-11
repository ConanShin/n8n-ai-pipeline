
import React from 'react';

export interface StartScreenProps {
  onStart: () => void;
  selectedDifficulty: 'easy' | 'normal' | 'hard';
  onDifficultyChange: (diff: 'easy' | 'normal' | 'hard') => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, selectedDifficulty, onDifficultyChange }) => {
  return (
    <main role="main" aria-label="야구 게임 시작 화면" className="flex flex-col items-center justify-center gap-8 w-full min-h-screen bg-gray-950 px-6 py-12">
      <div className="flex flex-col items-center gap-3">
        <span className="text-8xl drop-shadow-2xl">⚾</span>
        <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight text-center">탭 야구!</h1>
        <p className="text-gray-400 text-base text-center">박자에 맞춰 탭하고 홈런을 쳐내세요!</p>
      </div>

      <div className="w-full max-w-xs bg-gray-800/80 rounded-2xl px-6 py-5 flex flex-col gap-3">
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-1">게임 방법</h2>
        <ul aria-label="게임 규칙" className="flex flex-col gap-2 text-sm text-gray-300 list-none">
          <li>🟡 노란 존(중앙)에서 탭 → 홈런! (+400점)</li>
          <li>🟢 초록 존(근처)에서 탭 → 1~3루타 (+100~300점)</li>
          <li>❌ 존 밖이거나 놓치면 → 스트라이크 (+0점)</li>
          <li>🎯 기회는 총 3번 (3타석)</li>
        </ul>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <p className="text-xs text-gray-400 uppercase tracking-widest text-center">난이도 선택</p>
        <div role="radiogroup" aria-label="게임 난이도" className="flex gap-2">
          <button 
            className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${selectedDifficulty === 'easy' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            onClick={() => onDifficultyChange('easy')}
          >쉬움</button>
          <button 
            className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${selectedDifficulty === 'normal' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            onClick={() => onDifficultyChange('normal')}
          >보통</button>
          <button 
            className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${selectedDifficulty === 'hard' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            onClick={() => onDifficultyChange('hard')}
          >어려움</button>
        </div>
      </div>

      <button 
        role="button" 
        aria-label="게임 시작"
        onClick={onStart}
        className="w-full max-w-xs py-5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 active:scale-95 text-white font-extrabold text-2xl shadow-xl transition-all duration-150"
      >
        ⚾ 게임 시작!
      </button>
    </main>
  );
};
