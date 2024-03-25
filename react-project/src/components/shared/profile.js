import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user details from local storage or cookies
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user && (
        <div className="user-details">
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Display other user details as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;
