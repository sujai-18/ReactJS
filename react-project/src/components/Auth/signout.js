import React from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('user');
      navigate('/login'); // Redirect to login page after signout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button 
        onClick={handleSignout} 
        style={{ 
            padding: '8px 12px', 
            backgroundColor: '#FF4500', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '3px', 
            cursor: 'pointer' 
        }}
        >
        Sign Out
    </button>

  );
};

export default Signout;