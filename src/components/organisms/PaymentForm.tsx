import React, { useState } from 'react';
import CheckoutButton from '../atoms/CheckoutButton';

export interface PaymentFormProps {
  onSubmit: (details: any) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    cardholderName: ''
  });
  const [status, setStatus] = useState<'idle' | 'processing' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setErrorMessage('');

    try {
      await onSubmit(formData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-4"
      role="form"
      aria-label="Payment Information"
    >
      <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>

      {status === 'error' && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="John Doe"
            value={formData.cardholderName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            required
            pattern="[0-9\s]{13,19}"
            maxLength={19}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="0000 0000 0000 0000"
            value={formData.cardNumber}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              required
              placeholder="MM/YY"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.expirationDate}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              required
              maxLength={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="123"
              value={formData.cvc}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <CheckoutButton 
          type="submit" 
          isLoading={status === 'processing'}
          disabled={status === 'success'}
        >
          Pay Now
        </CheckoutButton>
      </div>
    </form>
  );
};

export default PaymentForm;
