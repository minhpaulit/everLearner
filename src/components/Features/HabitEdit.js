import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ConnectionConfig.css';
import { useConnection } from '../../context/ConnectionContext';

function HabitEdit() {
  const { connection } = useConnection();
  const navigate = useNavigate();
  const { id } = useParams();
  const [habitData, setHabitData] = useState({
    id: '',
    name: '',
    description: '',
    full_text: '',
    contents: [],
    completed_contents: [],
    separator: '\n',
    created_at: '',
    updated_at: '',
    user_id: '',
    connection_id: '',
    num_sent: 0,
    Frequency: ''
  });

  useEffect(() => {
    const fetchHabitData = async () => {
      if (id) {
        const response = await fetch(`http://127.0.0.1:5000/api/habits/${id}`);
        const data = await response.json();
        setHabitData(data);
      }
    };

    fetchHabitData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHabitData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your habit update logic here
    console.log('Habit data:', habitData);
    navigate('/#habits');
  };

  return (
    <div className="connection-config-page">
      <Navbar />
      
      <div className="connection-config-container">
        <button 
          className="back-button"
          onClick={() => navigate('/#habits')}
        >
          <span className="back-icon">←</span>
          Back to Habits
        </button>

        <div className="form-preview-container">
          <div className="config-section">
            <h2>{id ? 'Edit Habit' : 'Add New Habit'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Habit Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={habitData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekly Tips"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={habitData.description}
                  onChange={handleInputChange}
                  placeholder="Description of the habit"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="full_text">Full Text</label>
                <textarea
                  id="full_text"
                  name="full_text"
                  value={habitData.full_text}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the habit"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="Frequency">Frequency</label>
                <input
                  type="text"
                  id="Frequency"
                  name="Frequency"
                  value={habitData.Frequency}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekly"
                  required
                />
              </div>

              <div className="button-container">
                <button 
                  type="button" 
                  className="danger-button"
                  onClick={() => navigate('/#habits')}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="success-button"
                >
                  {id ? 'Update Habit' : 'Add Habit'}
                </button>
              </div>
            </form>
          </div>

          <div className="preview-section">
            <h3>Preview</h3>
            <div className="connection-preview">
              <h4>{habitData.name || 'Habit Name'}</h4>
              <p>{habitData.description || 'Description'}</p>
              <p>Frequency: {habitData.Frequency || 'N/A'}</p>
              <p>Created on: {habitData.created_at ? new Date(habitData.created_at).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitEdit;
