import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, StarIcon, PlayIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { useWatchlist } from '../context/WatchlistContext';
import { QuickViewModal as TvQuickViewModal } from './TvShows';

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [sortBy, setSortBy] = useState('latest');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedTvShow, setSelectedTvShow] = useState(null);

  // Get unique genres from watchlist
  const allGenres = useMemo(() => {
    const genres = new Set();
    watchlist.forEach(movie => {
      movie.genres?.forEach(g => genres.add(g));
    });
    return ['all', ...Array.from(genres)];
  }, [watchlist]);

  // Filter and sort watchlist
  const filteredWatchlist = useMemo(() => {
    let filtered = watchlist;

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => 
        movie.genres?.includes(selectedGenre)
      );
    }

    // Sort
    if (sortBy === 'latest') {
      filtered = [...filtered].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'title') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [watchlist, sortBy, selectedGenre]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-950 to-black text-white py-12'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-5xl font-bold mb-4'>My Watchlist</h1>
          <p className='text-lg text-gray-400'>
            {filteredWatchlist.length} {filteredWatchlist.length === 1 ? 'Movie' : 'Movies'} & Shows curated by you
          </p>
        </div>

        {/* Controls */}
        <div className='flex flex-col md:flex-row gap-6 mb-12'>
          {/* Genre Filter */}
          <div className='flex-1'>
            <div className='flex flex-wrap gap-2'>
              {allGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-lg font-semibold transition active:scale-95 cursor-pointer ${
                    selectedGenre === genre
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className='flex gap-3'>
            <button
              onClick={() => setSortBy('latest')}
              className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition active:scale-95 cursor-pointer ${
                sortBy === 'latest'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Latest Added
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition active:scale-95 cursor-pointer ${
                sortBy === 'rating'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <StarIcon className="w-4 h-4" />
              Top Rated
            </button>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredWatchlist.length === 0 ? (
          <div className='text-center py-20'>
            <h2 className='text-2xl font-bold text-gray-400 mb-4'>No movies in your watchlist</h2>
            <Link to='/Movies' className='text-amber-400 hover:text-amber-300 text-lg font-semibold'>
              Browse Movies →
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredWatchlist.map(movie => (
              <div key={movie.id} className='group relative'>
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className='absolute top-3 right-3 z-20 bg-red-600 hover:bg-red-700 p-2 rounded-lg transition opacity-100 md:opacity-0 md:group-hover:opacity-100'
                  title='Remove from Watchlist'
                >
                  <XMarkIcon className='w-5 h-5 text-white' />
                </button>

                {/* Movie Card */}
                <Link 
                  to={movie.type === 'tv' ? '#' : `/movies/${movie.id}`} 
                  onClick={(e) => {
                    if (movie.type === 'tv') {
                      e.preventDefault();
                      setSelectedTvShow(movie.id);
                    }
                  }}
                  className='group block'
                >
                  <div className='relative overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/40 hover:border-white/30 transition h-96'>
                    {/* Image */}
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className='w-full h-full object-cover group-hover:scale-110 transition duration-300'
                    />

                    {/* Overlay */}
                    <div className='absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center'>
                      <button className='bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition transform scale-95 group-hover:scale-100'>
                        <PlayIcon className='w-5 h-5' />
                        Watch Now
                      </button>
                    </div>

                    {/* Badge */}
                    <div className='absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-lg flex items-center gap-1'>
                      <StarIcon className='w-4 h-4 text-amber-400' />
                      <span className='text-sm font-bold text-white'>{movie.rating}</span>
                    </div>

                    {/* Quality Badge */}
                    <div className='absolute top-3 right-12 bg-black/70 px-2 py-1 rounded text-xs font-bold text-amber-400'>
                      4K HDR
                    </div>
                  </div>
                </Link>

                {/* Info */}
                <div className='mt-4'>
                  <h3 className='font-bold text-white text-sm line-clamp-1'>
                    {movie.title}
                  </h3>
                  <p className='text-xs text-gray-400 mt-1'>
                    {movie.genres?.slice(0, 2).join(' • ')} • {movie.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTvShow && (
        <TvQuickViewModal showId={selectedTvShow} onClose={() => setSelectedTvShow(null)} />
      )}
    </div>
  );
}

