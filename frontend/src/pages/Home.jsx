import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import MovieCard from '../components/MovieCard';
import CategorySection from '../components/CategorySection';
import { moviesAPI } from '../utils/api';

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [genreMovies, setGenreMovies] = useState([]);

  // Fetch movies and genres
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch movies
        const moviesResponse = await moviesAPI.getAll();
        if (moviesResponse.data.success) {
          const allMovies = moviesResponse.data.data;
          setMovies(allMovies);

          // Extract categories from movies
          const allCategories = new Set();
          allMovies.forEach(movie => {
            if (movie.categories && Array.isArray(movie.categories)) {
              movie.categories.forEach(cat => allCategories.add(cat));
            }
          });
          const sortedCategories = Array.from(allCategories).sort();
          setCategories(sortedCategories);

          // Set trending movies (highest rated)
          const trending = [...allMovies]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 10);
          setTrendingMovies(trending);

          // Set popular movies (most recent)
          const popular = [...allMovies]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);
          setPopularMovies(popular);

          // Set genre movies (all for now)
          setGenreMovies(allMovies);

          // Simulate continue watching from localStorage
          const watched = JSON.parse(localStorage.getItem('continueWatching') || '[]');
          const continueList = allMovies.filter(movie => 
            watched.some(w => w.movieId === movie._id)
          );
          setContinueWatching(continueList);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter movies by genre
  useEffect(() => {
    if (selectedGenre === 'all') {
      setGenreMovies(movies);
    } else {
      const filtered = movies.filter(movie => 
        movie.genre && movie.genre.includes(selectedGenre)
      );
      setGenreMovies(filtered);
    }
  }, [selectedGenre, movies]);

  // Get unique genres from movies
  const getAllGenres = () => {
    const allGenres = new Set();
    movies.forEach(movie => {
      if (movie.genre && Array.isArray(movie.genre)) {
        movie.genre.forEach(g => allGenres.add(g));
      }
    });
    return Array.from(allGenres).sort();
  };

  const genres = getAllGenres();

  // Handle genre click
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    // Scroll to genre section
    document.getElementById('genre-section')?.scrollIntoView({ behavior: 'smooth' });
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
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      .genre-chip {
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .genre-chip:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
      }
      
      .genre-chip.active {
        background: linear-gradient(135deg, #e50914 0%, #b2070f 100%);
        color: white;
        border-color: transparent;
      }
      
      .movie-card-wrapper {
        animation: slideUp 0.5s ease forwards;
        opacity: 0;
      }
      
      .movie-card-wrapper:nth-child(1) { animation-delay: 0.1s; }
      .movie-card-wrapper:nth-child(2) { animation-delay: 0.15s; }
      .movie-card-wrapper:nth-child(3) { animation-delay: 0.2s; }
      .movie-card-wrapper:nth-child(4) { animation-delay: 0.25s; }
      .movie-card-wrapper:nth-child(5) { animation-delay: 0.3s; }
      .movie-card-wrapper:nth-child(6) { animation-delay: 0.35s; }
      .movie-card-wrapper:nth-child(7) { animation-delay: 0.4s; }
      .movie-card-wrapper:nth-child(8) { animation-delay: 0.45s; }
      .movie-card-wrapper:nth-child(9) { animation-delay: 0.5s; }
      .movie-card-wrapper:nth-child(10) { animation-delay: 0.55s; }
      
      .category-arrow:hover {
        background: #e50914 !important;
        transform: scale(1.1) !important;
      }
      
      .view-all-btn:hover {
        color: #e50914 !important;
        transform: translateX(5px) !important;
      }

      /* Make carousel bigger */
      .carousel-section {
        margin-bottom: 30px !important;
        transform: scale(1.05) !important;
        transform-origin: top center !important;
      }

      /* Make movie cards smaller */
      .movies-grid {
        gap: 16px !important;
      }

      .movie-card-wrapper {
        transform: scale(0.95) !important;
        transition: transform 0.3s ease !important;
      }

      .movie-card-wrapper:hover {
        transform: scale(1) !important;
        z-index: 10 !important;
      }

      /* Adjust category headers for better spacing */
      .category-header {
        margin-bottom: 15px !important;
      }

      .category-title {
        font-size: 22px !important;
      }

      /* Responsive adjustments */
      @media (min-width: 1400px) {
        .movies-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
      }

      @media (max-width: 1200px) {
        .movies-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
      }

      @media (max-width: 992px) {
        .movies-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .carousel-section {
          transform: scale(1) !important;
        }
      }

      @media (max-width: 768px) {
        .movies-grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 12px !important;
        }
        
        .movie-card-wrapper {
          transform: scale(0.98) !important;
        }
        
        .genre-chip {
          padding: 6px 12px !important;
          font-size: 12px !important;
        }
        
        .category-title {
          font-size: 20px !important;
        }
      }

      @media (max-width: 480px) {
        .movies-grid {
          grid-template-columns: 1fr !important;
        }
        
        .genre-chips {
          justify-content: center !important;
        }
        
        .movie-card-wrapper {
          transform: scale(1) !important;
        }
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
    // Main Content
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px 40px 60px',
    },
    // Carousel Section - Made bigger
    carouselSection: {
      marginBottom: '30px',
      transform: 'scale(1.05)',
      transformOrigin: 'top center',
    },
    // Genre Chips
    genreSection: {
      marginBottom: '30px',
    },
    genreTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#e5e5e5',
      marginBottom: '16px',
    },
    genreChips: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
    },
    genreChip: (isActive) => ({
      padding: '8px 20px',
      borderRadius: '30px',
      fontSize: '14px',
      fontWeight: 500,
      background: isActive ? 'linear-gradient(135deg, #e50914 0%, #b2070f 100%)' : '#2a2a2a',
      border: isActive ? 'none' : '1px solid #404040',
      color: isActive ? 'white' : '#b3b3b3',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
    // Category Section
    categorySection: {
      marginBottom: '40px',
    },
    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    categoryTitle: {
      fontSize: '22px',
      fontWeight: 600,
      color: 'white',
    },
    categoryNav: {
      display: 'flex',
      gap: '12px',
    },
    categoryArrow: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: '#2a2a2a',
      border: '1px solid #404040',
      color: 'white',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewAllBtn: {
      background: 'none',
      border: 'none',
      color: '#b3b3b3',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    // Movies Grid - Made smaller with reduced gap
    moviesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
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
      fontSize: '48px',
      marginBottom: '20px',
    },
    errorText: {
      fontSize: '20px',
      color: '#e50914',
      marginBottom: '20px',
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
    // Empty State
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #242424 100%)',
      borderRadius: '16px',
      border: '1px solid #333333',
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '20px',
      opacity: 0.5,
    },
    emptyTitle: {
      fontSize: '24px',
      fontWeight: 600,
      color: 'white',
      marginBottom: '12px',
    },
    emptyText: {
      fontSize: '16px',
      color: '#b3b3b3',
      marginBottom: '24px',
    },
  };

  // Responsive styles
  const responsiveStyles = `
    @media (max-width: 1200px) {
      .movies-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
    
    @media (max-width: 992px) {
      .movies-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      
      .carousel-section {
        transform: scale(1) !important;
      }
    }
    
    @media (max-width: 768px) {
      .movies-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 12px !important;
      }
      
      .category-header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 12px !important;
      }
      
      .category-title {
        font-size: 20px !important;
      }
    }
    
    @media (max-width: 480px) {
      .movies-grid {
        grid-template-columns: 1fr !important;
      }
      
      .genre-chips {
        justify-content: center !important;
      }
    }
  `;

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <div style={styles.loadingText}>Loading movies...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>😢</div>
          <div style={styles.errorText}>Error: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.retryBtn}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Inject responsive styles */}
      <style>{responsiveStyles}</style>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Carousel Section - Made bigger */}
        {movies.length > 0 && (
          <div style={styles.carouselSection} className="carousel-section">
            <Carousel movies={trendingMovies} />
          </div>
        )}

        {/* Genre Chips */}
        <div style={styles.genreSection} id="genre-section">
          <h3 style={styles.genreTitle}>Browse by Genre</h3>
          <div style={styles.genreChips} className="genre-chips">
            <button
              style={styles.genreChip(selectedGenre === 'all')}
              className={`genre-chip ${selectedGenre === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedGenre('all')}
            >
              All
            </button>
            {genres.map((genre) => (
              <button
                key={genre}
                style={styles.genreChip(selectedGenre === genre)}
                className={`genre-chip ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Watching Section */}
        {continueWatching.length > 0 && (
          <div style={styles.categorySection}>
            <div style={styles.categoryHeader}>
              <h2 style={styles.categoryTitle}>Continue Watching</h2>
              <div style={styles.categoryNav}>
                <button style={styles.categoryArrow} className="category-arrow">←</button>
                <button style={styles.categoryArrow} className="category-arrow">→</button>
                <button style={styles.viewAllBtn} className="view-all-btn">
                  View All <span style={{ fontSize: '18px' }}>→</span>
                </button>
              </div>
            </div>
            <div style={styles.moviesGrid} className="movies-grid">
              {continueWatching.slice(0, 4).map((movie) => (
                <div key={movie._id} className="movie-card-wrapper">
                  <MovieCard movie={movie} showProgress />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Now Section */}
        {trendingMovies.length > 0 && (
          <div style={styles.categorySection}>
            <div style={styles.categoryHeader}>
              <h2 style={styles.categoryTitle}>Trending Now</h2>
              <div style={styles.categoryNav}>
                <button style={styles.categoryArrow} className="category-arrow">←</button>
                <button style={styles.categoryArrow} className="category-arrow">→</button>
                <button style={styles.viewAllBtn} className="view-all-btn">
                  View All <span style={{ fontSize: '18px' }}>→</span>
                </button>
              </div>
            </div>
            <div style={styles.moviesGrid} className="movies-grid">
              {trendingMovies.slice(0, 4).map((movie) => (
                <div key={movie._id} className="movie-card-wrapper">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular on StreamVault */}
        {popularMovies.length > 0 && (
          <div style={styles.categorySection}>
            <div style={styles.categoryHeader}>
              <h2 style={styles.categoryTitle}>Popular on StreamVault</h2>
              <div style={styles.categoryNav}>
                <button style={styles.categoryArrow} className="category-arrow">←</button>
                <button style={styles.categoryArrow} className="category-arrow">→</button>
                <button style={styles.viewAllBtn} className="view-all-btn">
                  View All <span style={{ fontSize: '18px' }}>→</span>
                </button>
              </div>
            </div>
            <div style={styles.moviesGrid} className="movies-grid">
              {popularMovies.slice(0, 4).map((movie) => (
                <div key={movie._id} className="movie-card-wrapper">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Genre-based Movie Grid */}
        {genreMovies.length > 0 ? (
            <div style={styles.categorySection}>
              <div style={styles.categoryHeader}>
                <h2 style={styles.categoryTitle}>
                  {selectedGenre === 'all' ? 'All Movies' : `${selectedGenre} Movies`}
                </h2>
                <div style={styles.categoryNav}>
                  <button style={styles.viewAllBtn} className="view-all-btn">
                    View All <span style={{ fontSize: '18px' }}>→</span>
                  </button>
                </div>
              </div>
              <div style={styles.moviesGrid} className="movies-grid">
                {genreMovies.slice(0, 8).map((movie) => (
                  <div key={movie._id} className="movie-card-wrapper">
                    <div className="p-1">
                      <MovieCard movie={movie} />
                    </div>
                  </div>
                ))}
              </div>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🎬</div>
            <h3 style={styles.emptyTitle}>No movies found</h3>
            <p style={styles.emptyText}>
              We couldn't find any movies in this genre. Try selecting another genre.
            </p>
          </div>
        )}

        {/* Dynamic Categories */}
        {categories.length > 0 && selectedGenre === 'all' && (
          <>
            {categories.map((category) => {
              const categoryMovies = movies.filter(
                movie => movie.categories && movie.categories.includes(category)
              );
              if (categoryMovies.length === 0) return null;
              
              return (
                <div key={category} style={styles.categorySection}>
                  <div style={styles.categoryHeader}>
                    <h2 style={styles.categoryTitle}>{category}</h2>
                    <div style={styles.categoryNav}>
                      <button style={styles.categoryArrow} className="category-arrow">←</button>
                      <button style={styles.categoryArrow} className="category-arrow">→</button>
                      <button style={styles.viewAllBtn} className="view-all-btn">
                        View All <span style={{ fontSize: '18px' }}>→</span>
                      </button>
                    </div>
                  </div>
                  <div style={styles.moviesGrid} className="movies-grid">
                    {categoryMovies.slice(0, 4).map((movie) => (
                      <div key={movie._id} className="movie-card-wrapper">
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;