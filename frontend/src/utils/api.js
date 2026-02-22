import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication endpoints
export const authAPI = {
  signup: (username, email, password, plan) =>
    api.post('/auth/signup', { username, email, password, plan }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

// Movie endpoints
export const moviesAPI = {
  getAll: (search, genre, sortBy) => {
    let params = new URLSearchParams();
    if (search) params.append('search', search);
    if (genre) params.append('genre', genre);
    if (sortBy) params.append('sortBy', sortBy);
    
    const queryString = params.toString();
    return api.get(`/movies${queryString ? '?' + queryString : ''}`);
  },
  getById: (id) => api.get(`/movies/${id}`),
  getGenres: () => api.get('/movies/genres/list'),
  create: (movieData) => api.post('/movies', movieData),
  update: (id, movieData) => api.put(`/movies/${id}`, movieData),
  delete: (id) => api.delete(`/movies/${id}`),
};

export default api;
