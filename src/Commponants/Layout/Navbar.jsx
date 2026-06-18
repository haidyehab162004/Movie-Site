import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../../public/logo.svg";
import { BellIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useNotifications } from '../../context/NotificationsContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { unreadCount } = useNotifications();

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

          {/* Right: Notification Bell, Profile & Mobile Menu Toggle */}
          <div className='flex items-center gap-3'>

            {/* Notification Bell */}
            <NavLink
              to='ProfileNav'
              state={{ tab: 'notifications' }}
              title="Notifications"
              className={({ isActive }) =>
                `relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'text-gray-300 hover:text-white hover:bg-slate-900 border border-slate-800 hover:border-slate-700'
                }`
              }
            >
              <BellIcon className='w-5 h-5' />
              {unreadCount > 0 && (
                <span className='absolute -top-1 -right-1 flex items-center justify-center w-4.5 h-4.5 min-w-[18px] min-h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-lg shadow-red-600/40 border border-slate-950 leading-none'>
                  {unreadCount}
                </span>
              )}
            </NavLink>

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

          {/* Mobile Notification Link */}
          <div className='px-2'>
            <NavLink
              to='ProfileNav'
              state={{ tab: 'notifications' }}
              onClick={() => setIsMobileMenuOpen(false)}
              className='flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-slate-900 font-bold transition-all duration-200'
            >
              <span className='relative'>
                <BellIcon className='w-5 h-5' />
                {unreadCount > 0 && (
                  <span className='absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-600 border border-slate-950' />
                )}
              </span>
              Notifications
              {unreadCount > 0 && (
                <span className='ml-auto text-xs font-bold text-red-400'>{unreadCount} new</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

