import React from 'react';
import CartItem, { CartItemProps } from '../molecules/CartItem';

export interface CartItemListSectionProps {
  items: Omit<CartItemProps, 'onUpdateQuantity' | 'onRemove'>[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemListSection: React.FC<CartItemListSectionProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemove 
}) => {
  return (
    <section className="lg:col-span-7 flex flex-col gap-6" aria-labelledby="cart-heading">
      <h2 id="cart-heading" className="text-2xl font-bold text-gray-900">
        Shopping Cart ({items.length} items)
      </h2>
      
      <div className="flex flex-col gap-6">
        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default CartItemListSection;
