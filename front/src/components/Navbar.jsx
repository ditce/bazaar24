import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import CartButton from './CartButton';
import API from '../utilities/API';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navCategories, setNavCategories] = useState([]); 
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNavCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await API.get("/categories");
        setNavCategories(response.data.slice(0, 4)); 
      } catch (error) {
        console.error("Failed to fetch navigation categories:", error);
        setNavCategories([ 
          { name: 'Pune' }, { name: 'Makina' }, { name: 'Shtepi' }, { name: 'Qira' }
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchNavCategories();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCreateListing = () => {
    navigate('/create-listing');
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const renderNavLinks = (isMobile = false) => {
    const linkClass = isMobile 
      ? "block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md"
      : "px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors";

    if (loadingCategories && !isMobile) { 
        return <div className="text-sm text-gray-500">Duke ngarkuar kategorite...</div>;
    }

    return navCategories.map(cat => (
      <Link 
        key={cat.name} 
        to={`/search?category=${encodeURIComponent(cat.name)}`} 
        className={linkClass}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {cat.name}
      </Link>
    ));
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md sticky top-0 z-20 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">Bazaar24</Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {renderNavLinks()}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={handleCreateListing}
              className="hidden md:inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hidden sm:inline" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Shto
              <span className="hidden lg:inline ml-1">Listim</span>
            </button>

            <CartButton />
            
            <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
              <Link to="/login" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors text-sm sm:text-base">
                Login
              </Link>
              <Link to="/register" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors text-sm sm:text-base">
                Register
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none p-1"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {renderNavLinks(true)}
            <button
              onClick={handleCreateListing}
              className="w-full flex items-center justify-center px-4 py-2 mt-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Shto Listim
            </button>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <Link 
                to="/login" 
                className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}