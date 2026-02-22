# StreamVault Frontend

React + TailwindCSS frontend for the StreamVault movie streaming platform.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

The application will run on `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx            # Main application component
├── main.jsx           # Entry point
├── index.css          # Global styles
├── pages/
│   ├── Home.jsx       # Home page with movies catalog
│   ├── Login.jsx      # Login page
│   ├── Signup.jsx     # Signup page
│   └── MovieDetail.jsx # Movie details page
├── components/
│   ├── Navbar.jsx     # Navigation bar
│   ├── MovieCard.jsx  # Movie card component
│   └── Carousel.jsx   # Featured movies carousel
└── utils/
    └── api.js         # API client with Axios
```

## Features

- **Authentication**: User signup and login with JWT
- **Movie Catalog**: Browse all available movies
- **Movie Details**: View detailed information about each movie
- **Responsive Design**: Works on desktop and mobile devices
- **User Session**: Authentication state persisted in localStorage

## Technologies

- **React** - UI library
- **Vite** - Build tool
- **TailwindCSS** - CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`. Make sure the backend is running before starting the frontend.

### Available API Calls

**Authentication:**
- Sign up: `POST /auth/signup`
- Login: `POST /auth/login`

**Movies:**
- Get all movies: `GET /movies`
- Get movie by ID: `GET /movies/:id`
- Create movie: `POST /movies` (requires auth)
- Update movie: `PUT /movies/:id` (requires auth)
- Delete movie: `DELETE /movies/:id` (requires auth)

## Environment Variables

Create a `.env` file if needed for API configuration (currently using hardcoded localhost URL).

## Development Tips

- The navbar shows login/signup buttons when not authenticated
- After login, the token is stored in localStorage
- API requests automatically include the token in headers
- Use the carousel on the home page to browse featured movies
- Click on any movie card to view details
