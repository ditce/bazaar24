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
  const qytetet = [
    'Tirane', 'Durres', 'Vlore', 'Shkoder', 'Elbasan', 'Fier', 'Korce', 'Berat', 
    'Lushnje', 'Pogradec', 'Kavaje', 'Lezhe', 'Gjirokaster', 'Sarande', 'Kukes', 
    'Peshkopi', 'Kruje', 'Kucove', 'Permet', 'Ballsh', 'Patos', 'Librazhd', 
    'Tepelene', 'Gramsh', 'Burrel', 'Himare', 'Delvine', 'Lac', 'Koplik', 'Fushe-Kruje'
  ];
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
        { name: 'year', label: 'Viti i prodhimit', type: 'number', min: 1980, max: new Date().getFullYear() + 1, required: true },
        { name: 'kilometers', label: 'Kilometrazhi', type: 'number', required: true },
        { 
          name: 'fuel', 
          label: 'Karburanti', 
          type: 'select', 
          options: ['Nafte', 'Benzine', 'Gas', 'Benzine + Gas', 'Elektrike', 'Hibrid'], 
          required: true 
        },
        { 
          name: 'transmission', 
          label: 'Kambio', 
          type: 'select', 
          options: ['Automatik', 'Manual'], 
          required: true 
        },
        { name: 'engineSize', label: 'Motorri (cc)', type: 'number', required: false }, 
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
          options: ['Apartament', 'Apartament duplex', 'Penthouse', 'Garsoniere', 'Vile', 'Shtepi Private', 'Truall', 'Garazh'], 
          required: true 
        },
        { name: 'area', label: 'Siperfaqja (m²)', type: 'number', required: true },
        { 
          name: 'rooms', 
          label: 'Tipologjia (Dhoma gjumi + Ndjenje)', 
          type: 'select', 
          options: ['1+1', '2+1', '2+1+2 (2 banjo)', '3+1', '3+1+2 (2 banjo)', '3+2+2 (2 banjo)', '4+1', '4+1+2 (2 banjo)', '4+2+2 (2 banjo)', 'Garsoniere', 'Tjeter'], 
          required: true 
        },
        { name: 'floor', label: 'Kati', type: 'text', required: false },  
        { 
          name: 'parking', 
          label: 'Parking', 
          type: 'select', 
          options: ['Po', 'Jo', 'Opsional'], 
          required: false 
        },
        { name: 'construction_year', label: 'Viti i ndertimit', type: 'number', min:1900, max: new Date().getFullYear() + 1, required: false },
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
        { name: 'price', label: 'Cmimi (€/muaj, dite, etj.)', type: 'text', required: true }, 
        { 
          name: 'rentalType', 
          label: 'Lloji i qirase', 
          type: 'select', 
          options: ['Shtepi/Apartament', 'Makine', 'Post Parkimi', 'Dyqan/Zyre', 'Lokal', 'Truall', 'Tjeter'], 
          required: true 
        },
        { name: 'availableFrom', label: 'E disponueshme nga', type: 'date', required: false },
        { name: 'duration', label: 'Kohezgjatja minimale e qirase', type: 'text', placeholder: 'P.sh. 1 vit, 3 muaj, 1 dite', required: false },
        { name: 'deposit', label: 'Depozita (€)', type: 'number', required: false },
        { name: 'description', label: 'Pershkrimi i detajuar i qirase', type: 'textarea', required: true },
        { name: 'contactPhone', label: 'Telefoni i kontaktit', type: 'tel', required: true }
      ]
    }
  };
  const mainCategories = Object.keys(categories);


  useEffect(() => {
    if (category) {
      setListingData({ type: category }); 
      setPreviewImage(null);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    
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
    } else if (type === 'checkbox') {
        setListingData(prev => ({ ...prev, [name]: checked }));
    } else {
      setListingData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const currentCategoryFields = categories[category]?.fields || [];
    for (const field of currentCategoryFields) {
        if (field.required && !listingData[field.name]) {
            if (field.name === 'image' && !previewImage) {
                 setError(`Fusha "${field.label}" eshte e detyrueshme.`);
                 setIsSubmitting(false);
                 return;
            }
            if (field.name !== 'image') {
                setError(`Fusha "${field.label}" eshte e detyrueshme.`);
                setIsSubmitting(false);
                return;
            }
        }
    }
    
    try {
      const formData = new FormData();
      for (const key in listingData) {
        formData.append(key, listingData[key]);
      }
      if (!formData.has('type')) {
        formData.append('type', category);
      }
      formData.append('publishedDate', new Date().toISOString());

      if (listingData.image instanceof File) {
        formData.append('imageFile', listingData.image, listingData.image.name);
      }
      const response = await API.post('/listing', formData, {
          headers: {
              'Content-Type': 'multipart/form-data' 
          }
      });
      
      console.log('Listimi u krijua me sukses!', response.data);
      alert('Listimi u krijua me sukses!'); 
      setTimeout(() => {
        navigate('/profile'); 
      }, 1500);
      
    } catch (err) {
      console.error('Gabim ne krijimin e listimit:', err.response?.data || err.message || err);
      setError(`Ndodhi nje gabim gjate krijimit te listimit: ${err.response?.data?.message || err.message || 'Ju lutem provoni perseri.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    if (!category) return null;
    
    const categoryData = categories[category];
    if (!categoryData) {
        setError(`Kategoria "${category}" nuk eshte e konfiguruar.`);
        return <p className="text-red-500 text-center">{error}</p>;
    }
    
    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{categoryData.title}</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Foto kryesore <span className="text-red-500">*</span></label>
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
                JPG, PNG, GIF, WEBP. Maksimumi 5MB.
              </p>
            </div>
          </div>
        </div>
        
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
                {field.options.map((option, index) => (
                  <option key={typeof option === 'object' ? option.value || index : option} value={typeof option === 'object' ? option.value : option}>
                    {typeof option === 'object' ? option.label : option}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                onChange={handleChange}
                value={listingData[field.name] || ''}
                required={field.required}
                rows={field.rows || 4}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={field.placeholder || ''}
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
                placeholder={field.placeholder || ''}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            )}
          </div>
        ))}
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:bg-indigo-300"
          >
            {isSubmitting ? 'Duke derguar...' : 'Krijo Listimin'}
          </button>
        </div>
        
        {error && (
          <p className="text-red-500 text-center p-3 bg-red-50 rounded-md">{error}</p>
        )}
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!category ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Cfare deshironi te publikoni?</h1>
              <p className="text-gray-600 mb-8">Zgjidhni kategorine e listimit qe deshironi te krijoni.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mainCategories.map((catName) => (
                  <button
                    key={catName}
                    onClick={() => setCategory(catName)}
                    className="p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <h2 className="text-xl font-semibold text-gray-800">{catName}</h2>
                    <p className="text-gray-600 mt-1 text-sm">{categories[catName]?.title || `Shto nje ${catName.toLowerCase()}`}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <button
                onClick={() => { setCategory(''); setError(''); }} 
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Kthehu tek zgjedhja e kategorive
              </button>
            </div>
          )}
          
          {renderForm()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateListing;