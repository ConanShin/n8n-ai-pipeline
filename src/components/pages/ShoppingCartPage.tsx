import React, { useState, useMemo } from 'react';
import CartTemplate from '../templates/CartTemplate';
import OrderConfirmationModal from '../organisms/OrderConfirmationModal';
import { Product, OrderSummaryData, PaymentDetails } from '../../types';

const INITIAL_ITEMS: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    quantity: 1
  },
  {
    id: '2',
    title: 'Ergonomic Office Chair',
    price: 199.50,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    quantity: 1
  }
];

const TAX_RATE = 0.08;
const SHIPPING_COST = 15.00;

const ShoppingCartPage: React.FC = () => {
  const [items, setItems] = useState<Product[]>(INITIAL_ITEMS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handlePaymentSubmit = async (details: PaymentDetails) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsModalOpen(true);
        resolve();
      }, 1500);
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItems([]); // Clear cart after successful purchase
  };

  const summary: OrderSummaryData = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + (items.length > 0 ? SHIPPING_COST : 0);
    
    return {
      subtotal,
      tax,
      shipping: items.length > 0 ? SHIPPING_COST : 0,
      total
    };
  }, [items]);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" role="main" aria-label="Shopping Cart Page">
      <CartTemplate 
        items={items}
        summary={summary}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onPaymentSubmit={handlePaymentSubmit}
      />
      <OrderConfirmationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </main>
  );
};

export default ShoppingCartPage;
