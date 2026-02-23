import React from 'react';
import OrderSummary from './OrderSummary';
import PaymentForm from './PaymentForm';
import { OrderSummaryData } from '../../types';

export interface CartSidebarSectionProps {
  summary: OrderSummaryData;
  onPaymentSubmit: (details: any) => Promise<void>;
}

const CartSidebarSection: React.FC<CartSidebarSectionProps> = ({ 
  summary, 
  onPaymentSubmit 
}) => {
  return (
    <section className="lg:col-span-5 flex flex-col gap-6">
      <OrderSummary 
        subtotal={summary.subtotal}
        tax={summary.tax}
        shipping={summary.shipping}
        total={summary.total}
      />
      <PaymentForm onSubmit={onPaymentSubmit} />
    </section>
  );
};

export default CartSidebarSection;
