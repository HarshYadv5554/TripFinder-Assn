import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HostDashboard from './pages/HostDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Routes with header */}
            <Route path="/" element={
              <>
                <Header />
                <HomePage />
              </>
            } />
            <Route path="/search" element={
              <>
                <Header />
                <SearchPage />
              </>
            } />
            <Route path="/property/:id" element={
              <>
                <Header />
                <PropertyDetailPage />
              </>
            } />
            <Route path="/host" element={
              <>
                <Header />
                <ProtectedRoute>
                  <HostDashboard />
                </ProtectedRoute>
              </>
            } />
            
            {/* Auth routes without header */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;