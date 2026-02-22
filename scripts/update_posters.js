const fs = require('fs');
const path = require('path');

// Node 18+ supports global fetch; if not available, note to install node-fetch.
const TMDB_KEY = process.env.TMDB_KEY;
if (!TMDB_KEY) {
  console.error('TMDB_KEY environment variable not set. Run with TMDB_KEY=your_key');
  process.exit(1);
}

const datasetPath = path.join(__dirname, '..', 'dataset', 'movies.json');

async function fetchPosterForTitle(title) {
  const query = encodeURIComponent(title);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${query}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && Array.isArray(data.results) && data.results.length > 0) {
      const best = data.results[0];
      if (best.poster_path) {
        return `https://image.tmdb.org/t/p/w500${best.poster_path}`;
      }
    }
  } catch (err) {
    console.error('Error fetching for', title, err.message || err);
  }
  return null;
}

(async function updatePosters() {
  console.log('Reading dataset...');
  const raw = fs.readFileSync(datasetPath, 'utf8');
  const movies = JSON.parse(raw);

  let updated = 0;
  for (let i = 0; i < movies.length; i++) {
    const m = movies[i];
    try {
      const poster = await fetchPosterForTitle(m.title + ' ' + (m.releaseYear || ''));
      if (poster) {
        movies[i].posterUrl = poster;
        updated++;
        console.log(`Updated poster for: ${m.title}`);
      } else {
        console.log(`No poster found for: ${m.title} - keeping existing`);
      }
      // slight delay to be polite
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error('Error processing', m.title, err.message || err);
    }
  }

  fs.writeFileSync(datasetPath, JSON.stringify(movies, null, 2), 'utf8');
  console.log(`Done. Posters updated for ${updated}/${movies.length} movies.`);
})();
