import React from 'react';
import './Sidebar.css'; // Custom CSS for sidebar styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <button>Profile</button>
      <button>Issue a Book</button>
      <button>Return Book</button>
      <button>Logout</button>
    </div>
  );
};

export default Sidebar;
