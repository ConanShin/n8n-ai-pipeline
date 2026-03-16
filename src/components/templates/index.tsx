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



export const StartScreen: React.FC<StartScreenProps> = ({ onStart, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gray-950 px-6 gap-8">
      <GameLogoTitle />
      <RulesSummaryCard />
      <StartButton onClick={onStart} />
    </div>
  );
};

