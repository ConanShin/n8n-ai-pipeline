
import React, { useState } from 'react';

export interface ActionButtonProps {
  disabled?: boolean;
  swinging?: boolean;
  onSwing: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ disabled = false, swinging = false, onSwing }) => {
  const [isPressed, setIsPressed] = useState(false);
  const baseClasses = "flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52 rounded-full cursor-pointer select-none transition-all duration-75 touch-none";
  
  let variantClass = "bg-amber-500 hover:bg-amber-400 ring-4 ring-amber-300 shadow-xl text-white";
  if (disabled) {
    variantClass = "bg-gray-700 opacity-40 cursor-not-allowed ring-4 ring-gray-600 text-gray-500";
  } else if (swinging || isPressed) {
    variantClass = "bg-amber-300 scale-90 ring-4 ring-amber-200 shadow-inner";
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsPressed(true);
    onSwing();
    e.preventDefault();
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  return (
    <button
      role="button"
      aria-label="배트 휘두르기 — 탭 또는 클릭"
      aria-disabled={disabled}
      aria-pressed={swinging || isPressed}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`${baseClasses} ${variantClass}`}
      disabled={disabled}
    >
      <span className="text-5xl sm:text-6xl drop-shadow pointer-events-none">🏏</span>
    </button>
  );
};
