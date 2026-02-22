import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const subscriptionPlan = localStorage.getItem('subscriptionPlan') || 'Free';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const getPlanColor = () => {
    switch(subscriptionPlan.toLowerCase()) {
      case 'basic':
        return '#808080';
      case 'standard':
        return '#e50914';
      case 'premium':
        return '#ffd700';
      default:
        return '#6c757d';
    }
  };

  const getPlanBadgeStyle = () => {
    const color = getPlanColor();
    return {
      background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
      border: `1px solid ${color}`,
      color: color,
    };
  };

  // Add keyframes to document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideDown {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      .navbar {
        animation: slideDown 0.3s ease;
      }
      
      .nav-link {
        position: relative;
        transition: color 0.3s ease;
      }
      
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: #e50914;
        transition: width 0.3s ease;
      }
      
      .nav-link:hover::after {
        width: 100%;
      }
      
      .nav-link:hover {
        color: #ffffff !important;
      }
      
      .search-input:focus {
        outline: none !important;
        border-color: #e50914 !important;
        box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.2) !important;
      }
      
      .search-button {
        transition: all 0.3s ease;
      }
      
      .search-button:hover {
        background: linear-gradient(135deg, #f40612 0%, #c20810 100%) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(229, 9, 20, 0.4) !important;
      }
      
      .mobile-menu-button {
        display: none;
        flex-direction: column;
        gap: 6px;
        cursor: pointer;
        padding: 10px;
      }
      
      .mobile-menu-button span {
        width: 25px;
        height: 2px;
        background: white;
        transition: all 0.3s ease;
      }
      
      .mobile-menu-button.open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-menu-button.open span:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-button.open span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
      
      .plan-badge {
        transition: all 0.3s ease;
      }
      
      .plan-badge:hover {
        transform: translateY(-2px) scale(1.05) !important;
        box-shadow: 0 5px 15px rgba(229, 9, 20, 0.2) !important;
      }
      
      .logout-btn {
        transition: all 0.3s ease;
      }
      
      .logout-btn:hover {
        background: linear-gradient(135deg, #f40612 0%, #c20810 100%) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(229, 9, 20, 0.4) !important;
      }
      
      .signup-btn {
        transition: all 0.3s ease;
      }
      
      .signup-btn:hover {
        background: linear-gradient(135deg, #f40612 0%, #c20810 100%) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(229, 9, 20, 0.4) !important;
      }
      
      .clear-search:hover {
        color: #e50914 !important;
        transform: scale(1.1) !important;
      }
      
      @media (max-width: 768px) {
        .nav-links {
          display: none !important;
        }
        
        .mobile-menu-button {
          display: flex !important;
        }
        
        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #141414 0%, #1a1a1a 100%);
          padding: 20px;
          border-bottom: 1px solid rgba(229, 9, 20, 0.2);
          animation: slideDown 0.3s ease;
          z-index: 100;
        }
        
        .mobile-menu a, .mobile-menu button {
          display: block;
          padding: 12px;
          text-align: center;
          border-bottom: 1px solid #333;
        }
        
        .mobile-menu a:last-child, .mobile-menu button:last-child {
          border-bottom: none;
        }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const styles = {
    navbar: (isScrolled) => ({
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: isScrolled 
        ? 'linear-gradient(135deg, #141414 0%, #1a1a1a 100%)'
        : 'linear-gradient(to bottom, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.8) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(229, 9, 20, 0.2)',
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.5)' : 'none',
    }),
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 40px',
    },
    // Main Navbar
    mainNav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 0',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
    },
    logoIcon: {
      fontSize: '32px',
      color: '#e50914',
      transition: 'transform 0.3s ease',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '1px',
    },
    // Desktop Navigation
    navLinks: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
    },
    navLink: {
      color: '#e5e5e5',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 500,
      transition: 'color 0.3s ease',
    },
    planBadge: (color) => ({
      padding: '6px 16px',
      borderRadius: '30px',
      border: `1px solid ${color}`,
      fontSize: '13px',
      fontWeight: 600,
      textTransform: 'capitalize',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'default',
      transition: 'all 0.3s ease',
    }),
    divider: {
      color: '#404040',
      fontSize: '18px',
    },
    logoutBtn: {
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 20px',
      fontSize: '15px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    signupBtn: {
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 20px',
      fontSize: '15px',
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
    // Search Section
    searchSection: {
      paddingBottom: '16px',
    },
    searchForm: {
      display: 'flex',
      gap: '12px',
    },
    searchWrapper: (isFocused) => ({
      flex: 1,
      position: 'relative',
      transition: 'all 0.3s ease',
      boxShadow: isFocused ? '0 0 0 3px rgba(229, 9, 20, 0.2)' : 'none',
      borderRadius: '8px',
    }),
    searchInput: {
      width: '100%',
      padding: '12px 16px 12px 48px',
      backgroundColor: '#2a2a2a',
      border: '1px solid #404040',
      borderRadius: '8px',
      color: 'white',
      fontSize: '15px',
      transition: 'all 0.3s ease',
      outline: 'none',
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '18px',
      color: '#808080',
      pointerEvents: 'none',
    },
    clearButton: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#808080',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    searchButton: {
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0 30px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    // Mobile Menu Button
    mobileMenuBtn: {
      display: 'none',
    },
    // Mobile Menu
    mobileMenu: {
      display: 'none',
    },
  };

  return (
    <nav style={styles.navbar(isScrolled)} className="navbar">
      <div style={styles.container}>
        {/* Main Navbar */}
        <div style={styles.mainNav}>
          <Link 
            to="/" 
            style={styles.logo}
            onClick={() => setSearchInput('')}
          >
            <span style={styles.logoIcon}>▶</span>
            <span style={styles.logoText}>STREAMVAULT</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div style={styles.navLinks} className="nav-links">
            <Link 
              to="/" 
              style={styles.navLink}
              className="nav-link"
            >
              Home
            </Link>

            {/* Subscription Plan Badge */}
            <div 
              style={styles.planBadge(getPlanColor())}
              className="plan-badge"
            >
              <span>★</span>
              <span style={{ textTransform: 'capitalize' }}>{subscriptionPlan}</span>
            </div>
            
            {isLoggedIn ? (
              <>
                <span style={styles.divider}>|</span>
                <button
                  onClick={handleLogout}
                  style={styles.logoutBtn}
                  className="logout-btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  style={styles.navLink}
                  className="nav-link"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={styles.signupBtn}
                  className="signup-btn"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div 
            className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Search Bar */}
        <div style={styles.searchSection}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <div style={styles.searchWrapper(isSearchFocused)}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search movies by title, director, or keywords..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                style={styles.searchInput}
                className="search-input"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  style={styles.clearButton}
                  className="clear-search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              style={styles.searchButton}
              className="search-button"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={styles.mobileMenu} className="mobile-menu">
            <Link 
              to="/" 
              style={{ ...styles.navLink, display: 'block', padding: '12px', textAlign: 'center' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {isLoggedIn ? (
              <>
                <div style={{ padding: '12px', textAlign: 'center' }}>
                  <div style={styles.planBadge(getPlanColor())} className="plan-badge">
                    <span>★</span>
                    <span style={{ textTransform: 'capitalize' }}>{subscriptionPlan}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  style={{ ...styles.logoutBtn, width: '100%' }}
                  className="logout-btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  style={{ ...styles.navLink, display: 'block', padding: '12px', textAlign: 'center' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{ ...styles.signupBtn, display: 'block', padding: '12px', textAlign: 'center' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;