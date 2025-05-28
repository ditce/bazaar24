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
  const [vitiMax, setVitiMax] = useState(new Date().getFullYear()); 
  const [kmMin, setKmMin] = useState(0);
  const [kmMax, setKmMax] = useState(500000);
  const qytetet = [
    'Tirane', 'Durres', 'Vlore', 'Shkoder', 'Elbasan', 'Fier', 'Korce', 'Berat', 
    'Lushnje', 'Pogradec', 'Kavaje', 'Lezhe', 'Gjirokaster', 'Sarande', 'Kukes', 
    'Peshkopi', 'Kruje', 'Kucove', 'Permet', 'Ballsh', 'Patos', 'Librazhd', 
    'Tepelene', 'Gramsh', 'Burrel', 'Himare', 'Delvine', 'Lac', 'Koplik', 'Fushe-Kruje'
  ];

  const lagjet = {
    'Tirane': ['Bllok', 'Qender', 'Yzberisht', 'Kombinat', 'Laprake', 'Don Bosko', 'Myslym Shyri', 'Ali Demi', 'Kinostudio', 'Kodra e Diellit', 'Selite', 'Xhamllik', 'Tirana e Re', 'Fresku', '21 Dhjetori', 'Komuna e Parisit', 'Medrese', 'Allias', 'Bregu i Lumit', 'Babrru', 'Porcelan', 'Shkoze', 'Sauk', 'Astir'],
    'Durres': ['Plazh', 'Qender', 'Shkozet', 'Currila', 'Spitalle', 'Porto Romano', 'Arapaj', 'Keneta', 'Rrashbull'],
    'Vlore': ['Plazh', 'Qender', 'Skele', 'Uji i Ftohte', 'Radhime', 'Orikum', 'Narte', 'Zvernec', 'Shushice', 'Tragjas'],
    'Berat': ['22 Tetori', '28 Nentori', '30 Vjetori', '1 Korriku', 'Mangalem', 'NSHG', 'Celepias', 'Ish Pjeshkorja', 'Uznove'],
    'Sarande': ['Delvine', 'Konispol', 'Ksamil', 'Xarre', 'Livadhja', 'Markat', 'Shales', 'Gjashte', 'Aliko', 'Memoraq', 'Cerkovice', 'Borsh', 'Piqeras', 'Lukove', 'Finiq', 'Vergo', 'Stjar', 'Qender Sarande'],
  };
  qytetet.forEach(qytet => {
    if (!lagjet[qytet]) {
      lagjet[qytet] = ['Qender', 'Lagje 1', 'Lagje 2', 'Periferi'];
    }
  });

  const filtersConfig = {
    'Pune': [
      { label: 'Vendndodhja', name: 'qytetIZgjedhur', type: 'select', options: qytetet, value: qytetIZgjedhur, onChange: (e) => setQytetIZgjedhur(e.target.value) },
      { label: 'Paga minimale (€)', name: 'pagaMin', type: 'number', placeholder: 'Min', value: pagaMin, onChange: (e) => setPagaMin(e.target.value) },
      { label: 'Paga maksimale (€)', name: 'pagaMax', type: 'number', placeholder: 'Max', value: pagaMax, onChange: (e) => setPagaMax(e.target.value) },
      { label: 'Pozicioni', name: 'pozicioniPune', type: 'select', options: ['Ekonomist', 'IT', 'Programues', /* ... */ 'Te tjera'] },
      { label: 'Orari', name: 'orariPune', type: 'select', options: ['Kohe e plote', 'Kohe e pjesshme', 'Internship'] },
      { label: 'Eksperienca', name: 'eksperiencaPune', type: 'select', options: ['Pa eksperience', 'Eksperience <1 vit', 'Eksperience 1-3 vite', 'Eksperience +3 vite'] },
    ],
    'Makina': [
      { label: 'Vendndodhja', name: 'qytetIZgjedhur', type: 'select', options: qytetet, value: qytetIZgjedhur, onChange: (e) => setQytetIZgjedhur(e.target.value) },
      { label: 'Marka', name: 'markaMakine', type: 'select', options: ['Mercedes Benz', 'BMW', 'Audi', /* ... */ 'Te tjera'] },
      { label: 'Cmimi minimal (€)', name: 'cmimiMin', type: 'number', placeholder: 'Min', value: cmimiMin, onChange: (e) => setCmimiMin(e.target.value) },
      { label: 'Cmimi maksimal (€)', name: 'cmimiMax', type: 'number', placeholder: 'Max', value: cmimiMax, onChange: (e) => setCmimiMax(e.target.value) },
      { label: 'Viti i prodhimit (min)', name: 'vitiMin', type: 'range', min: 1980, max: new Date().getFullYear(), value: vitiMin, onChange: (e) => setVitiMin(e.target.value), display: vitiMin },
      { label: 'Viti i prodhimit (max)', name: 'vitiMax', type: 'range', min: 1980, max: new Date().getFullYear(), value: vitiMax, onChange: (e) => setVitiMax(e.target.value), display: vitiMax },
      { label: 'Kilometrazhi (min)', name: 'kmMin', type: 'range', min: 0, max: 500000, step: 5000, value: kmMin, onChange: (e) => setKmMin(e.target.value), display: `${Number(kmMin).toLocaleString()} KM` },
      { label: 'Kilometrazhi (max)', name: 'kmMax', type: 'range', min: 0, max: 500000, step: 5000, value: kmMax, onChange: (e) => setKmMax(e.target.value), display: `${Number(kmMax).toLocaleString()} KM` },
      { label: 'Karburanti', name: 'karburantiMakine', type: 'select', options: ['Nafte', 'Benzine', 'Gas', 'Benzine + Gas', 'Elektrike', 'Hibrid'] },
      { label: 'Kambio', name: 'kambioMakine', type: 'select', options: ['Automatik', 'Manual'] },
    ],
    'Shtepi': [
      { label: 'Vendndodhja', name: 'qytetIZgjedhur', type: 'select', options: qytetet, value: qytetIZgjedhur, onChange: (e) => setQytetIZgjedhur(e.target.value) },
      { label: 'Zona', name: 'zonaShtepi', type: 'select', options: qytetIZgjedhur && lagjet[qytetIZgjedhur] ? lagjet[qytetIZgjedhur] : ['Zgjidhni qytetin'], disabled: !qytetIZgjedhur },
      { label: 'Cmimi minimal (€)', name: 'cmimiMin', type: 'number', placeholder: 'Min', value: cmimiMin, onChange: (e) => setCmimiMin(e.target.value) },
      { label: 'Cmimi maksimal (€)', name: 'cmimiMax', type: 'number', placeholder: 'Max', value: cmimiMax, onChange: (e) => setCmimiMax(e.target.value) },
      { label: 'Tipi', name: 'tipiShtepi', type: 'select', options: ['Apartament', 'Vile', 'Garsoniere', /* ... */ 'Truall'], value: tipiIZgjedhur, onChange: (e) => setTipiIZgjedhur(e.target.value) },
      { label: 'Siperfaqja minimale (m²)', name: 'siperFaqjaMin', type: 'number', placeholder: 'Min', value: siperFaqjaMin, onChange: (e) => setSiperFaqjaMin(e.target.value) },
      { label: 'Siperfaqja maksimale (m²)', name: 'siperFaqjaMax', type: 'number', placeholder: 'Max', value: siperFaqjaMax, onChange: (e) => setSiperFaqjaMax(e.target.value) },
      { label: 'Tipologjia', name: 'tipologjiaShtepi', type: 'select', options: ['1+1', '2+1', '3+1', /* ... */ 'Tjeter'], disabled: tipiIZgjedhur === 'Garsoniere' || tipiIZgjedhur === 'Truall' },
    ],
    'Qira': [
      { label: 'Lloji i qirase', name: 'llojiQira', type: 'select', options: ['Shtepi/Apartament', 'Makine', 'Post Parkimi', 'Dyqan/Zyre', 'Lokal', 'Truall', 'Tjeter'], value: llojiQira, onChange: (e) => setLlojiQira(e.target.value) },
      { label: 'Vendndodhja', name: 'qytetIZgjedhur', type: 'select', options: qytetet, value: qytetIZgjedhur, onChange: (e) => setQytetIZgjedhur(e.target.value) },
      { label: 'Cmimi minimal (€)', name: 'cmimiMin', type: 'number', placeholder: 'Min', value: cmimiMin, onChange: (e) => setCmimiMin(e.target.value) },
      { label: 'Cmimi maksimal (€)', name: 'cmimiMax', type: 'number', placeholder: 'Max', value: cmimiMax, onChange: (e) => setCmimiMax(e.target.value) },
    ]
  };
  useEffect(() => {
    setQytetIZgjedhur('');
    setTipiIZgjedhur('');
    setLlojiQira('');
    setPagaMin(''); setPagaMax('');
    setCmimiMin(''); setCmimiMax('');
    setSiperFaqjaMin(''); setSiperFaqjaMax('');
    setVitiMin(1980); setVitiMax(new Date().getFullYear());
    setKmMin(0); setKmMax(500000);
  }, [category]);


  const activeFilterFields = filtersConfig[category] || [];
  const getFieldValue = (filterName) => {
    const stateMap = {
        qytetIZgjedhur, tipiIZgjedhur, llojiQira, pagaMin, pagaMax, cmimiMin, cmimiMax,
        siperFaqjaMin, siperFaqjaMax, vitiMin, vitiMax, kmMin, kmMax
    };
    return stateMap[filterName]; 
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const appliedFilters = {};
    
    if (qytetIZgjedhur) appliedFilters.qytetIZgjedhur = qytetIZgjedhur;
    if (pagaMin) appliedFilters.pagaMin = parseInt(pagaMin, 10);
    if (pagaMax) appliedFilters.pagaMax = parseInt(pagaMax, 10);
    if (cmimiMin) appliedFilters.cmimiMin = parseInt(cmimiMin, 10);
    if (cmimiMax) appliedFilters.cmimiMax = parseInt(cmimiMax, 10);
    if (siperFaqjaMin) appliedFilters.siperFaqjaMin = parseInt(siperFaqjaMin, 10);
    if (siperFaqjaMax) appliedFilters.siperFaqjaMax = parseInt(siperFaqjaMax, 10);
    
    if (category === 'Makina') {
        appliedFilters.vitiMin = parseInt(vitiMin, 10);
        appliedFilters.vitiMax = parseInt(vitiMax, 10);
        appliedFilters.kmMin = parseInt(kmMin, 10);
        appliedFilters.kmMax = parseInt(kmMax, 10);
    }

    activeFilterFields.forEach(filter => {
        if (filter.type === 'select' && !filter.onChange) { 
            const value = formData.get(filter.name);
            if (value) {
                appliedFilters[filter.name] = value;
            }
        }
    });
    if (category === 'Qira' && llojiQira) {
        appliedFilters.llojiQira = llojiQira;
    }
    if (category === 'Shtepi' && tipiIZgjedhur) {
        appliedFilters.tipiShtepi = tipiIZgjedhur;
    }


    console.log('Filtrat u aplikuan (nga FilterPanel)!', appliedFilters);
    
    if (onApplyFilters) {
      onApplyFilters(appliedFilters);
    } else {
      alert(`Filtrat (nga FilterPanel) u aplikuan me sukses!\nKategoria: ${category}\nFiltrat: ${JSON.stringify(appliedFilters, null, 2)}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Filtro sipas</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeFilterFields.map((filter, index) => (
          <div key={index} className="space-y-1">
            <label htmlFor={filter.name} className="block text-sm font-medium text-gray-700">{filter.label}</label>
            {filter.type === 'select' ? (
              <select 
                id={filter.name}
                name={filter.name} 
                className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={filter.onChange} 
                value={filter.value}       
                disabled={filter.disabled}
                defaultValue={!filter.onChange ? '' : undefined} 
              >
                <option value="">Zgjidh</option>
                {filter.options.map((opt, i) => (
                  <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
                    {typeof opt === 'object' ? opt.label : opt}
                  </option>
                ))}
              </select>
            ) : filter.type === 'range' ? (
              <div>
                <input 
                  type="range"
                  id={filter.name}
                  name={filter.name}
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
                id={filter.name}
                name={filter.name} 
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder={filter.placeholder || ''}
                onChange={filter.onChange} 
                value={filter.value}       
                min={filter.min}
                max={filter.max}
                defaultValue={!filter.onChange ? '' : undefined} 
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
