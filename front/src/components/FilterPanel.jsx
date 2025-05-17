import React from 'react';

export default function FilterPanel({ category }) {
  const filters = {
    'Makina': [
      { label: 'Lloji i makines', options: ['Mercedes', 'BMW', 'Audi', 'Volkswagen'] },
      { label: 'Cmimi maksimal (€)', type: 'number' },
      { label: 'Vendndodhja', type: 'text' },
    ],
    'Apartamente': [
      { label: 'Numri i dhomave', options: ['1+1', '2+1', '3+1'] },
      { label: 'Cmimi maksimal (€)', type: 'number' },
      { label: 'Vendndodhja', type: 'text' },
    ],
    'Qira': [
      { label: 'Tipi i prones', options: ['Shtepi', 'Apartament', 'Garsoniere'] },
      { label: 'Cmimi maksimal (€)', type: 'number' },
      { label: 'Vendndodhja', type: 'text' },
    ],
    'Pune': [
      { label: 'Pozicioni', type: 'text' },
      { label: 'Paga minimale (€)', type: 'number' },
      { label: 'Vendndodhja', type: 'text' },
    ]
  };

  const activeFilters = filters[category] || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filtro sipas</h2>
      <form className="space-y-4">
        {activeFilters.map((filter, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{filter.label}</label>
            {filter.options ? (
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option value="">Zgjidh</option>
                {filter.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input type={filter.type || 'text'} className="w-full border border-gray-300 rounded-md p-2" />
            )}
          </div>
        ))}
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4">Apliko Filtrat</button>
      </form>
    </div>
  );
}