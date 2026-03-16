
import React from 'react';
export const RestartButton: React.FC<{onClick: () => void}> = ({ onClick }) => (
  <button onClick={onClick} className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all font-bold text-gray-900 text-base text-center justify-center flex" aria-label="다시 하기" tabIndex={0}>다시 하기</button>
);
export const HomeButton: React.FC<{onClick: () => void}> = ({ onClick }) => (
  <button onClick={onClick} className="w-full py-3 rounded-xl bg-gray-700 hover:bg-gray-600 active:scale-95 transition-all font-semibold text-gray-200 text-base text-center justify-center flex" aria-label="홈으로 돌아가기" tabIndex={0}>홈으로</button>
);
