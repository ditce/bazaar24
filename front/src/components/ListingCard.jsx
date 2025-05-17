import React from 'react';
import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listing/${listing.id}`} className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${listing.image}')` }} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{listing.title}</h3>
        <p className="mt-2 text-indigo-600 font-bold">{listing.price}</p>
        <p className="mt-1 text-sm text-gray-500">{listing.type}</p>
      </div>
    </Link>
  );
}
