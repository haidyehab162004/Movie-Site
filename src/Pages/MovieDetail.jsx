import { useParams, Link } from 'react-router-dom';
import { PlayIcon, PlusIcon, StarIcon, CalendarIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/solid';
import { tmdb, img, backdrop, formatRating, formatRuntime, getTrailerKey } from '../services/tmdb';
import { useFetch } from '../hooks/useFetch';
import { useWatchlist } from '../context/WatchlistContext';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieDetail() {
  const { id } = useParams();
  const movieId = parseInt(id);
  const { data: movie, loading, error } = useFetch(() => tmdb.movieDetails(movieId), [movieId]);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { toggleFavorite, isInFavorites } = useFavorites();

  const inWatchlist = isInWatchlist(movieId);
  const inFavorites = isInFavorites(movieId);

  if (loading) {
    return (
      <div className='min-h-screen bg-slate-950 text-white flex items-center justify-center'>
        <div className='w-16 h-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin' />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-slate-950 to-black text-white flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <h2 className='text-3xl font-bold mb-4'>Movie not found</h2>
          <Link to='/' className='inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl transition duration-200'>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const movieBackdrop = backdrop(movie.backdrop_path, 'w1280');
  const moviePoster   = img(movie.poster_path, 'w500');
  const rating        = formatRating(movie.vote_average);
  const releaseDate   = movie.release_date ?? 'N/A';
  const duration      = formatRuntime(movie.runtime);
  const trailerKey    = getTrailerKey(movie.videos);
  
  // Crew mapping
  const director = movie.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A';
  const writers  = movie.credits?.crew?.filter(c => c.job === 'Screenplay' || c.job === 'Writer').map(c => c.name) || [];
  const studio   = movie.production_companies?.[0]?.name || 'N/A';

  const cast = movie.credits?.cast?.slice(0, 6) ?? [];
  const recommendations = movie.recommendations?.results?.slice(0, 6) ?? [];

  const tmdbMovie = {
    id:     movie.id,
    title:  movie.title,
    image:  img(movie.poster_path, 'w342'),
    rating,
    year:   movie.release_date?.slice(0, 4),
    genres: movie.genres?.map(g => g.name) ?? [],
    type:   'movie',
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-950 to-black text-white'>
      {/* Hero Section */}
      <div className='relative h-[450px] md:h-[550px] overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10' />
        <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10' />
        {movieBackdrop ? (
          <img 
            src={movieBackdrop} 
            alt={movie.title} 
            className='absolute inset-0 w-full h-full object-cover opacity-60'
          />
        ) : (
          <div className='absolute inset-0 w-full h-full bg-slate-900' />
        )}
        
        <div className='relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-12'>
          <div className='flex flex-col md:flex-row gap-8 items-end'>
            {/* Movie Poster */}
            {moviePoster && (
              <div className='hidden md:block shrink-0'>
                <img 
                  src={moviePoster} 
                  alt={movie.title}
                  className='w-52 h-76 object-cover rounded-2xl shadow-2xl border border-white/10'
                />
              </div>
            )}

            {/* Info */}
            <div className='flex-1 space-y-4'>
              {/* Genres */}
              <div className='flex flex-wrap gap-2'>
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className='px-3 py-1 bg-red-600/80 rounded-full text-xs font-semibold tracking-wide border border-red-500/20'>
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white'>
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className='text-lg text-amber-300 italic font-medium'>
                  "{movie.tagline}"
                </p>
              )}

              {/* Info Row */}
              <div className='flex flex-wrap gap-6 text-sm text-slate-300 font-semibold'>
                <div className='flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-xl'>
                  <StarIcon className='w-4 h-4 text-amber-400' />
                  <span>{rating}</span>
                  <span className='text-slate-500 font-normal'>/10</span>
                </div>
                <div className='flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-xl'>
                  <CalendarIcon className='w-4 h-4 text-sky-400' />
                  <span>{releaseDate}</span>
                </div>
                <div className='flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-xl'>
                  <ClockIcon className='w-4 h-4 text-purple-400' />
                  <span>{duration}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className='flex flex-wrap gap-4 pt-2'>
                {trailerKey && (
                  <button 
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank')}
                    className='flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-white transition active:scale-95 duration-200 cursor-pointer shadow-lg shadow-red-600/35'
                  >
                    <PlayIcon className='w-5 h-5' />
                    Watch Trailer
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    if (inWatchlist) {
                      removeFromWatchlist(movie.id);
                    } else {
                      addToWatchlist(tmdbMovie);
                    }
                  }}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold border transition active:scale-95 duration-200 cursor-pointer ${
                    inWatchlist 
                      ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/25' 
                      : 'border-slate-700 bg-slate-900/40 text-white hover:border-slate-500 hover:bg-slate-900/80'
                  }`}
                >
                  <PlusIcon className='w-5 h-5' />
                  {inWatchlist ? 'In Watchlist' : 'Watchlist'}
                </button>

                <button 
                  onClick={() => toggleFavorite(tmdbMovie)}
                  className={`flex items-center justify-center p-3.5 rounded-2xl border transition active:scale-95 duration-200 cursor-pointer ${
                    inFavorites 
                      ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/35' 
                      : 'border-slate-700 bg-slate-900/40 text-slate-300 hover:border-red-500/30 hover:text-red-400 hover:bg-slate-900/80'
                  }`}
                  aria-label='Add to favorites'
                >
                  <HeartIcon className='w-5 h-5' />
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
            <div className='bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-sm'>
              <h2 className='text-2xl font-bold mb-4 text-white'>Story</h2>
              <p className='text-slate-300 leading-relaxed text-base'>
                {movie.overview || 'No synopsis available.'}
              </p>
            </div>
          </div>

          {/* Director & Crew */}
          <div className='bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-sm space-y-6'>
            <h2 className='text-2xl font-bold text-white border-b border-slate-800 pb-2'>Crew Details</h2>
            
            <div>
              <p className='text-xs uppercase text-slate-500 font-bold tracking-wider mb-1'>Director</p>
              <p className='text-lg font-extrabold text-white'>{director}</p>
            </div>

            <div>
              <p className='text-xs uppercase text-slate-500 font-bold tracking-wider mb-1.5'>Screenplay / Writer</p>
              <div className='flex flex-wrap gap-2'>
                {writers.map((writer, i) => (
                  <span key={i} className='text-amber-400 font-semibold bg-amber-400/5 px-2.5 py-1 rounded-lg text-sm border border-amber-400/10'>
                    {writer}
                  </span>
                ))}
                {writers.length === 0 && <span className='text-slate-500 font-semibold'>N/A</span>}
              </div>
            </div>

            <div>
              <p className='text-xs uppercase text-slate-500 font-bold tracking-wider mb-1'>Production Studio</p>
              <p className='text-slate-300 font-bold'>{studio}</p>
            </div>
          </div>
        </div>

        {/* Main Cast */}
        {cast.length > 0 && (
          <div className='mb-16'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-3xl font-extrabold tracking-tight'>Main Cast</h2>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6'>
              {cast.map((actor) => (
                <div key={actor.id} className='group cursor-pointer'>
                  <div className='relative overflow-hidden rounded-full aspect-square mb-3 border border-slate-800 bg-slate-950 shadow-lg'>
                    {actor.profile_path ? (
                      <img 
                        src={img(actor.profile_path, 'w185')}
                        alt={actor.name}
                        className='w-full h-full object-cover group-hover:scale-110 transition duration-300'
                        loading='lazy'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 font-black text-2xl uppercase'>
                        {actor.name[0]}
                      </div>
                    )}
                    <div className='absolute inset-0 bg-black/10 group-hover:bg-black/30 transition' />
                  </div>
                  <h3 className='font-bold text-white text-sm text-center line-clamp-1 group-hover:text-amber-400 transition-colors'>
                    {actor.name}
                  </h3>
                  <p className='text-amber-400 text-xs text-center line-clamp-1 mt-0.5'>
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* More Like This */}
        {recommendations.length > 0 && (
          <div className='pt-4 border-t border-slate-900'>
            <h2 className='text-3xl font-extrabold tracking-tight mb-8'>More Like This</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5'>
              {recommendations.map((rec) => {
                const recPoster = img(rec.poster_path, 'w342');
                const recRating = formatRating(rec.vote_average);
                const recYear   = rec.release_date?.slice(0, 4) ?? '—';
                
                return (
                  <Link key={rec.id} to={`/movies/${rec.id}`} className='group block'>
                    <div className='relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700 transition duration-300 h-full flex flex-col justify-between shadow-lg'>
                      <div className='relative overflow-hidden aspect-[2/3] bg-slate-950'>
                        {recPoster ? (
                          <img 
                            src={recPoster}
                            alt={rec.title}
                            className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
                            loading='lazy'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center bg-slate-900'>
                            <PlayIcon className='w-12 h-12 text-slate-800' />
                          </div>
                        )}
                        <div className='absolute top-2.5 right-2.5 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/5 flex items-center gap-1'>
                          <StarIcon className='w-3 h-3 text-amber-400' />
                          <span className='text-[10px] font-bold text-white'>{recRating}</span>
                        </div>
                      </div>
                      <div className='p-3 bg-slate-950/20'>
                        <p className='text-[10px] text-slate-400 mb-0.5'>{recYear}</p>
                        <h3 className='font-bold text-white text-xs group-hover:text-amber-400 transition-colors line-clamp-1'>{rec.title}</h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
