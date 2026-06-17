import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { moviesData } from '../data/moviesData';

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Biography', 'Adventure', 'Thriller'];

  const filteredMovies = moviesData.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || selectedGenre === 'All' || movie.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-950 to-black text-white'>
      {/* Header */}
      <div className='max-w-7xl mx-auto px-6 py-12 lg:px-8'>
        <h1 className='text-4xl font-bold mb-8'>Movies</h1>

        {/* Search Bar */}
        <div className='mb-8'>
          <input
            type='text'
            placeholder='Search movies...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition'
          />
        </div>

        {/* Genre Filter */}
        <div className='flex flex-wrap gap-3 mb-12'>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedGenre === genre
                  ? 'bg-red-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <div className='group overflow-hidden rounded-lg border border-white/10 shadow-lg hover:border-white/30 transition cursor-pointer h-full flex flex-col'>
                  <div className='relative overflow-hidden h-80 flex-shrink-0'>
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100'>
                      <span className='text-sm font-semibold text-white bg-black/60 px-3 py-1 rounded'>View Details</span>
                    </div>
                    <div className='absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-lg'>
                      <span className='inline-flex items-center gap-1 text-amber-400 text-xs font-bold'>
                        <StarIcon className='w-3 h-3' />
                        {movie.rating}
                      </span>
                    </div>
                  </div>

                  <div className='p-4 flex-1 flex flex-col justify-between bg-slate-900/50 backdrop-blur'>
                    <div>
                      <h3 className='font-bold text-white mb-2 line-clamp-2'>{movie.title}</h3>
                      <p className='text-xs text-gray-400 mb-3'>{movie.genres.slice(0, 2).join(' • ')}</p>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-400'>{movie.year}</span>
                      <span className='text-amber-400 font-semibold'>{movie.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <p className='text-xl text-gray-400'>No movies found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
