import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const { id, title, price, image, condition, location } = listing;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
      <Link to={`/listing/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image || 'https://via.placeholder.com/300x200?text=No+Image'} 
            alt={title}
            className="w-full h-full object-cover"
          />
          {condition && (
            <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
              {condition}
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 truncate">{title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-primary">{price}</span>
            {location && (
              <span className="text-sm text-gray-500">{location}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
