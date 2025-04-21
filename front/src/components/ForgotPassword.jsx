import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      console.log(response.data);
      alert(response.data.message || 'Recovery email sent!');
    } catch (error) {
      console.log('Recovery error:', error);
      alert('Could not send recovery email. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center text-violet-500">Forgot Password</h2>
      <input 
        type="email" 
        value={email}
        onChange={handleChange}
        placeholder="Email" 
        required
        className="border p-2 rounded-md"
      />
      <button 
        type="submit"
        className="bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition"
      >
        Recover Password
      </button>
    </form>
  );
};

export default ForgotPassword;
