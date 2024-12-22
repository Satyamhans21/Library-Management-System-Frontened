import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar'; // Adjust path based on your structure
import './AuthenticatedLayout.css';

const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="authenticated-layout">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default AuthenticatedLayout;
