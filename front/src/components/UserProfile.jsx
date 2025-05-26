import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserData({
      id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
      full_name: "Ardi Hoxha",
      email: "ardi.hoxha@example.com",
      phone_number: "+355 69 123 4567",
      location: "Tirane, Shqiperi",
      bio: "Entuziast i teknologjise dhe biznesit. Kam eksperience ne tregtine e pasurive te paluajtshme dhe makinerive.",
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      is_verified: true,
      is_admin: false,
      membership_type: "Premium",
      join_date: "2024-01-15",
      last_active: "2025-05-25T14:30:00.000Z",
      total_listings: 12,
      active_listings: 8,
      sold_items: 4,
      rating: 4.8,
      total_reviews: 25,
      total_sales: 45000,
      preferred_categories: ["Makina", "Shtepi"],
      languages: ["Shqip", "Anglisht", "Italisht"]
    });
  }, []);

  // Mock data per listimet e perdoruesit
  const userListings = [
    { id: 201, title: 'BMW 3 Series 2019', price: '€32,000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=150&h=100&fit=crop', type: 'Makina', status: 'Aktive', views: 245, date: '2025-05-20' },
    { id: 301, title: 'Apartament 2+1 ne qender', price: '€120,000', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&h=100&fit=crop', type: 'Shtepi', status: 'Aktive', views: 189, date: '2025-05-18' },
    { id: 110, title: 'Software Engineer', price: '€95,000/vit', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=100&fit=crop', type: 'Pune', status: 'Perfunduar', views: 67, date: '2025-05-15' },
    { id: 203, title: 'Audi A4 2021', price: '€38,000', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=150&h=100&fit=crop', type: 'Makina', status: 'Aktive', views: 312, date: '2025-05-10' }
  ];

  const recentActivity = [
    { action: 'Listim i ri publikuar', item: 'BMW 3 Series 2019', date: '2025-05-20', type: 'listing' },
    { action: 'Mesazh i ri', item: 'Per Apartament 2+1', date: '2025-05-19', type: 'message' },
    { action: 'Shitje e suksesshme', item: 'Toyota Corolla 2020', date: '2025-05-15', type: 'sale' },
    { action: 'Vleresim i ri', item: '5 yje nga Meriton K.', date: '2025-05-12', type: 'review' }
  ];

  const handleLogout = () => {
    // Logjika per logout
    localStorage.removeItem('user');
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aktive': return 'bg-green-100 text-green-800';
      case 'Perfunduar': return 'bg-gray-100 text-gray-800';
      case 'Ne pritje': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'listing':
        return <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/></svg>;
      case 'message':
        return <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5l8 4 8-4V5l-8 4L2 5z"/></svg>;
      case 'sale':
        return <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4h12v12H4V4zm8 8V8l-4 2v4l4-2z"/></svg>;
      case 'review':
        return <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 1l2.5 5h5.5l-4.5 3.5 1.5 5.5L10 12l-4.5 3.5L7 10 2.5 6H8L10 1z"/></svg>;
      default:
        return <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/></svg>;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totali i listimeve</p>
              <p className="text-2xl font-bold text-gray-900">{userData?.total_listings || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktive</p>
              <p className="text-2xl font-bold text-gray-900">{userData?.active_listings || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4h12v12H4V4zm8 8V8l-4 2v4l4-2z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Shitur</p>
              <p className="text-2xl font-bold text-gray-900">{userData?.sold_items || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1l2.5 5h5.5l-4.5 3.5 1.5 5.5L10 12l-4.5 3.5L7 10 2.5 6H8L10 1z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Vleresimi</p>
              <p className="text-2xl font-bold text-gray-900">{userData?.rating || 0}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktiviteti i fundit</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.item}</p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(activity.date).toLocaleDateString('sq-AL')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Veprime te shpejta</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/create-listing"
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-sm font-medium text-gray-900">Shto listim te ri</p>
            </div>
          </Link>

          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm font-medium text-gray-900">Mesazhet (3)</p>
            </div>
          </button>

          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm font-medium text-gray-900">Shiko statistikat</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Listimet e mia</h3>
        <Link 
          to="/create-listing"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Shto te ri
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listimi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cmimi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shikime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veprime</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-12 w-20 object-cover rounded-lg" src={listing.image} alt={listing.title} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-500">{listing.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {listing.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {listing.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {listing.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/listing/${listing.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">Shiko</Link>
                    <button className="text-green-600 hover:text-green-900 mr-3">Modifiko</button>
                    <button className="text-red-600 hover:text-red-900">Fshij</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informatat personale</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Emri i plote</label>
              <input 
                type="text" 
                value={userData?.full_name || ''} 
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                value={userData?.email || ''} 
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefoni</label>
              <input 
                type="tel" 
                value={userData?.phone_number || ''} 
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendndodhja</label>
              <input 
                type="text" 
                value={userData?.location || ''} 
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Biografia</label>
            <textarea 
              rows={3} 
              value={userData?.bio || ''} 
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
            />
          </div>
          <div className="flex justify-end space-x-3">
            {isEditing ? (
              <>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Anulo
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Ruaj ndryshimet
                </button>
              </>
            ) : (
              <button 
                type="button" 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Modifiko
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Preferencat */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencat</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategorite e preferuara</label>
            <div className="space-y-2">
              {['Pune', 'Makina', 'Shtepi', 'Qira'].map((category) => (
                <label key={category} className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={userData?.preferred_categories?.includes(category)}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Njoftime email</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-700">Mesazhe te reja</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-700">Listime te reja ne kategorite tuaja</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-700">Newsletter javor</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img 
                src={userData?.profile_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {userData?.is_verified && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{userData?.full_name}</h1>
                {userData?.membership_type === 'Premium' && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Premium</span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{userData?.location}</p>
              <p className="text-gray-700 max-w-md">{userData?.bio}</p>
              
              <div className="mt-4 flex items-center justify-center md:justify-start space-x-6 text-sm text-gray-500">
                <span>Anetaresuar qe prej: {new Date(userData?.join_date).toLocaleDateString('sq-AL')}</span>
                <span>•</span>
                <span>{userData?.total_reviews} vleresime</span>
                <span>•</span>
                <span>Aktiv: {new Date(userData?.last_active).toLocaleDateString('sq-AL')}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Dil
              </button>
              <Link 
                to="/create-listing"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Shto listim
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Pershtypje', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z' },
                { id: 'listings', label: 'Listimet e mia', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
                { id: 'settings', label: 'Cilesimet', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'listings' && renderListings()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;