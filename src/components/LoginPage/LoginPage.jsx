import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To navigate after login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
  
    try {
      const response = await axios.post('http://localhost:8080/api/authenticate/login', {
        username,
        password,
      });
  
      const { accessToken, userDto, adminDto } = response.data;
  
      // Save token and role information in localStorage
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('userRole', adminDto ? 'admin' : 'user');
      localStorage.setItem('userData', JSON.stringify(adminDto || userDto)); // Save user data for later use
  
      // Redirect to home page after successful login
      navigate('/home');
    } catch (err) {
      setError('Invalid credentials. Please try again.'); // Show error message
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
