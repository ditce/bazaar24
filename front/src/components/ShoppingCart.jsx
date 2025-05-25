import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ShoppingCart = () => {
  const { 
    cartItems, 
    cartTotal, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Rendero artikujt e shportes
  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <div className="py-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Shporta juaj eshte boshe</h3>
          <p className="mt-1 text-sm text-gray-500">Nuk keni asnje artikull ne shporten tuaj</p>
          <div className="mt-6">
            <Link to="/search" className="text-indigo-600 font-medium hover:text-indigo-500" onClick={toggleCart}>
              Shiko produktet
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <div key={item.id} className="py-4 flex">
            <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
              <img 
                src={item.image || '/images/placeholder.jpg'} 
                alt={item.title}
                className="w-full h-full object-center object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
            
            <div className="ml-4 flex-1 flex flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link to={`/listing/${item.id}`} onClick={toggleCart}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className="ml-4">{item.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.type}</p>
              </div>
              
              <div className="flex-1 flex items-end justify-between text-sm">
                <div className="flex items-center">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-500">Sasia</label>
                  <select
                    id={`quantity-${item.id}`}
                    name={`quantity-${item.id}`}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="rounded-md border-gray-300 py-1 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {[...Array(10).keys()].map(num => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Hiq
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Rendero panelin e pageses
  const renderCheckout = () => {
    return (
      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Shuma totale</p>
          <p>€{cartTotal.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Transporti dhe taksat llogariten ne hapin e pageses.</p>
        
        <div className="mt-6">
          <button
            onClick={() => setIsCheckingOut(true)}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Vazhdo me pagesen
          </button>
        </div>
        
        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
          <p>
            ose{' '}
            <button
              type="button"
              className="text-indigo-600 font-medium hover:text-indigo-500"
              onClick={toggleCart}
            >
              Vazhdo blerjen<span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    );
  };
  
  // Rendero formen e pageses
  const renderCheckoutForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Simulojme perfundimin e pageses
      alert('Porosia juaj u krye me sukses!');
      clearCart();
      toggleCart();
    };
    
    return (
      <div className="px-4 pt-5 pb-6 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Informacioni i pageses</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Emri i plote</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresa</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Qyteti</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Kodi postar</label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="card_number" className="block text-sm font-medium text-gray-700">Numri i kartes</label>
            <input
              type="text"
              id="card_number"
              name="card_number"
              placeholder="**** **** **** ****"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">Data e skadimit</label>
              <input
                type="text"
                id="expiration"
                name="expiration"
                placeholder="MM/YY"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                placeholder="***"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setIsCheckingOut(false)}
              className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Kthehu
            </button>
            
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Perfundo porosine
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  // Kodi kryesor i komponentit
  if (!isCartOpen) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay i erret */}
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={toggleCart}
        ></div>
        
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              {/* Header */}
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shporta e blerjeve</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={toggleCart}
                    >
                      <span className="sr-only">Mbyll panelin</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Permbajtja e shportes */}
                {!isCheckingOut ? (
                  <div className="mt-8">
                    {renderCartItems()}
                  </div>
                ) : (
                  <div className="mt-8">
                    {renderCheckoutForm()}
                  </div>
                )}
              </div>
              
              {/* Footer me cmimin total dhe butonin e checkout */}
              {!isCheckingOut && cartItems.length > 0 && renderCheckout()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;