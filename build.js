const fs = require('fs');
const path = require('path');

const components = {
  atoms: {},
  molecules: {},
  organisms: {},
  templates: {},
  pages: {}
};

const defineComponent = (type, name, code) => {
  components[type][name] = code;
};

// ATOMS
defineComponent('atoms', 'BallIcon', `
import React from 'react';

export interface BallIconProps {
  size?: number;
  variant?: 'active' | 'used' | 'flying';
}

export const BallIcon: React.FC<BallIconProps> = ({ size = 24, variant = 'active' }) => {
  const variants = {
    active: "bg-white border-2 border-gray-300 shadow-inner",
    used: "bg-red-500 border-2 border-red-700 opacity-80 shadow-inner",
    flying: "bg-white border-4 border-gray-200 shadow-xl"
  };
  return (
    <div 
      className={\`inline-block rounded-full shrink-0 \${variants[variant]}\`} 
      style={{ width: size, height: size }}
      role="img" aria-label="야구공"
    />
  );
};
`);

defineComponent('atoms', 'StrikeIndicatorDot', `
import React from 'react';

export interface StrikeIndicatorDotProps {
  isUsed: boolean;
  index: number;
}

export const StrikeIndicatorDot: React.FC<StrikeIndicatorDotProps> = ({ isUsed, index }) => {
  return (
    <div 
      className={\`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-sm transition-all duration-300 \${isUsed ? 'bg-red-500 border-2 border-red-600 text-white scale-110 shadow-md' : 'bg-white border-2 border-gray-400 text-transparent'}\`}
      role="img" aria-label={\`\${index + 1}번 기회 — \${isUsed ? '소진' : '남음'}\`}
    >
      {isUsed ? '✕' : ''}
    </div>
  );
};
`);

defineComponent('atoms', 'ScoreLabel', `
import React from 'react';

export interface ScoreLabelProps {
  result: 'homerun' | '3base' | '2base' | '1base' | 'strike';
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreLabel: React.FC<ScoreLabelProps> = ({ result, size = 'md' }) => {
  const variants = {
    'homerun': { tailwind: "bg-yellow-400 text-yellow-900 ring-4 ring-yellow-200 animate-bounce", label: "⚾ HOMERUN!" },
    '3base': { tailwind: "bg-green-500 text-white ring-4 ring-green-300", label: "3루타!" },
    '2base': { tailwind: "bg-blue-500 text-white ring-4 ring-blue-300", label: "2루타!" },
    '1base': { tailwind: "bg-indigo-400 text-white ring-4 ring-indigo-300", label: "1루타!" },
    'strike': { tailwind: "bg-red-500 text-white ring-4 ring-red-300 animate-pulse", label: "STRIKE!" }
  };
  const sizeMap = {
    sm: "text-base px-3 py-1",
    md: "text-2xl px-4 py-2",
    lg: "text-4xl px-6 py-3"
  };
  const current = variants[result] || variants['strike'];
  
  return (
    <div 
      className={\`inline-flex items-center justify-center rounded-full font-extrabold tracking-widest shadow-lg select-none \${current.tailwind} \${sizeMap[size]}\`}
      role="status" aria-live="polite" aria-label={\`타격 결과: \${result}\`}
    >
      {current.label}
    </div>
  );
};
`);

defineComponent('atoms', 'TimingCursor', `
import React from 'react';

export interface TimingCursorProps {
  progress: number;
  inHitZone: boolean;
  inPerfectZone: boolean;
}

export const TimingCursor: React.FC<TimingCursorProps> = ({ progress, inHitZone, inPerfectZone }) => {
  let variantClass = "bg-white border-gray-400";
  if (inPerfectZone) variantClass = "bg-yellow-300 border-yellow-500 scale-125 shadow-yellow-400/80 animate-pulse";
  else if (inHitZone) variantClass = "bg-green-300 border-green-600 scale-110 shadow-green-400/60";

  return (
    <div 
      className={\`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md border-2 transition-colors duration-75 block \${variantClass}\`}
      style={{ left: \`\${progress * 100}%\`, transform: 'translate(-50%, -50%)' }}
      role="presentation" aria-hidden="true"
    />
  );
};
`);

