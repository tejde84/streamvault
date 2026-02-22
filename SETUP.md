# StreamVault Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

## Step-by-Step Setup

### 1. Start MongoDB
First, ensure MongoDB is running on your system:

```bash
# For Windows (if MongoDB is installed)
mongo

# Or using MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env with your connection string
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Seed the database with sample movies
npm run seed

# Output should show:
# Connected to MongoDB
# Cleared existing movies
# Successfully inserted 8 movies
# Database seeded successfully!

# Start the development server
npm run dev
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup (in a new terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

## Testing the Application

1. **Home Page**: Open `http://localhost:3000` to see all movies with carousel
2. **Search**: Use the search bar in the navbar to find movies by title or director
3. **Filter**: Use the genre dropdown to filter movies
4. **Sort**: Sort by rating, year, title, or latest added
5. **Movie Details**: Click any movie card to see full details
6. **Authentication**: 
   - Sign up for a new account
   - Login with your credentials
   - Your authentication token is stored in localStorage

## Enhanced Features

### ✨ New Features Added:

1. **Advanced Search**
   - Search by movie title
   - Search by director name
   - Search by description keywords

2. **Genre Filtering**
   - Filter movies by genre
   - Dynamically fetches available genres from database

3. **Smart Sorting**
   - Latest Added
   - Title (A-Z)
   - Rating (High to Low / Low to High)
   - Release Year (Newest / Oldest)

4. **Improved UI/UX**
   - Enhanced navbar with search bar
   - Better carousel with improved indicators
   - Hover effects on movie cards
   - Better color scheme and typography
   - Responsive design for all devices

5. **Database Seeding**
   - Automated script to populate database with 8 sample movies
   - Easy reset capability

## Troubleshooting

### "No movies found"
- Ensure MongoDB is running
- Run `npm run seed` in the backend directory
- Check MongoDB connection in `.env` file

### "Cannot connect to backend"
- Verify backend is running on port 5000
- Check `http://localhost:5000/api/health`
- Ensure CORS is enabled in backend

### "Genres not loading"
- The app has a fallback to extract genres from movies
- Check browser console for any errors

### Port Already in Use
- Backend: Change PORT in `.env` file
- Frontend: Change port in `vite.config.js`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login user

### Movies
- `GET /api/movies` - Get all movies (supports search, genre, sortBy params)
- `GET /api/movies/genres/list` - Get all available genres
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create movie (requires auth)
- `PUT /api/movies/:id` - Update movie (requires auth)
- `DELETE /api/movies/:id` - Delete movie (requires auth)

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/streamvault
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend
- API base URL is set to `http://localhost:5000/api`
- Modify in `src/utils/api.js` if needed

## Project Structure

```
streamvault/
├── backend/           # Express.js server
│   ├── src/
│   │   ├── server.js
│   │   ├── db.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── movies.js
│   │   └── models/
│   │       ├── User.js
│   │       └── Movie.js
│   ├── seed.js        # Database seeding script
│   └── package.json
│
├── frontend/          # React app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── dataset/           # Sample movies data
│   └── movies.json
│
└── README.md
```

## Production Build

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Backend
Ensure all environment variables are set for production and run:
```bash
npm start
```

## Support

For issues or questions, check:
1. Console for error messages
2. Network tab in DevTools for API responses
3. MongoDB connection status
4. Backend/frontend server logs
