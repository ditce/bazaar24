import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import API from '../utilities/API'; 

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await API.get("/me"); 
        if (response.data) {
          setUserData(response.data);
        } else {setError("Nuk u gjeten te dhena per perdoruesin.");
          }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Gabim ne ngarkimin e te dhenave te profilit. Provoni te kyçeni perseri.");
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);
  const userListings_static = [
    { id: 201, title: 'BMW 3 Series 2019', price: '€32,000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=150&h=100&fit=crop', type: 'Makina', status: 'Aktive', views: 245, date: '2025-05-20' },
    { id: 301, title: 'Apartament 2+1 ne qender', price: '€120,000', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&h=100&fit=crop', type: 'Shtepi', status: 'Aktive', views: 189, date: '2025-05-18' },
  ];
  const [userListings, setUserListings] = useState(userListings_static); 
  const recentActivity_static = [
    { action: 'Listim i ri publikuar', item: 'BMW 3 Series 2019', date: '2025-05-20', type: 'listing' },
    { action: 'Mesazh i ri', item: 'Per Apartament 2+1', date: '2025-05-19', type: 'message' },
    
  ];
  const [recentActivity, setRecentActivity] = useState(recentActivity_static); 
  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    setUserData(null); 
    navigate('/');
  };
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setIsEditing(false);
        alert("Profili u perditesua me sukses!"); 
    } catch (err) {
        console.error("Failed to update profile:", err);
        alert("Gabim ne perditesimin e profilit.");
    } finally {
        setLoading(false); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards - Te dhenat duhet te vijne nga userData */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
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
             <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
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
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
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
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.846 5.671a1 1 0 00.95.69h5.969c.969 0 1.371 1.24.588 1.81l-4.828 3.525a1 1 0 00-.364 1.118l1.846 5.671c.3.921-.755 1.688-1.54 1.118l-4.828-3.525a1 1 0 00-1.176 0l-4.828 3.525c-.784.57-1.838-.197-1.539-1.118l1.846-5.671a1 1 0 00-.364-1.118L2.28 11.1c-.783-.57-.38-1.81.588-1.81h5.969a1 1 0 00.95-.69l1.846-5.671z" /></svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Vleresimi</p>
              <p className="text-2xl font-bold text-gray-900">{userData?.rating ? `${userData.rating}/5` : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktiviteti i fundit</h3>
        {/* Aktivitetet e fundit duhet te merren nga API, per momentin eshte statike */}
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.item}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.date).toLocaleDateString('sq-AL')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nuk ka aktivitet te fundit.</p>
        )}
      </div>
      {/* Quick Actions ... */}
    </div>
  );

  const renderListings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Listimet e mia</h3>
        <Link 
          to="/create-listing"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Shto te ri
        </Link>
      </div>

      {/* Listimet duhet te merren nga API */}
      {userListings.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* thead, tbody ... */}
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
                      <img className="h-12 w-20 object-cover rounded-lg flex-shrink-0" src={listing.image || '/images/placeholder.jpg'} alt={listing.title} 
                           onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.jpg'; }}/>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">{listing.title}</div>
                        <div className="text-sm text-gray-500">{new Date(listing.date).toLocaleDateString('sq-AL')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${listing.type === 'Makina' ? 'blue' : listing.type === 'Shtepi' ? 'green' : listing.type === 'Pune' ? 'pink' : 'purple'}-100 text-${listing.type === 'Makina' ? 'blue' : listing.type === 'Shtepi' ? 'green' : listing.type === 'Pune' ? 'pink' : 'purple'}-800`}>
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
                    <button onClick={() => navigate(`/edit-listing/${listing.id}`)} className="text-green-600 hover:text-green-900 mr-3">Modifiko</button>
                    <button className="text-red-600 hover:text-red-900">Fshij</button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">Nuk keni asnje listim aktiv.</p>
            <Link to="/create-listing" className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Shto listimin e pare
            </Link>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informatat personale</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Emri i plote</label>
              <input 
                type="text" 
                id="full_name"
                name="full_name"
                value={userData?.full_name || ''} 
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={userData?.email || ''} 
                onChange={handleChange}
                disabled 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Telefoni</label>
              <input 
                type="tel"
                id="phone_number"
                name="phone_number" 
                value={userData?.phone_number || ''} 
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Vendndodhja</label>
              <input 
                type="text"
                id="location"
                name="location" 
                value={userData?.location || ''} 
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Biografia</label>
            <textarea 
              rows={3}
              id="bio"
              name="bio" 
              value={userData?.bio || ''} 
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div className="flex justify-end space-x-3">
            {isEditing ? (
              <>
                <button 
                  type="button" 
                  onClick={() => {
                      setIsEditing(false);
                  }}
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
                Modifiko Profilin
              </button>
            )}
          </div>
        </form>
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
        <Footer />
      </div>
    );
  }
  
  if (error || !userData) {
     return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Gabim Profili</h2>
                <p className="text-gray-600 mb-8">{error || "Nuk mund te ngarkoheshin te dhenat e profilit."}</p>
                <Link 
                to="/login" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                Shko tek Kycja
                </Link>
            </div>
        </div>
        <Footer />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img 
                src={userData?.profile_image || 'https://via.placeholder.com/150/E0E0E0/B0B0B0?text=User'} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150/E0E0E0/B0B0B0?text=User'; }}
              />
              {userData?.is_verified && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 transform translate-x-1/4 translate-y-1/4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{userData?.full_name || "Emri i Perdoruesit"}</h1>
                {userData?.membership_type && (
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${userData.membership_type === 'Premium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{userData.membership_type}</span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{userData?.location || "Vendndodhja e panjohur"}</p>
              <p className="text-gray-700 max-w-md">{userData?.bio || "Nuk ka bio."}</p>
              
              <div className="mt-4 flex items-center justify-center md:justify-start space-x-3 text-sm text-gray-500">
                {userData?.join_date && <span>Anetaresuar: {new Date(userData.join_date).toLocaleDateString('sq-AL')}</span>}
                {userData?.join_date && userData?.total_reviews !== undefined && <span className="hidden sm:inline">•</span>}
                {userData?.total_reviews !== undefined && <span>{userData.total_reviews} vleresime</span>}
                {userData?.total_reviews !== undefined && userData?.last_active && <span className="hidden sm:inline">•</span>}
                {userData?.last_active && <span>Aktiv: {new Date(userData.last_active).toLocaleDateString('sq-AL')}</span>}
              </div>
            </div>

            <div className="flex space-x-3 mt-4 md:mt-0">
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

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 sm:space-x-4 md:space-x-8 px-2 sm:px-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Pasqyra', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z' },
                { id: 'listings', label: 'Listimet', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
                { id: 'settings', label: 'Parametrat', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 sm:px-2 md:px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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