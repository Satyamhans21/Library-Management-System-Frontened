import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { isAdmin, isUser } from '../../utils/authUtils'; // Import utility functions

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.clear(); // Clear localStorage
      navigate('/login'); // Redirect to login
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">LMS</h2>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <Link to="/home" className="menu-link">Home</Link>
        </li>
        {isAdmin() && ( // Show admin-specific links
          <>
            <li className="menu-item">
              <Link to="/add-book" className="menu-link">Add Book</Link>
            </li>
            <li className="menu-item">
              <Link to="/add-catalog" className="menu-link">Add Catalog</Link>
            </li>
          </>
        )}
        {isUser() && ( // Show user-specific links
          <>
            <li className="menu-item">
              <Link to="/profile" className="menu-link">Profile</Link>
            </li>
            <li className="menu-item">
              <Link to="/issue-book" className="menu-link">Issue Book</Link>
            </li>
            <li className="menu-item">
              <Link to="/return-book" className="menu-link">Return Book</Link>
            </li>
          </>
        )}
      </ul>
      <div className="menu-footer">
        <button onClick={handleLogout} className="menu-link menu-item">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
