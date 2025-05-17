import React from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from './FilterPanel';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="flex min-h-screen">
      <aside className="w-full sm:w-64 p-4 bg-white shadow-md">
        {category && <FilterPanel category={category} />}
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Rezultatet per: {category || 'Te gjitha'}</h1>
        {/* Rezultatet qe shfaqen*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Vendosja e listimeve */}
        </div>
      </main>
    </div>
  );
}