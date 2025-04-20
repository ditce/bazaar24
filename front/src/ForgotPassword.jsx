import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/forgot-password', { email });
    alert('Password recovery email sent!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input type="email" onChange={handleChange} placeholder="Email" required />
      <button type="submit">Recover Password</button>
    </form>
  );
};

export default ForgotPassword;