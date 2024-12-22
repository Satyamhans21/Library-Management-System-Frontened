import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/Profile';
import IssueBookPage from './components/IssueBookPage/IssueBookPage';
import AddBookPage from './components/AddBookPage/AddBookPage';
import AddCatalogPage from './components/AddCatalogPage/AddCatalogPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import UnauthenticatedLayout from './layouts/UnauthenticatedLayout';
import { isAuthenticated, isAdmin, isUser } from './utils/authUtils';
import ReturnBookPage from './components/ReturnBookPage/ReturnBookPage';
import UpdateBookPage from './components/UpdateBookPage/UpdateBookPage';
import DeleteBookPage from './components/DeleteBookPage/DeleteBookPage';
import AddCategoryPage from './components/AddCategoryPage/AddCategoryPage';
import ListCategoriesPage from './components/ListCategoriesPage/ListCategoriesPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        {isAuthenticated() && isAdmin() && (
          <>
            <Route
              path="/home"
              element={
                <AuthenticatedLayout>
                  <HomePage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/add-book"
              element={
                <AuthenticatedLayout>
                  <AddBookPage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/update-book"
              element={
                <AuthenticatedLayout>
                  <UpdateBookPage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/delete-book"
              element={
                <AuthenticatedLayout>
                  <DeleteBookPage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/add-catalog"
              element={
                <AuthenticatedLayout>
                  <AddCatalogPage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/add-category"
              element={
                <AuthenticatedLayout>
                  <AddCategoryPage />
                </AuthenticatedLayout>
              }
            />
          </>
        )}

        {/* User Routes */}
        {isAuthenticated() && isUser() && (
          <>
            <Route
              path="/home"
              element={
                <AuthenticatedLayout>
                  <HomePage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthenticatedLayout>
                  <ProfilePage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/issue-book"
              element={
                <AuthenticatedLayout>
                  <IssueBookPage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/return-book"
              element={
                <AuthenticatedLayout>
                  <ReturnBookPage />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/list-categories"
              element={
                <AuthenticatedLayout>
                  <ListCategoriesPage />
                </AuthenticatedLayout>
              }
            />
          </>
        )}

        {/* Unauthenticated Routes */}
        <Route
          path="/login"
          element={
            <UnauthenticatedLayout>
              <LoginPage />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthenticatedLayout>
              <RegistrationPage />
            </UnauthenticatedLayout>
          }
        />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Fallback for unauthorized access */}
        {/* <Route path="*" element={<Navigate to={isAuthenticated() ? '/home' : '/login'} replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
