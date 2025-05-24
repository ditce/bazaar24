import React, { createContext, useState, useContext, useEffect } from 'react';

// Krijojmë kontekstin
const CartContext = createContext();

// Hook për përdorimin e kontekstit në komponentë të tjerë
export const useCart = () => useContext(CartContext);

// Ofruesi i kontekstit që do të përdoret në App.jsx
export const CartProvider = ({ children }) => {
  // Ngarkojmë artikujt e shportës nga localStorage nëse ekzistojnë
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Gabim në ngarkimin e shportës nga localStorage:', error);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Ruajmë ndryshimet në localStorage sa herë që ndryshon shporta
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Gabim në ruajtjen e shportës në localStorage:', error);
    }
  }, [cartItems]);
  
  // Funksione për menaxhimin e shportës
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Kontrollojmë nëse artikulli është tashmë në shportë
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Nëse artikulli ekziston, rrisim sasinë
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Ndryshe shtojmë artikullin e ri me sasi 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    // Hapim shportën kur shtohet një artikull
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
  
  // Llogaritja e totalit të artikujve
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Llogaritja e shumës totale
  const cartTotal = cartItems.reduce((total, item) => {
    // Përpunojmë çmimin për të hequr simbolin e euros dhe për të konvertuar në numër
    let price = 0;
    if (item.price) {
      const priceString = item.price.replace('€', '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
      price = parseFloat(priceString);
      
      // Kontrollojmë nëse çmimi përmban "/muaj", "/vit", etj.
      if (item.price.includes('/')) {
        // Është një çmim periodik (p.sh. qira), përdorim vetëm vlerën numerike
      }
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