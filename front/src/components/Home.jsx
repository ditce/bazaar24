import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ListingCard from './ListingCard';
import API from "../utilities/API";

const categories = [
  { name: 'Pune', color: 'from-pink-200 to-pink-400' },
  { name: 'Makina', color: 'from-blue-200 to-blue-400' },
  { name: 'Apartamente', color: 'from-green-200 to-green-400' },
  { name: 'Qira', color: 'from-purple-200 to-purple-400' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  // const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // !TODO: Uncomment and implement the API call to fetch featured listings
    // const fetchFeaturedListings = async () => {
    //   try {
    //     const response = await API.get("featured-listings");
    //     setFeatured(response.data);
    //   } catch (error) {
    //     console.error("Failed to fetch featured listings:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // fetchFeaturedListings();
  }, []);

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Gjej Mundesinë Tende</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-xl">Kerko, bli, merr me qira ose gjej pune — shpejt dhe lehte ne Bazaar24.</p>
          <form onSubmit={handleSearchSubmit} className="mt-6 flex w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Kerko listimet..."
              className="flex-1 p-3 rounded-l-xl border-0 focus:ring-2 focus:ring-indigo-500 bg-white/80 placeholder-gray-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-r-xl font-semibold transition">
              Kerko
            </button>
          </form>
        </div>
      </div>
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Kategoria</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map(cat => (
            <div
              key={cat.name}
              onClick={() => navigate(`/search?category=${encodeURIComponent(cat.name)}`)}
              className="cursor-pointer p-6 rounded-2xl text-center bg-white shadow-md hover:shadow-xl transition relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20`} />
              <span className="relative block text-xl font-semibold text-gray-800">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12 px-6 flex-1 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Listimet Kryesore</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(item => <ListingCard key={item.id} listing={item} />)}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
