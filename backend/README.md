# StreamVault Backend

Express.js + MongoDB backend for the StreamVault movie streaming platform.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/streamvault
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- **POST /api/auth/signup**
  - Creates a new user account
  - Body: `{ username, email, password }`
  - Returns: `{ success, token, user }`

- **POST /api/auth/login**
  - Authenticates user and returns JWT token
  - Body: `{ email, password }`
  - Returns: `{ success, token, user }`

### Movies

- **GET /api/movies**
  - Fetches all movies
  - Returns: `{ success, data: [movies] }`

- **GET /api/movies/:id**
  - Fetches a specific movie
  - Returns: `{ success, data: movie }`

- **POST /api/movies** (Protected)
  - Creates a new movie
  - Body: Movie object
  - Returns: `{ success, data: movie }`

- **PUT /api/movies/:id** (Protected)
  - Updates a movie
  - Body: Updated movie fields
  - Returns: `{ success, data: movie }`

- **DELETE /api/movies/:id** (Protected)
  - Deletes a movie
  - Returns: `{ success, message }`

## Project Structure

```
src/
├── server.js          # Main application entry
├── db.js              # MongoDB connection
├── routes/
│   ├── auth.js        # Authentication routes
│   └── movies.js      # Movie routes
└── models/
    ├── User.js        # User schema
    └── Movie.js       # Movie schema
```

## Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## Dependencies

- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
