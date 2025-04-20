import React from 'react';

const UserProfile = () => {
  // Fetch user data and role (would typically come from a server)
  const userData = { name: 'John Doe', role: 'Admin' }; 

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Role: {userData.role}</p>
    </div>
  );
};

export default UserProfile;