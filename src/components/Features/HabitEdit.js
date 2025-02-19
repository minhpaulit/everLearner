import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HabitEdit.css';

function HabitEdit() {
  const navigate = useNavigate();
  const [habitData, setHabitData] = useState({
    title: '',
    description: '',
    content: ''
  });
  const [generatedCards, setGeneratedCards] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHabitData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = () => {
    // Example generated cards - replace with your actual generation logic
    const newCards = [
      {
        title: '1st Card',
        time: '18/02/2025 - 6:00 AM',
        steps: ['Wake up', 'Drink water', 'Exercise'],
        content: "Lorem ipsum dolor sit amet \n Praesent quis rhoncus felis, ut tempor elit. Ut id fermentum sapien. Donec aliquet nunc metus, at dignissim neque rutrum et. Donec aliquam metus nunc, ac ultricies massa ultricies id."
      },
      {
        title: '2nd Card',
        time: '19/02/2025 - 6:00 PM',
        content: "Cras fringilla velit neque \n in facilisis magna tristique eu. Integer molestie vel tortor eu mattis. Nullam ut ipsum sodales, porttitor mi non, condimentum metus. Nunc porta semper mollis. Nulla quis urna quis mauris tristique faucibus. Vivamus eleifend nisi neque, fermentum blandit libero interdum in. Duis enim quam, gravida vel convallis nec, egestas sit amet felis. Aliquam erat volutpat. Nulla facilisis imperdiet ex, nec porttitor mauris vehicula vel."
      }
    ];
    setGeneratedCards(newCards);
  };

  return (
    <div className="habit-edit-page">
      <Navbar />
      
      <div className="habit-edit-container">
        <div className="edit-section">
          <h2>Edit Habit</h2>
          
          <div className="form-group">
            <label htmlFor="title">Habit Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={habitData.title}
              onChange={handleInputChange}
              placeholder="Enter habit name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Short Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={habitData.description}
              onChange={handleInputChange}
              placeholder="Enter a brief description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={habitData.content}
              onChange={handleInputChange}
              placeholder="Enter full content"
              rows="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="separator">Separator</label>
            <input
              type="text"
              id="separator"
              name="separator"
              value={habitData.separator || "----"}
              onChange={handleInputChange}
              placeholder="Enter a seperate pattern"
            />
          </div>

          <div className="button-container">
            <button className="danger-button" onClick={() => navigate('/')}>
                Cancel
            </button>
            <button className="info-button" onClick={handleGenerate}>
                Preview
            </button>
            <button className="success-button" onClick={handleGenerate}>
                Save
            </button>
          </div>
        </div>

        <div className="preview-section">
          <h3>Generated Cards</h3>
          <div className="cards-container">
            {generatedCards.map((card, index) => (
              <div key={index} className="preview-card">
                <div className="card-header">
                  <h4>{card.title}</h4>
                  <span className="time-badge">{card.time}</span>
                </div>
                <div className="card-content">
                    <p style={{ whiteSpace: 'pre-line' }}>{card.content}</p>
                </div>
              </div>
            ))}
            {generatedCards.length === 0 && (
              <p className="no-cards">No cards generated yet. Click "Generate" to create cards.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitEdit;
