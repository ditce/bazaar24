import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', userData);
      console.log(response.data);
      alert(response.data.message || 'Registration successful!');
    } catch (error) {
      console.log('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center text-violet">Register</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-lg p-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-lg p-2"
      />
      <button
        type="submit"
        className="bg-turquoise text-white font-semibold py-2 rounded-lg hover:bg-violet transition"
      >
        Register
      </button>
    </form>
  );
};

export default Registration;