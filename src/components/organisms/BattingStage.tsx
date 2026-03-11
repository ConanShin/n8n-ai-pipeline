
import React from 'react';
import { BallPitchCanvas } from '../molecules/BallPitchCanvas';
import { TimingBar } from '../molecules/TimingBar';
import { ActionButton } from '../atoms/ActionButton';
import { ResultOverlay } from '../molecules/ResultOverlay';
import { CountdownTimer } from '../atoms/CountdownTimer';

export interface BattingStageProps {
  pitching: boolean;
  progress: number;
  hitResult: string | null;
  canSwing: boolean;
  showCountdown: boolean;
  countdownValue?: number | string;
  onSwing: () => void;
  hitZoneConfig: {
    hitZoneStart: number;
    hitZoneEnd: number;
    perfectZoneStart: number;
    perfectZoneEnd: number;
  };
  scoreIncrement: number;
  overlayVisible: boolean;
}

export const BattingStage: React.FC<BattingStageProps> = ({
  pitching, progress, hitResult, canSwing, showCountdown, countdownValue, onSwing, hitZoneConfig, scoreIncrement, overlayVisible
}) => {
  const isPulseVisible = progress >= hitZoneConfig.hitZoneStart && progress <= hitZoneConfig.hitZoneEnd;

  return (
    <main 
      role="main" 
      aria-label="타격 게임 스테이지"
      className="relative flex flex-col items-center gap-6 w-full px-4 py-6 flex-1 overflow-hidden"
    >
      <BallPitchCanvas pitching={pitching} progress={progress} hitResult={hitResult} />
      
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex justify-between w-full text-xs text-gray-500 px-1">
          <span>← 너무 빠름</span>
          <span className="text-green-400 font-bold">타격 존</span>
          <span>너무 느림 →</span>
        </div>
        
        <TimingBar 
          progress={progress}
          hitZoneStart={hitZoneConfig.hitZoneStart}
          hitZoneEnd={hitZoneConfig.hitZoneEnd}
          perfectZoneStart={hitZoneConfig.perfectZoneStart}
          perfectZoneEnd={hitZoneConfig.perfectZoneEnd}
          active={pitching}
        />
        
        {isPulseVisible ? (
          <span className="text-green-400 font-extrabold text-lg tracking-widest animate-pulse">
            지금 탭!
          </span>
        ) : (
          <span className="h-7" />
        )}
      </div>
      
      <ActionButton 
        disabled={!canSwing} 
        swinging={hitResult !== null && hitResult !== 'strike'} 
        onSwing={onSwing} 
      />
      
      <ResultOverlay 
        result={hitResult as any} 
        scoreIncrement={scoreIncrement} 
        visible={overlayVisible} 
      />
      
      <CountdownTimer 
        count={countdownValue || ''} 
        visible={showCountdown} 
      />
    </main>
  );
};
