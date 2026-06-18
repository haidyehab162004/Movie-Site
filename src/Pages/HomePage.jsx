import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, PlusIcon, StarIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/solid';
import { tmdb, img, backdrop, formatRating, getGenreNames } from '../services/tmdb';
import { useFetch } from '../hooks/useFetch';
import { useWatchlist } from '../context/WatchlistContext';
import { useFavorites } from '../context/FavoritesContext';

export default function HomePage() {
  const trendingRef = useRef(null);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { isInFavorites, toggleFavorite } = useFavorites();

  // Fetch all categories in parallel
  const { data: trendingData, loading: trendingLoading } = useFetch(() => tmdb.trendingMovies(), []);
  const { data: popularData, loading: popularLoading } = useFetch(() => tmdb.popularMovies(), []);
  const { data: topRatedData, loading: topRatedLoading } = useFetch(() => tmdb.topRatedMovies(), []);

  const isLoading = trendingLoading || popularLoading || topRatedLoading;

  if (isLoading) {
    return (
      <div className='min-h-screen bg-slate-950 text-white flex items-center justify-center'>
        <div className='w-16 h-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin' />
      </div>
    );
  }

  const trendingMovies = trendingData?.results ?? [];
  const popularMovies  = popularData?.results ?? [];
  const topRatedMovies = topRatedData?.results ?? [];

  // Trending movie info dynamically pulled (Featured Movie is the first trending movie)
  const featuredMovie = trendingMovies[0];

  if (!featuredMovie) {
    return (
      <div className='min-h-screen bg-[#020617] text-white flex items-center justify-center'>
        <p className='text-slate-400 font-bold'>No featured content available.</p>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(featuredMovie.id);
  const ratingFeatured = formatRating(featuredMovie.vote_average);
  const featuredPoster = img(featuredMovie.poster_path, 'w500');
  const featuredBackdrop = backdrop(featuredMovie.backdrop_path, 'w780');

  const tmdbFeatured = {
    id:     featuredMovie.id,
    title:  featuredMovie.title,
    image:  featuredPoster,
    rating: ratingFeatured,
    year:   featuredMovie.release_date?.slice(0, 4),
    genres: getGenreNames(featuredMovie.genre_ids),
    type:   'movie',
  };

  return (
    <div className='bg-[#020617] text-white pb-12'>
      {/* Dynamic Hero Section */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,128,114,0.18),transparent_35%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_30%)]' />
        <div className='relative max-w-7xl mx-auto px-6 py-20 lg:px-8'>
          <div className='grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center'>
            <div className='space-y-8 animate-fade-in'>
              <div className='inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold uppercase rounded-full px-4 py-2'>
                <span className='bg-red-500/20 text-red-200 px-2 py-1 rounded-full'>Trending #1</span>
                <span className='flex items-center gap-2'>
                  <StarIcon className='w-4 h-4 text-emerald-400' />
                  {ratingFeatured} rating
                </span>
              </div>
              <div className='space-y-6'>
                <h1 className='text-5xl sm:text-6xl font-black tracking-tight text-white leading-tight'>
                  {featuredMovie.title}
                </h1>
                <p className='max-w-xl text-base sm:text-lg leading-relaxed text-slate-300 line-clamp-4'>
                  {featuredMovie.overview}
                </p>
                <div className='flex flex-wrap gap-4'>
                  <Link 
                    to={`/movies/${featuredMovie.id}`} 
                    className='inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700 active:scale-95 shadow-lg shadow-red-600/20'
                  >
                    <PlayIcon className='w-5 h-5' />
                    Play Details
                  </Link>
                  <button 
                    onClick={() => {
                      if (inWatchlist) {
                        removeFromWatchlist(featuredMovie.id);
                      } else {
                        addToWatchlist(tmdbFeatured);
                      }
                    }}
                    className={`inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-sm font-bold transition active:scale-95 cursor-pointer ${
                      inWatchlist
                        ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 font-black'
                        : 'border-slate-700 bg-white/5 text-slate-100 hover:border-slate-500'
                    }`}
                  >
                    <PlusIcon className='w-5 h-5' />
                    {inWatchlist ? 'Added to Watchlist' : 'Watchlist'}
                  </button>
                </div>
              </div>
            </div>

            <div className='rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 relative aspect-video lg:aspect-auto lg:h-[420px] bg-slate-900'>
              {featuredBackdrop ? (
                <img
                  src={featuredBackdrop}
                  alt={featuredMovie.title}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center'>
                  <PlayIcon className='w-20 h-20 text-slate-800' />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now Slider Section */}
      <section className='max-w-7xl mx-auto px-6 pb-20 lg:px-8'>
        <div className='flex items-center justify-between gap-4 pb-4'>
          <div>
            <h2 className='text-3xl font-extrabold text-white'>Trending Now</h2>
            <p className='text-sm text-slate-400 mt-1'>Catch the most talked-about titles this week.</p>
          </div>
          <Link to='/Movies' className='inline-flex items-center gap-2 text-sm text-amber-300 hover:text-white font-bold transition-colors'>
            View all
            <ArrowRightIcon className='w-4 h-4' />
          </Link>
        </div>

        {/* Carousel */}
        <div className='relative'>
          <button
            aria-label='Scroll left'
            onClick={() => {
              const el = trendingRef.current;
              if (el) el.scrollBy({ left: -el.clientWidth * 0.7, behavior: 'smooth' });
            }}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-xl border border-white/5 hidden sm:inline-flex hover:bg-black/80 transition cursor-pointer'
          >
            <ChevronLeftIcon className='w-6 h-6 text-white' />
          </button>

          <div ref={trendingRef} className='flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 pb-6'>
            {trendingMovies.map((movie) => {
              const ratingVal = formatRating(movie.vote_average);
              const poster = img(movie.poster_path, 'w342');
              const year = movie.release_date?.slice(0, 4) ?? '—';
              const firstGenre = getGenreNames(movie.genre_ids)[0] || 'Movie';

              const tmdbMovie = {
                id:     movie.id,
                title:  movie.title,
                image:  poster,
                rating: ratingVal,
                year,
                genres: getGenreNames(movie.genre_ids),
                type:   'movie',
              };

              return (
                <Link key={movie.id} to={`/movies/${movie.id}`} className='shrink-0 w-64 snap-center block'>
                  <article className='group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl h-full flex flex-col justify-between'>
                    <div className='relative overflow-hidden aspect-[2/3] bg-slate-950'>
                      {poster ? (
                        <img src={poster} alt={movie.title} className='w-full h-full object-cover transition duration-500 group-hover:scale-105' />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center bg-slate-900'>
                          <PlayIcon className='w-12 h-12 text-slate-800' />
                        </div>
                      )}
                      <div className='absolute inset-x-0 top-4 flex items-center justify-between px-4'>
                        <span className='rounded-lg bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-200 border border-white/5'>Trending</span>
                        <span className='inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 backdrop-blur-xs px-2.5 py-1 text-xs text-emerald-300 border border-emerald-500/20'>
                          <StarIcon className='w-3.5 h-3.5 text-amber-400' />
                          {ratingVal}
                        </span>
                      </div>
                      {/* Favorite Heart Button */}
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(tmdbMovie); }}
                        className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-xs border transition-all duration-200 active:scale-90 cursor-pointer z-10 ${
                          isInFavorites(movie.id)
                            ? 'bg-red-600 border-red-500 shadow-lg shadow-red-600/40'
                            : 'bg-slate-950/70 border-white/10 hover:bg-red-600/20 hover:border-red-500/50'
                        }`}
                        aria-label='Add to favorites'
                      >
                        <HeartIcon className={`w-4 h-4 transition-colors duration-200 ${
                          isInFavorites(movie.id) ? 'text-white' : 'text-slate-400'
                        }`} />
                      </button>
                    </div>
                    <div className='space-y-2.5 p-4 bg-slate-950/40 backdrop-blur-xs'>
                      <div className='flex items-center justify-between text-xs text-slate-400'>
                        <span>{year}</span>
                        <span className='rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase font-bold'>{firstGenre}</span>
                      </div>
                      <h3 className='font-bold text-white group-hover:text-amber-400 transition-colors truncate'>{movie.title}</h3>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          <button
            aria-label='Scroll right'
            onClick={() => {
              const el = trendingRef.current;
              if (el) el.scrollBy({ left: el.clientWidth * 0.7, behavior: 'smooth' });
            }}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-xl border border-white/5 hidden sm:inline-flex hover:bg-black/80 transition cursor-pointer'
          >
            <ChevronRightIcon className='w-6 h-6 text-white' />
          </button>
        </div>
      </section>

      {/* Popular on CineVerse */}
      {popularMovies.length > 0 && (
        <section className='max-w-7xl mx-auto px-6 py-12 lg:px-8'>
          <h2 className='text-3xl font-extrabold text-white mb-8'>Popular on CineVerse</h2>
          <div className='grid gap-8 lg:grid-cols-[1fr_1.2fr]'>
            {/* Featured Item */}
            <Link to={`/movies/${popularMovies[0].id}`} className='group overflow-hidden rounded-3xl border border-white/10 shadow-xl shadow-black/20 hover:border-white/20 block bg-slate-900'>
              <div className='relative overflow-hidden bg-linear-to-b from-white/10 to-transparent p-8 h-96'>
                {popularMovies[0].backdrop_path ? (
                  <img
                    src={backdrop(popularMovies[0].backdrop_path, 'w780')}
                    alt={popularMovies[0].title}
                    className='absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500'
                  />
                ) : (
                  <div className='absolute inset-0 w-full h-full bg-slate-900' />
                )}
                <div className='relative z-10 flex flex-col justify-between h-full'>
                  <span className='inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold w-fit border border-emerald-500/20'>POPULAR</span>
                  <div>
                    <h3 className='text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors'>{popularMovies[0].title}</h3>
                    <p className='text-sm text-slate-300 line-clamp-3'>{popularMovies[0].overview}</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Grid of Cards */}
            <div className='grid grid-cols-2 gap-4'>
              {popularMovies.slice(1, 5).map((item) => (
                <Link key={item.id} to={`/movies/${item.id}`} className='group overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/20 hover:border-white/20 block bg-slate-900'>
                  <div className='relative overflow-hidden h-48 sm:h-56'>
                    {item.backdrop_path ? (
                      <img src={backdrop(item.backdrop_path, 'w500')} alt={item.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                    ) : (
                      <div className='w-full h-full bg-slate-900' />
                    )}
                    <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent flex items-end p-4'>
                      <div className='flex items-end justify-between w-full gap-2'>
                        <h3 className='text-sm font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2'>{item.title}</h3>
                        <span className='inline-flex items-center gap-1 text-emerald-300 text-xs font-bold bg-slate-950/60 backdrop-blur-xs px-2 py-0.5 rounded-md shrink-0 border border-white/5'>
                          <StarIcon className='w-3 h-3 text-amber-400' />
                          {formatRating(item.vote_average)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Rated Classics */}
      {topRatedMovies.length > 0 && (
        <section className='max-w-7xl mx-auto px-6 py-12 lg:px-8'>
          <div className='flex items-center justify-between gap-4 mb-8'>
            <h2 className='text-3xl font-extrabold text-white'>Top Rated Classics</h2>
            <Link to='/Movies' className='inline-flex items-center gap-2 text-sm text-amber-300 hover:text-white font-bold transition-colors'>
              View all
              <ArrowRightIcon className='w-4 h-4' />
            </Link>
          </div>
          <div className='grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {topRatedMovies.slice(0, 5).map((movie) => {
              const poster = img(movie.poster_path, 'w342');
              const ratingVal = formatRating(movie.vote_average);
              const year = movie.release_date?.slice(0, 4) ?? '—';
              const genresStr = getGenreNames(movie.genre_ids).slice(0, 2).join(' • ');

              return (
                <Link key={movie.id} to={`/movies/${movie.id}`} className='group overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/20 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 block bg-slate-900/40'>
                  <div className='relative overflow-hidden h-64 bg-slate-950'>
                    {poster ? (
                      <img
                        src={poster}
                        alt={movie.title}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                        loading='lazy'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <PlayIcon className='w-12 h-12 text-slate-800' />
                      </div>
                    )}
                    <div className='absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs px-2 py-1 rounded-lg border border-white/5'>
                      <span className='inline-flex items-center gap-1 text-emerald-300 text-xs font-bold'>
                        <StarIcon className='w-3 h-3 text-amber-400' />
                        {ratingVal}
                      </span>
                    </div>
                  </div>
                  <div className='p-4 bg-slate-950/20'>
                    <h3 className='font-bold text-white text-sm group-hover:text-amber-400 transition-colors truncate'>{movie.title}</h3>
                    <p className='text-xs text-slate-400 mt-1 truncate'>
                      {genresStr ? `${genresStr} • ` : ''}{year}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
