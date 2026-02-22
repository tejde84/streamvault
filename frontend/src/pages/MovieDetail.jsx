import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { moviesAPI } from '../utils/api';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isInMyList, setIsInMyList] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await moviesAPI.getById(id);
        if (response.data.success) {
          const movieData = response.data.data;
          setMovie(movieData);
          
          // Check if in my list
          const myList = JSON.parse(localStorage.getItem('myList') || '[]');
          setIsInMyList(myList.includes(movieData._id));

          // Fetch similar movies (mock - in real app, you'd have an API endpoint)
          const allMoviesResponse = await moviesAPI.getAll();
          if (allMoviesResponse.data.success) {
            const similar = allMoviesResponse.data.data
              .filter(m => m._id !== movieData._id)
              .filter(m => m.genre.some(g => movieData.genre.includes(g)))
              .slice(0, 6);
            setSimilarMovies(similar);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleAddToList = () => {
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    let updatedList;
    
    if (isInMyList) {
      updatedList = myList.filter(movieId => movieId !== movie._id);
    } else {
      updatedList = [...myList, movie._id];
    }
    
    localStorage.setItem('myList', JSON.stringify(updatedList));
    setIsInMyList(!isInMyList);
  };

  const handlePlay = () => {
    // In a real app, this would navigate to the video player
    setShowTrailer(true);
    setTimeout(() => setShowTrailer(false), 5000); // Simulate trailer
  };

  // Add keyframes to document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes slideUp {
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
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
      
      .hero-section {
        animation: fadeIn 0.5s ease;
      }
      
      .movie-content {
        animation: slideUp 0.5s ease 0.2s both;
      }
      
      .genre-tag:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3) !important;
      }
      
      .action-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3) !important;
      }
      
      .action-btn.play-btn {
        background: linear-gradient(135deg, #e50914 0%, #b2070f 100%) !important;
      }
      
      .action-btn.play-btn:hover {
        background: linear-gradient(135deg, #f40612 0%, #c20810 100%) !important;
      }
      
      .tab-btn.active {
        color: #e50914 !important;
        border-bottom-color: #e50914 !important;
      }
      
      .tab-btn:hover {
        color: #e50914 !important;
      }
      
      .similar-card:hover {
        transform: translateY(-10px) !important;
        border-color: #e50914 !important;
        box-shadow: 0 20px 30px rgba(229, 9, 20, 0.2) !important;
      }
      
      .back-btn:hover {
        color: #e50914 !important;
        transform: translateX(-5px) !important;
      }
      
      .trailer-modal {
        animation: fadeIn 0.3s ease;
      }
      
      .close-btn:hover {
        background: #e50914 !important;
        transform: scale(1.1) !important;
      }
      
      .loading-shimmer {
        background: linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
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
    // Loading State
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#141414',
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '3px solid rgba(229, 9, 20, 0.1)',
      borderTopColor: '#e50914',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px',
    },
    loadingText: {
      fontSize: '18px',
      color: '#b3b3b3',
    },
    // Error State
    errorContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#141414',
      padding: '20px',
    },
    errorIcon: {
      fontSize: '64px',
      marginBottom: '20px',
    },
    errorTitle: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#e50914',
      marginBottom: '12px',
    },
    errorText: {
      fontSize: '16px',
      color: '#b3b3b3',
      marginBottom: '24px',
    },
    retryBtn: {
      background: '#e50914',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 30px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    // Hero Section
    heroSection: {
      position: 'relative',
      height: '55vh',
      minHeight: '480px',
      overflow: 'hidden',
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    heroGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,0.7) 50%, #141414 100%)',
    },
    heroContent: {
      position: 'absolute',
      bottom: '100px',
      left: '50px',
      right: '50px',
      maxWidth: '800px',
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 800,
      marginBottom: '12px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    heroMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '20px',
    },
    heroMatch: {
      color: '#46d369',
      fontWeight: 600,
      fontSize: '18px',
    },
    heroYear: {
      color: '#e5e5e5',
      fontSize: '18px',
    },
    heroDuration: {
      color: '#e5e5e5',
      fontSize: '18px',
    },
    heroRating: {
      background: 'rgba(255,255,255,0.2)',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '16px',
      border: '1px solid rgba(255,255,255,0.3)',
    },
    // Action Buttons
    actionButtons: {
      display: 'flex',
      gap: '16px',
      marginBottom: '30px',
    },
    playBtn: {
      background: 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 40px',
      fontSize: '18px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    listBtn: (isInList) => ({
      background: isInList ? 'rgba(255,255,255,0.2)' : 'rgba(42,42,42,0.8)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '4px',
      padding: '12px 30px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }),
    // Main Content
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 40px',
      marginTop: '-80px',
      position: 'relative',
      zIndex: 2,
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '40px',
    },
    // Left Column
    leftColumn: {
      animation: 'slideUp 0.5s ease',
    },
    // Tabs
    tabs: {
      display: 'flex',
      gap: '30px',
      borderBottom: '1px solid #333333',
      marginBottom: '30px',
    },
    tab: (active) => ({
      background: 'none',
      border: 'none',
      color: active ? '#e50914' : '#b3b3b3',
      fontSize: '18px',
      fontWeight: 600,
      padding: '12px 0',
      cursor: 'pointer',
      borderBottom: active ? '2px solid #e50914' : '2px solid transparent',
      transition: 'all 0.2s ease',
    }),
    // About Tab
    aboutSection: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#e5e5e5',
      marginBottom: '16px',
    },
    description: {
      fontSize: '16px',
      lineHeight: 1.8,
      color: '#b3b3b3',
      marginBottom: '30px',
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginBottom: '30px',
    },
    detailItem: {
      marginBottom: '16px',
    },
    detailLabel: {
      fontSize: '14px',
      color: '#808080',
      marginBottom: '4px',
    },
    detailValue: {
      fontSize: '16px',
      color: '#e5e5e5',
      fontWeight: 500,
    },
    // Genres
    genres: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '30px',
    },
    genreTag: {
      background: 'rgba(229, 9, 20, 0.1)',
      border: '1px solid rgba(229, 9, 20, 0.3)',
      color: '#e5e5e5',
      padding: '8px 20px',
      borderRadius: '30px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    // Cast List
    castList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '30px',
    },
    castItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    castAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#2a2a2a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      color: '#808080',
    },
    castName: {
      fontSize: '15px',
      color: '#e5e5e5',
    },
    // Right Column
    rightColumn: {
      animation: 'slideUp 0.5s ease 0.1s both',
    },
    infoCard: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #242424 100%)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #333333',
      marginBottom: '24px',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #333333',
    },
    infoRowLast: {
      borderBottom: 'none',
    },
    infoLabel: {
      color: '#808080',
      fontSize: '14px',
    },
    infoValue: {
      color: '#e5e5e5',
      fontSize: '14px',
      fontWeight: 500,
    },
    // Similar Movies
    similarSection: {
      marginTop: '60px',
      marginBottom: '40px',
    },
    similarTitle: {
      fontSize: '24px',
      fontWeight: 600,
      color: 'white',
      marginBottom: '24px',
    },
    similarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '16px',
    },
    similarCard: {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    similarPoster: {
      width: '100%',
      aspectRatio: '2/3',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '8px',
      border: '2px solid transparent',
    },
    similarImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    similarMovieTitle: {
      fontSize: '14px',
      color: '#e5e5e5',
      marginBottom: '4px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    similarMovieYear: {
      fontSize: '12px',
      color: '#808080',
    },
    // Back Button
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      color: '#b3b3b3',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '24px',
      transition: 'all 0.3s ease',
    },
    // Trailer Modal
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      position: 'relative',
      width: '90%',
      maxWidth: '900px',
      background: '#1a1a1a',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    modalVideo: {
      width: '100%',
      aspectRatio: '16/9',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalText: {
      color: 'white',
      fontSize: '18px',
      textAlign: 'center',
    },
    modalClose: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(42,42,42,0.8)',
      border: '1px solid #404040',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
  };

  // Responsive styles
  const responsiveStyles = `
    @media (max-width: 1200px) {
      .content-grid {
        grid-template-columns: 1fr !important;
      }
      
      .similar-grid {
        grid-template-columns: repeat(4, 1fr) !important;
      }
    }
    
    @media (max-width: 992px) {
      .hero-title {
        font-size: 48px !important;
      }
      
      .hero-content {
        left: 30px !important;
        right: 30px !important;
      }
      
      .similar-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
    
    @media (max-width: 768px) {
      .hero-section {
        height: 60vh !important;
      }
      
      .hero-title {
        font-size: 36px !important;
      }
      
      .hero-content {
        left: 20px !important;
        right: 20px !important;
        bottom: 50px !important;
      }
      
      .action-buttons {
        flex-direction: column !important;
      }
      
      .main-content {
        padding: 0 20px !important;
      }
      
      .details-grid {
        grid-template-columns: 1fr !important;
      }
      
      .cast-list {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      
      .similar-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    
    @media (max-width: 480px) {
      .hero-meta {
        flex-wrap: wrap !important;
      }
      
      .similar-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <div style={styles.loadingText}>Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>🎬</div>
        <h2 style={styles.errorTitle}>Oops! Movie Not Found</h2>
        <p style={styles.errorText}>
          {error || "We couldn't find the movie you're looking for."}
        </p>
        <button
          onClick={() => navigate('/')}
          style={styles.retryBtn}
          className="retry-btn"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Inject responsive styles */}
      <style>{responsiveStyles}</style>

      {/* Trailer Modal */}
      {showTrailer && (
        <div style={styles.modalOverlay} className="trailer-modal">
          <div style={styles.modalContent}>
            <div style={styles.modalVideo}>
              <div style={styles.modalText}>
                🎬 Playing trailer for {movie.title}
                <br />
                <small>(Demo - In production, actual video would play)</small>
              </div>
            </div>
            <button
              style={styles.modalClose}
              className="close-btn"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section style={styles.heroSection} className="hero-section">
        <img
          src={movie.posterUrl || 'https://via.placeholder.com/1920x1080/333333/666666?text=Movie+Poster'}
          alt={movie.title}
          style={styles.heroImage}
        />
        <div style={styles.heroGradient}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{movie.title}</h1>
          <div style={styles.heroMeta}>
            <span style={styles.heroMatch}>98% Match</span>
            <span style={styles.heroYear}>{movie.releaseYear}</span>
            <span style={styles.heroDuration}>{movie.duration} min</span>
            <span style={styles.heroRating}>{movie.rating.toFixed(1)} ★</span>
          </div>
          <div style={styles.actionButtons} className="action-buttons">
            <button
              style={styles.playBtn}
              className="action-btn play-btn"
              onClick={handlePlay}
            >
              ▶ Play
            </button>
            <button
              style={styles.listBtn(isInMyList)}
              className="action-btn"
              onClick={handleAddToList}
            >
              {isInMyList ? '✓ In My List' : '+ My List'}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={styles.mainContent} className="main-content">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={styles.backButton}
          className="back-btn"
        >
          ← Back to Movies
        </button>

        {/* Content Grid */}
        <div style={styles.contentGrid} className="content-grid">
          {/* Left Column */}
          <div style={styles.leftColumn} className="movie-content">
            {/* Tabs */}
            <div style={styles.tabs}>
              <button
                style={styles.tab(activeTab === 'about')}
                className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                style={styles.tab(activeTab === 'details')}
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                style={styles.tab(activeTab === 'cast')}
                className={`tab-btn ${activeTab === 'cast' ? 'active' : ''}`}
                onClick={() => setActiveTab('cast')}
              >
                Cast
              </button>
            </div>

            {/* About Tab */}
            {activeTab === 'about' && (
              <div style={styles.aboutSection}>
                <h3 style={styles.sectionTitle}>Synopsis</h3>
                <p style={styles.description}>
                  {movie.description && movie.description.length > 320 ? (
                    <>
                      {showFullDesc ? movie.description : `${movie.description.slice(0, 320)}...`}
                      <button
                        onClick={() => setShowFullDesc(!showFullDesc)}
                        style={{
                          marginLeft: 12,
                          background: 'transparent',
                          border: 'none',
                          color: '#e50914',
                          cursor: 'pointer',
                          fontWeight: 700,
                        }}
                      >
                        {showFullDesc ? 'Read less' : 'Read more'}
                      </button>
                    </>
                  ) : (
                    movie.description
                  )}
                </p>

                <h3 style={styles.sectionTitle}>Genres</h3>
                <div style={styles.genres}>
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      style={styles.genreTag}
                      className="genre-tag"
                      onClick={() => navigate(`/?genre=${g}`)}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Director</div>
                  <div style={styles.detailValue}>{movie.director}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Release Year</div>
                  <div style={styles.detailValue}>{movie.releaseYear}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Duration</div>
                  <div style={styles.detailValue}>{movie.duration} minutes</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Rating</div>
                  <div style={styles.detailValue}>{movie.rating.toFixed(1)} / 10</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Language</div>
                  <div style={styles.detailValue}>English</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Subtitles</div>
                  <div style={styles.detailValue}>Multiple Languages</div>
                </div>
              </div>
            )}

            {/* Cast Tab */}
            {activeTab === 'cast' && (
              <div style={styles.castList}>
                {movie.cast.map((actor, index) => (
                  <div key={index} style={styles.castItem}>
                    <div style={styles.castAvatar}>
                      {actor.charAt(0)}
                    </div>
                    <span style={styles.castName}>{actor}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            <div style={styles.infoCard}>
              <div style={{ ...styles.infoRow, ...styles.infoRowLast }}>
                <span style={styles.infoLabel}>Audio</span>
                <span style={styles.infoValue}>5.1, Dolby Atmos</span>
              </div>
              <div style={{ ...styles.infoRow, ...styles.infoRowLast }}>
                <span style={styles.infoLabel}>Subtitles</span>
                <span style={styles.infoValue}>English, Spanish, French</span>
              </div>
              <div style={{ ...styles.infoRow, ...styles.infoRowLast }}>
                <span style={styles.infoLabel}>Quality</span>
                <span style={styles.infoValue}>4K, HDR10</span>
              </div>
            </div>

            <div style={styles.infoCard}>
              <div style={{ ...styles.infoRow, ...styles.infoRowLast }}>
                <span style={styles.infoLabel}>Added to StreamVault</span>
                <span style={styles.infoValue}>2024</span>
              </div>
              <div style={{ ...styles.infoRow, ...styles.infoRowLast }}>
                <span style={styles.infoLabel}>Country</span>
                <span style={styles.infoValue}>USA</span>
              </div>
              <div style={{ ...styles.infoRow, ...styles.infoRowLast }}>
                <span style={styles.infoLabel}>Awards</span>
                <span style={styles.infoValue}>3 Oscar Nominations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div style={styles.similarSection}>
            <h3 style={styles.similarTitle}>More Like This</h3>
            <div style={styles.similarGrid} className="similar-grid">
              {similarMovies.map((similar) => (
                <div
                  key={similar._id}
                  style={styles.similarCard}
                  className="similar-card"
                  onClick={() => navigate(`/movie/${similar._id}`)}
                >
                  <div style={styles.similarPoster}>
                    <img
                      src={similar.posterUrl || 'https://via.placeholder.com/200x300/333333/666666?text=Movie'}
                      alt={similar.title}
                      style={styles.similarImage}
                    />
                  </div>
                  <div style={styles.similarMovieTitle}>{similar.title}</div>
                  <div style={styles.similarMovieYear}>{similar.releaseYear}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;