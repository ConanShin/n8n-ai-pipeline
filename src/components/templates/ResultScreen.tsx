import React from 'react';
import { ResultTitle } from '../atoms/ResultTitle';
import { FinalScoreCard } from '../molecules/FinalScoreCard';
import { HitRecordList } from '../molecules/HitRecordList';
import { RetryButton } from '../atoms/RetryButton';
import { ShareButton } from '../atoms/ShareButton';

export interface ResultScreenProps {
  finalScore: number;
  hitRecord: Array<'homerun' | 'triple' | 'double' | 'single' | 'strike'>;
  onRetry: () => void;
  onShare?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ finalScore, hitRecord, onRetry, onShare }) => {
  const getGrade = (score: number) => {
    if (score >= 12) return { grade: 'S' as const, message: '완벽한 타자! 전설의 홈런왕!' };
    if (score >= 9) return { grade: 'A' as const, message: '훌륭한 타격 솜씨입니다!' };
    if (score >= 6) return { grade: 'B' as const, message: '좋은 타자네요!' };
    if (score >= 3) return { grade: 'C' as const, message: '아쉬운 결과, 조금 더 연습해보세요!' };
    return { grade: 'D' as const, message: '타이밍을 맞추는 연습이 필요합니다!' };
  };

  const { grade, message } = getGrade(finalScore);

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full min-h-screen px-6 py-12 bg-gray-950" role="region" aria-label="게임 결과 화면">
      <ResultTitle grade={grade} message={message} />
      <FinalScoreCard score={finalScore} maxScore={12} />
      <HitRecordList records={hitRecord} />
      <div className="flex flex-col items-center gap-4 w-full mt-4">
        <RetryButton onClick={onRetry} />
        {onShare && <ShareButton onClick={onShare} />}
      </div>
    </div>
  );
};
