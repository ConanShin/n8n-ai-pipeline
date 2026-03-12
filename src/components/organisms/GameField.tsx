
import React from 'react';
import { FieldBackground } from '../atoms/FieldBackground';
import { Ball } from '../atoms/Ball';
import { TimingBar } from '../molecules/TimingBar';
import { BattingZone } from '../atoms/BattingZone';
import { HitResultBadge } from '../atoms/HitResultBadge';
import { SwingEffect } from '../atoms/SwingEffect';

export interface GameFieldProps {
  isPlaying: boolean;
  onSwing: () => void;
  ballPosition?: { x: number; y: number };
  hitResult: 'homerun' | 'triple' | 'double' | 'single' | 'strike' | null;
  isHitBadgeVisible: boolean;
  isSwingActive: boolean;
  markerPosition: number;
  ballSize: number;
  isBallVisible: boolean;
}

export const GameField: React.FC<GameFieldProps> = ({
  isPlaying, onSwing, ballPosition, hitResult, isHitBadgeVisible, isSwingActive, markerPosition, ballSize, isBallVisible
}) => {
  return (
    <div 
      className="relative flex-1 w-full overflow-hidden cursor-pointer touch-none"
      onClick={onSwing}
      role="button"
      aria-label="배팅 영역 - 탭하여 스윙"
      aria-pressed="false"
    >
      <FieldBackground />
      <Ball size={ballSize} positionX={ballPosition?.x || 50} positionY={ballPosition?.y || 30} isVisible={isBallVisible} />
      <BattingZone />
      <HitResultBadge result={hitResult} isVisible={isHitBadgeVisible} />
      <SwingEffect isActive={isSwingActive} />
      <TimingBar markerPosition={markerPosition} isActive={isPlaying} />
    </div>
  );
};
