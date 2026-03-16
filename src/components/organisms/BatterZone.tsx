
import React, { useEffect } from 'react';
import { BatterSilhouette } from '../atoms/BatterSilhouette';
import { SwingButton } from '../atoms/SwingButton';
export interface BatterZoneProps { isSwinging: boolean; isDisabled: boolean; onSwing: () => void; }
export const BatterZone: React.FC<BatterZoneProps> = ({ isSwinging, isDisabled, onSwing }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'Enter') && !isDisabled) { e.preventDefault(); onSwing(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDisabled, onSwing]);
  return (
    <div className="relative flex items-end justify-center w-full h-40 md:h-52 bg-gradient-to-t from-black/60 to-transparent z-10 lg:max-w-2xl lg:mx-auto" role="region" aria-label="타자 영역">
      <BatterSilhouette isSwinging={isSwinging} />
      <SwingButton onSwing={onSwing} disabled={isDisabled} />
    </div>
  );
};
