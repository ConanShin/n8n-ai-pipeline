import React from 'react';

export interface TapHintProps {
  visible: boolean;
}

export const TapHint: React.FC<TapHintProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2" role="note" aria-label="탭 안내 메시지">
      <div className="text-white text-sm font-semibold bg-black/40 px-4 py-2 rounded-full animate-bounce">
        탭하여 배팅!
      </div>
    </div>
  );
};
