import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-b from-purple-300 to-blue-200 rounded-2xl shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">Create a New Account</h2>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
        className="p-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400"
      />

      <input
        type="text"
        name="surname"
        placeholder="Surname"
        onChange={handleChange}
        required
        className="p-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400"
      />

      {/* Date of Birth */}
      <div className="flex gap-4">
        <select
          name="day"
          onChange={handleChange}
          required
          className="flex-1 p-3 text-lg rounded-lg border border-gray-300"
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <select
          name="month"
          onChange={handleChange}
          required
          className="flex-1 p-3 text-lg rounded-lg border border-gray-300"
        >
          <option value="">Month</option>
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, idx) => (
            <option key={idx} value={m}>{m}</option>
          ))}
        </select>
        <select
          name="year"
          onChange={handleChange}
          required
          className="flex-1 p-3 text-lg rounded-lg border border-gray-300"
        >
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => 2025 - i).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="inline-flex flex-row flex-nowrap items-center space-x-4">
        <span className="font-medium whitespace-nowrap">Gender:</span>
        <label className="inline-flex items-center whitespace-nowrap">
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            required
            style={{ width: 'auto', height: 'auto' }}
          />
          <span className="ml-1">Male</span>
        </label>
        <label className="inline-flex items-center whitespace-nowrap">
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            required
            style={{ width: 'auto', height: 'auto' }}
          />
          <span className="ml-1">Female</span>
        </label>
      </div>

      {/* Phone */}
      <input
        type="text"
        name="phone"
        placeholder="Mobile Number"
        onInput={e => (e.target.value = e.target.value.replace(/[^0-9+]/g, ''))}
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
        className="p-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
        className="p-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400"
      />

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Register
      </button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
      </div>
    </form>
  );
};

export default Registration;
