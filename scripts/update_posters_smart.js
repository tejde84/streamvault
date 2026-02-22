const fs = require('fs');
const path = require('path');

const TMDB_KEY = process.env.TMDB_KEY;
if (!TMDB_KEY) {
  console.error('TMDB_KEY environment variable not set. Run with TMDB_KEY=your_key');
  process.exit(1);
}

const datasetPath = path.join(__dirname, '..', 'dataset', 'movies.json');

async function fetchJson(url) {
  const res = await fetch(url);
  return res.json();
}

async function searchTMDB(query, type = 'movie') {
  const url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
  return fetchJson(url);
}

function chooseBestResult(results, title, year) {
  if (!results || results.length === 0) return null;
  // Prefer exact title match and matching year
  const normalized = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const tnorm = normalized(title);
  let best = null;
  for (const r of results) {
    const name = normalized(r.title || r.name || '');
    const ryear = (r.release_date || r.first_air_date || '').slice(0,4);
    if (name === tnorm && year && ryear && String(year) === ryear) return r;
    if (name === tnorm && !best) best = r;
  }
  // fallback: try substring match
  if (!best) {
    for (const r of results) {
      const name = normalized(r.title || r.name || '');
      if (name.includes(tnorm) || tnorm.includes(name)) { best = r; break; }
    }
  }
  return best || results[0];
}

async function findPoster(movie) {
  const title = movie.title || movie.name;
  const year = movie.releaseYear || movie.year || '';

  // Strategies: title + year, title, title + director last name, multi search
  const strategies = [
    `${title} ${year}`,
    `${title}`,
    `${title} ${movie.director ? movie.director.split(' ')[movie.director.split(' ').length - 1] : ''}`,
  ];

  for (const q of strategies) {
    if (!q || q.trim().length === 0) continue;
    try {
      const res = await searchTMDB(q, 'movie');
      const r = chooseBestResult(res.results, title, year);
      if (r && r.poster_path) return `https://image.tmdb.org/t/p/w500${r.poster_path}`;
    } catch (err) {
      console.error('search error', err.message || err);
    }
  }

  // try multi search
  try {
    const multi = await searchTMDB(title, 'multi');
    const r = chooseBestResult(multi.results, title, year);
    if (r && r.poster_path) return `https://image.tmdb.org/t/p/w500${r.poster_path}`;
  } catch (err) {
    // ignore
  }

  return null;
}

(async function update() {
  console.log('Reading dataset...');
  const raw = fs.readFileSync(datasetPath, 'utf8');
  const movies = JSON.parse(raw);

  let updated = 0;
  for (let i = 0; i < movies.length; i++) {
    const m = movies[i];
    try {
      const poster = await findPoster(m);
      if (poster) {
        if (!m.posterUrl || !m.posterUrl.includes('image.tmdb.org')) {
          movies[i].posterUrl = poster;
          updated++;
          console.log(`Updated poster for: ${m.title}`);
        } else {
          console.log(`Already TMDB poster for: ${m.title}`);
        }
      } else {
        console.log(`No poster found for: ${m.title}`);
      }
    } catch (err) {
      console.error('Error processing', m.title, err.message || err);
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  fs.writeFileSync(datasetPath, JSON.stringify(movies, null, 2), 'utf8');
  console.log(`Done. Posters updated for ${updated}/${movies.length} movies.`);
})();
