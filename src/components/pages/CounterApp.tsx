import React, { useState } from 'react';
import { CounterDisplay } from '../atoms/CounterDisplay';
import { CounterButton } from '../atoms/CounterButton';

export interface CounterAppProps {}

export const CounterApp: React.FC<CounterAppProps> = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => prev - 1);
  const handleReset = () => setCount(0);

  return (
    <main
      role="main"
      aria-label="Counter application main page"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-8 p-4"
    >
      <CounterDisplay count={count} />
      <div className="flex flex-row gap-4">
        <CounterButton label="-1" onClick={handleDecrement} variant="danger" />
        <CounterButton label="Reset" onClick={handleReset} variant="secondary" />
        <CounterButton label="+1" onClick={handleIncrement} variant="primary" />
      </div>
    </main>
  );
};
