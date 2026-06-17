import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, PlusIcon, StarIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { moviesData } from '../data/moviesData';

export default function HomePage() {
  const trendingRef = useRef(null);

  return (
    <div className='bg-[#020617] text-white'>
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,128,114,0.18),transparent_35%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_30%)]' />
        <div className='relative max-w-7xl mx-auto px-6 py-20 lg:px-8'>
          <div className='grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center'>
            <div className='space-y-8'>
              <div className='inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold uppercase rounded-full px-4 py-2'>
                <span className='bg-red-500/20 text-red-200 px-2 py-1 rounded-full'>Trending #1</span>
                <span className='flex items-center gap-2'>
                  <StarIcon className='w-4 h-4 text-emerald-400' />
                  9.1 rating
                </span>
              </div>
              <div className='space-y-6'>
                <h1 className='text-5xl sm:text-6xl font-bold tracking-tight text-slate-100'>Dune: Part Two</h1>
                <p className='max-w-xl text-lg leading-8 text-slate-300'>Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future.</p>
                <div className='flex flex-wrap gap-4'>
                  <Link to={`/movies/${moviesData[0].id}`} className='inline-flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600'>
                    <PlayIcon className='w-5 h-5' />
                    Play Trailer
                  </Link>
                  <button className='inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500'>
                    <PlusIcon className='w-5 h-5' />
                    Watchlist
                  </button>
                </div>
              </div>
            </div>

              <div className='rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40'>
              <img
                src='https://images.unsplash.com/photo-1542204165-302e2319911d?auto=format&fit=crop&w=1200&q=80'
                alt='Dune Part Two'
                className='w-full h-105 object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='max-w-7xl mx-auto px-6 pb-20 lg:px-8'>
        <div className='flex items-center justify-between gap-4 pb-4'>
          <div>
            <h2 className='text-3xl font-bold text-slate-100'>Trending Now</h2>
            <p className='text-sm text-slate-400'>Catch the most talked-about titles this week.</p>
          </div>
          <Link to='/Movies' className='inline-flex items-center gap-2 text-sm text-amber-300 hover:text-white'>
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
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 p-2 rounded-md hidden sm:inline-flex hover:bg-black/60'
          >
            <ChevronLeftIcon className='w-6 h-6 text-white' />
          </button>

              <div ref={trendingRef} className='flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 pb-6'>
            {moviesData.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`} className='shrink-0 w-65 snap-center'>
                <article className='group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/20'>
                  <div className='relative overflow-hidden'>
                    <img src={movie.image} alt={movie.title} className='h-56 w-full object-cover transition duration-500 group-hover:scale-105' />
                    <div className='absolute inset-x-0 top-4 flex items-center justify-between px-4'>
                      <span className='rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200'>Top Pick</span>
                      <span className='inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300'>
                        <StarIcon className='w-3.5 h-3.5' />
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                  <div className='space-y-3 p-4'>
                    <div className='flex items-center justify-between text-sm text-slate-400'>
                      <span>{movie.year}</span>
                      <span className='rounded-full bg-white/10 px-2 py-1'>Sci-Fi</span>
                    </div>
                    <h3 className='text-md font-semibold text-slate-100'>{movie.title}</h3>
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
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 p-2 rounded-md hidden sm:inline-flex hover:bg-black/60'
          >
            <ChevronRightIcon className='w-6 h-6 text-white' />
          </button>
        </div>
      </section>

      {/* Popular on CineVerse */}
      <section className='max-w-7xl mx-auto px-6 py-20 lg:px-8'>
        <h2 className='text-3xl font-bold text-slate-100 mb-8'>Popular on CineVerse</h2>
        <div className='grid gap-8 lg:grid-cols-[1fr_1.2fr]'>
          {/* Featured Item */}
          <Link to={`/movies/${moviesData[0].id}`} className='group overflow-hidden rounded-3xl border border-white/10 shadow-xl shadow-black/20 hover:border-white/20'>
            <div className='relative overflow-hidden bg-linear-to-b from-white/10 to-transparent p-8 h-96'>
              <img
                src={moviesData[0].image}
                alt={moviesData[0].title}
                className='absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-300'
              />
              <div className='relative z-10 flex flex-col justify-between h-full'>
                <span className='inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold w-fit'>TOP RATED</span>
                <div>
                  <h3 className='text-2xl font-bold text-white mb-2'>{moviesData[0].title}</h3>
                  <p className='text-sm text-gray-300 line-clamp-3'>{moviesData[0].description}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid of Cards */}
          <div className='grid grid-cols-2 gap-4'>
            {moviesData.slice(1, 5).map((item, idx) => (
              <Link key={item.id} to={`/movies/${item.id}`} className='group overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/20 hover:border-white/20'>
                <div className='relative overflow-hidden h-48 sm:h-56'>
                  <img src={item.image} alt={item.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' />
                  <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-4'>
                    <div className='flex items-end justify-between w-full'>
                      <h3 className='text-sm font-semibold text-white'>{item.title}</h3>
                      <span className='inline-flex items-center gap-1 text-emerald-300 text-xs font-bold'>
                        <StarIcon className='w-3 h-3' />
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
      <section className='max-w-7xl mx-auto px-6 py-20 lg:px-8'>
        <div className='flex items-center justify-between gap-4 mb-8'>
          <h2 className='text-3xl font-bold text-slate-100'>Top Rated Classics</h2>
          <Link to='/Movies' className='inline-flex items-center gap-2 text-sm text-amber-300 hover:text-white'>
            View all
            <ArrowRightIcon className='w-4 h-4' />
          </Link>
        </div>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
          {moviesData.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`} className='group overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/20 hover:border-white/20 hover:-translate-y-1 transition'>
              <div className='relative overflow-hidden h-64 bg-linear-to-br from-white/5 to-transparent'>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-lg'>
                  <span className='inline-flex items-center gap-1 text-emerald-300 text-xs font-bold'>
                    <StarIcon className='w-3 h-3' />
                    {movie.rating}
                  </span>
                </div>
              </div>
              <div className='p-4'>
                <h3 className='font-semibold text-white text-sm'>{movie.title}</h3>
                <p className='text-xs text-gray-400 mt-1'>{movie.genres.join(' • ')} • {movie.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
