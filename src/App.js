import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import react-router-dom
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/Profile';
import IssueBookPage from './components/IssueBookPage';

function App() {
  // Check if the user is authenticated by checking the token in localStorage
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // If token exists in localStorage, return true
  };

  return (
    <Router>
      <Routes>
        {/* Default route: Redirect to login if not authenticated */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login page route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Home page route, only accessible if authenticated */}
        <Route 
          path="/home" 
          element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" replace />} 
        />
        
        {/* Profile page route, only accessible if authenticated */}
        <Route 
          path="/profile" 
          element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" replace />} 
        />
         <Route path="/issue-book" element={<IssueBookPage />} /> {/* Issue Book Page */}
      </Routes>
    </Router>
  );
}

export default App;
