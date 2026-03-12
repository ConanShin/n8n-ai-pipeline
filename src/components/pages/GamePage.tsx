
import React, { useState, useEffect, useRef } from 'react';
import { GameHeader } from '../organisms/GameHeader';
import { GameField } from '../organisms/GameField';
import { GameHUD } from '../organisms/GameHUD';
import { ResultOverlay } from '../organisms/ResultOverlay';
import { IdleScreen } from '../templates/IdleScreen';

export interface GamePageProps {
  gameState?: 'idle' | 'playing' | 'result' | 'paused';
}

export const GamePage: React.FC<GamePageProps> = ({ gameState: initialGameState = 'idle' }) => {
  const [gameState, setGameState] = useState<'idle'|'playing'|'paused'|'result'>(initialGameState);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [outs, setOuts] = useState(0);
  const [basesOccupied, setBasesOccupied] = useState({ first: false, second: false, third: false });
  const [summary, setSummary] = useState({ homeruns: 0, triples: 0, doubles: 0, singles: 0, strikes: 0 });

  const [hitResult, setHitResult] = useState<'homerun'|'triple'|'double'|'single'|'strike'|null>(null);
  const [isHitBadgeVisible, setIsHitBadgeVisible] = useState(false);
  const [isSwingActive, setIsSwingActive] = useState(false);

  const [markerPosition, setMarkerPosition] = useState(50);
  const [ballPositionX, setBallPositionX] = useState(50);
  const [ballPositionY, setBallPositionY] = useState(30);
  const [ballSize, setBallSize] = useState(16);
  const [isBallVisible, setIsBallVisible] = useState(false);
  const [ballPhase, setBallPhase] = useState<'hidden'|'flying'>('hidden');

  const gameLoopRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pitchStartTimeRef = useRef<number | null>(null);
  const lastPitchTimeRef = useRef<number>(0);

  // Use refs for state accessed inside animation frame
  const stateRef = useRef({ gameState, ballPhase, strikes, outs, basesOccupied, markerPosition, ballPositionY, score });
  useEffect(() => {
    stateRef.current = { gameState, ballPhase, strikes, outs, basesOccupied, markerPosition, ballPositionY, score };
  }, [gameState, ballPhase, strikes, outs, basesOccupied, markerPosition, ballPositionY, score]);

  const registerHit = (hit: 'homerun'|'triple'|'double'|'single'|'strike') => {
    setHitResult(hit);
    setIsHitBadgeVisible(true);
    setTimeout(() => setIsHitBadgeVisible(false), 1200);
    
    setSummary(s => ({ ...s, [`${hit}s`]: s[hit as keyof typeof s] + 1 }));
    
    if (hit === 'strike') {
      const newStrikes = stateRef.current.strikes + 1;
      if (newStrikes >= 3) {
        const newOuts = stateRef.current.outs + 1;
        if (newOuts >= 3) {
          setGameState('result');
        } else {
          setOuts(newOuts);
          setStrikes(0);
        }
      } else {
        setStrikes(newStrikes);
      }
    } else {
      setStrikes(0);
      let points = 0;
      if (hit === 'homerun') points = 4;
      if (hit === 'triple') points = 3;
      if (hit === 'double') points = 2;
      if (hit === 'single') points = 1;
      
      let newBases = { ...stateRef.current.basesOccupied };
      if (hit === 'homerun') {
        newBases = { first: false, second: false, third: false };
      } else if (hit === 'triple') {
        newBases = { first: false, second: false, third: true };
      } else if (hit === 'double') {
        newBases.third = newBases.first;
        newBases.second = true;
        newBases.first = false;
      } else if (hit === 'single') {
        newBases.third = newBases.second;
        newBases.second = newBases.first;
        newBases.first = true;
      }
      
      setBasesOccupied(newBases);
      setScore(stateRef.current.score + points);
    }
  };

  const handleMiss = () => {
    setBallPhase('hidden');
    setIsBallVisible(false);
    registerHit('strike');
  };

  const handleSwing = () => {
    if (gameState !== 'playing') return;
    setIsSwingActive(true);
    setTimeout(() => setIsSwingActive(false), 300);
    
    if (stateRef.current.ballPhase === 'flying' && stateRef.current.ballPositionY > 70) {
      const distance = Math.abs(stateRef.current.markerPosition - 50);
      const accuracy = 100 - (distance / 50) * 100;
      
      let hit: 'strike'|'single'|'double'|'triple'|'homerun' = 'strike';
      if (accuracy >= 84) hit = 'homerun';
      else if (accuracy >= 75) hit = 'triple';
      else if (accuracy >= 60) hit = 'double';
      else if (accuracy >= 50) hit = 'single';
      
      registerHit(hit);
      setBallPhase('hidden');
      setIsBallVisible(false);
    } else {
      registerHit('strike');
      if (stateRef.current.ballPhase === 'flying') {
        setBallPhase('hidden');
        setIsBallVisible(false);
      }
    }
  };

  useEffect(() => {
    const loop = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      
      if (stateRef.current.gameState === 'playing') {
        const elapsed = time - startTimeRef.current;
        const markerCycle = (elapsed % 3000) / 1500;
        const pos = markerCycle <= 1 ? markerCycle * 100 : (2 - markerCycle) * 100;
        setMarkerPosition(pos);
        
        if (stateRef.current.ballPhase === 'hidden') {
          if (time - lastPitchTimeRef.current > 2000 && Math.random() < 0.02) {
            setBallPhase('flying');
            pitchStartTimeRef.current = time;
            setIsBallVisible(true);
            lastPitchTimeRef.current = time;
          }
        } else if (stateRef.current.ballPhase === 'flying') {
          const pitchElapsed = time - (pitchStartTimeRef.current || 0);
          const pitchDuration = 1000;
          if (pitchElapsed < pitchDuration) {
            const progress = pitchElapsed / pitchDuration;
            setBallPositionY(30 + progress * 70);
            setBallSize(16 + progress * 48); // up to 64px
            setBallPositionX(50 + Math.sin(progress * Math.PI) * 5); 
          } else {
            handleMiss();
          }
        }
      } else {
        startTimeRef.current = time - (markerPosition / 100) * 1500; // retain marker pos
      }
      
      gameLoopRef.current = requestAnimationFrame(loop);
    };

    if (gameState === 'playing' || gameState === 'paused') {
       gameLoopRef.current = requestAnimationFrame(loop);
    }
    
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState]);

  const handleStart = () => {
    setGameState('playing');
  };

  const handlePause = () => {
    setGameState(gameState === 'playing' ? 'paused' : 'playing');
  };

  const handleRestart = () => {
    setScore(0);
    setStrikes(0);
    setOuts(0);
    setBasesOccupied({ first: false, second: false, third: false });
    setSummary({ homeruns: 0, triples: 0, doubles: 0, singles: 0, strikes: 0 });
    setBallPhase('hidden');
    setIsBallVisible(false);
    setGameState('idle');
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-950 text-white overflow-hidden select-none max-w-sm mx-auto md:max-w-md lg:max-w-lg relative" role="main" aria-label="야구 게임 메인 화면">
      <GameHeader score={score} strikes={strikes} outs={outs} />
      <GameField 
        isPlaying={gameState === 'playing'} 
        onSwing={handleSwing} 
        ballPosition={{ x: ballPositionX, y: ballPositionY }}
        hitResult={hitResult}
        isHitBadgeVisible={isHitBadgeVisible}
        isSwingActive={isSwingActive}
        markerPosition={markerPosition}
        ballSize={ballSize}
        isBallVisible={isBallVisible}
      />
      <GameHUD 
        gameState={gameState} 
        onStart={handleStart} 
        onPause={handlePause} 
        basesOccupied={basesOccupied} 
      />
      {gameState === 'idle' && <IdleScreen onStart={handleStart} />}
      <ResultOverlay 
        isVisible={gameState === 'result'} 
        finalScore={score} 
        summary={summary} 
        onRestart={handleRestart} 
      />
    </div>
  );
};