defineComponent('atoms', 'HitZoneMarker', `
import React from 'react';

export interface HitZoneMarkerProps {
  hitZoneStart: number;
  hitZoneEnd: number;
  perfectZoneStart: number;
  perfectZoneEnd: number;
}

export const HitZoneMarker: React.FC<HitZoneMarkerProps> = ({ hitZoneStart, hitZoneEnd, perfectZoneStart, perfectZoneEnd }) => {
  return (
    <div className="absolute inset-y-0 w-full block" role="presentation" aria-hidden="true">
      <div 
        className="absolute inset-y-0 bg-green-400 opacity-40 rounded"
        style={{ left: \`\${hitZoneStart * 100}%\`, width: \`\${(hitZoneEnd - hitZoneStart) * 100}%\` }}
      />
      <div 
        className="absolute inset-y-0 bg-yellow-300 opacity-70 rounded"
        style={{ left: \`\${perfectZoneStart * 100}%\`, width: \`\${(perfectZoneEnd - perfectZoneStart) * 100}%\` }}
      />
    </div>
  );
};
`);

defineComponent('atoms', 'ActionButton', `
import React from 'react';

export interface ActionButtonProps {
  disabled?: boolean;
  swinging?: boolean;
  onSwing: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ disabled = false, swinging = false, onSwing }) => {
  let variant = "bg-amber-500 hover:bg-amber-400 ring-4 ring-amber-300 shadow-xl text-white";
  if (disabled) variant = "bg-gray-700 opacity-40 cursor-not-allowed ring-4 ring-gray-600 text-gray-500";
  else if (swinging) variant = "bg-amber-300 scale-90 ring-4 ring-amber-200 shadow-inner";

  return (
    <div 
      className={\`flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52 rounded-full cursor-pointer select-none transition-all duration-75 touch-none \${variant}\`}
      onClick={!disabled ? onSwing : undefined}
      role="button" aria-label="배트 휘두르기 — 탭 또는 클릭" aria-disabled={disabled} aria-pressed={swinging}
    >
      <span className="text-5xl sm:text-6xl drop-shadow pointer-events-none">🏏</span>
    </div>
  );
};
`);

defineComponent('atoms', 'ResultBadge', `
import React from 'react';

export interface ResultBadgeProps {
  grade: 'legend' | 'great' | 'good' | 'out';
  label: string;
  icon?: string;
}

export const ResultBadge: React.FC<ResultBadgeProps> = ({ grade, label, icon }) => {
  const variants = {
    legend: "bg-gradient-to-br from-yellow-400 to-amber-500 text-yellow-900 ring-4 ring-yellow-200 text-4xl",
    great: "bg-gradient-to-br from-green-400 to-emerald-500 text-green-900 ring-4 ring-green-200 text-3xl",
    good: "bg-gradient-to-br from-blue-400 to-sky-500 text-blue-900 ring-4 ring-blue-200 text-3xl",
    out: "bg-gradient-to-br from-gray-500 to-gray-700 text-white ring-4 ring-gray-400 text-3xl"
  };

  return (
    <div 
      className={\`flex flex-col items-center gap-2 px-10 py-5 rounded-3xl shadow-2xl font-black text-center \${variants[grade]}\`}
      role="status" aria-label={\`최종 결과 등급: \${grade}\`}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </div>
  );
};
`);

defineComponent('atoms', 'CountdownTimer', `
import React from 'react';

export interface CountdownTimerProps {
  count: number | string;
  visible: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ count, visible }) => {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none" role="status" aria-live="assertive" aria-label={\`타석 시작 카운트다운: \${count}\`}>
      <span className="text-8xl sm:text-9xl font-black text-white drop-shadow-2xl animate-pulse">
        {count}
      </span>
    </div>
  );
};
`);

// MOLECULES
defineComponent('molecules', 'TimingBar', `
import React from 'react';
import { HitZoneMarker } from '../atoms/HitZoneMarker';
import { TimingCursor } from '../atoms/TimingCursor';

export interface TimingBarProps {
  progress: number;
  hitZoneStart: number;
  hitZoneEnd: number;
  perfectZoneStart: number;
  perfectZoneEnd: number;
  active: boolean;
}

export const TimingBar: React.FC<TimingBarProps> = ({ progress, hitZoneStart, hitZoneEnd, perfectZoneStart, perfectZoneEnd, active }) => {
  const inHitZone = progress >= hitZoneStart && progress <= hitZoneEnd;
  const inPerfectZone = progress >= perfectZoneStart && progress <= perfectZoneEnd;

  return (
    <div 
      className={\`relative w-full h-8 rounded-full bg-gray-700 overflow-visible shadow-inner flex \${!active ? 'opacity-50' : ''}\`}
      role="progressbar" aria-label="타이밍 바 — 공이 타격 존에 들어오면 배트를 휘두르세요" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}
    >
      <HitZoneMarker hitZoneStart={hitZoneStart} hitZoneEnd={hitZoneEnd} perfectZoneStart={perfectZoneStart} perfectZoneEnd={perfectZoneEnd} />
      {active && <TimingCursor progress={progress} inHitZone={inHitZone} inPerfectZone={inPerfectZone} />}
    </div>
  );
};
`);

