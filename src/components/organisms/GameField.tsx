
import React from 'react';
import { FieldBackground } from '../atoms/FieldBackground';
import { PitchLane } from '../atoms/PitchLane';
import { BaseballBall } from '../atoms/BaseballBall';
import { TimingBar } from '../molecules/TimingBar';
export interface GameFieldProps { isPlaying: boolean; ballPosition: { x: number; y: number }; ballScale: number; markerPosition: number; isTimingActive: boolean; ballState: 'flying' | 'hit' | 'strike'; }
export const GameField: React.FC<GameFieldProps> = ({ isPlaying, ballPosition, ballScale, markerPosition, isTimingActive, ballState }) => (
  <main className="relative flex flex-col items-center justify-end w-full flex-1 overflow-hidden lg:max-w-2xl lg:mx-auto" role="region" aria-label="게임 필드 — 공이 날아오는 영역">
    <FieldBackground />
    <PitchLane visible={true} />
    <BaseballBall x={ballPosition.x} y={ballPosition.y} scale={ballScale} state={ballState} />
    <div className="z-10 w-full mb-8">
      <TimingBar markerPosition={markerPosition} isActive={isTimingActive} />
    </div>
  </main>
);
