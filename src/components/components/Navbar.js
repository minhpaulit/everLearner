import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate('/')}>EverLearner</div>
      <div className="nav-links">
        <a onClick={handleLogin} style={{ cursor: 'pointer' }}>Login</a>
      </div>
    </nav>
  );
}

export default Navbar;