defineComponent('molecules', 'OutChanceRow', `
import React from 'react';
import { StrikeIndicatorDot } from '../atoms/StrikeIndicatorDot';

export interface OutChanceRowProps {
  totalChances?: number;
  usedChances: number;
}

export const OutChanceRow: React.FC<OutChanceRowProps> = ({ totalChances = 3, usedChances }) => {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={\`기회 \${totalChances - usedChances}번 남음\`}>
      {Array.from({ length: totalChances }).map((_, idx) => (
        <StrikeIndicatorDot key={idx} index={idx} isUsed={idx < usedChances} />
      ))}
    </div>
  );
};
`);

defineComponent('molecules', 'ScoreBoard', `
import React from 'react';
import { OutChanceRow } from './OutChanceRow';

export interface ScoreBoardProps {
  score: number;
  currentInning: number;
  usedChances: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, currentInning, usedChances }) => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-gray-900/80 backdrop-blur rounded-2xl shadow-lg" role="region" aria-label="점수판 — 현재 점수, 타석, 남은 기회 표시">
      <div className="flex flex-col items-start gap-0.5">
        <span className="text-xs text-gray-400 uppercase tracking-widest">SCORE</span>
        <span className="text-3xl font-black text-yellow-300 tabular-nums">{score}</span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs text-gray-400 uppercase tracking-widest">INNING</span>
        <span className="text-3xl font-black text-white tabular-nums">{currentInning} / 3</span>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-xs text-gray-400 uppercase tracking-widest">CHANCE</span>
        <OutChanceRow usedChances={usedChances} />
      </div>
    </div>
  );
};
`);

defineComponent('molecules', 'BallPitchCanvas', `
import React from 'react';
import { BallIcon } from '../atoms/BallIcon';

export interface BallPitchCanvasProps {
  pitching: boolean;
  progress: number;
  hitResult?: string | null;
}

export const BallPitchCanvas: React.FC<BallPitchCanvasProps> = ({ pitching, progress, hitResult }) => {
  // progress(0~1) => top(25%~80%), size(12~64)
  const top = 25 + (progress * 55);
  const size = 12 + (progress * 52);
  
  return (
    <div className="relative flex w-full aspect-[4/3] sm:aspect-video bg-gradient-to-b from-sky-500 via-sky-300 to-green-600 rounded-3xl overflow-hidden shadow-2xl" role="img" aria-label="야구공 투구 애니메이션 영역">
      <div className="absolute inset-0 opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full bg-amber-100 opacity-60" />
      
      {(pitching || hitResult) && !['homerun', '3base', '2base', '1base'].includes(hitResult || '') && (
        <div className="absolute transition-all duration-100" style={{ top: \`\${top}%\`, left: '50%', transform: 'translate(-50%, -50%)' }}>
          <BallIcon variant="flying" size={size} />
        </div>
      )}

      {hitResult && hitResult !== 'strike' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="animate-bounce text-6xl">⚾</div>
        </div>
      )}

      {!pitching && !hitResult && (
        <div className="absolute inset-0 flex items-center justify-center text-white/70 text-xl font-bold">
          READY...
        </div>
      )}
    </div>
  );
};
`);

defineComponent('molecules', 'ResultOverlay', `
import React from 'react';
import { ScoreLabel } from '../atoms/ScoreLabel';

export interface ResultOverlayProps {
  result: 'homerun' | '3base' | '2base' | '1base' | 'strike' | null;
  scoreIncrement: number;
  visible: boolean;
}

export const ResultOverlay: React.FC<ResultOverlayProps> = ({ result, scoreIncrement, visible }) => {
  if (!visible || !result) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none" role="alert" aria-live="assertive" aria-label={\`타격 결과 알림: \${result}\`}>
      <div className="flex flex-col items-center gap-4 animate-bounce">
        <ScoreLabel result={result} size="lg" />
        {scoreIncrement > 0 && (
          <span className="text-white text-2xl font-black drop-shadow-lg">
            + {scoreIncrement}점
          </span>
        )}
      </div>
    </div>
  );
};
`);

