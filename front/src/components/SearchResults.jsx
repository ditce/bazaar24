import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import Navbar from './Navbar';
import Footer from './Footer';
import ListingCard from './ListingCard';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Your API call logic here
    setTimeout(() => {
      setResults([]); // Replace with your actual API data
      setIsLoading(false);
    }, 800);
  }, [category, query]);

  const applyFilters = (filters) => {
    setActiveFilters(filters);
    // Your filter logic here
    setFilteredResults(results);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col md:flex-row flex-1 container mx-auto px-4 py-8 gap-6">
        <aside className="w-full md:w-80 lg:w-96 shrink-0">
          {category && (
            <FilterPanel 
              category={category} 
              onApplyFilters={applyFilters}
            />
          )}
        </aside>
        
        <main className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {category ? `Results for: ${category}` : 
               query ? `Search results for: "${query}"` : 
               'All results'}
            </h1>
            <p className="text-gray-600 mt-2">
              {(filteredResults.length > 0 ? filteredResults : results).length} listings found
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (filteredResults.length > 0 ? filteredResults : results).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredResults.length > 0 ? filteredResults : results).map(item => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}