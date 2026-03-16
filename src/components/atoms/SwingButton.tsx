
import React from 'react';
export interface SwingButtonProps { onSwing: () => void; disabled?: boolean; }
export const SwingButton: React.FC<SwingButtonProps> = ({ onSwing, disabled }) => (
  <button 
    className="absolute inset-0 w-full h-full cursor-pointer bg-transparent active:bg-white/5 transition-colors z-10 outline-none"
    onClick={onSwing} disabled={disabled} aria-label="배팅하기 — 탭하여 스윙" tabIndex={0}
  />
);
