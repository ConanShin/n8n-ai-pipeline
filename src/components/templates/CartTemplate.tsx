import React from 'react';
import CartItemListSection, { CartItemListSectionProps } from '../organisms/CartItemListSection';
import CartSidebarSection, { CartSidebarSectionProps } from '../organisms/CartSidebarSection';

export interface CartTemplateProps extends CartItemListSectionProps, CartSidebarSectionProps {}

const CartTemplate: React.FC<CartTemplateProps> = ({
  items,
  onUpdateQuantity,
  onRemove,
  summary,
  onPaymentSubmit
}) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <CartItemListSection 
        items={items} 
        onUpdateQuantity={onUpdateQuantity} 
        onRemove={onRemove} 
      />
      <CartSidebarSection 
        summary={summary} 
        onPaymentSubmit={onPaymentSubmit} 
      />
    </div>
  );
};

export default CartTemplate;
