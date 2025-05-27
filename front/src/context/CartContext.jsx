import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Gabim ne ngarkimin e shportes nga localStorage:', error);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Gabim ne ruajtjen e shportes ne localStorage:', error);
    }
  }, [cartItems]);
  
  // Funksione per menaxhimin e shportes
  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    setIsCartOpen(true);
  };
  
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce((total, item) => {
    let price = 0;
    if (item.price) {
      let priceString = item.price.replace('€', '').trim();
      
      if (priceString.includes('/')) {
        priceString = priceString.split('/')[0].trim();
      }
      
      priceString = priceString.replace(/\./g, '');
      
      priceString = priceString.replace(',', '.');
      
      price = parseFloat(priceString) || 0;
    }
    
    return total + (price * item.quantity);
  }, 0);
  
  const value = {
    cartItems,
    cartItemsCount,
    cartTotal,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
