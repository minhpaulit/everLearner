import React, { useState, useEffect } from 'react';
import './Features.css';
import { useNavigate } from 'react-router-dom';
import { useConnection } from '../../context/ConnectionContext';

function Habit() {
  const navigate = useNavigate();
  const { setConnectionData, setConnectionWithHabitData } = useConnection();
  const [ selectedHabit, setSelectedHabit] = useState(null);
  const [ habits, setHabits] = useState([])
  const [ loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData?.id) {
          throw new Error('User not found');
        }

        const [habitsResponse, connectionsResponse] = await Promise.all([
          fetch(`http://127.0.0.1:5000/api/users/${userData.id}/habits`),
          fetch(`http://127.0.0.1:5000/api/users/${userData.id}/connections`)
        ]);

        if (!habitsResponse.ok || !connectionsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [habitsJson, connectionsJson] = await Promise.all([
          habitsResponse.json(),
          connectionsResponse.json()
        ]);

        // Create a map of connections with their habits
        const habits = habitsJson.map(habit => ({
          ...habit,
          connection: connectionsJson.filter(connection => connection.id === habit.connection_id),
        }));
        console.log(habits)
        setHabits(habits);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateHabit = () => {
    setConnectionData(null)
    setConnectionWithHabitData(selectedHabit)
    navigate(`/habit/edit`)
  };

  const toggleHabitStatus = async (habitId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/habits/${habitId}/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to toggle habit status');
      }

      // // Update local state
      // setConnectionsWithHabits(prevConnections => 
      //   prevConnections.map(connection => ({
      //     ...connection,
      //     habits: connection.habits.map(habit =>
      //       habit.id === habitId ? { ...habit, isRunning: !habit.isRunning } : habit
      //     )
      //   }))
      // );
    } catch (err) {
      console.error('Error toggling habit status:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading habits...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="material-container">
      <div className="material-list">
        <h3>Habits</h3>
        <div className="material-items">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`material-item ${selectedHabit?.id === habit.id ? 'selected' : ''}`}
              onClick={() => setSelectedHabit(habit)}
            >
              <div className="connection-header">
              <img src={habit.connection.icon} alt={habit.connection.name} className="connection-icon" />
                <h4>{habit.connection.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="material-details">
        {selectedHabit ? (
          <div className="material-detail-content">
            <div className="material-detail-header">
              <div className="header-content">
                <div className="connection-title">
                  <h3>{selectedHabit.name} Habits</h3>
                </div>
              </div>
              <button 
                className="edit-button"
                onClick={handleCreateHabit}
              >
                <span className="edit-icon">✎</span>
                Edit Habit
              </button>
            </div>
            
            <div className="habits-list">
                <div key={selectedHabit.id} className="habit-item">
                  <div className="habit-header">
                    <h4>{selectedHabit.name || 'Unnamed Habit'}</h4>
                    <div className="habit-controls">
                      <span className={`value ${selectedHabit.isRunning ? 'active' : 'inactive'}`}>
                        {selectedHabit.isRunning ? 'Active' : 'Inactive'}
                      </span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={selectedHabit.isRunning}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleHabitStatus(selectedHabit.id);
                          }}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  <div className="habit-details">
                    <div className="detail-item">
                      <span className="label">Description:</span>
                      <span className="value">{selectedHabit.description}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Frequency:</span>
                      <span className="value">{selectedHabit.Frequency}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Sent:</span>
                      <span className="value">{selectedHabit.num_sent}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Started:</span>
                      <span className="value">{new Date(selectedHabit.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

            </div>
          </div>
        ) : (
          <div className="no-selection">
            <p>Select a connection to view associated habits</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Habit;
