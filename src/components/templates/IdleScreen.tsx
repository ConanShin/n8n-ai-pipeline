
import React from 'react';

export interface IdleScreenProps {
  onStart: () => void;
}

export const IdleScreen: React.FC<IdleScreenProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 bg-gray-950/90 backdrop-blur-sm z-40 px-8" role="region" aria-label="게임 시작 화면">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-6xl">⚾</span>
        <h1 className="text-4xl font-black text-white tracking-tight">TAP BATTER</h1>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">공이 날아올 때 타이밍에 맞춰 화면을 탭하세요! 기회는 단 3번.</p>
      </div>
      
      <div className="flex flex-col gap-2 w-full max-w-xs bg-gray-800/80 rounded-2xl p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">SCORING</p>
        <div className="flex justify-between text-sm text-white"><span>HOME RUN</span><span className="text-yellow-400 font-black">+4</span></div>
        <div className="flex justify-between text-sm text-white"><span>3루타</span><span className="text-cyan-300 font-black">+3</span></div>
        <div className="flex justify-between text-sm text-white"><span>2루타</span><span className="text-green-400 font-black">+2</span></div>
        <div className="flex justify-between text-sm text-white"><span>1루타</span><span className="text-blue-300 font-black">+1</span></div>
        <div className="flex justify-between text-sm text-white"><span>STRIKE</span><span className="text-red-500 font-black">0</span></div>
      </div>
      
      <button
        onClick={onStart}
        className="w-full max-w-xs h-14 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all duration-150 text-gray-900 text-lg font-black shadow-lg shadow-yellow-400/30"
      >
        게임 시작
      </button>
    </div>
  );
};
