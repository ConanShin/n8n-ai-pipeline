export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderSummaryData {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface PaymentDetails {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardholderName: string;
}
