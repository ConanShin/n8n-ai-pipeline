import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameTemplate } from '../templates/GameTemplate';
import { GameHUD } from '../organisms/GameHUD';
import { BattingField } from '../organisms/BattingField';
import { ReadyCountdown } from '../organisms/ReadyCountdown';
import { GameOverPanel } from '../organisms/GameOverPanel';
import { WindowRange } from '../atoms/HitZoneBar';

export type GamePhase = 'idle' | 'countdown' | 'pitching' | 'swinging' | 'showing-result' | 'paused' | 'game-over';
export type HitQuality = 'perfect' | 'good' | 'miss' | null;
export type TimingFeedback = 'perfect' | 'good' | 'early' | 'late' | null;
export type HitResult = 'homerun' | 'triple' | 'double' | 'single' | 'strike';

export interface BaseballGamePageProps {
  difficulty?: 'easy' | 'normal' | 'hard';
}

const TIMING_WINDOWS = {
  easy:   { perfect: { start: 0.42, end: 0.58 }, good: { start: 0.34, end: 0.66 } },
  normal: { perfect: { start: 0.46, end: 0.54 }, good: { start: 0.38, end: 0.62 } },
  hard:   { perfect: { start: 0.48, end: 0.52 }, good: { start: 0.43, end: 0.57 } },
};

const getPitchSpeed = (pitchCount: number) => {
  if (pitchCount === 0) return 1400;
  if (pitchCount === 1) return 1200;
  if (pitchCount === 2) return 1000;
  return 850;
};

export const BaseballGamePage: React.FC<BaseballGamePageProps> = ({ difficulty = 'normal' }) => {
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [strikeCount, setStrikeCount] = useState(0);
  const [pitchCount, setPitchCount] = useState(0);
  const [ballProgress, setBallProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [scoreUpdated, setScoreUpdated] = useState(false);
  
  const [lastResult, setLastResult] = useState<HitResult | null>(null);
  const [lastTiming, setLastTiming] = useState<TimingFeedback>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [hitSummary, setHitSummary] = useState({
    homerun: 0, triple: 0, double: 0, single: 0, strike: 0
  });

  const timerRef = useRef<number | null>(null);
  const pitchStartTimeRef = useRef<number>(0);

  const currentWindow = TIMING_WINDOWS[difficulty];
  const ballSpeedMs = getPitchSpeed(pitchCount);

  // Ball progress update loop
  useEffect(() => {
    if (phase === 'pitching') {
      pitchStartTimeRef.current = Date.now();
      
      const updateProgress = () => {
        const elapsed = Date.now() - pitchStartTimeRef.current;
        const progress = elapsed / ballSpeedMs;
        setBallProgress(progress);

        if (progress > 1.2) { // Past screen without swing
           handleSwing(true); // force miss
        } else {
           timerRef.current = requestAnimationFrame(updateProgress);
        }
      };
      
      timerRef.current = requestAnimationFrame(updateProgress);
      return () => {
        if (timerRef.current) cancelAnimationFrame(timerRef.current);
      };
    } else if (phase === 'paused') {
      // Pause animation
    } else if (phase !== 'swinging' && phase !== 'showing-result') {
      setBallProgress(0);
    }
  }, [phase, ballSpeedMs]);

  const handleSwing = useCallback((forceMiss = false) => {
    if (phase !== 'pitching') return;
    setPhase('swinging');

    if (timerRef.current) cancelAnimationFrame(timerRef.current);

    let result: HitResult = 'strike';
    let timing: TimingFeedback = null;
    let points = 0;

    if (!forceMiss) {
      const p = ballProgress;
      const { perfect, good } = currentWindow;
      
      if (p >= perfect.start && p <= perfect.end) {
        result = 'homerun';
        timing = 'perfect';
        points = 400;
      } else if (p >= good.start && p <= good.end) {
        // Good timing - break it down
        const perfectCenter = (perfect.start + perfect.end) / 2;
        const distance = Math.abs(p - perfectCenter);
        const maxGoodDistance = (good.end - good.start) / 2;
        const ratio = distance / maxGoodDistance; // 0 to 1

        timing = p < perfect.start ? 'early' : 'late';

        if (ratio < 0.6) {
          result = 'triple';
          points = 200;
        } else if (ratio < 0.85) {
          result = 'double';
          points = 100;
        } else {
          result = 'single';
          points = 50;
        }
      } else {
        result = 'strike';
        timing = p < good.start ? 'early' : 'late';
        points = 0;
      }
    } else {
      result = 'strike';
      timing = 'late';
      points = 0;
    }

    setLastResult(result);
    setLastTiming(timing);
    setHitSummary(prev => ({ ...prev, [result]: prev[result] + 1 }));

    if (points > 0) {
      setScore(s => {
        const newScore = s + points;
        if (newScore > bestScore) {
          setBestScore(newScore);
          setIsNewRecord(true);
        }
        return newScore;
      });
      setScoreUpdated(true);
      setTimeout(() => setScoreUpdated(false), 300);
    }

    setPhase('showing-result');

    setTimeout(() => {
      if (result === 'strike') {
        setStrikeCount(s => {
          const nextS = s + 1;
          if (nextS >= 3) {
            setPhase('game-over');
            return nextS;
          }
          setPhase('pitching');
          setPitchCount(p => p + 1);
          return nextS;
        });
      } else {
        setPhase('pitching');
        setPitchCount(p => p + 1);
      }
    }, 1000);
    
  }, [phase, ballProgress, currentWindow, bestScore]);

  const startGame = () => {
    setPhase('countdown');
    setScore(0);
    setStrikeCount(0);
    setPitchCount(0);
    setIsNewRecord(false);
    setHitSummary({ homerun: 0, triple: 0, double: 0, single: 0, strike: 0 });
  };

  useEffect(() => {
    if (phase === 'idle') {
      setPhase('countdown');
    }
  }, []);

  return (
    <GameTemplate 
      hud={
        <GameHUD 
          score={score}
          bestScore={bestScore}
          strikeCount={strikeCount}
          scoreUpdated={scoreUpdated}
          isPaused={phase === 'paused'}
          isMuted={isMuted}
          onPause={() => phase === 'pitching' ? setPhase('paused') : (phase === 'paused' ? setPhase('pitching') : null)}
          onRestart={startGame}
          onMute={() => setIsMuted(!isMuted)}
        />
      }
      field={
        <BattingField 
          gamePhase={phase}
          ballSpeedMs={ballSpeedMs}
          ballProgress={ballProgress}
          lastResult={lastResult}
          lastTiming={lastTiming}
          perfectWindow={currentWindow.perfect}
          goodWindow={currentWindow.good}
          onSwing={handleSwing}
        />
      }
      overlay={
        <>
          <ReadyCountdown 
            visible={phase === 'countdown'}
            onCountdownEnd={() => setPhase('pitching')}
          />
          <GameOverPanel 
            visible={phase === 'game-over'}
            finalScore={score}
            isNewRecord={isNewRecord}
            hitSummary={hitSummary}
            onRestart={startGame}
          />
        </>
      }
    />
  );
};
