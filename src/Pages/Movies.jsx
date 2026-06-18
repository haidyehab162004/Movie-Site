import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, PlayIcon, PlusIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { moviesData } from '../data/moviesData';
import { useWatchlist } from '../context/WatchlistContext';

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // For details modal
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const genres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Biography', 'Adventure', 'Thriller'];

  const filteredMovies = moviesData.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || selectedGenre === 'All' || movie.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const featuredMovie = moviesData[0]; // The Neural Edge as featured movie

  return (
    <div className='min-h-screen bg-[#020617] text-slate-100 pb-20'>
      {/* Hero Banner Section */}
      {featuredMovie && (
        <section className='relative h-[480px] w-full overflow-hidden flex items-end'>
          {/* Background Image and Gradients */}
          <div className='absolute inset-0'>
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80" 
              alt={featuredMovie.title} 
              className='w-full h-full object-cover object-center opacity-50'
            />
            {/* Dark overlays */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent' />
            <div className='absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/50 to-transparent' />
          </div>

          {/* Hero Content */}
          <div className='relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full lg:px-8 space-y-4'>
            <div className='inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold uppercase rounded-full px-3 py-1'>
              <span>Featured Movie</span>
            </div>
            
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white'>
              {featuredMovie.title}
            </h1>
            
            <p className='max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed line-clamp-3'>
              {featuredMovie.fullDescription}
            </p>

            <div className='flex items-center gap-6 text-sm sm:text-base'>
              <div className='flex items-center gap-1.5'>
                <StarIcon className='w-5 h-5 text-amber-400' />
                <span className='font-bold'>{featuredMovie.rating}</span>
                <span className='text-slate-400'>/10</span>
              </div>
              <span className='text-slate-400'>•</span>
              <span className='text-slate-200'>{featuredMovie.year}</span>
              <span className='text-slate-400'>•</span>
              <span className='bg-slate-800 text-slate-300 text-xs font-bold px-2 py-0.5 rounded'>
                {featuredMovie.duration}
              </span>
            </div>

            <div className='flex flex-wrap gap-4 pt-2'>
              <button 
                onClick={() => setSelectedMovie(featuredMovie)}
                className='inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700 active:scale-95 duration-200 shadow-lg shadow-red-600/20 cursor-pointer'
              >
                <PlayIcon className='w-5 h-5' />
                View Details
              </button>
              <button 
                onClick={() => {
                  if (isInWatchlist(featuredMovie.id)) {
                    removeFromWatchlist(featuredMovie.id);
                  } else {
                    addToWatchlist(featuredMovie);
                  }
                }}
                className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold transition active:scale-95 duration-200 cursor-pointer ${
                  isInWatchlist(featuredMovie.id)
                    ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/25'
                    : 'border-slate-700 bg-white/5 text-slate-100 hover:border-slate-500 hover:bg-white/10'
                }`}
              >
                <PlusIcon className='w-5 h-5' />
                {isInWatchlist(featuredMovie.id) ? 'Added to Watchlist' : 'Add Watchlist'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Catalog Area */}
      <section className='max-w-7xl mx-auto px-6 mt-12 lg:px-8 space-y-8'>
        {/* Title and Search */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div>
            <h2 className='text-3xl font-extrabold text-white'>Explore Movies</h2>
            <p className='text-sm text-slate-400 mt-1'>Browse our collection of blockbuster releases and critically acclaimed masterpieces.</p>
          </div>

          {/* Search Box */}
          <div className='relative w-full md:w-80'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <MagnifyingGlassIcon className='h-5 w-5 text-slate-500' />
            </span>
            <input
              type='text'
              placeholder='Search movies...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition'
            />
          </div>
        </div>

        {/* Genre Selector */}
        <div className='flex flex-wrap gap-2.5 pb-2 border-b border-slate-800/60'>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre === 'All' ? '' : genre)}
              className={`px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer ${
                (selectedGenre === genre || (genre === 'All' && !selectedGenre))
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => {
              return (
                <div 
                  key={movie.id} 
                  onClick={() => setSelectedMovie(movie)}
                  className='group cursor-pointer flex flex-col h-full bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700/80 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/40'
                >
                  {/* Poster Area */}
                  <div className='relative aspect-[2/3] overflow-hidden bg-slate-950'>
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className='w-full h-full object-cover transition duration-500 group-hover:scale-105' 
                    />
                    
                    {/* Rating Badge */}
                    <div className='absolute top-3 right-3 bg-slate-950/85 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1'>
                      <StarIcon className='w-3.5 h-3.5 text-amber-400' />
                      <span className='text-xs font-bold text-slate-100'>{movie.rating}</span>
                    </div>

                    {/* Quick View Hover Overlay */}
                    <div className='absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center'>
                      <span className='bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300'>
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className='p-4 flex-1 flex flex-col justify-between space-y-3'>
                    <div className='space-y-1'>
                      <div className='flex items-center justify-between text-[11px] text-slate-400 font-medium'>
                        <span>{movie.year}</span>
                        <span>{movie.duration}</span>
                      </div>
                      <h3 className='font-bold text-white text-base group-hover:text-amber-400 transition-colors duration-300 line-clamp-1'>
                        {movie.title}
                      </h3>
                    </div>
                    
                    <p className='text-xs text-slate-400 line-clamp-2 leading-relaxed'>
                      {movie.description}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='col-span-full text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl'>
              <p className='text-lg text-slate-400'>No movies found matching your filters</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedGenre(''); }}
                className='mt-3 text-sm text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer'
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Movie Detail Modal Overlay */}
      {selectedMovie && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in'>
          <div className='relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black/80 flex flex-col no-scrollbar'>
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMovie(null)}
              className='absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-slate-400 hover:text-white transition duration-200 border border-white/5 cursor-pointer'
            >
              <XMarkIcon className='w-6 h-6' />
            </button>

            {/* Modal Hero */}
            <div className='relative h-64 sm:h-80 w-full overflow-hidden shrink-0'>
              <img 
                src={selectedMovie.image} 
                alt={selectedMovie.title} 
                className='w-full h-full object-cover object-center'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent' />
              
              <div className='absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
                <div className='space-y-1'>
                  <div className='flex flex-wrap gap-1.5'>
                    {selectedMovie.genres.map((g) => (
                      <span key={g} className='text-[10px] uppercase font-bold tracking-wider bg-red-600/90 text-white px-2 py-0.5 rounded'>
                        {g}
                      </span>
                    ))}
                  </div>
                  <h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md'>
                    {selectedMovie.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className='p-6 sm:p-8 space-y-6'>
              {/* Stats */}
              <div className='flex flex-wrap items-center gap-6 pb-4 border-b border-slate-800/80 text-sm'>
                <div className='flex items-center gap-1.5'>
                  <StarIcon className='w-5 h-5 text-amber-400' />
                  <span className='font-bold text-white'>{selectedMovie.rating}</span>
                  <span className='text-slate-400'>/10</span>
                </div>
                <span className='text-slate-700'>|</span>
                <div>
                  <span className='text-slate-400'>Studio:</span>{' '}
                  <span className='font-bold text-amber-400'>{selectedMovie.studio}</span>
                </div>
                <span className='text-slate-700'>|</span>
                <div className='text-slate-300 font-medium'>{selectedMovie.year}</div>
                <span className='text-slate-700'>|</span>
                <div className='bg-slate-800 text-slate-300 text-xs font-bold px-2 py-0.5 rounded'>
                  {selectedMovie.duration}
                </div>
              </div>

              {/* Description */}
              <div className='space-y-2'>
                <h4 className='text-sm uppercase font-bold tracking-wider text-slate-400'>Overview</h4>
                <p className='text-slate-300 leading-relaxed text-sm sm:text-base'>
                  {selectedMovie.fullDescription}
                </p>
              </div>

              {/* Director details */}
              <div className='bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                  <span className='text-xs uppercase font-bold text-slate-500 block'>Director</span>
                  <span className='font-bold text-white text-sm sm:text-base'>{selectedMovie.director}</span>
                </div>
                <div>
                  <span className='text-xs uppercase font-bold text-slate-500 block sm:text-right'>Release Date</span>
                  <span className='font-semibold text-slate-300 text-sm'>{selectedMovie.releaseDate}</span>
                </div>
              </div>

              {/* Cast */}
              <div className='space-y-4'>
                <h4 className='text-sm uppercase font-bold tracking-wider text-slate-400'>Key Cast</h4>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                  {selectedMovie.cast.slice(0, 4).map((c) => (
                    <div key={c.name} className='flex items-center gap-3 bg-slate-950/20 p-2.5 rounded-xl border border-slate-800/40'>
                      <img 
                        src={c.image} 
                        alt={c.name} 
                        className='w-10 h-10 object-cover rounded-full border border-slate-700'
                      />
                      <div className='min-w-0'>
                        <p className='text-xs font-bold text-white truncate'>{c.name}</p>
                        <p className='text-[10px] text-amber-400 truncate'>{c.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Watchlist & Details Action */}
              <div className='flex justify-between items-center pt-4 border-t border-slate-800/80'>
                <Link
                  to={`/movies/${selectedMovie.id}`}
                  className='text-amber-400 hover:text-amber-300 text-sm font-bold flex items-center gap-1.5 transition cursor-pointer'
                >
                  View Full Info
                  <span>→</span>
                </Link>
                
                <button
                  onClick={() => {
                    if (isInWatchlist(selectedMovie.id)) {
                      removeFromWatchlist(selectedMovie.id);
                    } else {
                      addToWatchlist(selectedMovie);
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition active:scale-95 duration-200 cursor-pointer ${
                    isInWatchlist(selectedMovie.id)
                      ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-600/20'
                      : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20'
                  }`}
                >
                  <PlusIcon className='w-4 h-4' />
                  {isInWatchlist(selectedMovie.id) ? 'Added to Watchlist' : 'Add to Watchlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
