import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import API from '../utilities/API';

const CreateListing = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [listingData, setListingData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');

  // Lista e qyteteve te Shqiperise
  const qytetet = [
    'Tirane', 'Durres', 'Vlore', 'Shkoder', 'Elbasan', 'Fier', 'Korce', 'Berat', 
    'Lushnje', 'Pogradec', 'Kavaje', 'Lezhe', 'Gjirokaster', 'Sarande', 'Kukes', 
    'Peshkopi', 'Kruje', 'Kucove', 'Permet', 'Ballsh', 'Patos', 'Librazhd', 
    'Tepelene', 'Gramsh', 'Burrel', 'Himare', 'Delvine', 'Lac', 'Koplik', 'Fushe-Kruje'
  ];

  // Kategoritë dhe opsionet
  const categories = {
    'Pune': {
      title: 'Shto nje pozicion pune',
      fields: [
        { name: 'title', label: 'Titulli i pozicionit', type: 'text', required: true },
        { name: 'company', label: 'Emri i kompanise', type: 'text', required: true },
        { name: 'location', label: 'Vendndodhja', type: 'select', options: qytetet, required: true },
        { name: 'salary', label: 'Paga (€)', type: 'number', required: true },
        { 
          name: 'position', 
          label: 'Pozicioni', 
          type: 'select', 
          options: [
            'Ekonomist', 'IT', 'Programues', 'Kuzhine', 'Ndertim', 'Marketing', 
            'Sanitare', 'Kamarier-Banakier', 'Sherbim Klienti', 'Call Center', 
            'Sigurim', 'Hoteleri', 'Finance', 'Shites/e', 'Ligj', 'Menaxhim Biznesi', 
            'Kontabilitet', 'Burime Njerezore', 'Administrate', 'Inxhinier', 'Mjekesi',
            'Farmaci', 'Transport', 'Pastruese', 'Mesues/e', 'Te tjera'
          ],
          required: true
        },
        { 
          name: 'schedule', 
          label: 'Orari', 
          type: 'select', 
          options: ['Kohe e plote', 'Kohe e pjesshme', 'Internship'], 
          required: true 
        },
        { 
          name: 'experience', 
          label: 'Eksperienca', 
          type: 'select', 
          options: ['Pa eksperience', 'Eksperience <1 vit', 'Eksperience 1-3 vite', 'Eksperience +3 vite'], 
          required: true 
        },
        { name: 'education', label: 'Arsimi i kerkuar', type: 'text', required: false },
        { name: 'description', label: 'Pershkrimi i punes', type: 'textarea', required: true },
        { name: 'contactEmail', label: 'Email kontakti', type: 'email', required: true }
      ]
    },
    'Makina': {
      title: 'Shto nje makine',
      fields: [
        { name: 'title', label: 'Titulli i listimit', type: 'text', required: true },
        { name: 'location', label: 'Vendndodhja', type: 'select', options: qytetet, required: true },
        { name: 'price', label: 'Cmimi (€)', type: 'number', required: true },
        { 
          name: 'brand', 
          label: 'Marka', 
          type: 'select', 
          options: [
            'Mercedes Benz', 'BMW', 'Audi', 'Toyota', 'Opel', 'Volkswagen', 'Ford', 
            'Honda', 'Fiat', 'Jaguar', 'Mazda', 'Subaru', 'Alfa Romeo', 'Aston Martin', 
            'Bentley', 'Cadillac', 'Hyundai', 'Kia', 'Porsche', 'Tesla', 'Jeep', 
            'Nissan', 'Lexus', 'Chevrolet', 'Volvo', 'Mitsubishi', 'Lincoln', 
            'Peugeot', 'Suzuki', 'Citroen', 'Land Rover', 'Renault', 'Te tjera'
          ],
          required: true
        },
        { name: 'model', label: 'Modeli', type: 'text', required: true },
        { name: 'year', label: 'Viti i prodhimit', type: 'number', min: 1980, max: 2025, required: true },
        { name: 'kilometers', label: 'Kilometrazhi', type: 'number', required: true },
        { 
          name: 'fuel', 
          label: 'Karburanti', 
          type: 'select', 
          options: ['Nafte', 'Benzine', 'Gas', 'Benzine + Gas', 'Elektrike'], 
          required: true 
        },
        { 
          name: 'transmission', 
          label: 'Kambio', 
          type: 'select', 
          options: ['Automatik', 'Manual'], 
          required: true 
        },
        { name: 'engineSize', label: 'Motorri (L)', type: 'text', required: false },
        { name: 'power', label: 'Fuqia (HP)', type: 'number', required: false },
        { name: 'color', label: 'Ngjyra', type: 'text', required: true },
        { name: 'description', label: 'Pershkrimi', type: 'textarea', required: true },
        { name: 'contactPhone', label: 'Telefoni', type: 'tel', required: true }
      ]
    },
    'Shtepi': {
      title: 'Shto nje shtepi',
      fields: [
        { name: 'title', label: 'Titulli i listimit', type: 'text', required: true },
        { name: 'location', label: 'Qyteti', type: 'select', options: qytetet, required: true },
        { name: 'zone', label: 'Zona/Lagjja', type: 'text', required: true },
        { name: 'price', label: 'Cmimi (€)', type: 'number', required: true },
        { 
          name: 'type', 
          label: 'Tipi', 
          type: 'select', 
          options: ['Apartament', 'Apartament duplex', 'Penthouse', 'Garsoniere', 'Vile', 'Shtepi Private', 'Garazh'], 
          required: true 
        },
        { name: 'area', label: 'Siperfaqja (m²)', type: 'number', required: true },
        { 
          name: 'rooms', 
          label: 'Tipologjia', 
          type: 'select', 
          options: ['1+1', '2+1', '2+1+2', '3+1', '3+1+2', '3+2+2', '4+1', '4+1+2', '4+2+2', 'Tjeter'], 
          required: true 
        },
        { name: 'floor', label: 'Kati', type: 'text', required: false },
        { 
          name: 'parking', 
          label: 'Parking', 
          type: 'select', 
          options: ['Po', 'Jo'], 
          required: false 
        },
        { name: 'construction', label: 'Ndertimi (viti/gjendja)', type: 'text', required: false },
        { 
          name: 'furnished', 
          label: 'I mobiluar', 
          type: 'select', 
          options: ['Po, plotesisht', 'Po, pjeserisht', 'Jo'], 
          required: true 
        },
        { name: 'description', label: 'Pershkrimi', type: 'textarea', required: true },
        { name: 'contactPhone', label: 'Telefoni', type: 'tel', required: true }
      ]
    },
    'Qira': {
      title: 'Shto nje qira',
      fields: [
        { name: 'title', label: 'Titulli i listimit', type: 'text', required: true },
        { name: 'location', label: 'Vendndodhja', type: 'select', options: qytetet, required: true },
        { name: 'price', label: 'Cmimi (€)', type: 'number', required: true },
        { 
          name: 'rentalType', 
          label: 'Lloji', 
          type: 'select', 
          options: ['Shtepi', 'Makine', 'Post Parkimi', 'Dyqan', 'Lokal', 'Tjeter'], 
          required: true 
        },
        { name: 'availableFrom', label: 'E disponueshme nga', type: 'date', required: false },
        { name: 'duration', label: 'Kohezgjatja minimale', type: 'text', required: false },
        { name: 'deposit', label: 'Depozita (€)', type: 'number', required: false },
        { name: 'description', label: 'Pershkrimi', type: 'textarea', required: true },
        { name: 'contactPhone', label: 'Telefoni', type: 'tel', required: true }
      ]
    }
  };

  // Ndrysho fushat bazuar në kategorinë e zgjedhur
  useEffect(() => {
    if (category) {
      setListingData({}); // Pastrojmë të dhënat e formularit kur ndryshon kategoria
      setPreviewImage(null);
    }
  }, [category]);

  // Trajtojmë ndryshimet në formular
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      if (files && files[0]) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        setListingData(prev => ({ ...prev, image: file }));
      }
    } else {
      setListingData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Dërgojmë të dhënat në server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Formatojmë të dhënat për t'i dërguar
      const formattedData = {
        ...listingData,
        type: category,
        publishedDate: new Date().toISOString(),
      };
      
      // Krijojmë një FormData për të dërguar edhe imazhin
      const formData = new FormData();
      for (const key in formattedData) {
        formData.append(key, formattedData[key]);
      }
      
      // API call për të krijuar listimin
      // const response = await API.post('/listings', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
      // Simulojmë një përgjigje të suksesshme
      console.log('Listimi u krijua me sukses!', formattedData);
      
      // Ridrejtojmë tek profili pas krijimit të suksesshëm
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      
    } catch (err) {
      console.error('Gabim në krijimin e listimit:', err);
      setError('Ndodhi një gabim gjatë krijimit të listimit. Ju lutem provoni përsëri.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendero formularin bazuar në kategorinë e zgjedhur
  const renderForm = () => {
    if (!category) return null;
    
    const categoryData = categories[category];
    
    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{categoryData.title}</h2>
        
        {/* Fushë për ngarkimin e imazhit */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Foto kryesore</label>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG ose GIF. Maksimumi 5MB.
              </p>
            </div>
          </div>
        </div>
        
        {/* Fushat për kategorinë e zgjedhur */}
        {categoryData.fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                onChange={handleChange}
                value={listingData[field.name] || ''}
                required={field.required}
                className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Zgjidh</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                onChange={handleChange}
                value={listingData[field.name] || ''}
                required={field.required}
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                onChange={handleChange}
                value={listingData[field.name] || ''}
                required={field.required}
                min={field.min}
                max={field.max}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            )}
          </div>
        ))}
        
        {/* Butoni i dërgimit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:bg-indigo-300"
          >
            {isSubmitting ? 'Duke dërguar...' : 'Krijo Listimin'}
          </button>
        </div>
        
        {/* Mesazhi i gabimit */}
        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Zgjedhja e kategorisë */}
          {!category ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Çfarë deshironi të shitni ose ofroni?</h1>
              <p className="text-gray-600 mb-8">Zgjidhni kategorinë e listimit që dëshironi të krijoni</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(categories).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
                  >
                    <h2 className="text-xl font-semibold text-gray-800">{cat}</h2>
                    <p className="text-gray-600 mt-1">{categories[cat].title}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <button
                onClick={() => setCategory('')}
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Kthehu tek zgjedhja e kategorive
              </button>
            </div>
          )}
          
          {/* Formulari për kategorinë e zgjedhur */}
          {renderForm()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateListing;