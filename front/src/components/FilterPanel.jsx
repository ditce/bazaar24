import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../utilities/API';

export default function FilterPanel({ category }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    subcategory: searchParams.get('subcategory') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    location: searchParams.get('location') || '',
  });

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        // First fetch categories to get the category ID
        const categoriesResponse = await API.get('categories');
        const categoryData = categoriesResponse.data.find(cat => cat.name === category);
        
        if (categoryData) {
          // Then fetch subcategories using the category ID
          const subcategoriesResponse = await API.get(`subcategories?category_id=${categoryData.id}`);
          setSubcategories(subcategoriesResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterValues(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    
    // Create a new URLSearchParams object with the current params
    const params = new URLSearchParams(searchParams);
    
    // Update or remove filter parameters based on their values
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Always keep the category parameter
    if (category) {
      params.set('category', category);
    }
    
    // Navigate to the new URL with filters
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filtro sipas</h2>
      <form className="space-y-4" onSubmit={applyFilters}>
        {/* Subcategory filter */}
        {subcategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {category === 'Makina' ? 'Lloji i makines' : 
               category === 'Apartamente' ? 'Numri i dhomave' : 
               category === 'Qira' ? 'Tipi i prones' : 
               'Lloji'}
            </label>
            <select 
              name="subcategory"
              value={filterValues.subcategory}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Zgjidh</option>
              {subcategories.map((subcat) => (
                <option key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Price filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cmimi maksimal (€)
          </label>
          <input 
            type="number" 
            name="maxPrice"
            value={filterValues.maxPrice}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2" 
          />
        </div>
        
        {/* Location filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendndodhja
          </label>
          <input 
            type="text" 
            name="location"
            value={filterValues.location}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2" 
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-700"
        >
          Apliko Filtrat
        </button>
      </form>
    </div>
  );
}