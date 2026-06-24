import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  StarIcon, PlayIcon, PlusIcon, XMarkIcon,
  MagnifyingGlassIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon,
  FireIcon, FilmIcon, TrophyIcon, RocketLaunchIcon,
} from '@heroicons/react/24/solid';
import { tmdb, img, backdrop, formatRating, formatRuntime, getGenreNames } from '../services/tmdb';
import { useFetch, useDebounce } from '../hooks/useFetch';
import { useSearch } from '../context/SearchContext';
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className='animate-pulse bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden'>
      <div className='aspect-[2/3] bg-slate-800' />
      <div className='p-3 space-y-2'>
        <div className='h-3 bg-slate-700 rounded w-3/4' />
        <div className='h-2.5 bg-slate-800 rounded w-1/2' />
      </div>
    </div>
  );
}

// ─── Movie Card ───────────────────────────────────────────────────────────────
function MovieCard({ movie, onSelect }) {
  const { isInFavorites, toggleFavorite } = useFavorites();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const poster = img(movie.poster_path, 'w342');
  const rating = formatRating(movie.vote_average);
  const year   = movie.release_date?.slice(0, 4) ?? '—';

  const tmdbMovie = {
    id:    movie.id,
    title: movie.title,
    image: poster,
    rating,
    year,
    genres: getGenreNames(movie.genre_ids),
    type: 'movie',
  };

  return (
    <div className='group relative cursor-pointer flex flex-col h-full bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/40'>
      {/* Poster */}
      <div className='relative aspect-[2/3] overflow-hidden bg-slate-950'>
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            loading='lazy'
            className='w-full h-full object-cover transition duration-500 group-hover:scale-105'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-slate-900'>
            <PlayIcon className='w-12 h-12 text-slate-700' />
          </div>
        )}

        {/* Rating badge */}
        <div className='absolute top-3 right-3 bg-slate-950/85 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1'>
          <StarIcon className='w-3.5 h-3.5 text-amber-400' />
          <span className='text-xs font-bold text-slate-100'>{rating}</span>
        </div>

        {/* Favourite button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(tmdbMovie); }}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-sm border transition-all duration-200 active:scale-90 cursor-pointer z-10 ${
            isInFavorites(movie.id)
              ? 'bg-red-600 border-red-500 shadow-lg shadow-red-600/40'
              : 'bg-slate-950/70 border-white/10 hover:bg-red-600/20 hover:border-red-500/50'
          }`}
        >
          <HeartIcon className={`w-4 h-4 transition-colors duration-200 ${isInFavorites(movie.id) ? 'text-white' : 'text-slate-300'}`} />
        </button>

        {/* Quick-view overlay */}
        <div
          onClick={() => onSelect(movie)}
          className='absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center'
        >
          <span className='bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300'>
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className='p-3 flex-1 flex flex-col justify-between'>
        <div>
          <p className='text-slate-400 text-[11px] mb-0.5'>{year}</p>
          <h3 className='text-white font-bold text-sm line-clamp-2 group-hover:text-amber-400 transition-colors duration-200'>
            {movie.title}
          </h3>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            isInWatchlist(movie.id) ? removeFromWatchlist(movie.id) : addToWatchlist(tmdbMovie);
          }}
          className={`mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            isInWatchlist(movie.id)
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/30'
          }`}
        >
          <PlusIcon className='w-3.5 h-3.5' />
          {isInWatchlist(movie.id) ? 'In Watchlist' : 'Watchlist'}
        </button>
      </div>
    </div>
  );
}

