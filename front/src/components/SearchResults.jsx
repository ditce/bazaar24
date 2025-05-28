import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import Navbar from './Navbar';
import Footer from './Footer';
import ListingCard from './ListingCard';
import API from "../utilities/API"; // Shtuar importi i API

// demoListings do te hiqet, te dhenat do te merren nga API
// const demoListings_static = { ... };

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('query');
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Per panelin e kategorive kur nuk ka kategori te zgjedhur
  const [categoriesForFilter, setCategoriesForFilter] = useState([]);
  const [loadingCategoriesFilter, setLoadingCategoriesFilter] = useState(false);
  
  // Filtrat aktive dhe rezultatet e filtruara mbeten siç ishin per logjiken e frontend filtering
  // por te dhenat fillestare vijne nga API
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [filtersActive, setFiltersActive] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let endpoint = "/search";
        const params = new URLSearchParams();
        if (categoryParam) {
          params.append('category', categoryParam);
        }
        if (queryParam) {
          params.append('query', queryParam);
        }
        // TODO: Shtoni parametra te tjere per backend filtering nese eshte e nevojshme
        // p.sh. params.append('page', currentPage);

        const response = await API.get(`${endpoint}?${params.toString()}`);
        setResults(response.data || []); // Sigurohemi qe eshte array
        setFilteredResults([]); // Pastrojme filtrat e meparshem te frontend
        setFiltersActive(false);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
        setError("Gabim ne ngarkimin e rezultateve.");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [categoryParam, queryParam]); // Ri-thirr API kur ndryshojne parametrat e kerkimit

  useEffect(() => {
    // Marrim kategorite per sidebar vetem nese nuk eshte specifikuar nje kategori ne URL
    if (!categoryParam) {
      const fetchCategoriesForFilter = async () => {
        setLoadingCategoriesFilter(true);
        try {
          const response = await API.get("/categories");
          setCategoriesForFilter(response.data || []);
        } catch (err) {
          console.error("Failed to fetch categories for filter panel:", err);
          // Mund te mos shfaqim error ketu, thjesht nuk do kete kategori ne filter
        } finally {
          setLoadingCategoriesFilter(false);
        }
      };
      fetchCategoriesForFilter();
    }
  }, [categoryParam]);


  const applyFilters = (filters) => {
    // Kjo logjike filtron rezultatet e marra nga API ne frontend.
    // Idealja do ishte qe filtrat te aplikoheshin ne backend.
    // Per momentin, po e leme siç eshte, por duke filtruar 'results' (nga API)
    // dhe jo 'demoListings'
    console.log('Duke aplikuar filtrat (frontend):', filters);
    setActiveFilters(filters);
    
    let newResults = [...results]; // Filtrojme nga te dhenat e marra nga API
    let filtersApplied = false;
    
    // TODO: Per te pershtatur filtrat me strukturën e 'item' qe vjen nga API
    // Shembull:
    if (filters.qytetIZgjedhur) {
      newResults = newResults.filter(item => 
        item.location === filters.qytetIZgjedhur // Sigurohuni qe 'item.location' eshte fusha e duhur
      );
      filtersApplied = true;
    }
    
    if (filters.cmimiMin) {
      newResults = newResults.filter(item => {
        // Kjo logjike per cmimin duhet te pershtatet me formatin e cmimit nga API
        const priceString = String(item.price).replace(/[^0-9.,-]+/g, '').replace(',', '.');
        const price = parseFloat(priceString);
        return !isNaN(price) && price >= filters.cmimiMin;
      });
      filtersApplied = true;
    }
    
    if (filters.cmimiMax) {
      newResults = newResults.filter(item => {
        const priceString = String(item.price).replace(/[^0-9.,-]+/g, '').replace(',', '.');
        const price = parseFloat(priceString);
        return !isNaN(price) && price <= filters.cmimiMax;
      });
      filtersApplied = true;
    }
    
    if (categoryParam === 'Pune') { // Duhet te jete categoryParam, jo category (qe ishte state i vjeter)
      if (filters.pagaMin) {
         newResults = newResults.filter(item => {
            const priceString = String(item.price).replace(/[^0-9.,-]+/g, '').replace(',', '.');
            const price = parseFloat(priceString);
            return !isNaN(price) && price >= filters.pagaMin;
        });
        filtersApplied = true;
      }
      
      if (filters.pagaMax) {
        newResults = newResults.filter(item => {
            const priceString = String(item.price).replace(/[^0-9.,-]+/g, '').replace(',', '.');
            const price = parseFloat(priceString);
            return !isNaN(price) && price <= filters.pagaMax;
        });
        filtersApplied = true;
      }
    }
    
    if (filtersApplied) {
      setFilteredResults(newResults);
      setFiltersActive(true);
    } else {
      setFilteredResults([]); // Nese nuk ka filtra aktiv, shfaqim te gjitha rezultatet nga API
      setFiltersActive(false);
    }
  };

  const currentResults = filtersActive ? filteredResults : results;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col md:flex-row flex-1 container mx-auto px-4 py-8 gap-6">
        <aside className="w-full md:w-80 lg:w-96 shrink-0">
          {categoryParam && ( // FilterPanel shfaqet nese ka nje kategori te zgjedhur ne URL
            <FilterPanel 
              category={categoryParam} 
              onApplyFilters={applyFilters}
            />
          )}
          {!categoryParam && ( // Nese nuk ka kategori, shfaqim listen e kategorive
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Kategorite</h2>
              {loadingCategoriesFilter ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto my-4"></div>
              ) : categoriesForFilter.length > 0 ? (
                <div className="space-y-2 mt-4">
                  {categoriesForFilter.map(cat => ( // Supozojme qe cat ka 'name' ose 'id'
                    <Link 
                      key={cat.id || cat.name}
                      to={`/search?category=${encodeURIComponent(cat.name)}`}
                      className="block p-3 bg-gray-50 hover:bg-indigo-50 rounded-md text-gray-700 hover:text-indigo-600 font-medium transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nuk u gjeten kategori.</p>
              )}
            </div>
          )}
        </aside>
        
        <main className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {categoryParam ? `Rezultatet per: ${categoryParam}` : 
               queryParam ? `Rezultatet per kerkimin: "${queryParam}"` : 
               'Te gjitha rezultatet'}
            </h1>
            {isLoading ? (
                 <p className="text-gray-600 mt-2">Duke ngarkuar...</p>
            ) : error ? (
                 <p className="text-red-500 mt-2">{error}</p>
            ) : (
                 <p className="text-gray-600 mt-2">
                    {currentResults.length} listim{currentResults.length !== 1 ? 'e' : ''} u gjeten
                 </p>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-red-600 mb-2">Gabim!</h3>
                <p className="text-gray-600">{error} Ju lutem provoni perseri me vone.</p>
            </div>
          ) : currentResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentResults.map(item => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuk u gjeten rezultate</h3>
              <p className="text-gray-600">Nuk ka listime qe perputhen me kerkimin tuaj. Provoni te ndryshoni kriteret.</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}