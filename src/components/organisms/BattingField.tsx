import React from 'react';
import { PitchLane } from '../molecules/PitchLane';
import { TapButton } from '../atoms/TapButton';
import { ResultOverlay } from '../molecules/ResultOverlay';
import { CountdownTimer } from '../atoms/CountdownTimer';
import { WindowRange } from '../atoms/HitZoneBar';

export interface BattingFieldProps {
  gamePhase: 'idle' | 'countdown' | 'pitching' | 'swinging' | 'showing-result' | 'paused' | 'game-over';
  ballSpeedMs: number;
  ballProgress: number;
  lastResult?: 'homerun' | 'triple' | 'double' | 'single' | 'strike' | null;
  lastTiming?: 'perfect' | 'good' | 'early' | 'late' | null;
  perfectWindow: WindowRange;
  goodWindow: WindowRange;
  onSwing: () => void;
  countdownValue?: string | number;
}

export const BattingField: React.FC<BattingFieldProps> = ({
  gamePhase,
  ballSpeedMs,
  ballProgress,
  lastResult,
  lastTiming,
  perfectWindow,
  goodWindow,
  onSwing,
  countdownValue = 3
}) => {
  const isPitchingPhase = gamePhase === 'pitching' || gamePhase === 'swinging' || gamePhase === 'showing-result';
  const showResult = gamePhase === 'showing-result' && !!lastResult;

  return (
    <div 
      className="relative flex-1 flex flex-col items-center justify-end gap-6 pb-8 sm:pb-10 overflow-hidden"
      role="main"
      aria-label="배팅 필드 — 공이 날아오면 탭하여 배트를 휘두르세요"
    >
      <PitchLane 
        ballSpeedMs={ballSpeedMs}
        isActive={isPitchingPhase}
        ballProgress={ballProgress}
        hitQuality={lastTiming === 'early' || lastTiming === 'late' ? 'good' : lastTiming}
        perfectWindow={perfectWindow}
        goodWindow={goodWindow}
      />

      <div className="z-20 relative">
        <TapButton 
          onTap={onSwing} 
          disabled={gamePhase !== 'pitching'}
        />
      </div>

      <ResultOverlay 
        result={lastResult || 'strike'} 
        timing={lastTiming} 
        visible={showResult} 
      />

      <CountdownTimer 
        count={countdownValue} 
        visible={gamePhase === 'countdown'} 
      />
    </div>
  );
};
