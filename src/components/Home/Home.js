import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EasyToUse from '../Features/EasyToUse';
import Habit from '../Features/Habit';
import Fast from '../Features/Fast';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = {
    easy: {
      title: "Easy to Use",
      summary: "Simple and intuitive interface",
      component: EasyToUse
    },
    secure: {
      title: "Habit",
      summary: "Built with security in mind",
      component: Habit
    },
    fast: {
      title: "Fast",
      summary: "Optimized for performance",
      component: Fast
    }
  };

  const handleFeatureClick = (featureKey) => {
    setSelectedFeature(selectedFeature === featureKey ? null : featureKey);
  };

  return (
    <div className="home-container">
      <Navbar />
      
      <main className="hero-section">
        <h1>Welcome to EverLearner</h1>
        <p className="hero-text">Your Daily Dose of Knowledge!</p>
      </main>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          {Object.entries(features).map(([key, feature]) => (
            <div 
              key={key}
              className={`feature-card ${selectedFeature === key ? 'selected' : ''}`}
              onClick={() => handleFeatureClick(key)}
            >
              <h3>{feature.title}</h3>
              <p>{feature.summary}</p>
            </div>
          ))}
        </div>
        
        {selectedFeature && (
          <div className="feature-details-container">
            {React.createElement(features[selectedFeature].component)}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
