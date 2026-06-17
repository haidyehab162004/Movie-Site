import React, { useState } from 'react';
import { HeartIcon, BookmarkIcon, CheckCircleIcon, TrophyIcon, CogIcon, BellIcon, PencilIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export default function ProfileNav() {
  const [activeTab, setActiveTab] = useState('favorites');

  // Mock user data
  const user = {
    name: 'Alex Rivers',
    email: 'alex.rivers@cineverse.com',
    memberSince: 'JAN 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    level: 'Cinephile Gold',
    stats: {
      favorites: 42,
      watchlist: 15,
      watched: 128,
    }
  };

  // Mock data for favorites, watchlist, recently watched
  const mockMovies = [
    { id: 1, title: 'Interstellar', year: 2014, rating: 8.7, image: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=200&h=300&fit=crop' },
    { id: 2, title: 'Inception', year: 2010, rating: 8.8, image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=200&h=300&fit=crop' },
  ];

  const menuItems = [
    { icon: HeartIcon, label: 'Overview', color: 'text-red-500' },
    { icon: CogIcon, label: 'Settings', color: 'text-gray-400' },
    { icon: BellIcon, label: 'Notifications', color: 'text-gray-400' },
  ];

  const actionButtons = [
    { label: 'Edit Profile', color: 'bg-red-500 hover:bg-red-600', icon: PencilIcon },
    { label: 'Logout', color: 'bg-gray-700 hover:bg-gray-600', icon: ArrowRightOnRectangleIcon },
  ];

  return (
    <div className='bg-gray-950 min-h-screen text-white pb-10'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Left Sidebar */}
          <div className='lg:col-span-1'>
            <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
              {/* Profile Card */}
              <div className='text-center mb-6'>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-32 h-32 rounded-full mx-auto mb-4 border-4 border-amber-400 object-cover'
                />
                <h1 className='text-2xl font-bold mb-1'>{user.name}</h1>
                <p className='text-amber-400 text-sm mb-2'>{user.email}</p>
                <span className='inline-block bg-teal-900 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold'>
                  MEMBER SINCE {user.memberSince}
                </span>
              </div>

              {/* Menu Items */}
              <div className='space-y-2 mb-6'>
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${idx === 0 ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                      <Icon className='w-5 h-5' />
                      <span className='font-medium'>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className='space-y-2 border-t border-gray-800 pt-4'>
                {actionButtons.map((btn, idx) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={idx}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${btn.color}`}
                    >
                      <Icon className='w-5 h-5' />
                      {btn.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className='lg:col-span-3'>
            {/* Stats Cards */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-800 hover:border-red-500 transition'>
                <HeartIcon className='w-8 h-8 text-red-500 mb-2' />
                <p className='text-gray-400 text-sm mb-1'>FAVORITES</p>
                <p className='text-3xl font-bold'>{user.stats.favorites}</p>
              </div>
              <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition'>
                <BookmarkIcon className='w-8 h-8 text-blue-500 mb-2' />
                <p className='text-gray-400 text-sm mb-1'>WATCHLIST</p>
                <p className='text-3xl font-bold'>{user.stats.watchlist}</p>
              </div>
              <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-800 hover:border-green-500 transition'>
                <CheckCircleIcon className='w-8 h-8 text-green-500 mb-2' />
                <p className='text-gray-400 text-sm mb-1'>WATCHED</p>
                <p className='text-3xl font-bold'>{user.stats.watched}</p>
              </div>
              <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-800 hover:border-amber-500 transition'>
                <TrophyIcon className='w-8 h-8 text-amber-500 mb-2' />
                <p className='text-gray-400 text-sm mb-1'>LEVEL</p>
                <p className='text-xl font-bold text-amber-400'>{user.level}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-800 mb-6'>
              <div className='flex gap-8'>
                {['favorites', 'watchlist', 'recently'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-semibold transition ${
                      activeTab === tab
                        ? 'text-red-500 border-b-2 border-red-500'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab === 'favorites' && 'Favorites'}
                    {tab === 'watchlist' && 'Watchlist'}
                    {tab === 'recently' && 'Recently Watched'}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
              {mockMovies.map((movie) => (
                <div key={movie.id} className='group cursor-pointer'>
                  <div className='relative overflow-hidden rounded-lg mb-3 h-48'>
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                    />
                    <div className='absolute top-2 right-2 bg-black/70 px-2 py-1 rounded'>
                      <p className='text-amber-400 font-bold text-sm'>⭐ {movie.rating}</p>
                    </div>
                  </div>
                  <h3 className='text-white font-semibold text-sm'>{movie.title}</h3>
                  <p className='text-gray-400 text-xs'>{movie.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
