import React from 'react';

export interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  onCheckout,
  isLoading = false,
}) => {
  return (
    <aside
      role="complementary"
      aria-label="Order summary"
      className={`flex flex-col gap-4 bg-gray-50 p-6 rounded-lg h-fit ${
        isLoading ? 'opacity-75 pointer-events-none' : ''
      }`}
    >
      <div className="flex justify-between items-center text-lg font-bold">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      <button
        type="button"
        role="button"
        onClick={onCheckout}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Checkout'}
      </button>
    </aside>
  );
};