defineComponent('molecules', 'RhythmMetronome', `
import React, { useEffect, useState } from 'react';

export interface RhythmMetronomeProps {
  bpm: number;
  active: boolean;
  beat: number;
}

export const RhythmMetronome: React.FC<RhythmMetronomeProps> = ({ bpm, active, beat }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span 
            key={i} 
            className={\`w-3 h-3 rounded-full transition-all duration-100 \${active && (beat % 3 === i) ? 'bg-amber-400 scale-150 shadow-amber-300/70 shadow-md' : 'bg-gray-600 scale-100'}\`} 
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 tabular-nums">{bpm} BPM</span>
    </div>
  );
};
`);

// ORGANISMS
defineComponent('organisms', 'GameHUD', `
import React from 'react';
import { ScoreBoard } from '../molecules/ScoreBoard';
import { RhythmMetronome } from '../molecules/RhythmMetronome';

export interface GameHUDProps {
  score: number;
  currentInning: number;
  usedChances: number;
  bpm: number;
  beat: number;
  gamePhase: string;
}

export const GameHUD: React.FC<GameHUDProps> = ({ score, currentInning, usedChances, bpm, beat, gamePhase }) => {
  return (
    <div className="sticky top-0 z-30 flex flex-col gap-3 w-full px-4 pt-4 pb-3 bg-gray-950/90 backdrop-blur-md border-b border-gray-800" role="banner" aria-label="게임 정보 헤더 — 점수, 타석, 기회, 박자">
      <ScoreBoard score={score} currentInning={currentInning} usedChances={usedChances} />
      <RhythmMetronome bpm={bpm} active={gamePhase === 'pitching'} beat={beat} />
    </div>
  );
};
`);

defineComponent('organisms', 'BattingStage', `
import React from 'react';
import { BallPitchCanvas } from '../molecules/BallPitchCanvas';
import { TimingBar } from '../molecules/TimingBar';
import { ActionButton } from '../atoms/ActionButton';
import { ResultOverlay } from '../molecules/ResultOverlay';
import { CountdownTimer } from '../atoms/CountdownTimer';

export interface BattingStageProps {
  pitching: boolean;
  progress: number;
  hitResult?: 'homerun' | '3base' | '2base' | '1base' | 'strike' | null;
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
}

export const BattingStage: React.FC<BattingStageProps> = ({ pitching, progress, hitResult, canSwing, showCountdown, countdownValue, onSwing, hitZoneConfig, scoreIncrement }) => {
  const inHitZone = progress >= hitZoneConfig.hitZoneStart && progress <= hitZoneConfig.hitZoneEnd;

  return (
    <div className="relative flex flex-col items-center gap-6 w-full px-4 py-6 flex-1 overflow-hidden" role="main" aria-label="타격 게임 스테이지">
      <BallPitchCanvas pitching={pitching} progress={progress} hitResult={hitResult} />
      
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex justify-between w-full text-xs text-gray-500 px-1">
          <span>← 너무 빠름</span>
          <span className="text-green-400 font-bold">타격 존</span>
          <span>너무 느림 →</span>
        </div>
        <TimingBar 
          progress={progress} 
          active={pitching}
          {...hitZoneConfig}
        />
        {inHitZone && <span className="text-green-400 font-extrabold text-lg tracking-widest animate-pulse">지금 탭!</span>}
      </div>

      <ActionButton disabled={!canSwing} swinging={!!hitResult} onSwing={onSwing} />
      
      <ResultOverlay result={hitResult || null} scoreIncrement={scoreIncrement} visible={!!hitResult} />
      <CountdownTimer count={countdownValue || ''} visible={showCountdown} />
    </div>
  );
};
`);

