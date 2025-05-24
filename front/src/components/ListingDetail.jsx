import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Te dhena demo per detajet e listimeve
const demoListingDetails = {
  // Kategoria Pune
  101: {
    id: 101,
    title: 'Kerkohet Programues React',
    price: '€60,000/vit',
    image: '/images/job1.jpg',
    type: 'Pune',
    location: 'Tirane',
    description: 'Kompania jone kerkon nje programues React me eksperience 2+ vite. Kerkohen njohuri te thella ne React, Redux, dhe TypeScript. Ofrojme nje ambient pune modern dhe mundesi zhvillimi karriere.',
    details: {
      company: 'TechAlbania',
      experience: '2+ vite',
      education: 'Bachelor ne Informatike ose ekuivalent',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@techalbania.al',
      publishedDate: '15 Maj, 2025'
    }
  },
  
  // Kategoria Makina
  201: {
    id: 201,
    title: 'Mercedes-Benz C-Class 2020',
    price: '€35,000',
    image: '/images/car1.jpg',
    type: 'Makina',
    location: 'Tirane',
    description: 'Mercedes-Benz C-Class 2020 ne gjendje shume te mire, i importuar nga Gjermania. Vetem 45,000 km. I servisuar rregullisht ne servis te autorizuar.',
    details: {
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2020,
      fuel: 'Nafte',
      transmission: 'Automatik',
      kilometers: '45,000 km',
      engineSize: '2.0 L',
      power: '190 HP',
      color: 'E zeze',
      contactPhone: '+355 69 123 4567',
      publishedDate: '20 Maj, 2025'
    }
  },
  
  // Kategoria Shtepi
  301: {
    id: 301,
    title: 'Apartament 2+1 ne qender',
    price: '€120,000',
    image: '/images/home1.jpg',
    type: 'Shtepi',
    location: 'Tirane',
    description: 'Apartament i ri 2+1, i pozicionuar ne qender te Tiranes, me pamje te bukur nga qyteti. Mobiluar plotesisht, me material cilesore dhe dizajn modern.',
    details: {
      type: 'Apartament',
      rooms: '2+1',
      area: '85 m²',
      floor: '5 (nga 8)',
      parking: 'Po',
      construction: 'E re (2022)',
      furnished: 'Po, plotesisht',
      energyClass: 'A',
      contactPhone: '+355 69 765 4321',
      publishedDate: '18 Maj, 2025'
    }
  },
  
  // Kategoria Qira
  401: {
    id: 401,
    title: 'Apartament 1+1 me qira',
    price: '€350/muaj',
    image: '/images/rent1.jpg',
    type: 'Qira',
    location: 'Tirane',
    description: 'Apartament modern 1+1 per qira ne zonen e Bllokut. I mobiluar komplet, me pajisje elektroshtepijake te reja. I disponueshem per kontrate afatgjate.',
    details: {
      type: 'Apartament',
      rooms: '1+1',
      area: '55 m²',
      floor: '3 (nga 6)',
      furnished: 'Po, komplet',
      availableFrom: '1 Qershor, 2025',
      deposit: '€350',
      utilities: 'Nuk perfshihen ne cmim',
      pets: 'Jo te lejuara',
      contactPhone: '+355 69 987 6543',
      publishedDate: '19 Maj, 2025'
    }
  }
};

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulojme marrjen e te dhenave nga API
    setLoading(true);
    setTimeout(() => {
      const listingData = demoListingDetails[id];
      if (listingData) {
        setListing(listingData);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 800);
  }, [id]);

  // Nese po ngarkohet
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Nese ka gabim
  if (error || !listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Listimi nuk u gjet</h2>
            <p className="text-gray-600 mb-6">Na vjen keq, por listimi qe po kerkoni nuk ekziston ose eshte hequr.</p>
            <button 
              onClick={() => navigate(-1)} 
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition mr-4"
            >
              Kthehu Mbrapa
            </button>
            <Link 
              to="/" 
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Shkoni ne Faqen Kryesore
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Funksioni per te renderuar detajet e ndryshme bazuar ne tipin e listimit
  const renderListingDetails = () => {
    switch (listing.type) {
      case 'Pune':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Kompania</h3>
              <p>{listing.details.company}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Eksperienca</h3>
              <p>{listing.details.experience}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Arsimi</h3>
              <p>{listing.details.education}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Orari</h3>
              <p>{listing.details.schedule}</p>
            </div>
          </div>
        );
      
      case 'Makina':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Marka & Modeli</h3>
              <p>{listing.details.brand} {listing.details.model}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Viti</h3>
              <p>{listing.details.year}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Kilometrazh</h3>
              <p>{listing.details.kilometers}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Karburanti</h3>
              <p>{listing.details.fuel}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Kambio</h3>
              <p>{listing.details.transmission}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Motorri</h3>
              <p>{listing.details.engineSize} / {listing.details.power}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Ngjyra</h3>
              <p>{listing.details.color}</p>
            </div>
          </div>
        );
      
      case 'Shtepi':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Tipi</h3>
              <p>{listing.details.type}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Dhoma</h3>
              <p>{listing.details.rooms}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Siperfaqja</h3>
              <p>{listing.details.area}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Kati</h3>
              <p>{listing.details.floor}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Parking</h3>
              <p>{listing.details.parking}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Ndertim</h3>
              <p>{listing.details.construction}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">I mobiluar</h3>
              <p>{listing.details.furnished}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Klasa energjitike</h3>
              <p>{listing.details.energyClass}</p>
            </div>
          </div>
        );
      
      case 'Qira':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">Tipi</h3>
              <p>{listing.details.type}</p>
            </div>
            {listing.details.rooms && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700">Dhoma</h3>
                <p>{listing.details.rooms}</p>
              </div>
            )}
            {listing.details.area && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700">Siperfaqja</h3>
                <p>{listing.details.area}</p>
              </div>
            )}
            {listing.details.availableFrom && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700">I disponueshem nga</h3>
                <p>{listing.details.availableFrom}</p>
              </div>
            )}
            {listing.details.deposit && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700">Depozte</h3>
                <p>{listing.details.deposit}</p>
              </div>
            )}
            {listing.details.utilities && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700">Utilities</h3>
                <p>{listing.details.utilities}</p>
              </div>
            )}
            {listing.details.pets && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700">Kafshët shtepijake</h3>
                <p>{listing.details.pets}</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header me titull dhe cmim */}
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 mb-2">
                  {listing.type}
                </span>
                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
                <p className="text-gray-600 mt-1">{listing.location}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-600">{listing.price}</p>
                <p className="text-sm text-gray-500">Publikuar me: {listing.details.publishedDate}</p>
              </div>
            </div>
          </div>
          
          {/* Imazhi kryesor */}
          <div className="bg-gray-200 h-96 relative">
            <img 
              src={listing.image || '/images/placeholder.jpg'} 
              alt={listing.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          
          {/* Pershkrimi */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pershkrimi</h2>
            <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
            
            {/* Detajet specifike sipas kategorise */}
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Detajet</h2>
            {renderListingDetails()}
          </div>
          
          {/* Informacioni i kontaktit */}
          <div className="p-6 bg-gray-50 border-t">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Kontakto shitesin</h2>
            <div className="flex flex-col md:flex-row gap-4">
              {listing.details.contactPhone && (
                <a 
                  href={`tel:${listing.details.contactPhone}`} 
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {listing.details.contactPhone}
                </a>
              )}
              
              {listing.details.contactEmail && (
                <a 
                  href={`mailto:${listing.details.contactEmail}`} 
                  className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg text-center font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {listing.details.contactEmail}
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Butonat e navigimit */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kthehu
          </button>
          
          <Link 
            to={`/search?category=${encodeURIComponent(listing.type)}`} 
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            Shiko me shume ne {listing.type}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}