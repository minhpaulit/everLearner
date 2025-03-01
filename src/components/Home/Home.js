import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Connection from '../Features/Connection';
import Navbar from '../components/Navbar';
import Habit from '../Features/Habit';

import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const features = {
    connection: {
      title: "Connection",
      summary: "Simple and intuitive interface",
      component: Connection
    },
    habit: {
      title: "Habit",
      summary: "Optimized for performance",
      component: Habit
    }
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        setUser(userData);
      }
    };

    checkLoginStatus();

  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.setItem('isLoggedIn', 'false');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="home-container">
      <Navbar user={user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="hero-section">
        <h1>Welcome to MiniMind</h1>
        <p className="hero-text">Your Daily Dose of Knowledge!</p>
      </main>

      {isLoggedIn && (
        <section className="features-section">
          <h2>Features</h2>
          <div className="features-grid">
            {Object.entries(features).map(([key, feature]) => (
              <a 
                href={`#${key}`}
                key={key}
                className={`feature-card ${selectedFeature === key ? 'selected' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedFeature(key);
                }}
              >
                <h3>{feature.title}</h3>
                <p>{feature.summary}</p>
              </a>
            ))}
          </div>
          
          {selectedFeature && (
            <div className="feature-details-container">
              {React.createElement(features[selectedFeature].component)}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Home;