defineComponent('organisms', 'StartScreen', `
import React from 'react';

export interface StartScreenProps {
  onStart: () => void;
  selectedDifficulty: 'easy' | 'normal' | 'hard';
  onDifficultyChange: (diff: 'easy' | 'normal' | 'hard') => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, selectedDifficulty, onDifficultyChange }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full min-h-screen bg-gray-950 px-6 py-12" role="main" aria-label="야구 게임 시작 화면">
      <div className="flex flex-col items-center gap-3">
        <span className="text-8xl drop-shadow-2xl">⚾</span>
        <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight text-center">탭 야구!</h1>
        <p className="text-gray-400 text-base text-center">박자에 맞춰 탭하고 홈런을 쳐내세요!</p>
      </div>

      <div className="w-full max-w-xs bg-gray-800/80 rounded-2xl px-6 py-5 flex flex-col gap-3">
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-1">게임 방법</h2>
        <ul className="flex flex-col gap-2 text-sm text-gray-300 list-none" aria-label="게임 규칙">
          <li>🟡 노란 존(중앙)에서 탭 → 홈런! (+400점)</li>
          <li>🟢 초록 존(근처)에서 탭 → 1~3루타 (+100~300점)</li>
          <li>❌ 존 밖이거나 놓치면 → 스트라이크 (+0점)</li>
          <li>🎯 기회는 총 3번 (3타석)</li>
        </ul>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <p className="text-xs text-gray-400 uppercase tracking-widest text-center">난이도 선택</p>
        <div className="flex gap-2" role="radiogroup" aria-label="게임 난이도">
          {(['easy', 'normal', 'hard'] as const).map(diff => (
            <button 
              key={diff}
              onClick={() => onDifficultyChange(diff)}
              className={\`flex-1 py-2 rounded-xl font-bold text-sm transition-all \${selectedDifficulty === diff ? (diff==='easy'?'bg-green-500 text-white shadow-md':diff==='normal'?'bg-amber-500 text-white shadow-md':'bg-red-500 text-white shadow-md') : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}\`}
            >
              {diff === 'easy' ? '쉬움' : diff === 'normal' ? '보통' : '어려움'}
            </button>
          ))}
        </div>
      </div>

      <button onClick={onStart} className="w-full max-w-xs py-5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 active:scale-95 text-white font-extrabold text-2xl shadow-xl transition-all duration-150" role="button" aria-label="게임 시작">
        ⚾ 게임 시작!
      </button>
    </div>
  );
};
`);

defineComponent('organisms', 'ResultScreen', `
import React from 'react';
import { ResultBadge } from '../atoms/ResultBadge';
import { ScoreLabel } from '../atoms/ScoreLabel';

export interface ResultScreenProps {
  totalScore: number;
  history: Array<'homerun' | '3base' | '2base' | '1base' | 'strike'>;
  grade: 'legend' | 'great' | 'good' | 'out';
  onRestart: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ totalScore, history, grade, onRestart, onHome }) => {
  const gradeLabels = {
    legend: { label: '전설의 타자!', icon: '🏆' },
    great: { label: '강타자!', icon: '💪' },
    good: { label: '선전했어요!', icon: '👍' },
    out: { label: '삼진 아웃...', icon: '😢' }
  };
  
  const scoreMap = {
    homerun: 400,
    '3base': 300,
    '2base': 200,
    '1base': 100,
    strike: 0
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full min-h-screen bg-gray-950 px-6 py-12" role="main" aria-label="게임 최종 결과 화면">
      <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">게임 종료!</h2>
      <ResultBadge grade={grade} label={gradeLabels[grade].label} icon={gradeLabels[grade].icon} />
      
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {history.map((h, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-xl">
            <span className="text-gray-400 text-sm font-medium">{i + 1}타석</span>
            <ScoreLabel result={h} size="sm" />
            <span className="text-gray-300 text-sm font-bold tabular-nums">+{scoreMap[h]}점</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full max-w-xs px-4 py-4 bg-gray-800 rounded-2xl border border-yellow-500/30">
        <span className="text-gray-300 font-bold text-lg">최종 점수</span>
        <span className="text-yellow-300 font-black text-3xl tabular-nums">{totalScore}점</span>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
        <button onClick={onRestart} className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 active:scale-95 text-white font-extrabold text-xl shadow-lg transition-all" role="button" aria-label="게임 다시 시작">
          🔄 다시 도전
        </button>
        <button onClick={onHome} className="w-full py-4 rounded-2xl bg-gray-700 hover:bg-gray-600 active:bg-gray-800 active:scale-95 text-gray-200 font-bold text-lg shadow transition-all" role="button" aria-label="홈 화면으로 이동">
          🏠 홈으로
        </button>
      </div>
    </div>
  );
};
`);

