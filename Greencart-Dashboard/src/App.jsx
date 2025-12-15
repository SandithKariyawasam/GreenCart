import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

import Dashboard from './Dashboard/index'
import Auth from './Auth/Auth'

const ProtectedRoute = ({ children }) => {
  const userString = localStorage.getItem('currentUser');

  // 1. Is user logged in?
  if (!userString) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userString);

  if (!user.role || user.role.id !== 0) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Auth />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;