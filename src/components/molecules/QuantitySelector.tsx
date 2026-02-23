import React from 'react';

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  className 
}) => {
  return (
    <div 
      className={`flex items-center border border-gray-300 rounded-md ${className || ''}`}
      role="group"
      aria-label="Adjust quantity"
    >
      <button 
        onClick={onDecrease}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-l-md border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
      >
        -
      </button>
      <input 
        type="number"
        value={quantity}
        readOnly
        className="w-12 text-center py-1 text-gray-700 focus:outline-none"
        aria-label="Quantity"
      />
      <button 
        onClick={onIncrease}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-r-md border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
