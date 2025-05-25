import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ item, className = "" }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  // Kontrollojme nese artikulli mund te shtohet ne shporte
  // VETEM makina, shtepi dhe qira (jo pune)
  const canAddToCart = item && (item.type === 'Makina' || item.type === 'Shtepi' || item.type === 'Qira');
  
  if (!canAddToCart) return null;
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Ndalojme propagimin e klikimit ne parent (Link)
    e.stopPropagation();
    
    addToCart(item);
    setIsAdded(true);
    
    // Rivendosim gjendjen pas 2 sekondash
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`${
        isAdded
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-indigo-600 hover:bg-indigo-700'
      } text-white text-sm rounded-full p-2 transition-colors duration-300 ${className}`}
      aria-label={isAdded ? 'Shtuar ne shporte' : 'Shto ne shporte'}
    >
      {isAdded ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )}
    </button>
  );
};

export default AddToCartButton;