import React, { useState, useEffect } from 'react';
import './Features.css';
import { useNavigate } from 'react-router-dom';
import { useConnection } from '../../context/ConnectionContext';

function Connection() {
  const navigate = useNavigate();
  const { setConnectionData, setConnectionWithHabitData } = useConnection();
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData?.id) throw new Error('User not found');

        const response = await fetch(`http://127.0.0.1:5000/api/users/${userData.id}/connections`);
        if (!response.ok) throw new Error('Failed to fetch connections');

        const data = await response.json();
        setConnections(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleConnectionClick = (connection) => {
    setConnectionData(selectedConnection);
    setConnectionWithHabitData(null)
    navigate('/connections/config');
  };

  if (loading) {
    return <div className="loading">Loading connections...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="material-container">
      <div className="material-list">
        <h3>Connections</h3>
        <div className="material-items">
          {connections.map((connection) => (
            <div
              key={connection.id}
              className={`material-item ${selectedConnection?.id === connection.id ? 'selected' : ''}`}
              onClick={() => setSelectedConnection(connection)}
            >
              <div className="connection-header">
                <img src={connection.icon} alt={connection.name} className="connection-icon" />
                <h4>{connection.name}</h4>
              </div>
              <p className={`connection-status ${connection.status.toLowerCase()}`}>
                {connection.status}
              </p>
            </div>
          ))}
          
          <div
            className="material-item add-connection"
            onClick={() => handleConnectionClick()}
          >
            <div className="connection-header">
              <div className="add-icon">+</div>
              <h4>Add Connection</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="material-details">
        {selectedConnection ? (
          <div className="material-detail-content">
            <div className="material-detail-header">
              <div className="header-content">
                <div className="connection-title">
                  <img src={selectedConnection.icon} alt={selectedConnection.name} className="connection-icon-large" />
                  <h3>{selectedConnection.name}</h3>
                </div>
                <p className="description">{selectedConnection.description}</p>
              </div>
              <button 
                className="edit-button"
                onClick={() => handleConnectionClick(selectedConnection)}
              >
                Config
              </button>
            </div>
            
            <div className="connection-info">
              <div className="info-item">
                <span className="label">Status:</span>
                <span className={`value ${selectedConnection.status.toLowerCase()}`}>{selectedConnection.status}</span>
              </div>
              {selectedConnection.status === "Connected" && (
                <>
                  <div className="info-item">
                    <span className="label">Connected Account:</span>
                    <span className="value">{selectedConnection.user}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">URL:</span>
                    <a href={selectedConnection.url} target="_blank" rel="noopener noreferrer" className="value">
                      {selectedConnection.url}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="no-selection">
            <p>Select a connection to see details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connection;
