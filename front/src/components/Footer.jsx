import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-gray-100 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Bazaar24. All rights reserved.</p>
      </div>
    </footer>
  );
}