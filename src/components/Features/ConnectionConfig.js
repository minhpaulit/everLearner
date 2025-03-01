import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ConnectionConfig.css';
import { useConnection } from '../../context/ConnectionContext'; // Import the context

function ConnectionConfig() {
  const navigate = useNavigate();
  const { connectionData, setConnectionData } = useConnection(); // Get the connection from context



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConnectionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your connection logic here
    console.log('Connection data:', connectionData);
    navigate('/#connection');
  };

  return (
    <div className="connection-config-page">
      <Navbar />
      
      <div className="connection-config-container">
          <button 
            className="back-button"
            onClick={() => navigate('/#connection')}
          >
            <span className="back-icon">←</span>
            Back to Connections
          </button>

        <div className="form-preview-container">
          <div className="config-section">
            <h2>{connectionData ? `Edit Connection - ${connectionData.name}` : 'Add New Connection'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Connection Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={connectionData ? connectionData.name : ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Gmail, Slack"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="url">Service URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={connectionData ? connectionData.url : ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="token">Token</label>
                <input
                  id="token"
                  name="token"
                  value={connectionData ? connectionData.token : ''}
                  onChange={handleInputChange}
                  placeholder="Enter your token here"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon">Icon URL</label>
                <input
                  type="url"
                  id="icon"
                  name="icon"
                  value={connectionData ? connectionData.icon : ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/favicon.ico"
                  required
                />
              </div>

              <div className="button-container">
                <button 
                  type="button" 
                  className="danger-button"
                  onClick={() => navigate('/#connection')}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="success-button"
                >
                  {connectionData ? `Update Connection` : 'Add Connection'}
                </button>
              </div>
            </form>
          </div>

          <div className="preview-section">
            <h3>Preview</h3>
            <div className="connection-preview">
            {connectionData && (
              <>
              <div className="preview-card">
                <div className="connection-header">
                  
                    <img 
                      src={connectionData.icon} 
                      alt={connectionData.name} 
                      className="connection-icon" 
                    />
                  
                  <h4>{connectionData.name || 'Connection Name'}</h4>
                </div>
                <p className={`connection-status ${connectionData.status.toLowerCase()}`} style={{ margin: '10px 0' }}>
                  {connectionData.status}
                </p>
                <p className="connection-update-date">
                  Updated on: {connectionData.updated_at ? `${new Date(connectionData.updated_at).toLocaleDateString()} at ${new Date(connectionData.updated_at).toLocaleTimeString()}` : 'N/A'}
                </p>
              </div>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionConfig;
