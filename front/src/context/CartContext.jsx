import React, { createContext, useState, useContext, useEffect } from 'react';

// Krijojme kontekstin
const CartContext = createContext();

// Hook per perdorimin e kontekstit ne komponente te tjera
export const useCart = () => useContext(CartContext);

// Ofruesi i kontekstit qe do te perdoret ne App.jsx
export const CartProvider = ({ children }) => {
  // Ngarkojme artikujt e shportes nga localStorage nese ekzistojne
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
  
  // Ruajme ndryshimet ne localStorage sa here qe ndryshon shporta
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
      // Kontrollojme nese artikulli eshte tashme ne shporte
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Nese artikulli ekziston, rrisim sasine
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Ndryshe shtojme artikullin e ri me sasi 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    // Hapim shporten kur shtohet nje artikull
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
  
  // Llogaritja e totalit te artikujve
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Llogaritja e shumes totale - RREGULLUAR
  const cartTotal = cartItems.reduce((total, item) => {
    let price = 0;
    if (item.price) {
      // Heqim simbolin e euros dhe te gjitha hapesirat
      let priceString = item.price.replace('€', '').trim();
      
      // Nese ka '/' ne cmim (psh. per muaj, per vit), marrim vetem pjesen para '/'
      if (priceString.includes('/')) {
        priceString = priceString.split('/')[0].trim();
      }
      
      // Heqim pikat si ndarese mijesh (120.000 -> 120000)
      priceString = priceString.replace(/\./g, '');
      
      // Zevendesojme presjen me pike per numrat decimal
      priceString = priceString.replace(',', '.');
      
      // Konvertojme ne numer
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