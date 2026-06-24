import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BellIcon, UserCircleIcon,
  HomeIcon, FilmIcon, TvIcon, BookmarkIcon, UserIcon 
} from "@heroicons/react/24/solid";
import { useNotifications } from '../../context/NotificationsContext';

export default function Navbar() {
  const { unreadCount } = useNotifications();
  const [token, setToken] = useState(localStorage.getItem('cv_token'));
  const [avatar, setAvatar] = useState(localStorage.getItem('cv_avatar'));

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem('cv_token'));
      setAvatar(localStorage.getItem('cv_avatar'));
    };

    window.addEventListener('authChanged', handleAuthChange);
    window.addEventListener('avatarChanged', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChanged', handleAuthChange);
      window.removeEventListener('avatarChanged', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

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

  const bottomNavLinkClass = ({ isActive }) => `
    flex flex-col items-center justify-center py-1 flex-1 transition-all duration-200 cursor-pointer
    ${
      isActive
        ? 'text-red-500 font-bold'
        : 'text-slate-400 hover:text-slate-200'
    }
  `;

  const bottomTabs = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/Movies', label: 'Movies', icon: FilmIcon },
    { path: '/TvShows', label: 'TV Shows', icon: TvIcon },
    { path: '/Watchlist', label: 'Watchlist', icon: BookmarkIcon },
    { 
      path: token ? '/ProfileNav' : '/auth/login', 
      label: 'Profile', 
      icon: UserIcon, 
      isProfile: true 
    },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className='sticky top-0 z-50 bg-slate-950/75 backdrop-blur-md border-b border-slate-900/80 text-white shadow-xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            
            {/* Left: Logo & Nav Links */}
            <div className='flex items-center gap-8'>
              <NavLink to='' className='flex items-center gap-2 hover:opacity-95 transition-all duration-300 active:scale-95'>
                <img src="/logo.svg" alt="CineVerse" className='h-8 w-8 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]' />
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

            {/* Right: Notification Bell & Profile Nav (Desktop Only) */}
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

              {/* Profile Button (Desktop Only) */}
              <div className='hidden md:block'>
                {token ? (
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
                    {avatar ? (
                      <img
                        src={avatar}
                        alt='profile'
                        className='w-4.5 h-4.5 rounded-full object-cover'
                      />
                    ) : (
                      <UserCircleIcon className='w-4.5 h-4.5' />
                    )}
                    <span className='text-xs font-semibold'>Profile</span>
                  </NavLink>
                ) : (
                  <NavLink
                    to='/auth/login'
                    className='flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-lg shadow-red-600/20'
                  >
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile Devices */}
      <div className='fixed bottom-0 inset-x-0 z-50 md:hidden bg-slate-950/85 backdrop-blur-lg border-t border-slate-900/80 px-2 py-2 flex items-center justify-around shadow-[0_-8px_30px_rgb(0,0,0,0.7)] pb-safe-bottom'>
        {bottomTabs.map(({ path, label, icon: Icon, isProfile }) => (
          <NavLink
            key={path}
            to={path}
            className={bottomNavLinkClass}
          >
            {({ isActive }) => (
              <>
                {isProfile && avatar ? (
                  <img
                    src={avatar}
                    alt='profile'
                    className={`w-5.5 h-5.5 rounded-full object-cover border-2 transition-all duration-200 ${
                      isActive ? 'border-red-500 scale-110 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'border-slate-600'
                    }`}
                  />
                ) : (
                  <Icon className={`w-5 h-5 transition-all duration-200 ${
                    isActive ? 'scale-110 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]' : ''
                  }`} />
                )}
                <span className='text-[10px] font-bold mt-1 tracking-wide'>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </>
  );
}
