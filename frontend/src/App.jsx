import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MovieDetail from './pages/MovieDetail';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('subscriptionPlan');
  };

  // Show navbar only for authenticated pages
  const showNavbar = isLoggedIn && !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Home key={location.key} /> : <LandingPage />} 
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Home /> : <Signup onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/movie/:id" element={isLoggedIn ? <MovieDetail /> : <LandingPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
