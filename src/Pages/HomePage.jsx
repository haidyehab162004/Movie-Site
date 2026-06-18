import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, PlusIcon, StarIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { moviesData } from '../data/moviesData';
import { useWatchlist } from '../context/WatchlistContext';

export default function HomePage() {
  const trendingRef = useRef(null);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // Trending movie info dynamically pulled (Dune: Part Two - ID: 2)
  const featuredMovie = moviesData[1] || moviesData[0];
  const inWatchlist = isInWatchlist(featuredMovie.id);

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
                  {featuredMovie.rating} rating
                </span>
              </div>
              <div className='space-y-6'>
                <h1 className='text-5xl sm:text-6xl font-black tracking-tight text-white'>
                  {featuredMovie.title}
                </h1>
                <p className='max-w-xl text-base sm:text-lg leading-relaxed text-slate-300'>
                  {featuredMovie.fullDescription || featuredMovie.description}
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
                        addToWatchlist(featuredMovie);
                      }
                    }}
                    className={`inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-sm font-bold transition active:scale-95 cursor-pointer ${
                      inWatchlist
                        ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/25'
                        : 'border-slate-700 bg-white/5 text-slate-100 hover:border-slate-500'
                    }`}
                  >
                    <PlusIcon className='w-5 h-5' />
                    {inWatchlist ? 'Added to Watchlist' : 'Watchlist'}
                  </button>
                </div>
              </div>
            </div>

            <div className='rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 relative aspect-video lg:aspect-auto lg:h-[420px]'>
              <img
                src={featuredMovie.image}
                alt={featuredMovie.title}
                className='w-full h-full object-cover'
              />
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
            {moviesData.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`} className='shrink-0 w-64 snap-center'>
                <article className='group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl'>
                  <div className='relative overflow-hidden aspect-[2/3]'>
                    <img src={movie.image} alt={movie.title} className='w-full h-full object-cover transition duration-500 group-hover:scale-105' />
                    <div className='absolute inset-x-0 top-4 flex items-center justify-between px-4'>
                      <span className='rounded-lg bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-200 border border-white/5'>Top Pick</span>
                      <span className='inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 backdrop-blur-xs px-2.5 py-1 text-xs text-emerald-300 border border-emerald-500/20'>
                        <StarIcon className='w-3.5 h-3.5 text-amber-400' />
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                  <div className='space-y-2.5 p-4 bg-slate-950/40 backdrop-blur-xs'>
                    <div className='flex items-center justify-between text-xs text-slate-400'>
                      <span>{movie.year}</span>
                      <span className='rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase font-bold'>{movie.genres[0]}</span>
                    </div>
                    <h3 className='font-bold text-white group-hover:text-amber-400 transition-colors truncate'>{movie.title}</h3>
                  </div>
                </article>
              </Link>
            ))}
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
      <section className='max-w-7xl mx-auto px-6 py-12 lg:px-8'>
        <h2 className='text-3xl font-extrabold text-white mb-8'>Popular on CineVerse</h2>
        <div className='grid gap-8 lg:grid-cols-[1fr_1.2fr]'>
          {/* Featured Item */}
          <Link to={`/movies/${moviesData[0].id}`} className='group overflow-hidden rounded-3xl border border-white/10 shadow-xl shadow-black/20 hover:border-white/20'>
            <div className='relative overflow-hidden bg-linear-to-b from-white/10 to-transparent p-8 h-96'>
              <img
                src={moviesData[0].image}
                alt={moviesData[0].title}
                className='absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500'
              />
              <div className='relative z-10 flex flex-col justify-between h-full'>
                <span className='inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold w-fit border border-emerald-500/20'>TOP RATED</span>
                <div>
                  <h3 className='text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors'>{moviesData[0].title}</h3>
                  <p className='text-sm text-slate-300 line-clamp-3'>{moviesData[0].description}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid of Cards */}
          <div className='grid grid-cols-2 gap-4'>
            {moviesData.slice(1, 5).map((item) => (
              <Link key={item.id} to={`/movies/${item.id}`} className='group overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/20 hover:border-white/20'>
                <div className='relative overflow-hidden h-48 sm:h-56'>
                  <img src={item.image} alt={item.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                  <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex items-end p-4'>
                    <div className='flex items-end justify-between w-full'>
                      <h3 className='text-sm font-semibold text-white group-hover:text-amber-400 transition-colors'>{item.title}</h3>
                      <span className='inline-flex items-center gap-1 text-emerald-300 text-xs font-bold bg-slate-950/60 backdrop-blur-xs px-2 py-0.5 rounded-md'>
                        <StarIcon className='w-3 h-3 text-amber-400' />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Classics */}
      <section className='max-w-7xl mx-auto px-6 py-12 lg:px-8'>
        <div className='flex items-center justify-between gap-4 mb-8'>
          <h2 className='text-3xl font-extrabold text-white'>Top Rated Classics</h2>
          <Link to='/Movies' className='inline-flex items-center gap-2 text-sm text-amber-300 hover:text-white font-bold transition-colors'>
            View all
            <ArrowRightIcon className='w-4 h-4' />
          </Link>
        </div>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
          {moviesData.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`} className='group overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/20 hover:border-white/20 hover:-translate-y-1 transition-all duration-300'>
              <div className='relative overflow-hidden h-64 bg-linear-to-br from-white/5 to-transparent'>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs px-2 py-1 rounded-lg border border-white/5'>
                  <span className='inline-flex items-center gap-1 text-emerald-300 text-xs font-bold'>
                    <StarIcon className='w-3 h-3 text-amber-400' />
                    {movie.rating}
                  </span>
                </div>
              </div>
              <div className='p-4 bg-slate-950/20'>
                <h3 className='font-bold text-white text-sm group-hover:text-amber-400 transition-colors truncate'>{movie.title}</h3>
                <p className='text-xs text-slate-400 mt-1 truncate'>{movie.genres.join(' • ')} • {movie.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
