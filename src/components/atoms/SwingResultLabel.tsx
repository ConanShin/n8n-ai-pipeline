import React, { useEffect, useState } from 'react';

export interface SwingResultLabelProps {
  result: 'homerun' | 'triple' | 'double' | 'single' | 'strike';
  visible: boolean;
}

export const SwingResultLabel: React.FC<SwingResultLabelProps> = ({ result, visible }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  if (!show) return null;

  let classes = "";
  let label = "";

  switch (result) {
    case 'homerun':
      classes = "text-yellow-300 text-5xl sm:text-7xl font-black tracking-tight drop-shadow-[0_0_20px_rgba(253,224,71,0.9)] animate-[resultPop_250ms_spring_forwards,fadeOut_800ms_ease-in_forwards]";
      label = "🏆 홈런!";
      break;
    case 'triple':
      classes = "text-orange-400 text-4xl sm:text-6xl font-black tracking-tight drop-shadow-lg animate-[resultPop_200ms_forwards,fadeOut_700ms_ease-in_forwards]";
      label = "🔥 3루타!";
      break;
    case 'double':
      classes = "text-green-400 text-4xl sm:text-5xl font-black tracking-tight drop-shadow-lg animate-[resultPop_200ms_forwards,fadeOut_700ms_ease-in_forwards]";
      label = "⚡ 2루타!";
      break;
    case 'single':
      classes = "text-blue-300 text-3xl sm:text-4xl font-black tracking-tight drop-shadow animate-[resultPop_180ms_forwards,fadeOut_600ms_ease-in_forwards]";
      label = "✅ 1루타!";
      break;
    case 'strike':
      classes = "text-red-400 text-3xl sm:text-4xl font-black tracking-tight drop-shadow animate-[strikeShake_300ms_forwards,fadeOut_500ms_ease-in_forwards]";
      label = "✕ 스트라이크";
      break;
  }

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-30 select-none ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        role="alert" 
        aria-live="assertive" 
        aria-label={`스윙 판정: ${result}`}
        className={classes}
      >
        {label}
      </div>
      <style>{`
        @keyframes resultPop {
          0% { transform: scale(0); }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes strikeShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-8px); }
        }
        @keyframes fadeOut {
          0%, 60% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
