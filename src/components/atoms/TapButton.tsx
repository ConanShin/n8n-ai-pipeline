import React, { useState } from 'react';

export interface TapButtonProps {
  disabled?: boolean;
  onTap: () => void;
}

export const TapButton: React.FC<TapButtonProps> = ({ disabled = false, onTap }) => {
  const [pressed, setPressed] = useState(false);

  const handlePointerDown = (e: React.PointerEvent | React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    setPressed(true);
    onTap();
  };

  const handlePointerUp = () => {
    if (disabled) return;
    setPressed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      setPressed(true);
      onTap();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      setPressed(false);
    }
  };

  let classes = "relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center cursor-pointer select-none touch-none ";
  
  if (disabled) {
    classes += "bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed shadow-none";
  } else if (pressed) {
    classes += "scale-90 bg-gradient-to-br from-amber-300 to-orange-400 shadow-md shadow-orange-400/30";
  } else {
    classes += "bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl shadow-orange-500/50 border-4 border-amber-300 active:scale-95 transition-transform duration-75";
  }

  return (
    <div
      role="button"
      aria-label="배트 휘두르기 — 탭하여 공을 치세요"
      aria-disabled={disabled}
      className={classes}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={disabled ? -1 : 0}
    >
      {pressed && !disabled && (
        <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
      )}
      <span className="text-white text-2xl sm:text-3xl font-black tracking-tight drop-shadow">
        ⚾ HIT!
      </span>
    </div>
  );
};
