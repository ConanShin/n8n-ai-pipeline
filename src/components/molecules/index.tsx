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



export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Score</span>
    <span className="text-4xl font-black tabular-nums text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]">
      {score}
    </span>
  </div>
);

export const BaseDiagram: React.FC<BaseDiagramProps> = ({ first, second, third }) => {
  const BaseIcon = ({ occupied }: { occupied: boolean }) => (
    <div className={`w-4 h-4 rotate-45 border-2 ${
      occupied 
        ? 'border-yellow-400 bg-yellow-400 shadow-[0_0_6px_2px_rgba(250,204,21,0.5)]' 
        : 'border-gray-600 bg-transparent'
    }`} />
  );

  return (
    <div className="grid grid-cols-3 grid-rows-2 w-16 h-12 place-items-center relative">
      <div className="col-start-2 row-start-1"><BaseIcon occupied={second} /></div>
      <div className="col-start-1 row-start-2"><BaseIcon occupied={third} /></div>
      <div className="col-start-3 row-start-2"><BaseIcon occupied={first} /></div>
    </div>
  );
};

export const OutCountIndicator: React.FC<OutCountIndicatorProps> = ({ outCount, maxOuts = 3 }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Out</span>
      <div className="flex gap-1.5">
        {Array.from({ length: maxOuts }).map((_, i) => (
          <div 
            key={i} 
            className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
              i < outCount 
                ? 'border-red-500 bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.6)]' 
                : 'border-gray-500 bg-transparent'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export const BallTrajectory: React.FC<BallTrajectoryProps> = ({ isVisible, progress }) => {
  if (!isVisible) return null;
  const top = 22 + (90 - 22) * progress;
  const left = 48 + (44 - 48) * progress;
  const size = 12 + (40 - 12) * progress;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div 
        className="absolute rounded-full bg-white border border-gray-300 shadow-lg"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="absolute inset-0 border-2 border-red-400 rounded-full rotate-45 opacity-50"></div>
      </div>
    </div>
  );
};

export const TimingGauge: React.FC<TimingGaugeProps> = ({ isActive, progress, sweetSpotStart, sweetSpotEnd }) => (
  <div className={`absolute bottom-28 left-1/2 -translate-x-1/2 w-4/5 max-w-sm flex flex-col items-center gap-2 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
    <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">Timing</span>
    <div className="relative w-full h-4 rounded-full bg-gray-700/70 backdrop-blur-sm overflow-hidden border border-gray-600/50">
      <div 
        className="absolute top-0 h-full bg-yellow-400/30 border border-yellow-400/60"
        style={{ left: `${sweetSpotStart * 100}%`, width: `${(sweetSpotEnd - sweetSpotStart) * 100}%` }}
      />
      <div 
        className="h-full rounded-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-75"
        style={{ width: `${progress * 100}%` }}
      />
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
        style={{ left: `${progress * 100}%`, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  </div>
);

export const FinalScoreDisplay: React.FC<FinalScoreDisplayProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 1200;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayScore(Math.floor(score * easeProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayScore(score);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-1 mb-6">
      <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Final Score</span>
      <div className="flex items-baseline gap-2">
        <span className="text-7xl font-black tabular-nums text-white">{displayScore}</span>
        <span className="text-xl text-gray-400 font-medium">pts</span>
      </div>
    </div>
  );
};

export const ResultSummaryCard: React.FC<ResultSummaryCardProps> = ({ homerun, triple, double, single, strike }) => {
  const rows = [
    { key: "homerun", label: "홈런", icon: "🏆", valueColor: "text-yellow-400", value: homerun },
    { key: "triple", label: "3루타", icon: "🔥", valueColor: "text-orange-400", value: triple },
    { key: "double", label: "2루타", icon: "⚡", valueColor: "text-green-400", value: double },
    { key: "single", label: "1루타", icon: "⚾", valueColor: "text-blue-400", value: single },
    { key: "strike", label: "스트라이크", icon: "❌", valueColor: "text-red-400", value: strike }
  ];

  return (
    <div className="w-full max-w-xs bg-gray-800/70 rounded-2xl border border-gray-700 p-5 mb-6 backdrop-blur-sm">
      {rows.map((row) => (
        <div key={row.key} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0 hover:bg-gray-700/40 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-lg w-6 text-center">{row.icon}</span>
            <span>{row.label}</span>
          </div>
          <span className={`text-base font-bold ${row.valueColor}`}>{row.value}</span>
        </div>
      ))}
    </div>
  );
};

export const RulesSummaryCard: React.FC = () => {
  const ruleItems = [
    { icon: "🏆", label: "홈런", description: "가장 빠른 타이밍 (퍼펙트)", color: "text-yellow-400" },
    { icon: "🔥", label: "3루타", description: "타이밍이 조금 빠름", color: "text-orange-400" },
    { icon: "⚡", label: "2루타", description: "타이밍이 약간 늦음", color: "text-green-400" },
    { icon: "⚾", label: "1루타", description: "타이밍이 꽤 늦음", color: "text-blue-400" },
    { icon: "❌", label: "스트라이크", description: "타이밍 완전 실패", color: "text-red-400" }
  ];

  return (
    <div className="w-full max-w-sm bg-gray-800/60 rounded-2xl border border-gray-700 p-5 backdrop-blur-sm">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">판정 기준</h3>
      <div className="flex flex-col gap-1">
        {ruleItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 py-1.5 hover:bg-gray-700/40 transition-colors px-2 rounded-lg">
            <span className="text-xl w-7 text-center">{item.icon}</span>
            <span className={`text-sm font-bold w-16 ${item.color}`}>{item.label}</span>
            <span className="text-xs text-gray-400">{item.description}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-center gap-2 text-sm text-gray-300">
        기회는 총 3번 (3아웃 게임)
      </div>
    </div>
  );
};

