import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AddToCartButton from './AddToCartButton';
import API from '../utilities/API';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      if (!id) {
        setError("ID e listimit mungon.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await API.get(`/listing?id=${id}`);
        if (response.data) {
          setListing(response.data);
        } else {
          setError("Listimi nuk u gjet.");
        }
      } catch (err) {
        console.error(`Failed to fetch listing details for ID ${id}:`, err);
        setError("Gabim ne ngarkimin e detajeve te listimit.");
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, []);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Gabim!</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              to="/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Kthehu në faqen kryesore
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Shpallja nuk u gjet</h2>
            <p className="text-gray-600 mb-8">Shpallja që kërkoni nuk ekziston ose është hequr.</p>
            <Link
              to="/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Kthehu në faqen kryesore
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  const renderJobDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Detaje te punes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600"><strong>Kompania:</strong> {listing.details?.company || 'N/A'}</p>
          <p className="text-gray-600"><strong>Eksperienca:</strong> {listing.details?.experience || 'N/A'}</p>
          <p className="text-gray-600"><strong>Arsimi:</strong> {listing.details?.education || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Orari:</strong> {listing.details?.schedule || 'N/A'}</p>
          <p className="text-gray-600"><strong>Email:</strong> {listing.details?.contactEmail || 'N/A'}</p>
          <p className="text-gray-600"><strong>Data e publikimit:</strong> {listing.details?.publishedDate ? new Date(listing.details.publishedDate).toLocaleDateString('sq-AL') : 'N/A'}</p>
        </div>
      </div>
    </div>
  );

  const renderCarDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Specifikime teknike</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600"><strong>Marka:</strong> {listing.details?.brand || 'N/A'}</p>
          <p className="text-gray-600"><strong>Modeli:</strong> {listing.details?.model || 'N/A'}</p>
          <p className="text-gray-600"><strong>Viti:</strong> {listing.details?.year || 'N/A'}</p>
          <p className="text-gray-600"><strong>Karburanti:</strong> {listing.details?.fuel || 'N/A'}</p>
          <p className="text-gray-600"><strong>Kilometra:</strong> {listing.details?.kilometers || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Transmisioni:</strong> {listing.details?.transmission || 'N/A'}</p>
          <p className="text-gray-600"><strong>Madhesite e motorit:</strong> {listing.details?.engineSize || 'N/A'}</p>
          <p className="text-gray-600"><strong>Fuqia:</strong> {listing.details?.power || 'N/A'}</p>
          <p className="text-gray-600"><strong>Ngjyra:</strong> {listing.details?.color || 'N/A'}</p>
          <p className="text-gray-600"><strong>Telefon:</strong> {listing.details?.contactPhone || 'N/A'}</p>
        </div>
      </div>
    </div>
  );

  const renderHouseDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Detaje te prones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600"><strong>Tipi:</strong> {listing.details?.type || 'N/A'}</p>
          <p className="text-gray-600"><strong>Dhoma:</strong> {listing.details?.rooms || 'N/A'}</p>
          <p className="text-gray-600"><strong>Siperfaqja:</strong> {listing.details?.area || 'N/A'}</p>
          <p className="text-gray-600"><strong>Kati:</strong> {listing.details?.floor || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Parking:</strong> {listing.details?.parking || 'N/A'}</p>
          <p className="text-gray-600"><strong>Ndertimi:</strong> {listing.details?.construction || 'N/A'}</p>
          <p className="text-gray-600"><strong>E mobiluar:</strong> {listing.details?.furnished || 'N/A'}</p>
          <p className="text-gray-600"><strong>Klasa energjetike:</strong> {listing.details?.energyClass || 'N/A'}</p>
        </div>
      </div>
    </div>
  );

  const renderRentalDetails = () => {
    if (listing.details?.brand) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Detaje te qirase (Makine)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><strong>Marka:</strong> {listing.details.brand}</p>
              <p className="text-gray-600"><strong>Modeli:</strong> {listing.details.model}</p>
              <p className="text-gray-600"><strong>Viti:</strong> {listing.details.year}</p>
              <p className="text-gray-600"><strong>Karburanti:</strong> {listing.details.fuel}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Transmisioni:</strong> {listing.details.transmission}</p>
              <p className="text-gray-600"><strong>Sigurimi:</strong> {listing.details.insurance || 'N/A'}</p>
              <p className="text-gray-600"><strong>Mosha minimale:</strong> {listing.details.minimumAge || 'N/A'}</p>
              <p className="text-gray-600"><strong>Telefon:</strong> {listing.details.contactPhone || 'N/A'}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Detaje te qirase (Prona)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><strong>Tipi:</strong> {listing.details?.type || 'N/A'}</p>
              <p className="text-gray-600"><strong>Dhoma:</strong> {listing.details?.rooms || 'N/A'}</p>
              <p className="text-gray-600"><strong>Siperfaqja:</strong> {listing.details?.area || 'N/A'}</p>
              <p className="text-gray-600"><strong>E mobiluar:</strong> {listing.details?.furnished || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>I disponueshem nga:</strong> {listing.details?.availableFrom ? new Date(listing.details.availableFrom).toLocaleDateString('sq-AL') : 'N/A'}</p>
              <p className="text-gray-600"><strong>Depozita:</strong> {listing.details?.deposit || 'N/A'}</p>
              <p className="text-gray-600"><strong>Sherbimet:</strong> {listing.details?.utilities || 'N/A'}</p>
              <p className="text-gray-600"><strong>Telefon:</strong> {listing.details?.contactPhone || 'N/A'}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800">Kryesore</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to={`/search?category=${encodeURIComponent(listing.type)}`} className="text-indigo-600 hover:text-indigo-800">{listing.type}</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-500 truncate">{listing.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img
                src={listing.image || '/images/placeholder.jpg'}
                alt={listing.title}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.jpg'; }}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                  {listing.title}
                </h1>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-bold text-indigo-600">
                    {listing.price}
                  </p>
                  <p className="text-gray-600">{listing.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {listing.type}
                </span>
                {listing.details?.publishedDate && (
                  <span className="text-gray-500 text-sm ml-4">
                    Publikuar: {new Date(listing.details.publishedDate).toLocaleDateString('sq-AL')}
                  </span>
                )}
              </div>
            </div>

            {listing.description && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Pershkrimi</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
              </div>
            )}

            {listing.details && (
              <>
                {listing.type === 'Pune' && renderJobDetails()}
                {listing.type === 'Makina' && renderCarDetails()}
                {listing.type === 'Shtepi' && renderHouseDetails()}
                {listing.type === 'Qira' && renderRentalDetails()}
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Kontakt</h3>

              {listing.type === 'Pune' && listing.seller && (
                <div>
                  <p className="text-gray-600 mb-4">Kontaktoni kompanin:</p>
                  <a
                    href={`mailto:${listing.seller.email}`}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 block text-center mb-3"
                  >
                    Dergo mesazh
                  </a>
                  <div className="text-sm text-gray-500 text-center space-y-1">
                    <p>{listing.sellerInfo.name}</p>
                    <p>Email: {listing.seller.email}</p>
                    <p>Tel: {listing.seller.phone}</p>
                  </div>
                </div>
              )}

              {(listing.type === 'Makina' || listing.type === 'Shtepi' || listing.type === 'Qira') && listing.seller?.phone && (
                <div>
                  <p className="text-gray-600 mb-4">Kontakto shitesin:</p>

                  <a
                    href={`tel:${listing.seller.phone}`}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 block text-center mb-3"
                  >
                    Telefono
                  </a>
                  <button
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 mb-3"
                    onClick={() => alert('Funksionaliteti i dergimit te mesazhit do te implementohet se shpejti.')}
                  >
                    Dergo mesazh
                  </button>
                  <div className="mb-4">
                    <AddToCartButton
                      item={listing}
                      className="w-full h-12 rounded-lg text-base font-medium"
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Tel: {listing.seller.phone}
                  </p>

                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Keshilla sigurie</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Mos paguaj perpara se te shohesh produktin</li>
                <li>• Takohu ne vende publike</li>
                <li>• Kontrollo dokumentet e produktit</li>
                <li>• Beso instinktit tend</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingDetails;
