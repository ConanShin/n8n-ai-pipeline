import React from 'react';
import QuantitySelector from './QuantitySelector';

export interface CartItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 items-start sm:items-center">
      {/* ProductThumbnail */}
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ProductInfo */}
      <div className="flex-1 flex flex-col justify-between self-stretch">
        <h3 className="text-base font-medium text-gray-900">
          <a href="#">{title}</a>
        </h3>
        <p className="mt-1 text-sm text-gray-500">In stock</p>
        <div className="flex items-center justify-between mt-4 sm:mt-0">
           <p className="text-sm font-medium text-gray-900">${price.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 sm:pr-9 w-full sm:w-auto flex justify-between sm:block">
         <QuantitySelector 
            quantity={quantity} 
            onIncrease={() => onUpdateQuantity(id, quantity + 1)}
            onDecrease={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
            className="mb-2"
         />
         
         <div className="absolute top-0 right-0 pt-2 pr-2 hidden sm:block">
            {/* Desktop Remove Button */}
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 p-2"
              onClick={() => onRemove(id)}
            >
              <span className="sr-only">Remove</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
         </div>

         {/* Mobile Remove Button */}
         <button
            type="button"
            className="sm:hidden text-sm font-medium text-red-600 hover:text-red-500"
            onClick={() => onRemove(id)}
         >
           Remove
         </button>
      </div>
    </div>
  );
};

export default CartItem;
