import React, { useState, useEffect } from 'react';
import { CartItem, Product } from '../molecules/CartItem';
import { CartSummary } from '../molecules/CartSummary';

export interface CartItemData {
  product: Product;
  quantity: number;
}

export interface ShoppingCartProps {
  /** List of cart items */
  items: CartItemData[];
  /** Optional handler for checkout */
  onCheckout?: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items: initialItems,
  onCheckout,
}) => {
  const [items, setItems] = useState<CartItemData[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  // Update local state if props change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], quantity: newQuantity };
    setItems(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    if (onCheckout) {
      onCheckout();
    } else {
      // Simulate checkout delay if no handler provided
      setTimeout(() => {
        setIsLoading(false);
        alert('Proceeding to checkout...');
      }, 1000);
    }
  };

  if (items.length === 0) {
    return (
      <div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 sm:p-6"
        role="main" 
        aria-label="Shopping cart"
      >
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xl font-medium">Your cart is empty</p>
          </div>
        </div>
        <div className="lg:col-span-1">
           <CartSummary subtotal={0} onCheckout={handleCheckout} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <main 
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 sm:p-6"
      role="main"
      aria-label="Shopping cart"
    >
      <div className="lg:col-span-2 space-y-4">
        {items.map((item, index) => (
          <CartItem
            key={`${item.product.id}-${index}`}
            product={item.product}
            quantity={item.quantity}
            onQuantityChange={(qty) => handleQuantityChange(index, qty)}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>
      
      <div className="lg:col-span-1">
        <CartSummary 
          subtotal={subtotal} 
          onCheckout={handleCheckout} 
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};
