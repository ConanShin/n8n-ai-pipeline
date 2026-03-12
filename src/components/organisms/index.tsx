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



export const GameHeader: React.FC<GameHeaderProps> = ({ score, outCount, maxOuts = 3, baseStatus }) => (
  <header className="flex items-center justify-between w-full px-4 py-3 bg-gray-900 border-b border-gray-700 z-10">
    <ScoreDisplay score={score} />
    <BaseDiagram {...baseStatus} />
    <OutCountIndicator outCount={outCount} maxOuts={maxOuts} />
  </header>
);

export const GameField: React.FC<GameFieldProps> = ({ gameState, pitchProgress }) => (
  <div className="relative flex-1 w-full bg-gradient-to-b from-sky-900 via-green-900 to-green-800 overflow-hidden min-h-[50vh]">
    <FieldBackground />
    <PitcherSprite isPitching={gameState === 'pitching'} />
    <BallTrajectory isVisible={gameState === 'pitching'} pitchDuration={1500} progress={pitchProgress} />
    <TimingGauge 
      isActive={gameState === 'pitching'} 
      progress={pitchProgress} 
      sweetSpotStart={0.78} 
      sweetSpotEnd={0.82} 
    />
  </div>
);

export const BattingZone: React.FC<BattingZoneProps> = ({ onBat, isDisabled, swingState }) => (
  <div 
    className={`relative w-full flex items-center justify-center py-4 bg-gray-950/80 border-t border-gray-800 select-none h-32 md:h-40 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer active:bg-gray-900/80'}`}
    onClick={() => !isDisabled && onBat()}
    onTouchStart={(e) => {
      e.preventDefault();
      if (!isDisabled) onBat();
    }}
  >
    <BatterSprite swingState={swingState} />
    <TapHintLabel isHighlighted={swingState === 'idle'} />
  </div>
);

export const GameResultOverlay: React.FC<GameResultOverlayProps> = ({ isVisible, finalScore, resultSummary, onRestart }) => {
  if (!isVisible) return null;
  let grade: 'excellent' | 'good' | 'average' | 'poor' = 'poor';
  if (finalScore >= 10) grade = 'excellent';
  else if (finalScore >= 5) grade = 'good';
  else if (finalScore >= 1) grade = 'average';

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/90 backdrop-blur-sm px-6">
      <ResultTitle grade={grade} />
      <FinalScoreDisplay score={finalScore} />
      <ResultSummaryCard {...resultSummary} />
      <RestartButton onClick={onRestart} />
    </div>
  );
};

