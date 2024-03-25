import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        {/* Add other navigation links */}
      </ul>
    </nav>
  );
};

export default Navbar;
