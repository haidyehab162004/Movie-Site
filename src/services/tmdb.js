// ─── TMDB API Service ──────────────────────────────────────────────────────────
const API_KEY  = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMG_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

// Image helpers
export const img = (path, size = 'w500')  => path ? `${IMG_BASE}/${size}${path}` : null;
export const backdrop = (path, size = 'w1280') => path ? `${IMG_BASE}/${size}${path}` : null;
export const avatar = (path, size = 'w185')    => path ? `${IMG_BASE}/${size}${path}` : null;

// Shared fetch wrapper
async function get(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${res.statusText}`);
  return res.json();
}

// ─── MOVIES ───────────────────────────────────────────────────────────────────
export const tmdb = {
  // Trending (week)
  trendingMovies: (page = 1) => get('/trending/movie/week', { page }),

  // Popular / Now Playing / Top Rated / Upcoming
  popularMovies:   (page = 1) => get('/movie/popular',    { page }),
  nowPlaying:      (page = 1) => get('/movie/now_playing', { page }),
  topRatedMovies:  (page = 1) => get('/movie/top_rated',  { page }),
  upcomingMovies:  (page = 1) => get('/movie/upcoming',   { page }),

  // Movie details + credits + videos + recommendations (all in one)
  movieDetails: (id) => get(`/movie/${id}`, { append_to_response: 'credits,videos,recommendations,images' }),

  // Search movies
  searchMovies: (query, page = 1) => get('/search/movie', { query, page }),

  // ─── TV SHOWS ───────────────────────────────────────────────────────────────
  trendingTV:    (page = 1) => get('/trending/tv/week',   { page }),
  popularTV:     (page = 1) => get('/tv/popular',         { page }),
  topRatedTV:    (page = 1) => get('/tv/top_rated',       { page }),
  onAirTV:       (page = 1) => get('/tv/on_the_air',      { page }),

  // TV show details + credits + videos + recommendations
  tvDetails: (id) => get(`/tv/${id}`, { append_to_response: 'credits,videos,recommendations,images' }),

  // Search TV
  searchTV: (query, page = 1) => get('/search/tv', { query, page }),

  // Multi search (movies + TV + people)
  searchMulti: (query, page = 1) => get('/search/multi', { query, page }),

  // Genres
  movieGenres: () => get('/genre/movie/list'),
  tvGenres:    () => get('/genre/tv/list'),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Formats runtime in minutes → "Xh Ym" */
export function formatRuntime(min) {
  if (!min) return 'N/A';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/** Formats a TMDB vote_average to one decimal */
export function formatRating(n) {
  return n ? parseFloat(n.toFixed(1)) : 'N/A';
}

/** Gets the YouTube trailer key from a videos result */
export function getTrailerKey(videos) {
  if (!videos?.results?.length) return null;
  const official = videos.results.find(
    v => v.site === 'YouTube' && v.type === 'Trailer' && v.official
  );
  return (official || videos.results.find(v => v.site === 'YouTube'))?.key ?? null;
}

// TMDB Genre Map
export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  // TV Shows Specific
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

/** Translates an array of TMDB genre IDs into string names */
export function getGenreNames(ids) {
  if (!ids || !Array.isArray(ids)) return [];
  return ids.map(id => GENRE_MAP[id]).filter(Boolean);
}

