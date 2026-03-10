import React from 'react';

export interface QuantitySelectorProps {
  /** Current quantity value */
  quantity: number;
  /** Handler for plus button */
  onIncrement: () => void;
  /** Handler for minus button */
  onDecrement: () => void;
  /** Whether the selector is disabled */
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
      className={`flex items-center space-x-2 border rounded-md p-1 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      role="group"
      aria-label="Quantity controls"
    >
      <button
        onClick={onDecrement}
        className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
        aria-label="Decrease quantity"
        disabled={disabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <span className="w-8 text-center font-medium" role="status">
        {quantity}
      </span>
      
      <button
        onClick={onIncrement}
        className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
        aria-label="Increase quantity"
        disabled={disabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};
