// utils/authUtils.js

// Check if the user is authenticated
export const isAuthenticated = () => !!localStorage.getItem('authToken');

// Get the user role from localStorage
export const getUserRole = () => localStorage.getItem('userRole');

// Check if the user is an admin
export const isAdmin = () => getUserRole() === 'admin';

// Check if the user is a regular user
export const isUser = () => getUserRole() === 'user';
