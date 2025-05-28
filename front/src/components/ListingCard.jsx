import React from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

export default function ListingCard({ listing }) {
  const getTagColorClass = (type) => {
    switch(type) {
      case 'Pune':
        return 'bg-pink-100 text-pink-800';
      case 'Makina':
        return 'bg-blue-100 text-blue-800';
      case 'Shtepi':
        return 'bg-green-100 text-green-800';
      case 'Qira':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getTypeIcon = (type) => {
    switch(type) {
      case 'Pune':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'Makina':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16v-4a4 4 0 118 0v4m-5-4v4m-4-4h10M3 16h18M4 20h16a1 1 0 001-1V9a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1z" />
          </svg>
        );
      case 'Shtepi':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'Qira':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };
  const fallbackImage = '/images/placeholder.jpg';
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  const canAddToCart = listing.type === 'Makina' || listing.type === 'Shtepi' || listing.type === 'Qira';

  return (
    <Link 
      to={`/listing/${listing.id}`} 
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div 
        className="h-48 bg-gray-200 relative overflow-hidden" 
        style={{ backgroundImage: `url('${listing.image || fallbackImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <img 
          src={listing.image || fallbackImage} 
          alt={listing.title} 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-0"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Etiketat dhe butonin e shportes */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColorClass(listing.type)}`}>
            {getTypeIcon(listing.type)}
            <span className="ml-1">{listing.type}</span>
          </span>
          
          {canAddToCart && (
            <AddToCartButton item={listing} />
          )}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {listing.title}
        </h3>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {listing.location || 'Pa vendndodhje'}
        </div>
        
        <div className="mt-auto pt-4">
          <p className="text-indigo-600 font-bold text-lg">{listing.price}</p>
        </div>
      </div>
    </Link>
  );
}
