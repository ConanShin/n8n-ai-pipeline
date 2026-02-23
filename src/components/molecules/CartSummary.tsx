import React from 'react';

export interface CartSummaryProps {
  /** Calculated total price of items */
  subtotal: number;
  /** Handler for checkout */
  onCheckout: () => void;
  /** Whether the checkout is loading */
  isLoading?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  onCheckout,
  isLoading = false,
}) => {
  return (
    <div 
      className="flex flex-col gap-4 bg-gray-50 p-6 rounded-lg h-fit"
      role="complementary"
      aria-label="Order summary"
    >
      <div className="flex justify-between items-center text-lg font-bold">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      <button
        onClick={onCheckout}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};
