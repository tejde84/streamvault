const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all available genres - MUST BE BEFORE /:id route
router.get('/genres/list', async (req, res) => {
  try {
    const genres = await Movie.distinct('genre');
    res.status(200).json({
      success: true,
      data: genres.sort(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all movies with search, filter, and sort
router.get('/', async (req, res) => {
  try {
    const { search, genre, sortBy } = req.query;
    let query = {};

    // Search by title or director
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by genre
    if (genre) {
      query.genre = { $in: [genre] };
    }

    let moviesQuery = Movie.find(query);

    // Sort options
    if (sortBy === 'rating-desc') {
      moviesQuery = moviesQuery.sort({ rating: -1 });
    } else if (sortBy === 'rating-asc') {
      moviesQuery = moviesQuery.sort({ rating: 1 });
    } else if (sortBy === 'year-desc') {
      moviesQuery = moviesQuery.sort({ releaseYear: -1 });
    } else if (sortBy === 'year-asc') {
      moviesQuery = moviesQuery.sort({ releaseYear: 1 });
    } else if (sortBy === 'title') {
      moviesQuery = moviesQuery.sort({ title: 1 });
    } else {
      moviesQuery = moviesQuery.sort({ createdAt: -1 });
    }

    const movies = await moviesQuery;

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new movie (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update movie (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete movie (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
