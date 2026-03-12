import React from 'react';
import { GameTitle } from '../atoms/GameTitle';
import { RuleCard } from '../molecules/RuleCard';
import { StartButton } from '../atoms/StartButton';

export interface LobbyScreenProps {
  onStart: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({ onStart }) => {
  const rules = [
    { icon: "💥", label: "홈런", timing: "완벽 (±50ms)", color: "text-yellow-400", points: 4 },
    { icon: "🔥", label: "3루타", timing: "훌륭 (±100ms)", color: "text-orange-400", points: 3 },
    { icon: "✅", label: "2루타", timing: "좋음 (±150ms)", color: "text-green-400", points: 2 },
    { icon: "👍", label: "1루타", timing: "보통 (±200ms)", color: "text-blue-400", points: 1 },
    { icon: "❌", label: "스트라이크", timing: "미스", color: "text-red-400", points: 0 }
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full min-h-screen px-6 py-12 bg-gray-950" role="region" aria-label="게임 로비">
      <GameTitle title="⚾ BASEBALL" subtitle="타이밍을 맞춰 홈런을 노려라!" />
      <RuleCard rules={rules} chances={3} />
      <StartButton onClick={onStart} />
    </div>
  );
};