// ─── Quick-view modal ─────────────────────────────────────────────────────────
export function QuickViewModal({ movieId, onClose }) {
  const { data, loading } = useFetch(() => tmdb.movieDetails(movieId), [movieId]);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { isInFavorites, toggleFavorite } = useFavorites();

  if (loading || !data) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm'>
        <div className='w-16 h-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin' />
      </div>
    );
  }

  const bg      = backdrop(data.backdrop_path);
  const poster  = img(data.poster_path, 'w342');
  const rating  = formatRating(data.vote_average);
  const runtime = formatRuntime(data.runtime);
  const cast    = data.credits?.cast?.slice(0, 6) ?? [];
  const genres  = data.genres ?? [];

  const tmdbMovie = {
    id:    data.id,
    title: data.title,
    image: poster,
    rating,
    year:  data.release_date?.slice(0, 4),
    genres: genres.map(g => g.name),
    type: 'movie',
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm'>
      <div className='relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black/80 flex flex-col no-scrollbar'>
        {/* Close */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-slate-400 hover:text-white transition border border-white/5 cursor-pointer'
        >
          <XMarkIcon className='w-6 h-6' />
        </button>

        {/* Backdrop */}
        <div className='relative h-64 sm:h-80 w-full overflow-hidden shrink-0'>
          {bg ? (
            <img src={bg} alt={data.title} className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full bg-slate-800' />
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent' />

          <div className='absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
            <div className='space-y-1'>
              <div className='flex flex-wrap gap-1.5'>
                {genres.map(g => (
                  <span key={g.id} className='text-[10px] uppercase font-bold tracking-wider bg-red-600/90 text-white px-2 py-0.5 rounded'>
                    {g.name}
                  </span>
                ))}
              </div>
              <h2 className='text-2xl sm:text-3xl font-black text-white leading-tight'>{data.title}</h2>
            </div>
            <div className='flex items-center gap-2 shrink-0'>
              <StarIcon className='w-5 h-5 text-amber-400' />
              <span className='text-xl font-black text-white'>{rating}</span>
              <span className='text-slate-400 text-sm'>/10</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className='p-6 space-y-6'>
          {/* Meta */}
          <div className='flex flex-wrap gap-4 text-sm text-slate-300'>
            <span>{data.release_date?.slice(0, 4)}</span>
            <span>•</span>
            <span>{runtime}</span>
            {data.original_language && <><span>•</span><span className='uppercase'>{data.original_language}</span></>}
          </div>

          {/* Overview */}
          <p className='text-slate-300 leading-relaxed'>{data.overview}</p>

          {/* Cast */}
          {cast.length > 0 && (
            <div>
              <p className='text-slate-400 text-xs uppercase font-bold tracking-widest mb-3'>Cast</p>
              <div className='flex gap-3 flex-wrap'>
                {cast.map(c => (
                  <div key={c.id} className='flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-1.5'>
                    {c.profile_path ? (
                      <img src={img(c.profile_path, 'w45')} alt={c.name} className='w-7 h-7 rounded-full object-cover' />
                    ) : (
                      <div className='w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center'>
                        <span className='text-slate-400 text-xs'>{c.name[0]}</span>
                      </div>
                    )}
                    <div>
                      <p className='text-white text-xs font-semibold leading-none'>{c.name}</p>
                      <p className='text-slate-400 text-[10px] mt-0.5'>{c.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className='flex flex-wrap gap-3 pt-2'>
            <Link
              to={`/movies/${data.id}`}
              className='flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition active:scale-95 shadow-lg shadow-red-600/20'
            >
              <PlayIcon className='w-4 h-4' /> Full Details
            </Link>
            <button
              onClick={() => isInWatchlist(data.id) ? removeFromWatchlist(data.id) : addToWatchlist(tmdbMovie)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition active:scale-95 cursor-pointer ${
                isInWatchlist(data.id)
                  ? 'bg-amber-600 border-amber-600 text-white'
                  : 'border-slate-700 bg-white/5 text-slate-100 hover:border-slate-500'
              }`}
            >
              <PlusIcon className='w-4 h-4' />
              {isInWatchlist(data.id) ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
            <button
              onClick={() => toggleFavorite(tmdbMovie)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition active:scale-95 cursor-pointer ${
                isInFavorites(data.id)
                  ? 'bg-red-600/20 border-red-500/40 text-red-400'
                  : 'border-slate-700 bg-white/5 text-slate-100 hover:border-red-500/40'
              }`}
            >
              <HeartIcon className='w-4 h-4' />
              {isInFavorites(data.id) ? 'Favourited' : 'Favourite'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Movies Page ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: 'trending',  label: 'Trending',    icon: FireIcon,         fetch: (p) => tmdb.trendingMovies(p) },
  { key: 'popular',   label: 'Popular',     icon: StarIcon,         fetch: (p) => tmdb.popularMovies(p) },
  { key: 'nowPlaying',label: 'Now Playing', icon: FilmIcon,         fetch: (p) => tmdb.nowPlaying(p) },
  { key: 'topRated',  label: 'Top Rated',   icon: TrophyIcon,       fetch: (p) => tmdb.topRatedMovies(p) },
  { key: 'upcoming',  label: 'Upcoming',    icon: RocketLaunchIcon, fetch: (p) => tmdb.upcomingMovies(p) },
];

export default function Movies() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [category,      setCategory]      = useState('trending');
  const [page,          setPage]          = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 400);

  // Category fetch
  const catFetch = useCallback(
    () => CATEGORIES.find(c => c.key === category).fetch(page),
    [category, page]
  );
  const { data: catData, loading: catLoading } = useFetch(catFetch, [category, page]);

  // Search fetch (only when search term is non-empty)
  const { data: searchData, loading: searchLoading } = useFetch(
    () => debouncedSearch.trim() ? tmdb.searchMovies(debouncedSearch, page) : Promise.resolve(null),
    [debouncedSearch, page]
  );

  const isSearching = debouncedSearch.trim().length > 0;
  const activeData  = isSearching ? searchData : catData;
  const isLoading   = isSearching ? searchLoading : catLoading;
  const movies      = activeData?.results ?? [];
  const totalPages  = Math.min(activeData?.total_pages ?? 1, 500); // TMDB caps at 500

  // Reset page when switching category or search
  const handleCategory = (key) => { setCategory(key); setPage(1); };
  const handleSearch   = (v)   => { setSearchTerm(v); setPage(1); };

  return (
    <div className='bg-[#020617] min-h-screen text-white pb-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8'>

        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div>
            <h1 className='text-3xl font-extrabold text-white'>Movies</h1>
            <p className='text-slate-400 text-sm mt-1'>Discover the latest & greatest films.</p>
          </div>

          {/* Search */}
          <div className='relative w-full md:w-80'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <MagnifyingGlassIcon className='h-5 w-5 text-slate-500' />
            </span>
            <input
              type='text'
              placeholder='Search movies...'
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition'
            />
          </div>
        </div>

        {/* Category tabs (hidden when searching) */}
        {!isSearching && (
          <div className='flex flex-wrap gap-2'>
            {CATEGORIES.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleCategory(key)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all active:scale-95 cursor-pointer ${
                  category === key
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Search result label */}
        {isSearching && (
          <div className='flex items-center gap-3'>
            <p className='text-slate-400 text-sm'>
              Results for <span className='text-amber-400 font-bold'>"{debouncedSearch}"</span>
              {!searchLoading && searchData && (
                <span className='ml-2 text-slate-500'>({searchData.total_results?.toLocaleString()} found)</span>
              )}
            </p>
            <button
              onClick={() => handleSearch('')}
              className='text-xs text-slate-500 hover:text-red-400 underline transition cursor-pointer'
            >
              Clear
            </button>
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : movies.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-24 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl gap-4'>
            <MagnifyingGlassIcon className='w-12 h-12 text-slate-700' />
            <p className='text-slate-300 font-bold text-lg'>No movies found</p>
            <p className='text-slate-500 text-sm'>Try a different search or category.</p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className='flex items-center justify-center gap-4 pt-4'>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className='flex items-center gap-1.5 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition active:scale-95 cursor-pointer disabled:cursor-not-allowed'
            >
              <ChevronLeftIcon className='w-4 h-4' /> Prev
            </button>
            <span className='text-slate-400 text-sm font-semibold'>
              Page <span className='text-white'>{page}</span> / {totalPages.toLocaleString()}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className='flex items-center gap-1.5 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition active:scale-95 cursor-pointer disabled:cursor-not-allowed'
            >
              Next <ChevronRightIcon className='w-4 h-4' />
            </button>
          </div>
        )}
      </div>

      {/* Quick-view modal */}
      {selectedMovie && (
        <QuickViewModal movieId={selectedMovie.id} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
