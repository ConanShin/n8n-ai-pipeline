
import React, { useState, useEffect, useRef } from 'react';
import { StartScreen } from '../organisms/StartScreen';
import { GameTemplate } from '../templates/GameTemplate';
import { GameHUD } from '../organisms/GameHUD';
import { BattingStage } from '../organisms/BattingStage';
import { ResultScreen } from '../organisms/ResultScreen';

type Difficulty = 'easy' | 'normal' | 'hard';
type Phase = 'start' | 'countdown' | 'playing' | 'inning-result' | 'finished';

const difficultyConfig = {
  easy: { bpm: 60, pitchDuration: 2000, hitZone: [0.32, 0.68], perfectZone: [0.44, 0.56] },
  normal: { bpm: 80, pitchDuration: 1500, hitZone: [0.38, 0.62], perfectZone: [0.46, 0.54] },
  hard: { bpm: 100, pitchDuration: 1000, hitZone: [0.42, 0.58], perfectZone: [0.48, 0.52] }
};

const scoreMap: Record<string, { points: number }> = {
  homerun: { points: 400 },
  '3base': { points: 300 },
  '2base': { points: 200 },
  '1base': { points: 100 },
  strike: { points: 0 }
};

export const BaseballGamePage: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<Phase>('start');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');
  const [score, setScore] = useState(0);
  const [currentInning, setCurrentInning] = useState(1);
  const [usedChances, setUsedChances] = useState(0);
  const [history, setHistory] = useState<Array<{ result: string; points: number }>>([]);
  
  const [countdownValue, setCountdownValue] = useState<number | string>('');
  const [progress, setProgress] = useState(0);
  const [hitResult, setHitResult] = useState<string | null>(null);
  const [scoreIncrement, setScoreIncrement] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [beat, setBeat] = useState(0);
  
  const config = difficultyConfig[selectedDifficulty];
  const reqRef = useRef<number>();
  const startRef = useRef<number>();

  useEffect(() => {
    if (gamePhase === 'countdown') {
      let step = 0;
      const values = [3, 2, 1, 'GO!'];
      setCountdownValue(values[0]);
      
      const interval = setInterval(() => {
        step++;
        if (step < values.length) {
          setCountdownValue(values[step]);
        } else {
          clearInterval(interval);
          setGamePhase('playing');
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === 'playing') {
      const beatInterval = (60 / config.bpm) * 1000;
      const interval = setInterval(() => {
        setBeat(b => b + 1);
      }, beatInterval);
      return () => clearInterval(interval);
    }
  }, [gamePhase, config.bpm]);

  useEffect(() => {
    if (gamePhase === 'playing') {
      setProgress(0);
      setHitResult(null);
      setOverlayVisible(false);
      setScoreIncrement(0);

      const animate = (time: number) => {
        if (!startRef.current) startRef.current = time;
        const elapsed = time - startRef.current;
        const p = Math.min(elapsed / config.pitchDuration, 1);
        
        setProgress(p);

        if (p < 1) {
          reqRef.current = requestAnimationFrame(animate);
        } else {
          handleSwing(1);
        }
      };
      
      startRef.current = undefined;
      reqRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (reqRef.current) cancelAnimationFrame(reqRef.current);
      };
    }
  }, [gamePhase]);

  const handleSwing = (currentProgress: number = progress) => {
    if (hitResult !== null) return;
    
    if (reqRef.current) {
      cancelAnimationFrame(reqRef.current);
    }

    let result = 'strike';
    
    const { hitZone, perfectZone } = config;
    if (currentProgress >= perfectZone[0] && currentProgress <= perfectZone[1]) {
      result = 'homerun';
    } else if (currentProgress >= hitZone[0] && currentProgress <= hitZone[1]) {
      const center = (perfectZone[0] + perfectZone[1]) / 2;
      const dist = Math.abs(currentProgress - center);
      const maxDist = (hitZone[1] - hitZone[0]) / 2;
      const ratio = dist / maxDist;
      
      if (ratio < 0.3) result = '3base';
      else if (ratio < 0.6) result = '2base';
      else result = '1base';
    }

    const points = scoreMap[result].points;
    setHitResult(result);
    setScoreIncrement(points);
    setScore(s => s + points);
    setOverlayVisible(true);
    setHistory(h => [...h, { result, points }]);

    setTimeout(() => setOverlayVisible(false), 1200);
    setTimeout(() => setGamePhase('inning-result'), 1500);
  };

  useEffect(() => {
    if (gamePhase === 'inning-result') {
      if (currentInning < 3) {
        setCurrentInning(i => i + 1);
        setUsedChances(u => u + 1);
        setGamePhase('countdown');
      } else {
        setGamePhase('finished');
      }
    }
  }, [gamePhase, currentInning]);

  const handleStart = () => {
    setScore(0);
    setCurrentInning(1);
    setUsedChances(0);
    setHistory([]);
    setGamePhase('countdown');
  };

  const getGrade = () => {
    if (score >= 1200) return 'legend';
    if (score >= 500) return 'great';
    if (score >= 100) return 'good';
    return 'out';
  };

  return (
    <div role="application" aria-label="웹 기반 야구 게임 — 탭 야구" lang="ko" className="relative w-full h-full bg-gray-950 overflow-hidden select-none">
      {gamePhase === 'start' && (
        <StartScreen 
          onStart={handleStart} 
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
        />
      )}

      {(gamePhase === 'countdown' || gamePhase === 'playing' || gamePhase === 'inning-result') && (
        <GameTemplate
          hud={
            <GameHUD 
              score={score} 
              currentInning={currentInning} 
              usedChances={usedChances}
              bpm={config.bpm}
              beat={beat}
              gamePhase={gamePhase}
            />
          }
          stage={
            <BattingStage 
              pitching={gamePhase === 'playing'}
              progress={progress}
              hitResult={hitResult}
              canSwing={gamePhase === 'playing' && hitResult === null}
              showCountdown={gamePhase === 'countdown'}
              countdownValue={countdownValue}
              onSwing={() => handleSwing(progress)}
              hitZoneConfig={{
                hitZoneStart: config.hitZone[0],
                hitZoneEnd: config.hitZone[1],
                perfectZoneStart: config.perfectZone[0],
                perfectZoneEnd: config.perfectZone[1]
              }}
              scoreIncrement={scoreIncrement}
              overlayVisible={overlayVisible}
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
