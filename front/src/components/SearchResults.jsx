import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import ListingCard from './ListingCard';
import API from '../utilities/API';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const query = searchParams.get('query');
  
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        let endpoint = 'search';
        const params = [];
        
        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (query) params.push(`query=${encodeURIComponent(query)}`);
        
        if (params.length > 0) {
          endpoint += `?${params.join('&')}`;
        }
        
        const response = await API.get(endpoint);
        console.log("Fetched listings:", response.data);
        setListings(response.data);
      } catch (error) {
        setError("Failed to load listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category, query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-full sm:w-64 p-4 bg-white shadow-md">
          {category && <FilterPanel category={category} />}
        </aside>
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Rezultatet per: {category || query || 'Te gjitha'}
          </h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          ) : listings.length === 0 ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
              No listings found. Try adjusting your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}