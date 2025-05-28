import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';  
import Footer from './Footer';
import ListingCard from './ListingCard';
import API from "../utilities/API";

// Kategorite dhe listimet kryesore do te merren nga API
// const categories_static = [
//   { name: 'Pune', color: 'from-pink-200 to-pink-400' },
//   { name: 'Makina', color: 'from-blue-200 to-blue-400' },
//   { name: 'Shtepi', color: 'from-green-200 to-green-400' },
//   { name: 'Qira', color: 'from-purple-200 to-purple-400' },
// ];

// const featured_static = [
//   { id: 201, title: 'BMW 3 Series 2019', price: '€32,000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', type: 'Makina', location: 'Tirane' },
//   { id: 301, title: 'Apartament 2+1 qendra', price: '€120,000', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', type: 'Shtepi', location: 'Tirane' },
//   { id: 110, title: 'Software Engineer', price: '€95,000/vit', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', type: 'Pune', location: 'Tirane' },
//   // ... te tjerat
// ];

export default function Home() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [errorFeatured, setErrorFeatured] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await API.get("/categories"); // Endpoint nga lista
        // Supozojme qe API kthen nje array te objekteve te kategorive
        // p.sh. [{ id: 1, name: 'Pune', color_from: 'pink-200', color_to: 'pink-400'}, ...]
        // Nese API kthen vetem emra, duhet te pershtasim ngjyrat ose t'i heqim.
        // Per thjeshtesi, po supozoj qe kthen edhe ngjyrat ose nje identifikues per to.
        // Nese API kthen vetem [{name: 'Pune'}, {name: 'Makina'}], duhet nje mapim per ngjyrat ketu.
        const defaultColors = ['from-pink-200 to-pink-400', 'from-blue-200 to-blue-400', 'from-green-200 to-green-400', 'from-purple-200 to-purple-400'];
        setCategories(response.data.map((cat, index) => ({
            ...cat, // supozojme cat permban {name: 'Pune'}
            color: cat.color || defaultColors[index % defaultColors.length] // Nese API nuk kthen ngjyre, perdorim nje default
        })));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setErrorCategories("Gabim ne ngarkimin e kategorive.");
      } finally {
        setLoadingCategories(false);
      }
    };
    
    const fetchFeaturedListings = async () => {
      try {
        setLoadingFeatured(true);
        const response = await API.get("/featured-listings"); // Endpoint nga lista
        setFeatured(response.data);
      } catch (error) {
        console.error("Failed to fetch featured listings:", error);
        setErrorFeatured("Gabim ne ngarkimin e listimeve kryesore.");
      } finally {
        setLoadingFeatured(false);
      }
    };
    
    fetchCategories();
    fetchFeaturedListings();
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
      <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop')" }}>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Gjej Mundesine Tende</h1>
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
        {loadingCategories ? (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : errorCategories ? (
          <p className="text-red-500 text-center">{errorCategories}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map(cat => (
              <div
                key={cat.name} // Supozojme qe 'name' eshte unik, ose 'id' nese API kthen ID
                onClick={() => navigate(`/search?category=${encodeURIComponent(cat.name)}`)}
                className="cursor-pointer p-6 rounded-2xl text-center bg-white shadow-md hover:shadow-xl transition relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20`} />
                <span className="relative block text-xl font-semibold text-gray-800">{cat.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="py-12 px-6 flex-1 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Listimet Kryesore</h2>
        {loadingFeatured ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : errorFeatured ? (
           <p className="text-red-500 text-center">{errorFeatured}</p>
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