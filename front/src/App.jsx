import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import SearchResults from './components/SearchResults.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gradient-light text-soft-white">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
