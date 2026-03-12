import React, { useState, useEffect } from 'react';

export interface GameHeaderProps {
  score: number;
  outCount: number;
  maxOuts?: number;
  baseStatus: { first: boolean; second: boolean; third: boolean };
}

export interface ScoreDisplayProps {
  score: number;
}

export interface BaseDiagramProps {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface OutCountIndicatorProps {
  outCount: number;
  maxOuts?: number;
}

export interface GameFieldProps {
  gameState: 'idle' | 'pitching' | 'hit' | 'strike';
  pitchSpeed?: number;
  pitchProgress: number;
}

export interface PitcherSpriteProps {
  isPitching: boolean;
}

export interface BallTrajectoryProps {
  isVisible: boolean;
  pitchDuration: number;
  progress: number;
}

export interface TimingGaugeProps {
  isActive: boolean;
  progress: number;
  sweetSpotStart: number;
  sweetSpotEnd: number;
}

export interface BattingZoneProps {
  onBat: (forceProgress?: number) => void;
  isDisabled?: boolean;
  swingState: 'idle' | 'swinging' | 'hit' | 'miss' | 'disabled';
}

export interface BatterSpriteProps {
  swingState: 'idle' | 'swinging' | 'hit' | 'miss' | 'disabled';
}

export interface BatSwingFeedbackProps {
  result: 'homerun' | 'triple' | 'double' | 'single' | 'strike' | null;
  isVisible: boolean;
}

export interface TapHintLabelProps {
  isHighlighted: boolean;
}

export interface GameResultOverlayProps {
  isVisible: boolean;
  finalScore: number;
  resultSummary: { homerun: number; triple: number; double: number; single: number; strike: number };
  onRestart: () => void;
}

export interface ResultTitleProps {
  grade: 'excellent' | 'good' | 'average' | 'poor';
}

export interface FinalScoreDisplayProps {
  score: number;
}

export interface ResultSummaryCardProps {
  homerun: number;
  triple: number;
  double: number;
  single: number;
  strike: number;
}

export interface RestartButtonProps {
  onClick: () => void;
}

export interface StartScreenProps {
  onStart: () => void;
  isVisible: boolean;
}

export interface StartButtonProps {
  onClick: () => void;
}



export const FieldBackground: React.FC = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none">
    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(255,255,255,0.03)_40px,rgba(255,255,255,0.03)_41px)]" />
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-48 border-2 border-white/20 rotate-45" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-800/40 border border-yellow-700/30" />
  </div>
);

export const PitcherSprite: React.FC<PitcherSpriteProps> = ({ isPitching }) => (
  <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 flex items-center justify-center w-16 h-16 ${isPitching ? 'animate-bounce' : ''}`}>
    <span className="text-5xl">🤾</span>
  </div>
);

export const BatterSprite: React.FC<BatterSpriteProps> = ({ swingState }) => {
  let content = '🧍🏏';
  let tw = 'w-20 h-20 flex items-center justify-center text-5xl transition-all';
  
  if (swingState === 'swinging') {
    content = '🏌️';
    tw += ' -rotate-45 scale-110';
  } else if (swingState === 'hit') {
    content = '🏌️💥';
    tw += ' scale-125';
  } else if (swingState === 'miss') {
    content = '🤦🏏';
    tw += ' opacity-70 rotate-12';
  }

  return (
    <div className="w-24 h-24 flex items-center justify-center">
      <div className={tw}>{content}</div>
    </div>
  );
};

export const BatSwingFeedback: React.FC<BatSwingFeedbackProps> = ({ result, isVisible }) => {
  if (!isVisible || !result) return null;
  
  const config: Record<string, { text: string, color: string }> = {
    homerun: { text: "HOMERUN", color: "text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.9)] text-5xl animate-bounce" },
    triple: { text: "TRIPLE", color: "text-orange-400 drop-shadow-[0_0_12px_rgba(251,146,60,0.8)] text-4xl animate-bounce" },
    double: { text: "DOUBLE", color: "text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.8)] text-4xl" },
    single: { text: "SINGLE", color: "text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] text-3xl" },
    strike: { text: "STRIKE", color: "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] text-3xl" },
  };

  const { text, color } = config[result] || config.strike;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
      <div className={`flex flex-col items-center gap-1 transition-all duration-300 scale-110`}>
        <span className={`font-black tracking-widest ${color}`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export const TapHintLabel: React.FC<TapHintLabelProps> = ({ isHighlighted }) => (
  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
    <span className={isHighlighted 
      ? "text-base text-yellow-400 font-bold tracking-widest drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]" 
      : "text-sm text-gray-500 font-medium tracking-wider animate-pulse"}>
      TAP!
    </span>
  </div>
);

export const ResultTitle: React.FC<ResultTitleProps> = ({ grade }) => {
  const config = {
    excellent: { emoji: "🏆", text: "홈런왕!", tw: "text-yellow-400 drop-shadow-[0_0_16px_rgba(250,204,21,0.8)]" },
    good: { emoji: "⚾", text: "훌륭해요!", tw: "text-green-400" },
    average: { emoji: "👏", text: "분전했어요!", tw: "text-blue-400" },
    poor: { emoji: "💪", text: "다시 도전!", tw: "text-gray-300" },
  };
  const { emoji, text, tw } = config[grade];
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <span className="text-6xl">{emoji}</span>
      <h1 className={`text-4xl font-black ${tw}`}>{text}</h1>
    </div>
  );
};

export const RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="w-full max-w-xs py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-950 text-lg font-black tracking-wide shadow-[0_4px_24px_rgba(250,204,21,0.4)] active:scale-95 transition-transform duration-100 hover:shadow-[0_4px_32px_rgba(250,204,21,0.6)] flex items-center justify-center gap-2 cursor-pointer"
  >
    <span>⚾</span> 다시 도전하기
  </button>
);

export const GameLogoTitle: React.FC = () => (
  <div className="flex flex-col items-center gap-2 text-center">
    <span className="text-7xl mb-2">⚾</span>
    <h1 className="text-4xl font-black text-white tracking-tight">야구 타이밍 게임</h1>
    <span className="text-sm text-gray-400 font-medium tracking-widest uppercase">Tap on Beat · Hit the Ball</span>
  </div>
);

export const StartButton: React.FC<StartButtonProps> = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="w-full max-w-sm py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-950 text-xl font-black tracking-wide shadow-[0_6px_32px_rgba(250,204,21,0.45)] active:scale-95 transition-all duration-150 hover:shadow-[0_8px_40px_rgba(250,204,21,0.6)] flex items-center justify-center gap-2 cursor-pointer"
  >
    <span>⚾</span> 게임 시작!
  </button>
);

