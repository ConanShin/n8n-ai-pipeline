import React from 'react';
import { QuantitySelector } from './QuantitySelector';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

export interface CartItemProps {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  state?: 'default' | 'removing';
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  state = 'default',
}) => {
  const isRemoving = state === 'removing';

  return (
    <article
      role="article"
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-gray-200 ${
        isRemoving ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-md bg-gray-100"
      />
      
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <span className="text-gray-500">${product.price.toFixed(2)}</span>
      </div>

      <QuantitySelector
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        disabled={isRemoving}
      />

      <button
        type="button"
        aria-label="Remove item from cart"
        onClick={onRemove}
        disabled={isRemoving}
        className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50"
      >
        Remove
      </button>
    </article>
  );
};
