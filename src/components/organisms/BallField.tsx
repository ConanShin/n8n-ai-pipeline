import React from 'react';
import { PitchingMound } from '../atoms/PitchingMound';
import { BaseballBall } from '../atoms/BaseballBall';
import { BatterSilhouette } from '../atoms/BatterSilhouette';
import { TapHint } from '../atoms/TapHint';

export interface BallFieldProps {
  ballState: 'idle' | 'incoming' | 'hit' | 'miss';
  ballSpeed?: number;
  onTap: () => void;
  result?: 'homerun' | 'triple' | 'double' | 'single' | 'strike' | null;
}

export const BallField: React.FC<BallFieldProps> = ({ ballState, ballSpeed = 1500, onTap, result }) => {
  const isWinding = ballState === 'idle';
  const isSwinging = ballState === 'hit' || ballState === 'miss' || (result !== undefined && result !== null);

  return (
    <div
      className="relative flex items-center justify-center flex-1 w-full overflow-hidden cursor-pointer bg-gradient-to-b from-sky-700 via-green-700 to-green-900 active:bg-gradient-to-b active:from-sky-800 active:via-green-800 active:to-green-950 transition-colors"
      onClick={onTap}
      role="button"
      aria-label="배팅 타이밍 입력 영역 - 탭하여 배팅"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onTap();
        }
      }}
    >
      <div className="absolute bottom-0 w-[200%] h-[50%] bg-green-800/50 rounded-[50%] translate-y-1/2 -translate-x-1/4 transform scale-y-50 blur-sm" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 border-4 border-white/20 transform rotate-45" />

      <PitchingMound isWinding={isWinding} />
      
      <BaseballBall state={ballState} speed={ballSpeed} />
      
      <BatterSilhouette isSwinging={isSwinging} result={result} />
      
      <TapHint visible={ballState === 'idle'} />
    </div>
  );
};
