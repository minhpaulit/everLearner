import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', email, password);

    // Call the API to verify user credentials
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      console.log('User information:', userData);

      // Check if the login was successful
      if (userData.id) {
        // Store user data in session storage
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('isLoggedIn', 'true'); // Set login status
        navigate('/'); // Redirect to Home
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            marginTop: '1rem',
            backgroundColor: 'transparent',
            color: '#0066cc',
            border: 'none'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;
