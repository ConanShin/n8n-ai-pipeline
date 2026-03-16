
import React from 'react';
import { BallIcon } from '../atoms/BallIcon';
export interface AttemptsIndicatorProps { total: number; remaining: number; }
export const AttemptsIndicator: React.FC<AttemptsIndicatorProps> = ({ total, remaining }) => (
  <div className="flex flex-row items-center gap-2" role="img" aria-label="남은 기회 표시">
    {Array.from({ length: total }).map((_, i) => <BallIcon key={i} active={i < remaining} />)}
  </div>
);
