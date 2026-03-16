
import React from 'react';
export type HitVariant = 'homerun' | 'triple' | 'double' | 'single' | 'strike' | 'none';
export interface HitResultLabelProps { label?: string; variant?: HitVariant; }
export const HitResultLabel: React.FC<HitResultLabelProps> = ({ label, variant = 'none' }) => {
  const styles: Record<HitVariant, string> = {
    homerun: "text-2xl font-black text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.9)] animate-bounce",
    triple: "text-xl font-bold text-orange-400",
    double: "text-xl font-bold text-green-400",
    single: "text-xl font-bold text-blue-300",
    strike: "text-xl font-bold text-red-400",
    none: "invisible"
  };
  return (
    <div className="flex items-center justify-center min-h-[32px]" role="status" aria-live="assertive" aria-label="타격 결과">
      <span className={styles[variant]}>{label || ''}</span>
    </div>
  );
};
