import React from 'react';

export interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  disabled = false,
}) => {
  return (
    <div
      role="group"
      aria-label="Quantity controls"
      className={`flex items-center space-x-2 border rounded-md p-1 ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrement}
        disabled={disabled || quantity <= 1}
        className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <span role="status" className="w-8 text-center font-medium">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrement}
        disabled={disabled}
        className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};
