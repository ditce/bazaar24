import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import Navbar from './Navbar';
import Footer from './Footer';
import ListingCard from './ListingCard';

// Te dhenat demo per rezultatet - 10 per cdo kategori me foto profesionale
const demoListings = {
  'Pune': [
    { id: 101, title: 'Kerkohet Programues React', price: '€80,000/vit', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop', type: 'Pune', location: 'Tirane' },
    { id: 102, title: 'Specialist Marketing', price: '€65,000/vit', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', type: 'Pune', location: 'Tirane' },
    { id: 103, title: 'Menaxher Shitjesh', price: '€75,000/vit', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', type: 'Pune', location: 'Durres' },
    { id: 104, title: 'Asistent Administrativ', price: '€45,000/vit', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop', type: 'Pune', location: 'Vlore' },
    { id: 105, title: 'Inxhinier Ndertimi', price: '€90,000/vit', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop', type: 'Pune', location: 'Shkoder' },
    { id: 106, title: 'Financier', price: '€70,000/vit', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop', type: 'Pune', location: 'Tirane' },
    { id: 107, title: 'Web Designer', price: '€55,000/vit', image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=300&fit=crop', type: 'Pune', location: 'Elbasan' },
    { id: 108, title: 'Data Analyst', price: '€60,000/vit', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', type: 'Pune', location: 'Fier' },
    { id: 109, title: 'Project Manager', price: '€85,000/vit', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', type: 'Pune', location: 'Korce' },
    { id: 110, title: 'Software Engineer', price: '€95,000/vit', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', type: 'Pune', location: 'Tirane' }
  ],
  'Makina': [
    { id: 201, title: 'Mercedes-Benz C-Class 2020', price: '€35,000', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop', type: 'Makina', location: 'Tirane' },
    { id: 202, title: 'BMW 3 Series 2019', price: '€32,000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', type: 'Makina', location: 'Durres' },
    { id: 203, title: 'Audi A4 2021', price: '€38,000', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', type: 'Makina', location: 'Tirane' },
    { id: 204, title: 'Volkswagen Golf 2018', price: '€18,000', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop', type: 'Makina', location: 'Vlore' },
    { id: 205, title: 'Toyota Corolla 2022', price: '€25,000', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop', type: 'Makina', location: 'Shkoder' },
    { id: 206, title: 'Tesla Model 3 2023', price: '€42,000', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop', type: 'Makina', location: 'Tirane' },
    { id: 207, title: 'Ford Focus 2020', price: '€16,500', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop', type: 'Makina', location: 'Elbasan' },
    { id: 208, title: 'Honda Civic 2019', price: '€21,000', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop', type: 'Makina', location: 'Fier' },
    { id: 209, title: 'Nissan Qashqai 2021', price: '€28,000', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', type: 'Makina', location: 'Korce' },
    { id: 210, title: 'Hyundai Tucson 2022', price: '€30,000', image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=300&fit=crop', type: 'Makina', location: 'Berat' }
  ],
  'Shtepi': [
    { id: 301, title: 'Apartament 2+1 ne qender', price: '€120,000', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Tirane' },
    { id: 302, title: 'Ville ne Gjirin e Lalzit', price: '€450,000', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Durres' },
    { id: 303, title: 'Apartament 3+1 i ri', price: '€180,000', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Tirane' },
    { id: 304, title: 'Penthouse me pamje nga deti', price: '€250,000', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Vlore' },
    { id: 305, title: 'Shtepi private 4+1', price: '€220,000', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Shkoder' },
    { id: 306, title: 'Garsoniere e mobiluar', price: '€65,000', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Tirane' },
    { id: 307, title: 'Apartament 1+1 modern', price: '€85,000', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Elbasan' },
    { id: 308, title: 'Ville me oborr te madh', price: '€380,000', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Fier' },
    { id: 309, title: 'Duplex 3+2', price: '€195,000', image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Korce' },
    { id: 310, title: 'Apartament i ri 2+1', price: '€135,000', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Berat' }
  ],
  'Qira': [
    { id: 401, title: 'Apartament 1+1 me qira', price: '€350/muaj', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop', type: 'Qira', location: 'Tirane' },
    { id: 402, title: 'Zyra per biznes', price: '€600/muaj', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', type: 'Qira', location: 'Durres' },
    { id: 403, title: 'Makine BMW me qira', price: '€70/dite', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', type: 'Qira', location: 'Tirane' },
    { id: 404, title: 'Dyqan ne qender', price: '€1200/muaj', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', type: 'Qira', location: 'Vlore' },
    { id: 405, title: 'Ville per evente', price: '€300/dite', image: 'https://images.unsplash.com/photo-1519167758481-83f29c8ae8c4?w=400&h=300&fit=crop', type: 'Qira', location: 'Shkoder' },
    { id: 406, title: 'Post parkimi nentokesore', price: '€80/muaj', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=300&fit=crop', type: 'Qira', location: 'Tirane' },
    { id: 407, title: 'Apartament 2+1 qira', price: '€450/muaj', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop', type: 'Qira', location: 'Elbasan' },
    { id: 408, title: 'Lokal komercial', price: '€800/muaj', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop', type: 'Qira', location: 'Fier' },
    { id: 409, title: 'Makine Audi me qira', price: '€85/dite', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', type: 'Qira', location: 'Korce' },
    { id: 410, title: 'Shtepi me oborr', price: '€650/muaj', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop', type: 'Qira', location: 'Berat' }
  ]
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [filtersActive, setFiltersActive] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (category && demoListings[category]) {
        setResults(demoListings[category]);
      } else if (query) {
        const allListings = Object.values(demoListings).flat();
        const searchResults = allListings.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.type.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
        );
        setResults(searchResults);
      } else {
        const allListings = Object.values(demoListings).flat();
        setResults(allListings);
      }
      setIsLoading(false);
    }, 800);
  }, [category, query]);

  const applyFilters = (filters) => {
    console.log('Duke aplikuar filtrat:', filters);
    setActiveFilters(filters);
    
    let newResults = [...results];
    let filtersApplied = false;
    
    if (filters.qytetIZgjedhur) {
      newResults = newResults.filter(item => 
        item.location === filters.qytetIZgjedhur
      );
      filtersApplied = true;
    }
    
    if (filters.cmimiMin) {
      newResults = newResults.filter(item => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        return price >= filters.cmimiMin;
      });
      filtersApplied = true;
    }
    
    if (filters.cmimiMax) {
      newResults = newResults.filter(item => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        return price <= filters.cmimiMax;
      });
      filtersApplied = true;
    }
    
    if (category === 'Pune') {
      if (filters.pagaMin) {
        newResults = newResults.filter(item => {
          const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
          return price >= filters.pagaMin;
        });
        filtersApplied = true;
      }
      
      if (filters.pagaMax) {
        newResults = newResults.filter(item => {
          const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
          return price <= filters.pagaMax;
        });
        filtersApplied = true;
      }
    }
    
    // Vendos rezultatet e filtruara vetem nese jane aplikuar filtra
    if (filtersApplied) {
      setFilteredResults(newResults);
      setFiltersActive(true);
    } else {
      setFilteredResults([]);
      setFiltersActive(false);
    }
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
          {!category && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Kategorite</h2>
              <div className="space-y-2 mt-4">
                {Object.keys(demoListings).map(cat => (
                  <Link 
                    key={cat}
                    to={`/search?category=${encodeURIComponent(cat)}`}
                    className="block p-3 bg-gray-50 hover:bg-indigo-50 rounded-md text-gray-700 hover:text-indigo-600 font-medium transition"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
        
        <main className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {category ? `Rezultatet per: ${category}` : 
               query ? `Rezultatet per kerkimin: "${query}"` : 
               'Te gjitha rezultatet'}
            </h1>
            <p className="text-gray-600 mt-2">
              {filtersActive ? filteredResults.length : results.length} listim{(filtersActive ? filteredResults.length : results.length) !== 1 ? 'e' : ''} u gjeten
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filtersActive ? (
            filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map(item => (
                  <ListingCard key={item.id} listing={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuk u gjeten rezultate</h3>
                <p className="text-gray-600">Nuk ka listime qe perputhen me filtrat e zgjedhur. Provoni te ndryshoni kriteret e kerkimit.</p>
              </div>
            )
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(item => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuk u gjeten rezultate</h3>
              <p className="text-gray-600">Provoni te ndryshoni filtrat ose te beni nje kerkim tjeter.</p>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}