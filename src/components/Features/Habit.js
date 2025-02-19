import React, { useState } from 'react';
import './Features.css';
import './Habit.css';
import { useNavigate } from 'react-router-dom';

function Habit() {
  const navigate = useNavigate();
  const [selectedHabit, setSelectedHabit] = useState(null);

  const habits = [
    {
      id: 1,
      title: "Morning Routine",
      summary: "Start your day right",
      details: {
        description: "Establish a consistent morning routine to set yourself up for success.",
        contents: [
          {
            title: "Wake Up Early",
            time: "6:00 AM",
            steps: [
              "Set alarm the night before",
              "Place alarm away from bed",
              "Avoid hitting snooze"
            ]
          },
          {
            title: "Hydration",
            time: "6:15 AM",
            steps: [
              "Drink a glass of water",
              "Add lemon for vitamin C",
              "Stay hydrated throughout the day"
            ]
          },
          {
            title: "Exercise",
            time: "6:30 AM",
            steps: [
              "Light stretching",
              "10-minute cardio",
              "Basic strength exercises"
            ]
          },
          {
            title: "Meditation",
            time: "7:00 AM",
            steps: [
              "Find a quiet space",
              "Set timer for 10 minutes",
              "Focus on breathing"
            ]
          }
        ],
        timeRequired: "30-60 minutes",
        difficulty: "Medium"
      }
    },
    {
      id: 2,
      title: "Exercise Tracking",
      summary: "Stay fit and healthy",
      details: {
        description: "Track your daily exercise and fitness goals.",
        contents: [
          {
            title: "Warm-up",
            time: "5:00 AM",
            steps: [
              "Light stretching",
              "10-minute cardio",
              "Basic strength exercises"
            ]
          },
          {
            title: "Main Workout",
            time: "6:00 AM",
            steps: [
              "Strength training",
              "Endurance training",
              "Cool down"
            ]
          },
          {
            title: "Post-workout",
            time: "7:00 AM",
            steps: [
              "Stretch",
              "Hydration",
              "Recovery"
            ]
          }
        ],
        timeRequired: "15-45 minutes",
        difficulty: "Variable"
      }
    },
    {
      id: 3,
      title: "Reading Goals",
      summary: "Expand your knowledge",
      details: {
        description: "Set and track your reading goals for continuous learning.",
        contents: [
          {
            title: "Choose a Book",
            time: "10:00 AM",
            steps: [
              "Select a topic",
              "Research",
              "Make a decision"
            ]
          },
          {
            title: "Reading",
            time: "10:30 AM",
            steps: [
              "Set timer for 30 minutes",
              "Focus on understanding",
              "Take notes"
            ]
          },
          {
            title: "Reflection",
            time: "11:00 AM",
            steps: [
              "Reflect on the content",
              "Write down thoughts",
              "Plan next steps"
            ]
          }
        ],
        timeRequired: "20-30 minutes",
        difficulty: "Easy"
      }
    }
  ];

  const handleEdit = () => {
    navigate(`/habits/edit/${selectedHabit.id}`);
  };

  return (
    <div className="habit-container">
      <div className="habit-list">
        <h3>Habit List</h3>
        <div className="habit-items">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`habit-item ${selectedHabit?.id === habit.id ? 'selected' : ''}`}
              onClick={() => setSelectedHabit(habit)}
            >
              <h4>{habit.title}</h4>
              <p>{habit.summary}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="habit-details">
        {selectedHabit ? (
          <div className="habit-detail-content">
            <div className="habit-detail-header">
              <div className="header-content">
                <h3>{selectedHabit.title}</h3>
                <p className="description">{selectedHabit.details.description}</p>
              </div>
              <button 
                className="edit-button"
                onClick={handleEdit}
              >
                <span className="edit-icon">✎</span>
                Edit
              </button>
            </div>
            
            <div className="content-list">
              {selectedHabit.details.contents.map((content, index) => (
                <div key={index} className="content-item">
                  <div className="content-header">
                    <div className="content-title">
                      <h4>{content.title}</h4>
                      <span className="time-badge">{content.time}</span>
                    </div>
                  </div>
                  <div className="content-steps">
                    {content.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="step-item">
                        <span className="step-number">{stepIndex + 1}</span>
                        <span className="step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="habit-footer">
              <div className="footer-item">
                <span className="label">Time Required:</span>
                <span className="value">{selectedHabit.details.timeRequired}</span>
              </div>
              <div className="footer-item">
                <span className="label">Difficulty:</span>
                <span className="value">{selectedHabit.details.difficulty}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-selection">
            <p>Select a habit to see details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Habit;