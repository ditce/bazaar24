import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user-profile');
        setUserData(response.data);
      } catch (error) {
        console.log('Failed to fetch user data:', error);
        alert('Failed to fetch user data. Please try again.');
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-lavender rounded-2xl shadow-lg flex flex-col gap-4">
      {userData ? (
        <>
          <h2 className="text-3xl font-bold text-center text-soft-white">User Profile</h2>
          <div className="flex flex-col items-center">
            <p className="text-lg text-soft-white">Username: {userData.username}</p>
            <p className="text-lg text-soft-white">Email: {userData.email}</p>
            {}
          </div>
        </>
      ) : (
        <p className="text-center text-soft-white">Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
