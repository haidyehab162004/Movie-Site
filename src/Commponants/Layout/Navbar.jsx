import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../../public/logo.svg";
import { MagnifyingGlassIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    relative px-3.5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 rounded-xl cursor-pointer
    ${
      isActive
        ? 'text-amber-400 bg-amber-400/10'
        : 'text-gray-300 hover:text-white hover:bg-slate-900/60'
    }
  `;

  const mobileNavLinkClass = ({ isActive }) => `
    block px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 cursor-pointer
    ${
      isActive
        ? 'text-amber-400 bg-amber-400/10'
        : 'text-gray-300 hover:text-white hover:bg-slate-900'
    }
  `;

  return (
    <nav className='sticky top-0 z-50 bg-slate-950/75 backdrop-blur-md border-b border-slate-900/80 text-white shadow-xl'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          
          {/* Left: Logo & Nav Links */}
          <div className='flex items-center gap-8'>
            <NavLink to='' className='flex items-center gap-2 hover:opacity-95 transition-all duration-300 active:scale-95'>
              <img src={logo} alt="CineVerse" className='h-8 w-8 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]' />
              <span className='font-black text-xl tracking-tight text-white hover:text-amber-400 transition-colors duration-300'>
                Cine<span className="text-amber-400">Verse</span>
              </span>
            </NavLink>

            {/* Desktop Nav Links */}
            <ul className='hidden md:flex items-center gap-1.5'>
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

          {/* Right: Search, Profile & Mobile Menu Toggle */}
          <div className='flex items-center gap-4'>
            {/* Search Box */}
            <div className='relative hidden sm:flex items-center'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <MagnifyingGlassIcon className='w-4 h-4 text-gray-400' />
              </span>
              <input
                type='text'
                placeholder='Search movies...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchNavigate}
                className='w-44 focus:w-60 pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300'
              />
            </div>

            {/* Profile Button */}
            <NavLink
              to='ProfileNav'
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'text-gray-300 hover:text-white hover:bg-slate-900 border border-slate-800 hover:border-slate-700'
                }`
              }
            >
              <UserCircleIcon className='w-4.5 h-4.5' />
              <span className='hidden sm:inline text-xs font-semibold'>Profile</span>
            </NavLink>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition duration-200 cursor-pointer'
              aria-label='Toggle menu'
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className='w-5 h-5' />
              ) : (
                <Bars3Icon className='w-5 h-5' />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-slate-950 border-b border-slate-900/80 px-4 pt-2 pb-6 space-y-4 animate-fade-in'>
          {/* Mobile Search Box */}
          <div className='relative w-full px-2'>
            <span className='absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none'>
              <MagnifyingGlassIcon className='w-4 h-4 text-gray-400' />
            </span>
            <input
              type='text'
              placeholder='Search movies...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchNavigate}
              className='w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all'
            />
          </div>

          {/* Links List */}
          <ul className='space-y-1.5 px-2'>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

