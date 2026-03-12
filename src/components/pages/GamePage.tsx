import React, { useState, useEffect, useRef } from 'react';
import { LobbyScreen } from '../templates/LobbyScreen';
import { GameScreen } from '../templates/GameScreen';
import { ResultScreen } from '../templates/ResultScreen';

export type GameState = 'lobby' | 'playing' | 'result';
export type BallState = 'idle' | 'incoming' | 'hit' | 'miss';
export type HitResult = 'homerun' | 'triple' | 'double' | 'single' | 'strike';

export const GamePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('lobby');
  const [score, setScore] = useState(0);
  const [chancesLeft, setChancesLeft] = useState(3);
  const [ballState, setBallState] = useState<BallState>('idle');
  const [lastResult, setLastResult] = useState<HitResult | null>(null);
  const [hitRecord, setHitRecord] = useState<HitResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [pitchCount, setPitchCount] = useState(0);
  
  const animationRef = useRef<number>();
  const progressRef = useRef(0);
  const ballSpeed = 1500;

  const zones = [
    { label: "스트라이크", color: "bg-red-600", rangeStart: 0, rangeEnd: 30 },
    { label: "1루타", color: "bg-blue-500", rangeStart: 30, rangeEnd: 42 },
    { label: "2루타", color: "bg-green-500", rangeStart: 42, rangeEnd: 52 },
    { label: "홈런", color: "bg-yellow-400", rangeStart: 52, rangeEnd: 60 },
    { label: "2루타", color: "bg-green-500", rangeStart: 60, rangeEnd: 70 },
    { label: "1루타", color: "bg-blue-500", rangeStart: 70, rangeEnd: 82 },
    { label: "스트라이크", color: "bg-red-600", rangeStart: 82, rangeEnd: 100 }
  ];

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setChancesLeft(3);
    setHitRecord([]);
    setPitchCount(0);
    preparePitch();
  };

  const preparePitch = () => {
    setBallState('idle');
    setLastResult(null);
    setProgress(0);
    progressRef.current = 0;
    
    setTimeout(() => {
      startPitch();
    }, 1000);
  };

  const startPitch = () => {
    setBallState('incoming');
    setPitchCount(prev => prev + 1);
    const startTime = performance.now();
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const currentProgress = Math.min((elapsed / ballSpeed) * 100, 100);
      progressRef.current = currentProgress;
      setProgress(currentProgress);
      
      if (currentProgress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        handleMiss();
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMiss = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    setBallState('miss');
    processResult('strike');
  };

  const handleBat = () => {
    if (ballState !== 'incoming') return;
    
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    const currentProgress = progressRef.current;
    
    let result: HitResult = 'strike';
    if (currentProgress >= 48 && currentProgress < 52) result = 'triple';
    else if (currentProgress >= 52 && currentProgress <= 60) result = 'homerun';
    else if (currentProgress > 60 && currentProgress <= 64) result = 'triple';
    else if (currentProgress >= 42 && currentProgress < 48) result = 'double';
    else if (currentProgress > 64 && currentProgress <= 70) result = 'double';
    else if (currentProgress >= 30 && currentProgress < 42) result = 'single';
    else if (currentProgress > 70 && currentProgress <= 82) result = 'single';

    setBallState('hit');
    processResult(result);
  };

  const processResult = (result: HitResult) => {
    setLastResult(result);
    setHitRecord(prev => [...prev, result]);
    
    const points = { homerun: 4, triple: 3, double: 2, single: 1, strike: 0 };
    setScore(prev => prev + points[result]);
    
    if (result === 'strike') {
      setChancesLeft(prev => {
        const next = prev - 1;
        if (next <= 0) {
          setTimeout(() => setGameState('result'), 2000);
        } else {
          setTimeout(preparePitch, 2000);
        }
        return next;
      });
    } else {
      setTimeout(preparePitch, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full bg-gray-950 overflow-hidden text-white" role="main" aria-label="야구 타이밍 게임">
      {gameState === 'lobby' && <LobbyScreen onStart={startGame} />}
      {gameState === 'playing' && (
        <GameScreen
          score={score}
          chancesLeft={chancesLeft}
          ballState={ballState}
          lastResult={lastResult}
          onBat={handleBat}
          progress={progress}
          zones={zones}
          pitchCount={pitchCount}
        />
      )}
      {gameState === 'result' && (
        <ResultScreen
          finalScore={score}
          hitRecord={hitRecord}
          onRetry={startGame}
          onShare={() => alert(`내 최종 점수: ${score}점!`)}
        />
      )}
    </div>
  );
};
