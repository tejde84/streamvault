import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { authAPI } from '../utils/api';

const Signup = ({ onLoginSuccess }) => {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get('plan') || 'standard');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'basic',
      title: 'Basic',
      price: '₹199',
      period: '/month',
      features: ['Watch on 1 device', 'HD quality available', 'Ads included', 'Cancel anytime'],
      icon: '📱',
      color: 'from-gray-600 to-gray-800',
    },
    {
      name: 'standard',
      title: 'Standard',
      price: '₹499',
      period: '/month',
      features: ['Watch on 2 devices', 'Full HD (1080p)', 'Ad-free', 'Download offline', 'Cancel anytime'],
      icon: '🖥️',
      isPopular: true,
      color: 'from-red-600 to-red-800',
    },
    {
      name: 'premium',
      title: 'Premium',
      price: '₹799',
      period: '/month',
      features: ['Watch on 4 devices', '4K Ultra HD + HDR', 'Ad-free', 'Download offline', '6 profiles', 'Spatial audio', 'Cancel anytime'],
      icon: '🎬',
      color: 'from-purple-600 to-purple-800',
    },
  ];

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return 'weak';
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]+/)) score++;
    if (password.match(/[A-Z]+/)) score++;
    if (password.match(/[0-9]+/)) score++;
    if (password.match(/[$@#&!]+/)) score++;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  };

  const getPasswordStrengthPercent = (password) => {
    const strength = getPasswordStrength(password);
    if (strength === 'weak') return 33;
    if (strength === 'medium') return 66;
    return 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Username validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.signup(username, email, password, selectedPlan);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('subscriptionPlan', response.data.user.subscriptionPlan);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add keyframes to document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
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
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
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
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .error-shake {
        animation: shake 0.5s ease;
      }
      
      .plan-card:hover {
        transform: translateY(-10px) !important;
        border-color: #e50914 !important;
        box-shadow: 0 20px 30px rgba(229, 9, 20, 0.2) !important;
      }
      
      .plan-card.selected {
        border-color: #e50914 !important;
        box-shadow: 0 0 30px rgba(229, 9, 20, 0.3) !important;
      }
      
      .input-focus:focus {
        outline: none !important;
        border-color: #e50914 !important;
        box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.2) !important;
      }
      
      .password-toggle:hover {
        color: white !important;
      }
      
      .login-link:hover {
        color: #e50914 !important;
        text-decoration: underline !important;
      }
      
      .submit-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #f40612 0%, #c20810 100%) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 10px 20px rgba(229, 9, 20, 0.3) !important;
      }
      
      .terms-link:hover {
        color: #e50914 !important;
        text-decoration: underline !important;
      }
      
      .feature-item {
        animation: slideIn 0.3s ease forwards;
        opacity: 0;
      }
      
      .feature-item:nth-child(1) { animation-delay: 0.1s; }
      .feature-item:nth-child(2) { animation-delay: 0.2s; }
      .feature-item:nth-child(3) { animation-delay: 0.3s; }
      .feature-item:nth-child(4) { animation-delay: 0.4s; }
      .feature-item:nth-child(5) { animation-delay: 0.5s; }
      .feature-item:nth-child(6) { animation-delay: 0.6s; }
      .feature-item:nth-child(7) { animation-delay: 0.7s; }
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
      position: 'sticky',
      top: 0,
      background: 'linear-gradient(to bottom, rgba(20,20,20,0.95) 0%, transparent 100%)',
      backdropFilter: 'blur(10px)',
      zIndex: 50,
      padding: '16px 0',
      borderBottom: '1px solid rgba(229, 9, 20, 0.2)',
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
      padding: '40px 20px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    // Progress Steps
    progressSection: {
      marginBottom: '48px',
      animation: 'fadeInUp 0.5s ease',
    },
    progressTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
    },
    progressSteps: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
    },
    progressStep: (active) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }),
    stepNumber: (active) => ({
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: active ? '#e50914' : '#2a2a2a',
      color: active ? 'white' : '#808080',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: '18px',
      boxShadow: active ? '0 0 20px rgba(229, 9, 20, 0.5)' : 'none',
      transition: 'all 0.3s ease',
    }),
    stepLabel: (active) => ({
      fontSize: '14px',
      color: active ? '#e50914' : '#808080',
      fontWeight: 500,
    }),
    progressLine: {
      width: '100px',
      height: '2px',
      background: 'linear-gradient(90deg, #2a2a2a 0%, #404040 100%)',
    },
    // Plans Section
    plansSection: {
      marginBottom: '48px',
    },
    plansTitle: {
      fontSize: '28px',
      fontWeight: 700,
      marginBottom: '8px',
      color: 'white',
      textAlign: 'center',
    },
    plansSubtitle: {
      fontSize: '16px',
      color: '#b3b3b3',
      marginBottom: '32px',
      textAlign: 'center',
    },
    plansGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '24px',
    },
    planCard: (isSelected, isPopular, color) => ({
      position: 'relative',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #242424 100%)',
      borderRadius: '16px',
      padding: '32px 24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: `2px solid ${isSelected ? '#e50914' : isPopular ? '#e50914' : '#333333'}`,
      transform: isPopular && !isSelected ? 'scale(1.05)' : 'scale(1)',
      animation: 'fadeInUp 0.5s ease',
    }),
    popularBadge: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      padding: '6px 20px',
      borderRadius: '30px',
      fontSize: '12px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 10px rgba(229, 9, 20, 0.3)',
    },
    planIcon: {
      fontSize: '48px',
      marginBottom: '16px',
    },
    planName: {
      fontSize: '24px',
      fontWeight: 700,
      color: 'white',
      marginBottom: '8px',
    },
    planPrice: {
      marginBottom: '16px',
    },
    priceAmount: {
      fontSize: '32px',
      fontWeight: 700,
      color: 'white',
    },
    pricePeriod: {
      fontSize: '14px',
      color: '#808080',
      marginLeft: '4px',
    },
    planFeatures: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '20px',
    },
    planFeature: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#e5e5e5',
      fontSize: '14px',
    },
    featureCheck: {
      color: '#46d369',
      fontSize: '16px',
    },
    trialBadge: {
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid #333333',
      fontSize: '12px',
      color: '#b3b3b3',
      textAlign: 'center',
    },
    // Form Section
    formSection: {
      maxWidth: '500px',
      margin: '0 auto',
    },
    formCard: {
      background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(229, 9, 20, 0.2)',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      animation: 'fadeInUp 0.5s ease',
    },
    formTitle: {
      fontSize: '28px',
      fontWeight: 700,
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
    },
    selectedPlanText: {
      fontSize: '14px',
      color: '#b3b3b3',
      marginBottom: '24px',
      textAlign: 'center',
      padding: '8px',
      background: 'rgba(229, 9, 20, 0.1)',
      borderRadius: '8px',
    },
    selectedPlanHighlight: {
      color: '#e50914',
      fontWeight: 600,
      textTransform: 'capitalize',
    },
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
      padding: '14px 16px',
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
    // Password Strength
    passwordStrength: {
      marginTop: '4px',
    },
    strengthLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      color: '#b3b3b3',
      marginBottom: '4px',
    },
    strengthValue: (strength) => ({
      fontWeight: 600,
      color: strength === 'weak' ? '#e50914' : strength === 'medium' ? '#ffa500' : '#46d369',
    }),
    strengthBar: {
      height: '4px',
      backgroundColor: '#2a2a2a',
      borderRadius: '2px',
      overflow: 'hidden',
    },
    strengthFill: (strength, percent) => ({
      height: '100%',
      width: `${percent}%`,
      backgroundColor: strength === 'weak' ? '#e50914' : strength === 'medium' ? '#ffa500' : '#46d369',
      transition: 'width 0.3s ease',
    }),
    // Terms Checkbox
    termsGroup: {
      marginTop: '8px',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      color: '#b3b3b3',
      fontSize: '14px',
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
    termsLink: {
      color: '#e50914',
      textDecoration: 'none',
    },
    // Trial Box
    trialBox: {
      background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.1) 0%, rgba(229, 9, 20, 0.05) 100%)',
      border: '1px solid rgba(229, 9, 20, 0.2)',
      borderRadius: '8px',
      padding: '16px',
    },
    trialText: {
      color: '#e5e5e5',
      fontSize: '14px',
      marginBottom: '4px',
    },
    trialHighlight: {
      color: '#e50914',
      fontWeight: 600,
    },
    trialNote: {
      fontSize: '12px',
      color: '#b3b3b3',
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
      marginTop: '8px',
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
    // Footer
    footer: {
      marginTop: '24px',
      textAlign: 'center',
    },
    footerText: {
      color: '#808080',
      fontSize: '14px',
    },
    loginLink: {
      color: '#e50914',
      textDecoration: 'none',
      fontWeight: 600,
      marginLeft: '4px',
    },
    termsFooter: {
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid #2a2a2a',
      fontSize: '12px',
      color: '#808080',
      textAlign: 'center',
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
          <Link to="/" style={styles.backLink} className="login-link">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.container}>
          {/* Progress Steps */}
          <div style={styles.progressSection}>
            <h2 style={styles.progressTitle}>Start Your Free Trial</h2>
            <div style={styles.progressSteps}>
              <div style={styles.progressStep(true)}>
                <span style={styles.stepNumber(true)}>1</span>
                <span style={styles.stepLabel(true)}>Choose Plan</span>
              </div>
              <div style={styles.progressLine}></div>
              <div style={styles.progressStep(false)}>
                <span style={styles.stepNumber(false)}>2</span>
                <span style={styles.stepLabel(false)}>Create Account</span>
              </div>
              <div style={styles.progressLine}></div>
              <div style={styles.progressStep(false)}>
                <span style={styles.stepNumber(false)}>3</span>
                <span style={styles.stepLabel(false)}>Start Watching</span>
              </div>
            </div>
          </div>

          {/* Plans Section */}
          <div style={styles.plansSection}>
            <h3 style={styles.plansTitle}>Choose your plan</h3>
            <p style={styles.plansSubtitle}>Select the perfect plan for your streaming needs</p>
            
            <div style={styles.plansGrid}>
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`plan-card ${selectedPlan === plan.name ? 'selected' : ''}`}
                  style={styles.planCard(selectedPlan === plan.name, plan.isPopular, plan.color)}
                >
                  {plan.isPopular && (
                    <div style={styles.popularBadge}>
                      <span style={{ fontSize: '14px' }}>⭐</span>
                      Most Popular
                    </div>
                  )}
                  <div style={styles.planIcon}>{plan.icon}</div>
                  <h4 style={styles.planName}>{plan.title}</h4>
                  <div style={styles.planPrice}>
                    <span style={styles.priceAmount}>{plan.price}</span>
                    <span style={styles.pricePeriod}>{plan.period}</span>
                  </div>
                  <div style={styles.planFeatures}>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} style={styles.planFeature} className="feature-item">
                        <span style={styles.featureCheck}>✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div style={styles.trialBadge}>
                    <span>30-day free trial included</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signup Form */}
          <div style={styles.formSection}>
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>Create Account</h3>
              <div style={styles.selectedPlanText}>
                Selected Plan: <span style={styles.selectedPlanHighlight}>{selectedPlan}</span>
              </div>

              {error && (
                <div style={styles.error} className="error-shake">
                  <span style={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={styles.form}>
                {/* Username */}
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="username">
                    <span style={styles.labelIcon}>👤</span>
                    Username
                  </label>
                  <div style={styles.inputWrapper}>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={styles.input}
                      placeholder="Choose a username"
                      className="input-focus"
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Email */}
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

                {/* Password */}
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
                      placeholder="Create a password"
                      className="input-focus"
                      autoComplete="new-password"
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
                  
                  {/* Password Strength */}
                  {password && (
                    <div style={styles.passwordStrength}>
                      <div style={styles.strengthLabel}>
                        <span>Password strength:</span>
                        <span style={styles.strengthValue(getPasswordStrength(password))}>
                          {getPasswordStrength(password)}
                        </span>
                      </div>
                      <div style={styles.strengthBar}>
                        <div 
                          style={styles.strengthFill(
                            getPasswordStrength(password),
                            getPasswordStrengthPercent(password)
                          )}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="confirmPassword">
                    <span style={styles.labelIcon}>✓</span>
                    Confirm Password
                  </label>
                  <div style={styles.inputWrapper}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={styles.input}
                      placeholder="Confirm your password"
                      className="input-focus"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      style={styles.passwordToggle}
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div style={styles.termsGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkmark(agreeToTerms)}>
                      {agreeToTerms && <span style={styles.checkmarkAfter}></span>}
                    </span>
                    <span>
                      I agree to the{' '}
                      <a href="/terms" style={styles.termsLink} className="terms-link">Terms of Service</a>
                      {' '}and{' '}
                      <a href="/privacy" style={styles.termsLink} className="terms-link">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                {/* Trial Information */}
                <div style={styles.trialBox}>
                  <p style={styles.trialText}>
                    ✓ Start with <span style={styles.trialHighlight}>30 days free</span>, then{' '}
                    <span style={styles.trialHighlight}>
                      {plans.find(p => p.name === selectedPlan)?.price}{plans.find(p => p.name === selectedPlan)?.period}
                    </span>
                  </p>
                  <p style={styles.trialNote}>Cancel anytime. No credit card required for trial.</p>
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
                      Creating Account...
                    </>
                  ) : (
                    'Start Free Trial'
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div style={styles.footer}>
                <p style={styles.footerText}>
                  Already have an account?
                  <Link to="/login" style={styles.loginLink} className="login-link">
                    Log in
                  </Link>
                </p>
              </div>

              {/* Terms Footer */}
              <div style={styles.termsFooter}>
                <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;