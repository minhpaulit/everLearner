import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate('/')}>MiniMind</div>
      <div className="nav-links">
        {isLoggedIn ? (
            <div className="user-dropdown" onClick={toggleDropdown}>
              <span className="user-name">{user.name}</span>
              <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} dropdown-styled`}>
                <button className="dropdown-button" onClick={() => navigate('/profile')}>View Profile</button>
                <button className="dropdown-button" onClick={onLogout}>Logout</button>
              </div>
            </div>
        ) : (
          <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
