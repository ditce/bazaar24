import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', credentials);
      console.log(response.data);
      alert(response.data.message || 'Login successful!');
      if (response.data.success) navigate('/profile');
    } catch (error) {
      console.log('Login error:', error);
      alert('Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center text-violet">Login</h2>
      <input
        type="text" name="username" placeholder="Username" onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2" required
      />
      <input
        type="password" name="password" placeholder="Password" onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2" required
      />
      <button
        type="submit"
        className="bg-turquoise text-white font-semibold py-2 rounded-lg hover:bg-violet transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;