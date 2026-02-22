import React, { useState } from 'react';
import MovieCard from './MovieCard';

const CategorySection = ({ category, movies, onCategoryClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const visibleMovies = movies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-12">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">
            {category}
          </h2>
          <div className="h-1 w-16 bg-accent rounded"></div>
        </div>
        <span className="text-gray-400 text-sm">
          {movies.length} movies
        </span>
      </div>

      {/* Movies Grid with Navigation */}
      <div className="relative">
        {/* Movie Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {visibleMovies.map((movie) => (
            <div key={movie._id} className="transform transition hover:z-10">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              className="bg-accent/20 hover:bg-accent/40 text-white px-4 py-2 rounded-lg border border-accent/50 transition flex items-center gap-2 group"
            >
              <span className="transform group-hover:-translate-x-1 transition">←</span>
              Previous
            </button>

            {/* Page Indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === currentPage
                      ? 'bg-accent'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-accent/20 hover:bg-accent/40 text-white px-4 py-2 rounded-lg border border-accent/50 transition flex items-center gap-2 group"
            >
              Next
              <span className="transform group-hover:translate-x-1 transition">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
