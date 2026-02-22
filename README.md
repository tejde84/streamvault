# StreamVault

A modern movie streaming platform built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (Signup/Login)
- Browse and search movies
- Movie details and information
- Responsive design with TailwindCSS

## Project Structure

```
streamvault/
├── backend/          # Node.js + Express + MongoDB
├── frontend/         # React + TailwindCSS
├── dataset/          # Sample movie data
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Environment Variables

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb://localhost:27017/streamvault
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies` - Add new movie (admin only)

## Technologies

- **Frontend**: React, TailwindCSS, Axios
- **Backend**: Node.js, Express, MongoDB, JWT
- **Database**: MongoDB
