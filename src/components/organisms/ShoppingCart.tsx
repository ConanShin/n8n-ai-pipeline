import React, { useMemo } from 'react';
import { CartItem, Product } from '../molecules/CartItem';
import { CartSummary } from '../molecules/CartSummary';

export interface CartItemData {
  product: Product;
  quantity: number;
}

export interface ShoppingCartProps {
  items: CartItemData[];
  onUpdateQuantity: (productId: string | number, delta: number) => void;
  onRemoveItem: (productId: string | number) => void;
  onCheckout: () => void;
  state?: 'loading' | 'empty' | 'filled';
  checkoutLoading?: boolean;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  state = 'filled',
  checkoutLoading = false,
}) => {
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);

  const isEmpty = items.length === 0 || state === 'empty';
  const isLoading = state === 'loading';

  return (
    <main
      role="main"
      aria-label="Shopping cart"
      className={`grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 sm:p-6 ${
        isLoading ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="lg:col-span-2 space-y-4">
        {isEmpty && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <div className="flex flex-col">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
                onIncrement={() => onUpdateQuantity(item.product.id, 1)}
                onDecrement={() => onUpdateQuantity(item.product.id, -1)}
                onRemove={() => onRemoveItem(item.product.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <CartSummary
          subtotal={subtotal}
          onCheckout={onCheckout}
          isLoading={checkoutLoading}
        />
      </div>
    </main>
  );
};
