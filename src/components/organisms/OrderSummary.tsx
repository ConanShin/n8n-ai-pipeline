import React from 'react';

export interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const SummaryRow: React.FC<{ label: string; value: number; isTotal?: boolean }> = ({ label, value, isTotal = false }) => (
  <div className={`flex items-center justify-between ${isTotal ? 'text-base font-medium text-gray-900' : 'text-sm text-gray-600'}`}>
    <dt>{label}</dt>
    <dd>${value.toFixed(2)}</dd>
  </div>
);

const Divider: React.FC = () => <div className="border-t border-gray-200 my-4"></div>;

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, tax, shipping, total }) => {
  return (
    <section 
      aria-labelledby="summary-heading"
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-4"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <SummaryRow label="Subtotal" value={subtotal} />
        <SummaryRow label="Shipping estimate" value={shipping} />
        <SummaryRow label="Tax estimate" value={tax} />
        
        <Divider />
        
        <SummaryRow label="Order total" value={total} isTotal />
      </dl>
    </section>
  );
};

export default OrderSummary;
