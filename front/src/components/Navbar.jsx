import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-md sticky top-0 z-20 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">Bazaar24</Link>
        <div className="space-x-4">
          <Link to="/login" className="font-medium text-gray-700 hover:text-indigo-600">Login</Link>
          <Link to="/register" className="font-medium text-gray-700 hover:text-indigo-600">Register</Link>
        </div>
      </div>
    </nav>
  );
}