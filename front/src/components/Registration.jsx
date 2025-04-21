import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utilities/API';

const Registration = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const nav = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('register', userData);
      console.log(response.data);
      nav('/profile');
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-6 bg-lavender rounded-2xl shadow-lg flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center text-soft-white">Register</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="border border-light-grey rounded-lg p-2 focus:ring-2 focus:ring-blue-light"
      />
      <input
        type="full_name"
        name="full_name"
        placeholder="Full name"
        onChange={handleChange}
        required
        className="border border-light-grey rounded-lg p-2 focus:ring-2 focus:ring-blue-light"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="border border-light-grey rounded-lg p-2 focus:ring-2 focus:ring-blue-light"
      />
      <button
        type="submit"
        className="bg-blue-light text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Register
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-300">
          Keni llogari?{' '}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500 underline transition duration-200"
          >
            Kyçuni këtu
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Registration;