defineComponent('templates', 'GameTemplate', `
import React from 'react';

export interface GameTemplateProps {
  hud: React.ReactNode;
  stage: React.ReactNode;
}

export const GameTemplate: React.FC<GameTemplateProps> = ({ hud, stage }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto w-full bg-gray-950 text-white overflow-hidden" role="application" aria-label="야구 게임 레이아웃">
      <div className="w-full flex-shrink-0">{hud}</div>
      <div className="flex-1 flex flex-col overflow-hidden">{stage}</div>
    </div>
  );
};
`);

defineComponent('pages', 'BaseballGamePage', `
import React, { useState, useEffect, useRef } from 'react';
import { StartScreen } from '../organisms/StartScreen';
import { GameTemplate } from '../templates/GameTemplate';
import { GameHUD } from '../organisms/GameHUD';
import { BattingStage } from '../organisms/BattingStage';
import { ResultScreen } from '../organisms/ResultScreen';

const difficultyConfig = {
  easy:   { bpm: 60,  pitchDuration: 2000, hitZone: [0.32, 0.68], perfectZone: [0.44, 0.56] },
  normal: { bpm: 80,  pitchDuration: 1500, hitZone: [0.38, 0.62], perfectZone: [0.46, 0.54] },
  hard:   { bpm: 100, pitchDuration: 1000, hitZone: [0.42, 0.58], perfectZone: [0.48, 0.52] }
};

export const BaseballGamePage: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<'start'|'countdown'|'playing'|'inning-result'|'finished'>('start');
  const [difficulty, setDifficulty] = useState<'easy'|'normal'|'hard'>('normal');
  const [score, setScore] = useState(0);
  const [inning, setInning] = useState(1);
  const [usedChances, setUsedChances] = useState(0);
  const [history, setHistory] = useState<Array<'homerun'|'3base'|'2base'|'1base'|'strike'>>([]);
  const [progress, setProgress] = useState(0);
  const [hitResult, setHitResult] = useState<'homerun'|'3base'|'2base'|'1base'|'strike'|null>(null);
  const [scoreIncrement, setScoreIncrement] = useState(0);
  const [countdown, setCountdown] = useState<number|string>('');
  const [beat, setBeat] = useState(0);

  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const config = difficultyConfig[difficulty];

  const animatePitch = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    let newProgress = elapsed / config.pitchDuration;

    if (newProgress >= 1) {
      newProgress = 1;
      handleSwing(1); // Auto strike when progress reaches 1
    } else {
      setProgress(newProgress);
      requestRef.current = requestAnimationFrame(animatePitch);
    }
  };

  useEffect(() => {
    if (gamePhase === 'playing' && !hitResult) {
      setProgress(0);
      startTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animatePitch);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gamePhase, hitResult]);

  useEffect(() => {
    let interval: any;
    if (gamePhase === 'countdown') {
      let count = 3;
      setCountdown(count);
      interval = setInterval(() => {
        count--;
        if (count > 0) setCountdown(count);
        else if (count === 0) setCountdown('GO!');
        else {
          clearInterval(interval);
          setGamePhase('playing');
        }
      }, 800);
    }
    return () => clearInterval(interval);
  }, [gamePhase]);

  useEffect(() => {
    let interval: any;
    if (gamePhase === 'playing') {
      interval = setInterval(() => {
        setBeat(b => b + 1);
      }, (60000 / config.bpm));
    }
    return () => clearInterval(interval);
  }, [gamePhase, config.bpm]);

  const handleStart = () => {
    setScore(0);
    setInning(1);
    setUsedChances(0);
    setHistory([]);
    setHitResult(null);
    setProgress(0);
    setGamePhase('countdown');
  };

  const handleSwing = (forcedProgress?: number) => {
    if (hitResult || gamePhase !== 'playing') return;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    const currentProgress = forcedProgress !== undefined ? forcedProgress : progress;
    let result: 'homerun'|'3base'|'2base'|'1base'|'strike' = 'strike';
    let pts = 0;

    if (currentProgress >= config.perfectZone[0] && currentProgress <= config.perfectZone[1]) {
      result = 'homerun'; pts = 400;
    } else if (currentProgress >= config.hitZone[0] && currentProgress <= config.hitZone[1]) {
      // rough distance calculation
      const distToCenter = Math.abs(currentProgress - 0.5);
      if (distToCenter < 0.08) { result = '3base'; pts = 300; }
      else if (distToCenter < 0.12) { result = '2base'; pts = 200; }
      else { result = '1base'; pts = 100; }
    }

    setHitResult(result);
    setScoreIncrement(pts);
    setScore(s => s + pts);
    setHistory(h => [...h, result]);
    if (result === 'strike') setUsedChances(u => u + 1);
    
    setGamePhase('inning-result');

    setTimeout(() => {
      setHitResult(null);
      if (inning < 3) {
        setInning(i => i + 1);
        setGamePhase('countdown');
      } else {
        setGamePhase('finished');
      }
    }, 1500);
  };

  const getGrade = (): 'legend'|'great'|'good'|'out' => {
    if (score >= 1200) return 'legend';
    if (score >= 500) return 'great';
    if (score >= 100) return 'good';
    return 'out';
  };

  return (
    <div className="relative w-screen h-screen bg-gray-950 overflow-hidden select-none" role="application" aria-label="웹 기반 야구 게임 — 탭 야구">
      {gamePhase === 'start' && (
        <StartScreen 
          selectedDifficulty={difficulty} 
          onDifficultyChange={setDifficulty} 
          onStart={handleStart} 
        />
      )}
      
      {(gamePhase === 'countdown' || gamePhase === 'playing' || gamePhase === 'inning-result') && (
        <GameTemplate 
          hud={
            <GameHUD 
              score={score} 
              currentInning={inning} 
              usedChances={usedChances} 
              bpm={config.bpm} 
              beat={beat} 
              gamePhase={gamePhase} 
            />
          }
          stage={
            <BattingStage 
              pitching={gamePhase === 'playing' && !hitResult}
              progress={progress}
              hitResult={hitResult}
              canSwing={gamePhase === 'playing' && !hitResult}
              showCountdown={gamePhase === 'countdown'}
              countdownValue={countdown}
              onSwing={() => handleSwing()}
              hitZoneConfig={{
                hitZoneStart: config.hitZone[0],
                hitZoneEnd: config.hitZone[1],
                perfectZoneStart: config.perfectZone[0],
                perfectZoneEnd: config.perfectZone[1]
              }}
              scoreIncrement={scoreIncrement}
            />
          }
        />
      )}

      {gamePhase === 'finished' && (
        <ResultScreen 
          totalScore={score} 
          history={history} 
          grade={getGrade()} 
          onRestart={handleStart} 
          onHome={() => setGamePhase('start')} 
        />
      )}
    </div>
  );
};
`);

