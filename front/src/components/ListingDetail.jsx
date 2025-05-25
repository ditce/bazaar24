import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ListingCard from './ListingCard';
import API from '../utilities/API';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedListings, setRelatedListings] = useState([]);

  useEffect(() => {
    setLoading(true);
    
    API.get(`listing?id=${id}`)
      .then((response) => {
      console.log("Listing Detail Response:", response);
      setListing(response);
      setLoading(false);
    })
    .catch((err) => {
      console.log('----', err)
    })
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Listing not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to listings
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden my-6">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={listing.image} 
              alt={listing.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{listing.title}</h1>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-3xl font-bold text-primary">${listing.price}</p>
              <div className="flex items-center mt-2">
                <span className="bg-primary text-white px-2 py-1 rounded text-sm font-semibold mr-2">
                  {listing.condition}
                </span>
                <span className="text-gray-500">{listing.location}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600">{listing.description}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Seller Information</h2>
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center mr-3">
                  <span className="text-gray-700 font-semibold">{listing.seller.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold">{listing.seller.name}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600 ml-1">{listing.seller.rating} • Joined {listing.seller.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold w-full transition-colors">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {relatedListings.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Similar Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedListings.map(item => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
