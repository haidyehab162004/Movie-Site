import { useParams, Link } from 'react-router-dom';
import { PlayIcon, PlusIcon, StarIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/solid';
import { moviesData } from '../data/moviesData';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieDetail() {
  const { id } = useParams();
  const movie = moviesData.find(m => m.id === parseInt(id));
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(parseInt(id));

  if (!movie) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-slate-950 to-black text-white flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-4'>Movie not found</h2>
          <Link to='/' className='text-amber-400 hover:text-amber-300'>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-950 to-black text-white'>
      {/* Hero Section */}
      <div className='relative h-96 md:h-[500px] overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent z-10' />
        <img 
          src={movie.image} 
          alt={movie.title} 
          className='absolute inset-0 w-full h-full object-cover'
        />
        
        <div className='relative z-20 h-full flex flex-col justify-end p-6 md:p-12'>
          <div className='flex flex-col md:flex-row gap-8 items-end'>
            {/* Movie Poster */}
            <div className='hidden md:block'>
              <img 
                src={movie.image} 
                alt={movie.title}
                className='w-48 h-72 object-cover rounded-xl shadow-2xl border border-white/10'
              />
            </div>

            {/* Info */}
            <div className='flex-1'>
              {/* Genres */}
              <div className='flex flex-wrap gap-2 mb-4'>
                {movie.genres.map((genre, i) => (
                  <span key={i} className='px-3 py-1 bg-red-600/80 rounded-full text-sm font-medium'>
                    {genre}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className='text-4xl md:text-5xl font-black mb-4 leading-tight'>
                {movie.title}
              </h1>

              {/* Tagline */}
              <p className='text-lg text-gray-300 italic mb-6'>
                {movie.description}
              </p>

              {/* Info Row */}
              <div className='flex flex-wrap gap-6 mb-8 text-sm md:text-base'>
                <div className='flex items-center gap-2'>
                  <StarIcon className='w-5 h-5 text-amber-400' />
                  <span className='font-semibold'>{movie.rating}</span>
                  <span className='text-gray-400'>/10</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CalendarIcon className='w-5 h-5 text-blue-400' />
                  <span>{movie.releaseDate}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <ClockIcon className='w-5 h-5 text-purple-400' />
                  <span>{movie.duration}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className='flex flex-wrap gap-4'>
                <button className='flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-white transition active:scale-95 duration-200 cursor-pointer shadow-lg shadow-red-600/20'>
                  <PlayIcon className='w-5 h-5' />
                  Watch Trailer
                </button>
                <button 
                  onClick={() => {
                    if (inWatchlist) {
                      removeFromWatchlist(parseInt(id));
                    } else {
                      addToWatchlist(movie);
                    }
                  }}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold border-2 transition active:scale-95 duration-200 cursor-pointer ${
                    inWatchlist 
                      ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/25' 
                      : 'border-white/30 text-white hover:border-white/60 hover:bg-white/5'
                  }`}
                >
                  <PlusIcon className='w-5 h-5' />
                  {inWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className='max-w-7xl mx-auto px-6 md:px-12 py-12'>
        {/* Synopsis and Details */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {/* Synopsis */}
          <div className='md:col-span-2'>
            <div className='bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur'>
              <h2 className='text-2xl font-bold mb-4 text-white'>Story</h2>
              <p className='text-gray-300 leading-relaxed'>
                {movie.fullDescription}
              </p>
            </div>
          </div>

          {/* Director & Crew */}
          <div className='bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur'>
            <h2 className='text-2xl font-bold mb-6 text-white'>Crew</h2>
            
            <div className='mb-6'>
              <p className='text-xs uppercase text-gray-400 font-semibold mb-1'>Director</p>
              <p className='text-lg font-bold text-white'>{movie.director}</p>
            </div>

            <div>
              <p className='text-xs uppercase text-gray-400 font-semibold mb-2'>Screenplay</p>
              <div className='space-y-1'>
                {movie.screenplay.map((writer, i) => (
                  <p key={i} className='text-amber-400'>{writer}</p>
                ))}
              </div>
            </div>

            <div className='mt-6'>
              <p className='text-xs uppercase text-gray-400 font-semibold mb-1'>Studio</p>
              <p className='text-white font-bold'>{movie.studio}</p>
            </div>
          </div>
        </div>

        {/* Main Cast */}
        <div className='mb-16'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-3xl font-bold'>Main Cast</h2>
            <Link to='/movies' className='text-amber-400 hover:text-amber-300 text-sm font-semibold'>
              View All
            </Link>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {movie.cast.map((actor, i) => (
              <div key={i} className='group cursor-pointer'>
                <div className='relative overflow-hidden rounded-full aspect-square mb-3'>
                  <img 
                    src={actor.image}
                    alt={actor.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition duration-300'
                  />
                  <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition' />
                </div>
                <h3 className='font-bold text-white text-sm text-center line-clamp-1'>
                  {actor.name}
                </h3>
                <p className='text-amber-400 text-xs text-center line-clamp-1'>
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* More Like This */}
        <div>
          <h2 className='text-3xl font-bold mb-8'>More Like This</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {movie.recommendations.map((rec) => {
              const recMovie = moviesData.find(m => m.id === rec.id);
              return (
                <Link key={rec.id} to={`/movies/${rec.id}`}>
                  <div className='group overflow-hidden rounded-xl border border-white/10 hover:border-white/30 transition cursor-pointer'>
                    <div className='relative overflow-hidden h-64'>
                      <img 
                        src={rec.image}
                        alt={rec.title}
                        className='w-full h-full object-cover group-hover:scale-110 transition duration-300'
                      />
                      <div className='absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center'>
                        <PlayIcon className='w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition' />
                      </div>
                    </div>
                    <div className='p-4 bg-slate-900/50 backdrop-blur'>
                      <h3 className='font-bold text-white mb-1'>{rec.title}</h3>
                      <div className='flex items-center justify-between'>
                        <span className='text-amber-400 font-semibold'>{recMovie?.rating}/10</span>
                        <span className='text-gray-400 text-sm'>{recMovie?.year}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
