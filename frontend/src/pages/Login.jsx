import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      
      if (response.data.success) {
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('subscriptionPlan', response.data.user.subscriptionPlan);
        
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add keyframes to document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.05);
        }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      
      @keyframes slowZoom {
        from { transform: scale(1.1); }
        to { transform: scale(1.2); }
      }
      
      .error-shake {
        animation: shake 0.5s ease;
      }
      
      .input-focus:focus {
        outline: none !important;
        border-color: #e50914 !important;
        box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.2) !important;
      }
      
      .password-toggle:hover {
        color: white !important;
      }
      
      .forgot-link:hover {
        color: #e50914 !important;
        text-decoration: underline !important;
      }
      
      .signup-link:hover {
        color: #e50914 !important;
        text-decoration: underline !important;
      }
      
      .submit-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #f40612 0%, #c20810 100%) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 10px 20px rgba(229, 9, 20, 0.3) !important;
      }
      
      .social-btn:hover {
        transform: translateY(-3px) !important;
        border-color: #e50914 !important;
      }
      
      .social-btn.google:hover {
        background: #DB4437 !important;
        border-color: #DB4437 !important;
      }
      
      .social-btn.facebook:hover {
        background: #4267B2 !important;
        border-color: #4267B2 !important;
      }
      
      .social-btn.apple:hover {
        background: #000000 !important;
        border-color: #000000 !important;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#141414',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    // Hero Background
    hero: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
    },
    heroBackdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(0.3) blur(2px)',
      transform: 'scale(1.1)',
      animation: 'slowZoom 20s infinite alternate',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.95) 50%, #141414 100%)',
    },
    // Navbar
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to bottom, rgba(20,20,20,0.95) 0%, transparent 100%)',
      backdropFilter: 'blur(10px)',
      zIndex: 50,
      padding: '16px 0',
    },
    navbarContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      animation: 'pulse 2s infinite',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #fff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '1px',
    },
    backLink: {
      color: '#e5e5e5',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 500,
      padding: '8px 16px',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
    },
    // Main Content
    main: {
      position: 'relative',
      zIndex: 1,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px',
    },
    container: {
      width: '100%',
      maxWidth: '450px',
      animation: 'fadeIn 0.5s ease',
    },
    // Card
    card: {
      background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(229, 9, 20, 0.2)',
      borderRadius: '16px',
      padding: '48px 40px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    },
    // Logo inside card
    cardLogo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '32px',
    },
    cardLogoIcon: {
      fontSize: '40px',
      color: '#e50914',
    },
    cardLogoText: {
      fontSize: '28px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #fff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '2px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '16px',
      color: '#b3b3b3',
      marginBottom: '32px',
      textAlign: 'center',
    },
    // Features
    features: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '32px',
      padding: '16px',
      background: 'rgba(229, 9, 20, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(229, 9, 20, 0.1)',
    },
    featureItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    },
    featureIcon: {
      fontSize: '24px',
    },
    featureText: {
      fontSize: '12px',
      color: '#e5e5e5',
    },
    // Form
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#e5e5e5',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    labelIcon: {
      fontSize: '16px',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#2a2a2a',
      border: '1px solid #404040',
      borderRadius: '8px',
      color: 'white',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#808080',
      transition: 'color 0.2s ease',
    },
    // Options
    options: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '8px',
    },
    rememberMe: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      color: '#b3b3b3',
      fontSize: '14px',
      position: 'relative',
    },
    checkbox: {
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
      height: 0,
      width: 0,
    },
    checkmark: (checked) => ({
      height: '18px',
      width: '18px',
      backgroundColor: checked ? '#e50914' : '#2a2a2a',
      border: `1px solid ${checked ? '#e50914' : '#404040'}`,
      borderRadius: '4px',
      position: 'relative',
      transition: 'all 0.2s ease',
    }),
    checkmarkAfter: {
      content: '""',
      position: 'absolute',
      display: 'block',
      left: '6px',
      top: '2px',
      width: '4px',
      height: '8px',
      border: 'solid white',
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)',
    },
    forgotLink: {
      color: '#b3b3b3',
      fontSize: '14px',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },
    // Error
    error: {
      backgroundColor: 'rgba(229, 9, 20, 0.1)',
      border: '1px solid rgba(229, 9, 20, 0.3)',
      borderRadius: '8px',
      padding: '16px',
      color: '#e50914',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    errorIcon: {
      fontSize: '18px',
    },
    // Submit Button
    submitBtn: {
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '16px',
      fontSize: '18px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '16px',
      opacity: loading ? 0.7 : 1,
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTopColor: 'white',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      marginRight: '8px',
    },
    // Social Login
    socialSection: {
      marginTop: '32px',
      textAlign: 'center',
    },
    socialText: {
      color: '#808080',
      fontSize: '14px',
      marginBottom: '16px',
      position: 'relative',
    },
    socialTextBeforeAfter: {
      content: '""',
      position: 'absolute',
      top: '50%',
      width: '30%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, #404040, transparent)',
    },
    socialButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
    },
    socialBtn: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      border: '1px solid #404040',
      background: '#2a2a2a',
      color: 'white',
      fontSize: '20px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Footer
    footer: {
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid #2a2a2a',
      textAlign: 'center',
    },
    footerText: {
      color: '#808080',
      fontSize: '14px',
    },
    signupLink: {
      color: '#e50914',
      textDecoration: 'none',
      fontWeight: 600,
      marginLeft: '4px',
    },
    // Bottom Text
    bottomText: {
      textAlign: 'center',
      marginTop: '24px',
      color: '#808080',
      fontSize: '12px',
    },
    // Terms
    terms: {
      marginTop: '16px',
      fontSize: '12px',
      color: '#808080',
      textAlign: 'center',
    },
    termsLink: {
      color: '#b3b3b3',
      textDecoration: 'none',
      margin: '0 4px',
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero Background */}
      <div style={styles.hero}>
        <div style={styles.heroBackdrop}></div>
        <div style={styles.heroOverlay}></div>
      </div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarContainer}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>▶</span>
            <span style={styles.logoText}>STREAMVAULT</span>
          </Link>
          <Link to="/" style={styles.backLink} className="forgot-link">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.card}>
            {/* Logo inside card */}
            <div style={styles.cardLogo}>
              <span style={styles.cardLogoIcon}>▶</span>
              <span style={styles.cardLogoText}>STREAMVAULT</span>
            </div>

            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to continue your streaming journey</p>

            {/* Feature highlights */}
            <div style={styles.features}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🎬</span>
                <span style={styles.featureText}>10K+ Movies</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>📺</span>
                <span style={styles.featureText}>4K Quality</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>⚡</span>
                <span style={styles.featureText}>Ad-free</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={styles.error} className="error-shake">
                <span style={styles.errorIcon}>⚠️</span>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="email">
                  <span style={styles.labelIcon}>✉️</span>
                  Email Address
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    placeholder="your@email.com"
                    className="input-focus"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="password">
                  <span style={styles.labelIcon}>🔒</span>
                  Password
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    placeholder="Enter your password"
                    className="input-focus"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    style={styles.passwordToggle}
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div style={styles.options}>
                <label style={styles.rememberMe}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkmark(rememberMe)}>
                    {rememberMe && <span style={styles.checkmarkAfter}></span>}
                  </span>
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" style={styles.forgotLink} className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={styles.submitBtn}
                className="submit-btn"
              >
                {loading ? (
                  <>
                    <span style={styles.spinner}></span>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Social Login */}
            <div style={styles.socialSection}>
              <p style={styles.socialText}>Or continue with</p>
              <div style={styles.socialButtons}>
                <button style={styles.socialBtn} className="social-btn google">G</button>
                <button style={styles.socialBtn} className="social-btn facebook">f</button>
                <button style={styles.socialBtn} className="social-btn apple">🍎</button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div style={styles.footer}>
              <p style={styles.footerText}>
                Don't have an account?
                <Link to="/signup" style={styles.signupLink} className="signup-link">
                  Sign up now
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div style={styles.terms}>
              <span>By signing in, you agree to our </span>
              <a href="/terms" style={styles.termsLink} className="forgot-link">Terms of Service</a>
              <span> and </span>
              <a href="/privacy" style={styles.termsLink} className="forgot-link">Privacy Policy</a>
            </div>
          </div>

          {/* Security Note */}
          <div style={styles.bottomText}>
            <p>🔒 Protected by industry-leading security and encryption</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;