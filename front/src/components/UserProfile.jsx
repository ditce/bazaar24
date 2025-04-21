import React from 'react';

const UserProfile = () => {
  const userData = { name: 'Test', role: 'Admin' }; 

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Role: {userData.role}</p>
    </div>
  );
};

export default UserProfile;