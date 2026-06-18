
import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { FunnelIcon } from "@heroicons/react/24/solid";

export default function SearchNav() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [selectedTrending, setSelectedTrending] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const trendingTopics = [
    'Sci-Fi Epic',
    'Oscar Winners',
    'Christopher Nolan',
    'Dune 2'
  ];

  const mockMovies = [
    {
      id: 1,
      title: 'Interstellar',
      year: 2014,
      genre: 'Sci-Fi, Drama',
      rating: 8.7,
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=300&h=450&fit=crop'
    },
    {
      id: 2,
      title: 'Interstellar: Origins',
      year: 2023,
      genre: 'Documentary',
      rating: 9.1,
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop'
    },
    {
      id: 3,
      title: 'Beyond the Star',
      year: 2021,
      genre: 'Sci-Fi, Adventure',
      rating: 8.2,
      image: 'https://images.unsplash.com/photo-1570820141207-b5e675e71886?w=300&h=450&fit=crop'
    },
    {
      id: 4,
      title: 'Cosmic Journey',
      year: 2022,
      genre: 'Sci-Fi, Drama',
      rating: 7.8,
      image: 'https://images.unsplash.com/photo-1536440936515-6f3ee311288a?w=300&h=450&fit=crop'
    },
    {
      id: 5,
      title: 'Stars Align',
      year: 2023,
      genre: 'Sci-Fi, Romance',
      rating: 8.5,
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop'
    },
    {
      id: 6,
      title: 'Galactic Quest',
      year: 2020,
      genre: 'Sci-Fi, Action',
      rating: 7.9,
      image: 'https://images.unsplash.com/photo-1554995207-c18231b7d4d3?w=300&h=450&fit=crop'
    },
    {
      id: 7,
      title: 'Space Odyssey',
      year: 2021,
      genre: 'Sci-Fi, Adventure',
      rating: 8.6,
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=300&h=450&fit=crop'
    },
    {
      id: 8,
      title: 'Nebula',
      year: 2022,
      genre: 'Sci-Fi, Drama',
      rating: 8.3,
      image: 'https://images.unsplash.com/photo-1578875212162-b3d8ca2c9c8f?w=300&h=450&fit=crop'
    },
    {
      id: 9,
      title: 'Astral Plane',
      year: 2023,
      genre: 'Sci-Fi, Thriller',
      rating: 8.4,
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop'
    },
    {
      id: 10,
      title: 'Zero Gravity',
      year: 2021,
      genre: 'Sci-Fi, Action',
      rating: 8.1,
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop'
    },
    {
      id: 11,
      title: 'Cosmic Encounter',
      year: 2022,
      genre: 'Sci-Fi, Adventure',
      rating: 7.7,
      image: 'https://images.unsplash.com/photo-1536440936515-6f3ee311288a?w=300&h=450&fit=crop'
    },
    {
      id: 12,
      title: 'Terminal Velocity',
      year: 2023,
      genre: 'Sci-Fi, Drama',
      rating: 8.0,
      image: 'https://images.unsplash.com/photo-1554995207-c18231b7d4d3?w=300&h=450&fit=crop'
    }
  ];

  const filteredMovies = searchTerm.trim() !== '' || selectedTrending !== ''
    ? mockMovies.filter(movie =>
        movie.title.toLowerCase().includes((searchTerm || selectedTrending).toLowerCase())
      )
    : mockMovies.sort((a, b) => b.rating - a.rating);

  const hasSearchOrTrending = searchTerm.trim() !== '' || selectedTrending !== '';

  return (
    <div className='bg-gray-950 min-h-screen text-white pb-10'>
      {/* Search Section */}
      <div className='flex items-center pt-8 flex-col gap-6 justify-center px-4'>
        <div className='w-full max-w-2xl'>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search movies, shows...'
            className='w-full h-14 border-2 border-amber-400 rounded-2xl bg-gray-900 text-amber-50 p-4 text-[16px] focus:outline-none focus:border-amber-300 transition'
          />
        </div>

        {/* Trending Section */}
        <div className='flex gap-4 justify-center text-center items-center flex-wrap'>
          <p className='text-[16px] text-amber-300 font-bold whitespace-nowrap'>TRENDING:</p>
          {trendingTopics.map((trend, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedTrending(trend);
                setSearchTerm('');
              }}
              className={`w-fit border px-4 py-2 rounded-full text-[14px] transition-all cursor-pointer ${
                selectedTrending === trend
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                  : 'border-gray-600 bg-gray-800 text-cyan-400 hover:border-cyan-500'
              }`}
            >
              {trend}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      {hasSearchOrTrending && (
        <div className='px-6 mt-10 flex justify-between items-center flex-wrap gap-4'>
          <div className='flex gap-2 items-center'>
            <p className='text-cyan-400 font-bold text-[18px]'>Results for</p>
            <span className='text-amber-400 font-bold text-[18px]'>"{searchTerm || selectedTrending}"</span>
          </div>
          <div className='flex gap-3 items-center'>
            <p className='text-amber-400 font-semibold text-[14px]'>{filteredMovies.length} Results found</p>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className='border border-gray-600 rounded-2xl px-3 py-2 bg-gray-800 hover:bg-gray-700 transition flex items-center gap-2'
            >
              <FunnelIcon className='w-5 h-5' />
              <span className='text-sm'>Filter</span>
            </button>
          </div>
        </div>
      )}

      {!hasSearchOrTrending && (
        <div className='px-6 mt-10'>
          <p className='text-amber-300 font-bold text-[18px]'>🔥 Top Rated Movies</p>
        </div>
      )}

      {/* Movies Grid */}
      {(hasSearchOrTrending || true) && (
        <div className='px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {filteredMovies.map((movie) => (
            <div key={movie.id} className='group cursor-pointer'>
              <div className='relative overflow-hidden rounded-lg h-72 mb-3'>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-lg'>
                  <p className='text-amber-400 font-bold text-sm'>{movie.rating}</p>
                </div>
              </div>
              <div className='space-y-2'>
                <h3 className='text-white font-semibold text-[14px] line-clamp-2'>{movie.title}</h3>
                <p className='text-gray-400 text-[12px]'>{movie.year} • {movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {hasSearchOrTrending && filteredMovies.length === 0 && (
        <div className='flex items-center justify-center h-64 text-gray-400'>
          <p className='text-lg'>No results found for "{searchTerm || selectedTrending}"</p>
        </div>
      )}
    </div>
  );
}