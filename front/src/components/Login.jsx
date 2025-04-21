import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utilities/API';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('login', userData);
      console.log(response.data);
      alert(response.data.message || 'Password reset link sent!');
    } catch (error) {
      console.log('Password reset failed:', error);
      alert('Password reset failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-lavender-300 to-blue-200">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-lavender rounded-2xl shadow-lg flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center text-soft-white">Login</h2>
        
        <input
          type="email"
          name="email"
          placeholder="Email"
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
          Login
        </button>

        <div className="flex-grow"></div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:text-blue-500 underline transition duration-200"
            >
              Forgot Password?
            </Link>
          </p>
        </div>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-300">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-500 underline transition duration-200"
            >
              Register Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
