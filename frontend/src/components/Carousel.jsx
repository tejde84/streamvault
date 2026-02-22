import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isHovered) return; // Pause auto-rotate on hover
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length, isHovered]);

  if (!movies.length) return null;

  const currentMovie = movies[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  return (
    <div 
      className="relative w-full h-72 bg-primary overflow-hidden rounded-xl shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Image with Zoom Effect */}
      <img
        src={currentMovie.posterUrl}
        alt={currentMovie.title}
        className={`w-full h-full object-cover transition-transform duration-700 ${
          isHovered ? 'scale-118 animate-pop-in' : 'scale-100'
        }`}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent transition-opacity duration-300 ${
        isHovered ? 'opacity-90' : 'opacity-80'
      }`}></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/70 to-transparent">
        {/* Tags/Categories */}
        {currentMovie.categories && currentMovie.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {currentMovie.categories.slice(0, 4).map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs bg-accent/30 text-accent px-3 py-1 rounded-full border border-accent/50 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-5xl font-bold text-white mb-4 transform transition-all duration-300 line-clamp-2">
          {currentMovie.title}
        </h2>
        
        <div className="flex gap-4 mb-6 text-gray-300 items-center flex-wrap">
          <span className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-lg">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="font-bold">{currentMovie.rating.toFixed(1)}</span>
            <span className="text-xs">/10</span>
          </span>
          <span className="text-gray-500">•</span>
          <span className="bg-black/50 px-3 py-1 rounded-lg">{currentMovie.releaseYear}</span>
          <span className="text-gray-500">•</span>
          <span className="bg-black/50 px-3 py-1 rounded-lg">{currentMovie.duration} min</span>
          {currentMovie.genre && currentMovie.genre.length > 0 && (
            <>
              <span className="text-gray-500">•</span>
              <span className="bg-black/50 px-3 py-1 rounded-lg">{currentMovie.genre[0]}</span>
            </>
          )}
        </div>

        <p className="text-gray-200 mb-6 line-clamp-2 text-lg max-w-3xl leading-relaxed">
          {currentMovie.description}
        </p>

        {/* Director and Cast Info */}
        {currentMovie.director && (
          <p className="text-gray-300 mb-6 text-sm">
            <span className="font-semibold text-accent">Director:</span> {currentMovie.director}
            {currentMovie.cast && currentMovie.cast.length > 0 && (
              <>
                <span className="text-gray-500"> | </span>
                <span className="font-semibold text-accent">Cast:</span> {currentMovie.cast.slice(0, 2).join(', ')}
              </>
            )}
          </p>
        )}

        <div className="flex gap-4">
          <button 
            onClick={() => navigate(`/movie/${currentMovie._id}`)}
            className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-red-600 transition font-bold flex items-center gap-2 text-lg transform hover:scale-105 active:scale-95"
          >
            ▶ Watch Now
          </button>
          <button 
            onClick={() => navigate(`/movie/${currentMovie._id}`)}
            className="bg-gray-700/80 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition font-bold text-lg border border-gray-600 transform hover:scale-105 active:scale-95"
          >
            ℹ More Info
          </button>
        </div>
      </div>

      {/* Navigation Buttons - Show on Hover */}
      <>
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-accent/80 hover:bg-accent text-white p-3 rounded-full transition text-2xl shadow-xl hover:scale-110 active:scale-95"
          aria-label="Previous movie"
        >
          ❮
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-accent/80 hover:bg-accent text-white p-3 rounded-full transition text-2xl shadow-xl hover:scale-110 active:scale-95"
          aria-label="Next movie"
        >
          ❯
        </button>
      </>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'bg-accent w-8 h-3' 
                : 'bg-gray-500/60 w-2 h-2 hover:bg-gray-400'
            }`}
            aria-label={`Go to movie ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
