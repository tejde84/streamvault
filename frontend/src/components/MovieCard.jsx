import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRatingColor = () => {
    if (movie.rating >= 9) return 'text-yellow-400';
    if (movie.rating >= 8) return 'text-orange-400';
    if (movie.rating >= 7) return 'text-green-400';
    return 'text-gray-400';
  };

  return (
    <Link to={`/movie/${movie._id}`}>
      <div 
        className="relative bg-secondary rounded-lg overflow-hidden shadow-lg transform transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-28px) scale(1.14)' : 'translateY(0) scale(0.92)',
          boxShadow: isHovered 
            ? '0 30px 60px rgba(229, 9, 20, 0.28)' 
            : '0 6px 12px rgba(0, 0, 0, 0.35)',
          zIndex: isHovered ? 40 : 10
        }}
      >
        {/* Poster Image Container */}
        <div className="relative pb-[100%] bg-gray-800 overflow-hidden group">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-115 animate-pop-in' : 'scale-100'
            }`}
            style={{ filter: 'saturate(1.06) contrast(1.04)' }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-40'
          }`}></div>

          {/* Hover Action Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="text-center transform transition-transform duration-300">
              <button className={`bg-accent text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-600 transition mb-3 inline-block transform ${isHovered ? 'scale-105' : ''}`}>
                ▶ Watch Now
              </button>
              <div className="text-gray-200 text-sm space-y-1">
                <p className="font-bold">{movie.duration} min</p>
                <p className="text-xs text-gray-400">Directed by {movie.director}</p>
              </div>
              <div className="mt-3 text-xs text-gray-300 max-w-[220px] mx-auto line-clamp-3 animate-fadeIn">
                {movie.description}
              </div>
            </div>
          </div>

          {/* Rating Badge */}
          <div className={`absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1 transition-all duration-300 ${
            isHovered ? 'bg-accent/80' : 'bg-black/60'
          }`}>
            <span className="text-sm">★</span>
            <span className={`font-bold text-sm ${isHovered ? 'text-white' : getRatingColor()}`}>
              {movie.rating.toFixed(1)}
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold text-gray-300">
            {movie.releaseYear}
          </div>
        </div>
        
        {/* Movie Information - Always Visible */}
        <div className={`p-4 transition-all duration-300 ${isHovered ? 'pb-6' : ''}`}>
          <h3 className="text-white font-bold text-sm truncate mb-2 line-clamp-2">
            {movie.title}
          </h3>
          
          {/* Director */}
          <p className="text-gray-400 text-xs mb-3 truncate">
            {movie.director}
          </p>
          
          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 2).map((g, idx) => (
              <span
                key={idx}
                className="text-xs bg-accent/30 text-accent px-2 py-0.5 rounded-full border border-accent/50"
              >
                {g}
              </span>
            ))}
            {movie.genre.length > 2 && (
              <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full">
                +{movie.genre.length - 2}
              </span>
            )}
          </div>

          {/* Cast Preview - Show on Hover */}
          {isHovered && (
            <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-700 animate-fadeIn">
              <p className="font-semibold text-gray-300 mb-1">Cast:</p>
              <p className="line-clamp-2">{movie.cast.slice(0, 2).join(', ')}</p>
            </div>
          )}
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none rounded-lg border-2 border-accent/50 animate-pulse"></div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