// Write files
fs.mkdirSync('src/components', { recursive: true });
let exportsIndex = {};

Object.keys(components).forEach(type => {
  fs.mkdirSync(`src/components/${type}`, { recursive: true });
  const indexContent = [];
  Object.entries(components[type]).forEach(([name, code]) => {
    fs.writeFileSync(`src/components/${type}/${name}.tsx`, code);
    indexContent.push(`export * from './${name}';`);
  });
  if (indexContent.length > 0) {
    fs.writeFileSync(`src/components/${type}/index.ts`, indexContent.join('\n'));
  }
});

// Write preview.html
let htmlReactCode = "";
htmlReactCode += "const { useState, useEffect, useRef } = React;\n";

// Inject all component code but strip imports and exports
Object.keys(components).forEach(type => {
  Object.entries(components[type]).forEach(([name, code]) => {
    let cleanCode = code
      .replace(/import .* from .*;/g, '')
      .replace(/export interface/g, 'interface')
      .replace(/export const/g, 'const');
    htmlReactCode += cleanCode + "\n";
  });
});
});

htmlReactCode += "\nconst App = () => <BaseballGamePage />;\n";
htmlReactCode += "const root = ReactDOM.createRoot(document.getElementById('root'));\n";
htmlReactCode += "root.render(<App />);\n";

const htmlContent = '<!DOCTYPE html>\n' +
'<html lang="ko">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n' +
'  <title>Baseball Game Preview</title>\n' +
'  <script src="https://cdn.tailwindcss.com"></script>\n' +
'  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>\n' +
'  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>\n' +
'  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>\n' +
'  <style>\n' +
'    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; overflow: hidden; touch-action: none; background: #030712; color: white; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="root"></div>\n' +
'  <script type="text/babel" data-presets="react,typescript">\n' +
htmlReactCode +
'\n  </script>\n' +
'</body>\n' +
'</html>';

fs.writeFileSync('preview.html', htmlContent);

console.log('All files generated successfully.');
