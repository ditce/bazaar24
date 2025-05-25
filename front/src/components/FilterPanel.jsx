import React, { useState, useEffect } from 'react';

export default function FilterPanel({ category, onApplyFilters }) {
  const [qytetIZgjedhur, setQytetIZgjedhur] = useState('');
  const [tipiIZgjedhur, setTipiIZgjedhur] = useState('');
  const [llojiQira, setLlojiQira] = useState('');
  const [pagaMin, setPagaMin] = useState('');
  const [pagaMax, setPagaMax] = useState('');
  const [cmimiMin, setCmimiMin] = useState('');
  const [cmimiMax, setCmimiMax] = useState('');
  const [siperFaqjaMin, setSiperFaqjaMin] = useState('');
  const [siperFaqjaMax, setSiperFaqjaMax] = useState('');
  const [vitiMin, setVitiMin] = useState(1980);
  const [vitiMax, setVitiMax] = useState(2025);
  const [kmMin, setKmMin] = useState(0);
  const [kmMax, setKmMax] = useState(500000);

  // Lista e qyteteve te Shqiperise
  const qytetet = [
    'Tirane', 'Durres', 'Vlore', 'Shkoder', 'Elbasan', 'Fier', 'Korce', 'Berat', 
    'Lushnje', 'Pogradec', 'Kavaje', 'Lezhe', 'Gjirokaster', 'Sarande', 'Kukes', 
    'Peshkopi', 'Kruje', 'Kucove', 'Permet', 'Ballsh', 'Patos', 'Librazhd', 
    'Tepelene', 'Gramsh', 'Burrel', 'Himare', 'Delvine', 'Lac', 'Koplik', 'Fushe-Kruje'
  ];

  // Lagjet per qytetet kryesore (per demonstrim)
  const lagjet = {
    'Tirane': ['Bllok', 'Qender', 'Yzberisht', 'Kombinat', 'Laprake', 'Don Bosko', 
              'Myslym Shyri', 'Ali Demi', 'Kinostudio', 'Kodra e Diellit', 'Selite', 
              'Xhamllik', 'Tirana e Re', 'Fresku', '21 Dhjetori', 'Komunja e Parisit', 
              'Medrese', 'Allias', 'Bregu i Lumit', 'Babrru', 'Porcelan', 'Shkoze', 
              'Sauk', 'Astir', 'Shkoze'],
    'Durres': ['Plazh', 'Qender', 'Shkozet', 'Currila', 'Spitalle', 'Porto Romano', 
              'Arapaj', 'Keneta', 'Rrashbull'],
    'Vlore': ['Plazh', 'Qender', 'Skele', 'Uji i Ftohte', 'Radhime', 'Orikum', 
              'Narte', 'Zvernec', 'Shushice'],
    'Shkoder': ['Qender', 'Xhabije', 'Rus', 'Perash', 'Bahcallek', 'Dudas', 
               'Vojo Kushi', 'Skenderbeg', 'Fermentim', 'Zdralej'],
    'Elbasan': ['Qender', 'Hekurudha', 'Lagja 5 Maji', 'Emin Matraxhiu', 'Skenderbej', 
               'Visarion', 'Dyli Haxhire', 'Aqif Pasha', '11 Nentori']
  };

  // Gjenerim i funksioneve default per qytetet e tjera
  qytetet.forEach(qytet => {
    if (!lagjet[qytet]) {
      lagjet[qytet] = ['Qender', 'Lagje 1', 'Lagje 2', 'Lagje 3', 'Periferik'];
    }
  });

  // Filtrat bazuar ne kategori
  const filters = {
    'Pune': [
      { 
        label: 'Vendndodhja', 
        type: 'select',
        options: qytetet,
        onChange: (e) => setQytetIZgjedhur(e.target.value) 
      },
      { 
        label: 'Paga minimale (€)',
        type: 'number',
        placeholder: 'Min',
        onChange: (e) => setPagaMin(e.target.value)
      },
      { 
        label: 'Paga maksimale (€)',
        type: 'number',
        placeholder: 'Max',
        onChange: (e) => setPagaMax(e.target.value)
      },
      { 
        label: 'Pozicioni', 
        type: 'select',
        options: [
          'Ekonomist', 'IT', 'Programues', 'Kuzhine', 'Ndertim', 'Marketing', 
          'Sanitare', 'Kamarier-Banakier', 'Sherbim Klienti', 'Call Center', 
          'Sigurim', 'Hoteleri', 'Finance', 'Shites/e', 'Ligj', 'Menaxhim Biznesi', 
          'Kontabilitet', 'Burime Njerezore', 'Administrate', 'Inxhinier', 'Mjekesi',
          'Farmaci', 'Transport', 'Pastruese', 'Mesues/e', 'Te tjera'
        ]
      },
      { 
        label: 'Orari', 
        type: 'select',
        options: ['Kohe e plote', 'Kohe e pjesshme', 'Internship']
      },
      { 
        label: 'Eksperienca', 
        type: 'select',
        options: ['Pa eksperience', 'Eksperience <1 vit', 'Eksperience 1-3 vite', 'Eksperience +3 vite']
      }
    ],
    'Makina': [
      { 
        label: 'Vendndodhja', 
        type: 'select',
        options: qytetet,
        onChange: (e) => setQytetIZgjedhur(e.target.value)
      },
      { 
        label: 'Marka', 
        type: 'select',
        options: [
          'Mercedes Benz', 'BMW', 'Audi', 'Toyota', 'Opel', 'Volkswagen', 'Ford', 
          'Honda', 'Fiat', 'Jaguar', 'Mazda', 'Subaru', 'Alfa Romeo', 'Aston Martin', 
          'Bentley', 'Cadillac', 'Hyundai', 'Kia', 'Porsche', 'Tesla', 'Jeep', 
          'Nissan', 'Lexus', 'Chevrolet', 'Volvo', 'Mitsubishi', 'Lincoln', 
          'Peugeot', 'Suzuki', 'Citroen', 'Land Rover', 'Renault', 'Te tjera'
        ]
      },
      { 
        label: 'Cmimi minimal (€)',
        type: 'number',
        placeholder: 'Min',
        onChange: (e) => setCmimiMin(e.target.value)
      },
      { 
        label: 'Cmimi maksimal (€)',
        type: 'number',
        placeholder: 'Max',
        onChange: (e) => setCmimiMax(e.target.value)
      },
      { 
        label: 'Viti i prodhimit (min)', 
        type: 'range',
        min: 1980,
        max: 2025,
        value: vitiMin,
        onChange: (e) => setVitiMin(e.target.value),
        display: vitiMin
      },
      { 
        label: 'Viti i prodhimit (max)', 
        type: 'range',
        min: 1980,
        max: 2025,
        value: vitiMax,
        onChange: (e) => setVitiMax(e.target.value),
        display: vitiMax
      },
      { 
        label: 'Kilometrazhi (min)',
        type: 'range',
        min: 0,
        max: 500000,
        step: 5000,
        value: kmMin,
        onChange: (e) => setKmMin(e.target.value),
        display: `${kmMin.toLocaleString()} KM`
      },
      { 
        label: 'Kilometrazhi (max)',
        type: 'range',
        min: 0,
        max: 500000,
        step: 5000,
        value: kmMax,
        onChange: (e) => setKmMax(e.target.value),
        display: `${kmMax.toLocaleString()} KM`
      },
      { 
        label: 'Karburanti', 
        type: 'select',
        options: ['Nafte', 'Benzine', 'Gas', 'Benzine + Gas', 'Elektrike']
      },
      { 
        label: 'Kambio', 
        type: 'select',
        options: ['Automatik', 'Manual']
      }
    ],
    'Shtepi': [
      { 
        label: 'Vendndodhja', 
        type: 'select',
        options: qytetet,
        onChange: (e) => setQytetIZgjedhur(e.target.value)
      },
      { 
        label: 'Zona', 
        type: 'select',
        options: qytetIZgjedhur ? lagjet[qytetIZgjedhur] : ['Zgjidhni nje qytet se pari'],
        disabled: !qytetIZgjedhur
      },
      { 
        label: 'Cmimi minimal (€)',
        type: 'number',
        placeholder: 'Min',
        onChange: (e) => setCmimiMin(e.target.value)
      },
      { 
        label: 'Cmimi maksimal (€)',
        type: 'number',
        placeholder: 'Max',
        onChange: (e) => setCmimiMax(e.target.value)
      },
      { 
        label: 'Tipi', 
        type: 'select',
        options: ['Apartament', 'Apartament duplex', 'Penthouse', 'Garsoniere', 'Vile', 'Shtepi Private', 'Garazh'],
        onChange: (e) => setTipiIZgjedhur(e.target.value)
      },
      { 
        label: 'Siperfaqja minimale (m²)',
        type: 'number',
        placeholder: 'Min',
        onChange: (e) => setSiperFaqjaMin(e.target.value)
      },
      { 
        label: 'Siperfaqja maksimale (m²)',
        type: 'number',
        placeholder: 'Max',
        onChange: (e) => setSiperFaqjaMax(e.target.value)
      },
      { 
        label: 'Tipologjia', 
        type: 'select',
        options: ['1+1', '2+1', '2+1+2', '3+1', '3+1+2', '3+2+2', '4+1', '4+1+2', '4+2+2', 'Tjeter'],
        disabled: tipiIZgjedhur === 'Garsoniere'
      }
    ],
    'Qira': [
      { 
        label: 'Lloji', 
        type: 'select',
        options: ['Shtepi', 'Makine', 'Post Parkimi', 'Dyqan', 'Lokal', 'Tjeter'],
        onChange: (e) => setLlojiQira(e.target.value)
      },
      { 
        label: 'Vendndodhja', 
        type: 'select',
        options: qytetet
      },
      { 
        label: 'Cmimi minimal (€)',
        type: 'number',
        placeholder: 'Min',
        onChange: (e) => setCmimiMin(e.target.value)
      },
      { 
        label: 'Cmimi maksimal (€)',
        type: 'number',
        placeholder: 'Max',
        onChange: (e) => setCmimiMax(e.target.value)
      },
      ...(llojiQira === 'Shtepi' ? [
        { 
          label: 'Zona', 
          type: 'select',
          options: qytetIZgjedhur ? lagjet[qytetIZgjedhur] : ['Zgjidhni nje qytet se pari'],
          disabled: !qytetIZgjedhur
        },
        { 
          label: 'Tipi', 
          type: 'select',
          options: ['Apartament', 'Apartament duplex', 'Penthouse', 'Garsoniere', 'Vile', 'Shtepi Private']
        },
        { 
          label: 'Siperfaqja minimale (m²)',
          type: 'number',
          placeholder: 'Min'
        },
        { 
          label: 'Siperfaqja maksimale (m²)',
          type: 'number',
          placeholder: 'Max'
        },
        { 
          label: 'Tipologjia', 
          type: 'select',
          options: ['1+1', '2+1', '2+1+2', '3+1', '3+1+2', '3+2+2', '4+1', '4+1+2', '4+2+2', 'Tjeter'],
          disabled: tipiIZgjedhur === 'Garsoniere'
        }
      ] : []),
      ...(llojiQira === 'Makine' ? [
        { 
          label: 'Marka', 
          type: 'select',
          options: ['Mercedes Benz', 'BMW', 'Audi', 'Toyota', 'Opel', 'Volkswagen', 'Ford', 'Honda', 'Fiat', 'Te tjera']
        },
        { 
          label: 'Viti i prodhimit (min)', 
          type: 'range',
          min: 1980,
          max: 2025,
          value: vitiMin,
          onChange: (e) => setVitiMin(e.target.value),
          display: vitiMin
        },
        { 
          label: 'Karburanti', 
          type: 'select',
          options: ['Nafte', 'Benzine', 'Gas', 'Benzine + Gas', 'Elektrike']
        },
        { 
          label: 'Kambio', 
          type: 'select',
          options: ['Automatik', 'Manual']
        }
      ] : []),
      ...(llojiQira === 'Post Parkimi' ? [
        { 
          label: 'Tipi', 
          type: 'select',
          options: ['I hapur', 'I mbyllur', 'Garazh']
        }
      ] : []),
      ...(llojiQira === 'Dyqan' || llojiQira === 'Lokal' ? [
        { 
          label: 'Siperfaqja minimale (m²)',
          type: 'number',
          placeholder: 'Min'
        },
        { 
          label: 'Siperfaqja maksimale (m²)',
          type: 'number',
          placeholder: 'Max'
        }
      ] : [])
    ]
  };

  const activeFilters = filters[category] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Krijojme nje objekt me vlerat e filtrave
    const activeFilters = {
      qytetIZgjedhur,
      tipiIZgjedhur,
      llojiQira,
      pagaMin: pagaMin ? parseInt(pagaMin) : null,
      pagaMax: pagaMax ? parseInt(pagaMax) : null,
      cmimiMin: cmimiMin ? parseInt(cmimiMin) : null, 
      cmimiMax: cmimiMax ? parseInt(cmimiMax) : null,
      siperFaqjaMin: siperFaqjaMin ? parseInt(siperFaqjaMin) : null,
      siperFaqjaMax: siperFaqjaMax ? parseInt(siperFaqjaMax) : null,
      vitiMin,
      vitiMax,
      kmMin,
      kmMax
    };
    
    console.log('Filtrat u aplikuan!', activeFilters);
    
    // Kalojme filtrat ne komponentin parent permes callback-ut
    if (onApplyFilters) {
      onApplyFilters(activeFilters);
    } else {
      // Simulojme nje API call per te filtruar rezultatet kur nuk kemi callback
      alert(`Filtrat u aplikuan me sukses!\nKategoria: ${category}\nFiltrat: ${JSON.stringify(activeFilters, null, 2)}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Filtro sipas</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeFilters.map((filter, index) => (
          <div key={index} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{filter.label}</label>
            {filter.type === 'select' ? (
              <select 
                className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={filter.onChange}
                disabled={filter.disabled}
              >
                <option value="">Zgjidh</option>
                {filter.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ) : filter.type === 'range' ? (
              <div>
                <input 
                  type="range" 
                  min={filter.min} 
                  max={filter.max} 
                  step={filter.step || 1}
                  value={filter.value}
                  onChange={filter.onChange}
                  className="w-full accent-indigo-600"
                />
                <div className="text-right text-sm text-gray-600 mt-1">{filter.display}</div>
              </div>
            ) : (
              <input 
                type={filter.type || 'text'} 
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder={filter.placeholder || ''}
                onChange={filter.onChange}
                min={filter.min}
                max={filter.max}
              />
            )}
          </div>
        ))}
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium"
        >
          Apliko Filtrat
        </button>
      </form>
    </div>
  );
}