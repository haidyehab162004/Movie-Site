import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../../public/logo.svg";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchNavigate = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      // Navigate to search page
    }
  };

  const navItems = [
    { path: '', label: 'Home' },
    { path: 'Movies', label: 'Movies' },
    { path: 'TvShows', label: 'TV Shows' },
    { path: 'Watchlist', label: 'Watchlist' },
  ];

  const navLinkClass = ({ isActive }) => `
    relative px-4 py-2 transition-all duration-300
    after:absolute after:left-0 after:-bottom-1
    after:h-0.5 after:bg-amber-400
    after:transition-all after:duration-300
    ${
      isActive
        ? 'text-amber-400 after:w-full font-semibold text-[16px]'
        : 'text-gray-300 after:w-0 hover:text-white hover:after:w-full'
    }
  `;

  return (
    <nav className='bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 text-white shadow-lg border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center gap-8'>
            <NavLink to='' className='flex items-center gap-2 hover:opacity-80 transition'>
              <img src={logo} alt="CineVerse" className='h-8 w-8' />
              <span className='font-bold text-xl text-amber-400'>CineVerse</span>
            </NavLink>

            {/* Nav Links */}
            <ul className='hidden md:flex gap-1'>
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className='flex items-center gap-4'>
            {/* Search Box */}
            <NavLink to='SearchNav' className='hidden sm:flex items-center bg-gray-800 hover:bg-gray-700 transition rounded-full px-4 py-2 border border-gray-700 hover:border-amber-400'>
              <MagnifyingGlassIcon className='w-4 h-4 text-gray-400 mr-2' />
              <input
                type='text'
                placeholder='Search movies...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchNavigate}
                className='bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-40'
              />
            </NavLink>

            {/* Search Icon Mobile */}
            <NavLink to='SearchNav' className='sm:hidden text-gray-300 hover:text-amber-400 transition'>
              <MagnifyingGlassIcon className='w-5 h-5' />
            </NavLink>

            {/* Profile Button */}
            <NavLink
              to='ProfileNav'
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-red-500 text-white'
                    : 'text-gray-300 hover:text-amber-400 hover:bg-gray-800'
                }`
              }
            >
              <UserCircleIcon className='w-5 h-5' />
              <span className='hidden sm:inline text-sm font-medium'>Profile</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
