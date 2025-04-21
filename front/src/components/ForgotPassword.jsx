import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utilities/API';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/api/forgot-password', { email });
      console.log(response.data);
      alert(response.data.message || 'Password reset link sent!');
    } catch (error) {
      console.log('Password reset failed:', error);
      alert('Password reset failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-6 bg-lavender rounded-2xl shadow-lg flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center text-soft-white">Forgot Password</h2>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
        required
        className="border border-light-grey rounded-lg p-2 focus:ring-2 focus:ring-blue-light"
      />
      <button
        type="submit"
        className="bg-blue-light text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Reset Password
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-300">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500 underline transition duration-200"
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPassword;
