import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subscriptionPlans = [
    {
      name: 'Basic',
      price: '₹199',
      period: '/month',
      gradient: 'from-gray-700 to-gray-900',
      icon: '📱',
      features: [
        'Unlimited movies & TV shows',
        'Watch on 1 device',
        'HD quality available',
        'Ads included',
        'Cancel anytime',
      ],
      buttonText: 'Get Started',
      isPopular: false,
    },
    {
      name: 'Standard',
      price: '₹499',
      period: '/month',
      gradient: 'from-red-600 to-red-800',
      icon: '🖥️',
      features: [
        'Unlimited movies & TV shows',
        'Watch on 2 devices',
        'Full HD (1080p)',
        'Ad-free experience',
        'Download to watch offline',
        'Cancel anytime',
      ],
      buttonText: 'Get Started',
      isPopular: true,
    },
    {
      name: 'Premium',
      price: '₹799',
      period: '/month',
      gradient: 'from-purple-600 to-purple-900',
      icon: '🎬',
      features: [
        'Unlimited movies & TV shows',
        'Watch on 4 devices',
        'Ultra HD (4K) + HDR',
        'Ad-free experience',
        'Download to watch offline',
        'Spatial audio',
        'Up to 6 profiles',
        'Cancel anytime',
      ],
      buttonText: 'Get Started',
      isPopular: false,
    },
  ];

  const features = [
    {
      icon: '🎬',
      title: 'Watch on any device',
      description: 'Stream on your TV, computer, phone, or tablet.',
      gradient: 'from-red-600 to-red-800'
    },
    {
      icon: '📱',
      title: 'Download and go',
      description: 'Save your favorites for offline viewing.',
      gradient: 'from-purple-600 to-purple-800'
    },
    {
      icon: '👥',
      title: 'Multiple profiles',
      description: 'Create separate profiles for family members.',
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      icon: '4K',
      title: '4K Ultra HD',
      description: 'Stream in stunning 4K resolution with HDR.',
      gradient: 'from-green-600 to-green-800'
    },
    {
      icon: '🔊',
      title: 'Spatial audio',
      description: 'Immersive sound on select titles.',
      gradient: 'from-yellow-600 to-yellow-800'
    },
    {
      icon: '🎮',
      title: 'Mobile games',
      description: 'Play fun games with your subscription.',
      gradient: 'from-pink-600 to-pink-800'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Parental controls',
      description: 'Keep your kids safe with parental controls.',
      gradient: 'from-indigo-600 to-indigo-800'
    },
    {
      icon: '⚡',
      title: 'Ad-free streaming',
      description: 'Watch without interruptions on Standard & Premium.',
      gradient: 'from-orange-600 to-orange-800'
    },
  ];

  const faqs = [
    {
      question: 'What is StreamVault?',
      answer: 'StreamVault is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price.'
    },
    {
      question: 'How much does StreamVault cost?',
      answer: 'Watch StreamVault on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹199 to ₹799 a month. No extra costs, no contracts.'
    },
    {
      question: 'Where can I watch?',
      answer: 'Watch anywhere, anytime. Sign in with your StreamVault account to watch instantly on the web at streamvault.com from your personal computer or on any internet-connected device that offers the StreamVault app, including smart TVs, smartphones, tablets, streaming media players and game consoles.'
    },
    {
      question: 'How do I cancel?',
      answer: 'StreamVault is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.'
    },
    {
      question: 'What can I watch on StreamVault?',
      answer: 'StreamVault has an extensive library of feature films, documentaries, TV shows, anime, award-winning StreamVault originals, and more. Watch as much as you want, anytime you want.'
    },
    {
      question: 'Is StreamVault good for kids?',
      answer: 'The StreamVault Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don\'t want kids to see.'
    }
  ];

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
          opacity: 0.9;
          transform: scale(1.05);
        }
      }
      
      @keyframes slowZoom {
        from { transform: scale(1.1); }
        to { transform: scale(1.2); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes shine {
        0% {
          transform: translateX(-100%) rotate(45deg);
        }
        20% {
          transform: translateX(100%) rotate(45deg);
        }
        100% {
          transform: translateX(100%) rotate(45deg);
        }
      }
      
      .hover-scale {
        transition: transform 0.3s ease;
      }
      
      .hover-scale:hover {
        transform: scale(1.05);
      }
      
      .feature-card:hover .feature-icon-wrapper {
        transform: scale(1.1) rotate(5deg);
      }
      
      .nav-link:hover {
        color: #e50914 !important;
      }
      
      .btn-primary:hover {
        background: linear-gradient(135deg, #f40612 0%, #c20810 100%) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 10px 20px rgba(229, 9, 20, 0.3) !important;
      }
      
      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2) !important;
        border-color: #e50914 !important;
        transform: translateY(-2px) !important;
      }
      
      .plan-card:hover {
        transform: translateY(-10px) !important;
        border-color: #e50914 !important;
        box-shadow: 0 20px 30px rgba(229, 9, 20, 0.2) !important;
      }
      
      .faq-item:hover {
        border-color: #e50914 !important;
      }
      
      details[open] .faq-icon {
        transform: rotate(45deg) !important;
      }
      
      .footer-link:hover {
        color: #e50914 !important;
        padding-left: 5px !important;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const styles = {
    page: {
      backgroundColor: '#141414',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    // Navbar
    navbar: (scrolled) => ({
      background: scrolled ? 'rgba(20, 20, 20, 0.95)' : 'linear-gradient(to bottom, rgba(20,20,20,0.8) 0%, transparent 100%)',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'all 0.3s ease',
      padding: scrolled ? '12px 0' : '20px 0',
    }),
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
      transition: 'color 0.2s ease',
    },
    signUpBtn: {
      background: '#e50914',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '4px',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 600,
      transition: 'all 0.2s ease',
    },
    // Hero Section
    hero: {
      position: 'relative',
      height: '90vh',
      minHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden',
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
      filter: 'brightness(0.3)',
      transform: 'scale(1.1)',
      animation: 'slowZoom 20s infinite alternate',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,0.7) 50%, #141414 100%)',
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '900px',
      padding: '0 20px',
      animation: 'fadeInUp 1s ease',
    },
    heroBadge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      padding: '8px 24px',
      borderRadius: '30px',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '1px',
      marginBottom: '24px',
    },
    heroTitle: {
      fontSize: '64px',
      fontWeight: 800,
      marginBottom: '20px',
      background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      fontSize: '24px',
      color: '#e5e5e5',
      marginBottom: '16px',
    },
    heroDescription: {
      fontSize: '20px',
      color: '#b3b3b3',
      marginBottom: '32px',
    },
    heroCta: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      marginBottom: '48px',
    },
    primaryBtn: {
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      padding: '16px 40px',
      borderRadius: '4px',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
    },
    secondaryBtn: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '16px 40px',
      borderRadius: '4px',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 600,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
    },
    heroStats: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '40px',
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: 700,
      color: '#e50914',
    },
    statLabel: {
      fontSize: '14px',
      color: '#b3b3b3',
    },
    statDivider: {
      width: '2px',
      height: '40px',
      background: 'linear-gradient(to bottom, transparent, #e50914, transparent)',
    },
    // Features Section
    featuresSection: {
      padding: '80px 40px',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    sectionTitle: {
      fontSize: '48px',
      fontWeight: 700,
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    sectionSubtitle: {
      fontSize: '20px',
      color: '#b3b3b3',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px',
    },
    featureCard: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #242424 100%)',
      borderRadius: '12px',
      padding: '30px',
      transition: 'all 0.3s ease',
      border: '1px solid #333333',
      position: 'relative',
      overflow: 'hidden',
    },
    featureIconWrapper: (gradient) => ({
      width: '60px',
      height: '60px',
      background: `linear-gradient(135deg, ${gradient.split(' ')[0]} 0%, ${gradient.split(' ')[2]} 100%)`,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      transition: 'all 0.3s ease',
    }),
    featureIcon: {
      fontSize: '30px',
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: 'white',
      marginBottom: '12px',
    },
    featureDescription: {
      fontSize: '14px',
      color: '#b3b3b3',
      lineHeight: 1.6,
    },
    featureShine: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'linear-gradient(to bottom right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
      transform: 'rotate(45deg)',
      animation: 'shine 3s infinite',
      pointerEvents: 'none',
    },
    // Plans Section
    plansSection: {
      padding: '80px 40px',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
    },
    plansGrid: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '30px',
      padding: '20px',
    },
    planCard: (isPopular) => ({
      position: 'relative',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #242424 100%)',
      borderRadius: '16px',
      padding: '40px 30px',
      transition: 'all 0.3s ease',
      border: `2px solid ${isPopular ? '#e50914' : '#333333'}`,
      transform: isPopular ? 'scale(1.05)' : 'scale(1)',
      display: 'flex',
      flexDirection: 'column',
    }),
    popularBadge: {
      position: 'absolute',
      top: '-15px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      padding: '8px 24px',
      borderRadius: '30px',
      fontSize: '14px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 10px rgba(229, 9, 20, 0.3)',
    },
    planIcon: {
      fontSize: '48px',
      marginBottom: '20px',
    },
    planName: {
      fontSize: '28px',
      fontWeight: 700,
      color: 'white',
      marginBottom: '16px',
    },
    planPrice: {
      marginBottom: '30px',
    },
    priceAmount: {
      fontSize: '48px',
      fontWeight: 700,
      color: 'white',
    },
    pricePeriod: {
      fontSize: '16px',
      color: '#808080',
      marginLeft: '4px',
    },
    planFeatures: {
      flex: 1,
      marginBottom: '30px',
    },
    planFeature: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 0',
      color: '#e5e5e5',
      fontSize: '15px',
      borderBottom: '1px solid #333333',
    },
    featureCheck: {
      color: '#46d369',
      fontSize: '18px',
    },
    planButton: (gradient) => ({
      background: `linear-gradient(135deg, ${gradient.split(' ')[0]} 0%, ${gradient.split(' ')[2]} 100%)`,
      color: 'white',
      padding: '14px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      display: 'block',
    }),
    // FAQ Section
    faqSection: {
      padding: '80px 40px',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    faqGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    faqItem: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #242424 100%)',
      borderRadius: '12px',
      border: '1px solid #333333',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    },
    faqQuestion: {
      padding: '24px 30px',
      fontSize: '18px',
      fontWeight: 500,
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      listStyle: 'none',
    },
    faqIcon: {
      fontSize: '24px',
      color: '#e50914',
      transition: 'transform 0.3s ease',
    },
    faqAnswer: {
      padding: '0 30px 24px 30px',
      color: '#b3b3b3',
      fontSize: '16px',
      lineHeight: 1.8,
      animation: 'fadeInUp 0.3s ease',
    },
    // CTA Section
    ctaSection: {
      position: 'relative',
      padding: '100px 40px',
      textAlign: 'center',
      overflow: 'hidden',
    },
    ctaBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      opacity: 0.1,
      transform: 'skewY(-3deg) scale(1.2)',
    },
    ctaContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '800px',
      margin: '0 auto',
    },
    ctaTitle: {
      fontSize: '48px',
      fontWeight: 700,
      marginBottom: '20px',
      color: 'white',
    },
    ctaDescription: {
      fontSize: '20px',
      color: '#b3b3b3',
      marginBottom: '40px',
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      padding: '20px 60px',
      borderRadius: '4px',
      textDecoration: 'none',
      fontSize: '20px',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      display: 'inline-block',
    },
    // Footer
    footer: {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
      padding: '60px 40px 30px',
      borderTop: '1px solid #333333',
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    footerLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '40px',
    },
    footerLogoIcon: {
      fontSize: '32px',
      color: '#e50914',
    },
    footerLogoText: {
      fontSize: '24px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #fff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '2px',
    },
    footerLinks: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '40px',
      marginBottom: '40px',
    },
    footerColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    footerColumnTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: 'white',
      marginBottom: '20px',
    },
    footerLink: {
      color: '#808080',
      textDecoration: 'none',
      fontSize: '14px',
      marginBottom: '12px',
      transition: 'all 0.2s ease',
    },
    footerBottom: {
      textAlign: 'center',
      paddingTop: '30px',
      borderTop: '1px solid #333333',
    },
    footerCopyright: {
      color: '#808080',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar(scrolled)}>
        <div style={styles.navbarContainer}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>▶</span>
            <span style={styles.logoText}>STREAMVAULT</span>
          </Link>
          <div style={styles.navLinks}>
            <Link to="/login" style={styles.navLink} className="nav-link">Login</Link>
            <Link to="/signup" style={styles.signUpBtn} className="btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBackdrop}></div>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>NEW SEASONS</span>
          <h1 style={styles.heroTitle}>
            Unlimited movies, TV shows, and more
          </h1>
          <p style={styles.heroSubtitle}>Watch anywhere. Cancel anytime.</p>
          <p style={styles.heroDescription}>
            Ready to watch? Join today and get your first month free.
          </p>
          <div style={styles.heroCta}>
            <Link to="/signup" style={styles.primaryBtn} className="btn-primary">
              Get Started <span style={{ fontSize: '20px' }}>→</span>
            </Link>
            <Link to="/login" style={styles.secondaryBtn} className="btn-secondary">
              Sign In
            </Link>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>10K+</span>
              <span style={styles.statLabel}>Movies & Shows</span>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>4K</span>
              <span style={styles.statLabel}>Ultra HD Quality</span>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>100+</span>
              <span style={styles.statLabel}>Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>More reasons to join</h2>
          <p style={styles.sectionSubtitle}>Enjoy an ad-free experience with these amazing features</p>
        </div>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard} className="feature-card">
              <div style={styles.featureIconWrapper(feature.gradient)} className="feature-icon-wrapper">
                <span style={styles.featureIcon}>{feature.icon}</span>
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
              <div style={styles.featureShine}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section style={styles.plansSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Choose your plan</h2>
          <p style={styles.sectionSubtitle}>Switch or cancel anytime. All plans include unlimited streaming.</p>
        </div>
        <div style={styles.plansGrid}>
          {subscriptionPlans.map((plan, index) => (
            <div key={index} style={styles.planCard(plan.isPopular)} className="plan-card">
              {plan.isPopular && (
                <div style={styles.popularBadge}>
                  <span style={{ fontSize: '14px' }}>⭐</span>
                  Most Popular
                </div>
              )}
              <div style={styles.planIcon}>{plan.icon}</div>
              <h3 style={styles.planName}>{plan.name}</h3>
              <div style={styles.planPrice}>
                <span style={styles.priceAmount}>{plan.price}</span>
                <span style={styles.pricePeriod}>{plan.period}</span>
              </div>
              <div style={styles.planFeatures}>
                {plan.features.map((feature, idx) => (
                  <div key={idx} style={styles.planFeature}>
                    <span style={styles.featureCheck}>✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to={`/signup?plan=${plan.name.toLowerCase()}`} style={styles.planButton(plan.gradient)} className="btn-primary">
                {plan.buttonText} <span style={{ fontSize: '18px' }}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={styles.faqSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p style={styles.sectionSubtitle}>Got questions? We've got answers.</p>
        </div>
        <div style={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <details key={index} style={styles.faqItem} className="faq-item">
              <summary style={styles.faqQuestion}>
                <span>{faq.question}</span>
                <span style={styles.faqIcon} className="faq-icon">+</span>
              </summary>
              <div style={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBackground}></div>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to watch? Join today.</h2>
          <p style={styles.ctaDescription}>
            Get your first month free when you sign up for any plan.
          </p>
          <Link to="/signup" style={styles.ctaButton} className="btn-primary">
            Get Started <span style={{ fontSize: '20px' }}>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <span style={styles.footerLogoIcon}>▶</span>
            <span style={styles.footerLogoText}>STREAMVAULT</span>
          </div>
          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Company</h4>
              <a href="/about" style={styles.footerLink} className="footer-link">About Us</a>
              <a href="/careers" style={styles.footerLink} className="footer-link">Careers</a>
              <a href="/press" style={styles.footerLink} className="footer-link">Press</a>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Plans</h4>
              <a href="/basic" style={styles.footerLink} className="footer-link">Basic</a>
              <a href="/standard" style={styles.footerLink} className="footer-link">Standard</a>
              <a href="/premium" style={styles.footerLink} className="footer-link">Premium</a>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Support</h4>
              <a href="/help" style={styles.footerLink} className="footer-link">Help Center</a>
              <a href="/contact" style={styles.footerLink} className="footer-link">Contact Us</a>
              <a href="/faq" style={styles.footerLink} className="footer-link">FAQ</a>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Legal</h4>
              <a href="/terms" style={styles.footerLink} className="footer-link">Terms</a>
              <a href="/privacy" style={styles.footerLink} className="footer-link">Privacy</a>
              <a href="/cookies" style={styles.footerLink} className="footer-link">Cookies</a>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.footerCopyright}>&copy; 2026 StreamVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;