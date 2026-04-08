import React from 'react';
import { GreetingText } from '../atoms/GreetingText';
import { GreetingBadge } from '../atoms/GreetingBadge';

export interface HelloWorldCardProps {
  /** 메인 인사 문구 */
  greetingText: string;
  /** 하단 배지에 표시할 보조 텍스트 */
  badgeLabel?: string;
}

export const HelloWorldCard: React.FC<HelloWorldCardProps> = ({
  greetingText,
  badgeLabel,
}) => {
  return (
    <section
      role="region"
      aria-label="Hello World greeting card"
      className="flex flex-col items-center justify-center gap-6 bg-white rounded-2xl shadow-lg p-10 md:p-16 max-w-2xl w-full mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <GreetingText text={greetingText} />

      {/* 서브타이틀 텍스트 */}
      <p className="text-base md:text-lg text-gray-500 text-center">
        Claude 3.5 Sonnet 모델 테스트 배포
      </p>

      <GreetingBadge label={badgeLabel} />
    </section>
  );
};

export default HelloWorldCard;
