import React from 'react';
import { QuantitySelector } from './QuantitySelector';

export interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
}

export interface CartItemProps {
  /** Product data */
  product: Product;
  /** Current quantity */
  quantity: number;
  /** Handler for quantity change */
  onQuantityChange: (newQuantity: number) => void;
  /** Handler for removing item */
  onRemove: () => void;
  /** Whether the item is being removed */
  isRemoving?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onQuantityChange,
  onRemove,
  isRemoving = false,
}) => {
  const handleIncrement = () => onQuantityChange(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <article 
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-gray-200 ${isRemoving ? 'opacity-50 pointer-events-none' : ''}`}
      role="article"
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-20 h-20 object-cover rounded-md bg-gray-100"
        />
        
        <div className="flex-1 flex flex-col gap-1">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span className="text-gray-500">${product.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <QuantitySelector 
          quantity={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          disabled={isRemoving}
        />
        
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
          aria-label={`Remove ${product.name} from cart`}
          disabled={isRemoving}
        >
          Remove
        </button>
      </div>
    </article>
  );
};
