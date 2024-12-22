import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API calls
import './RegistrationPage.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload with dummy values for other fields
    const payload = {
      ...formData,
      name: 'Subham', // Dummy name
      gender: 'male', // Dummy gender
      contactNumber: '1234567893', // Dummy contact number
      address: '125 Dummy Street, City', // Dummy address
      profilePicture: '', // No profile picture for now
      role: 'ROLE_USER', // Default role as 'user'
    };

    try {
      const response = await axios.post('http://localhost:8080/api/authenticate/register', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccess('Registration successful!');
      setError('');
      console.log('User registered:', response.data);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
      console.error('Error during registration:', err);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-card">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
