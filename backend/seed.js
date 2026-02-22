require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./src/models/Movie');
const movies = require('../dataset/movies.json');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    // Insert new movies
    const insertedMovies = await Movie.insertMany(movies);
    console.log(`Successfully inserted ${insertedMovies.length} movies`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
