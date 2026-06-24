import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HeartIcon, BookmarkIcon, CheckCircleIcon, TrophyIcon,
  CogIcon, BellIcon, PencilIcon, ArrowRightOnRectangleIcon,
  StarIcon, XMarkIcon, UserCircleIcon, ShieldCheckIcon,
  GlobeAltIcon, EyeIcon, TrashIcon, CheckIcon,
  EnvelopeIcon, DevicePhoneMobileIcon, KeyIcon,
  FilmIcon, FireIcon, SparklesIcon, CameraIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/solid';
import { useFavorites } from '../../context/FavoritesContext';
import { useWatchlist } from '../../context/WatchlistContext';
import { useNotifications } from '../../context/NotificationsContext';
import { QuickViewModal as TvQuickViewModal } from '../../Pages/TvShows';

// ─── Avatar options ────────────────────────────────────────────────────────────
const AVATARS = [
  { id: 'av1', label: 'Super Hero', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix' },
  { id: 'av2', label: 'Spaceman',   src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper' },
  { id: 'av3', label: 'Cine Princess', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka' },
  { id: 'av4', label: 'Agent Zero', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack' },
  { id: 'av5', label: 'Retro Heroine', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mia' },
  { id: 'av6', label: 'Sci-Fi Kid', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Buster' },
  { id: 'av7', label: 'Shadow Queen', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Harley' },
  { id: 'av8', label: 'Mystery Gal', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bella' },
];

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${checked ? 'bg-gradient-to-r from-red-600 to-rose-500 focus:ring-red-500 shadow-lg shadow-red-600/30' : 'bg-slate-700 focus:ring-slate-500'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
}

// ─── Avatar Picker Modal ───────────────────────────────────────────────────────
function AvatarPicker({ current, onSelect, onClose }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onSelect(event.target.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in'>
      <div className='relative w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700/60 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-slate-800'>
          <div>
            <h3 className='text-xl font-black text-white'>Choose Your Avatar</h3>
            <p className='text-slate-400 text-sm mt-0.5'>Pick your cartoon persona</p>
          </div>
          <button onClick={onClose} className='p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer'>
            <XMarkIcon className='w-5 h-5' />
          </button>
        </div>
        {/* Grid */}
        <div className='p-6 grid grid-cols-4 gap-4'>
          {AVATARS.map(av => (
            <button
              key={av.id}
              onClick={() => { onSelect(av.src); onClose(); }}
              className={`group relative flex flex-col items-center gap-2 p-2 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                current === av.src
                  ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20'
                  : 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/50'
              }`}
            >
              <div className='relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-slate-700 group-hover:ring-amber-400/50 transition bg-slate-950/40'>
                <img src={av.src} alt={av.label} className='w-full h-full object-cover' />
                {current === av.src && (
                  <div className='absolute inset-0 bg-amber-400/30 flex items-center justify-center'>
                    <CheckIcon className='w-5 h-5 text-white' />
                  </div>
                )}
              </div>
              <span className='text-[10px] font-semibold text-slate-400 text-center leading-tight group-hover:text-slate-300 transition'>{av.label}</span>
            </button>
          ))}
        </div>

        {/* Upload Custom Section */}
        <div className='p-6 border-t border-slate-800 flex flex-col items-center gap-3 bg-slate-950/20 text-center'>
          <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Or upload your own custom photo</p>
          <label className='flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 rounded-xl text-sm font-bold transition active:scale-95 cursor-pointer border border-slate-700/60 shadow-lg shadow-black/40'>
            <ArrowUpTrayIcon className='w-4 h-4' />
            <span>Choose Image File</span>
            <input 
              type='file' 
              accept='image/*' 
              className='hidden' 
              onChange={handleFileUpload} 
            />
          </label>
        </div>
      </div>
    </div>
  );
}

// ─── Confirm Modal ─────────────────────────────────────────────────────────────
function ConfirmModal({ title, description, confirmLabel = 'Confirm', danger = false, onConfirm, onClose }) {
  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md'>
      <div className='w-full max-w-sm bg-slate-900 border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden'>
        <div className={`p-1 ${danger ? 'bg-gradient-to-r from-red-600/20 to-rose-600/20' : 'bg-gradient-to-r from-amber-600/20 to-amber-400/20'}`} />
        <div className='p-6 space-y-4'>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${danger ? 'bg-red-600/20' : 'bg-amber-500/20'}`}>
            <TrashIcon className={`w-6 h-6 ${danger ? 'text-red-400' : 'text-amber-400'}`} />
          </div>
          <div>
            <h3 className='text-lg font-black text-white'>{title}</h3>
            <p className='text-slate-400 text-sm mt-1 leading-relaxed'>{description}</p>
          </div>
          <div className='flex gap-3 pt-2'>
            <button onClick={onClose} className='flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition cursor-pointer'>
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${danger ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, color, borderColor, label, value, text }) {
  return (
    <div className={`group relative overflow-hidden bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 border border-slate-800/80 hover:${borderColor} transition-all duration-300 cursor-default`}>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${color} pointer-events-none`} />
      <div className='relative'>
        <Icon className={`w-7 h-7 mb-3 ${color.includes('red') ? 'text-red-400' : color.includes('blue') ? 'text-blue-400' : color.includes('emerald') ? 'text-emerald-400' : 'text-amber-400'}`} />
        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider mb-1'>{label}</p>
        {text ? <p className='text-sm font-black text-amber-400'>{text}</p> : <p className='text-3xl font-black text-white'>{value}</p>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ProfileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialTab = location.state?.tab ?? 'overview';
  const [activeSection, setActiveSection] = useState(initialTab);
  const [favTab, setFavTab] = useState('favorites');
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [selectedTvShow, setSelectedTvShow] = useState(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const { favorites, removeFromFavorites } = useFavorites();
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const { notifications, unreadCount, markAsRead, markAllRead, dismiss } = useNotifications();

  // ── localStorage helpers ───────────────────────────────────────────────────
  const LS_PROFILE  = 'cv_profile';
  const LS_SETTINGS = 'cv_settings';
  const LS_AVATAR   = 'cv_avatar';

  const loadProfile = () => {
    try { return JSON.parse(localStorage.getItem(LS_PROFILE)) ?? null; } catch { return null; }
  };
  const loadSettings = () => {
    try { return JSON.parse(localStorage.getItem(LS_SETTINGS)) ?? null; } catch { return null; }
  };

  const [avatar, setAvatar] = useState(
    localStorage.getItem(LS_AVATAR) || AVATARS[1].src
  );

  const defaultProfile = {
    name: 'Alex Rivers',
    email: 'alex.rivers@cineverse.com',
    bio: 'Cinema lover & serial binge-watcher 🎬',
    location: 'Cairo, Egypt',
    website: '',
  };
  const defaultSettings = {
    emailNotif: true, pushNotif: false, newsletter: true,
    showWatchlist: true, showFavorites: true, twoFactor: false,
    language: 'English', quality: 'Auto',
  };

  const [profile, setProfile]   = useState(loadProfile() ?? defaultProfile);
  const [settings, setSettings] = useState(loadSettings() ?? defaultSettings);
  const [saved, setSaved]       = useState(false);

  // Persist avatar
  const handleSelectAvatar = (src) => {
    setAvatar(src);
    localStorage.setItem(LS_AVATAR, src);
    window.dispatchEvent(new Event('avatarChanged'));
  };

  // Persist settings on every change
  useEffect(() => {
    localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const getCurrentPassword = () => {
    const savedPassword = localStorage.getItem('cv_password');
    if (savedPassword) return savedPassword;

    const currentUsername = localStorage.getItem('cv_username');
    const customUserStr = localStorage.getItem('cv_custom_user');
    if (customUserStr) {
      try {
        const customUser = JSON.parse(customUserStr);
        if (customUser && customUser.username === currentUsername) {
          return customUser.password;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return currentUsername ? `${currentUsername}pass` : 'emilyspass';
  };

  // Save profile
  const handleSave = () => {
    localStorage.setItem(LS_PROFILE, JSON.stringify(profile));
    
    // Sync to cv_custom_user if logged in as a custom user
    const currentUsername = localStorage.getItem('cv_username');
    const customUserStr = localStorage.getItem('cv_custom_user');
    if (customUserStr) {
      try {
        const customUser = JSON.parse(customUserStr);
        if (customUser && customUser.username === currentUsername) {
          const nameParts = (profile.name || '').trim().split(' ');
          customUser.firstName = nameParts[0] || '';
          customUser.lastName = nameParts.slice(1).join(' ') || '';
          customUser.email = profile.email || '';
          localStorage.setItem('cv_custom_user', JSON.stringify(customUser));
        }
      } catch (e) {
        console.error(e);
      }
    }

    setSaved(true);
    window.dispatchEvent(new Event('authChanged'));
    setTimeout(() => setSaved(false), 2500);
  };

  // Password change
  const handlePasswordSave = () => {
    setPasswordError('');
    const currentPassword = getCurrentPassword();

    if (passwordForm.current !== currentPassword) {
      setPasswordError('Current password is incorrect.');
      return;
    }
    if (passwordForm.next.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError('Passwords do not match.');
      return;
    }

    localStorage.setItem('cv_password', passwordForm.next);

    const currentUsername = localStorage.getItem('cv_username');
    const customUserStr = localStorage.getItem('cv_custom_user');
    if (customUserStr) {
      try {
        const customUser = JSON.parse(customUserStr);
        if (customUser && customUser.username === currentUsername) {
          customUser.password = passwordForm.next;
          localStorage.setItem('cv_custom_user', JSON.stringify(customUser));
        }
      } catch (e) {
        console.error(e);
      }
    }

    setPasswordSaved(true);
    setPasswordForm({ current: '', next: '', confirm: '' });
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  // Clear all data
  const handleDeleteData = () => {
    localStorage.removeItem(LS_PROFILE);
    localStorage.removeItem(LS_SETTINGS);
    localStorage.removeItem(LS_AVATAR);
    localStorage.removeItem('cv_password');
    localStorage.removeItem('cv_username');
    localStorage.removeItem('cv_custom_user');
    setProfile(defaultProfile);
    setSettings(defaultSettings);
    setAvatar(AVATARS[1].src);
    setShowDeleteConfirm(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('cv_token');
    localStorage.removeItem('cv_profile');
    localStorage.removeItem('cv_avatar');
    window.dispatchEvent(new Event('authChanged'));
    setShowLogoutConfirm(false);
    navigate('/auth/login');
  };

  // Honour tab from router state (bell icon, etc.)
  useEffect(() => {
    if (location.state?.tab) setActiveSection(location.state.tab);
  }, [location.state]);

  // Sidebar is permanently collapsed to icon-only view on desktop
  const isCollapsed = true;

  const navItems = [
    { key: 'overview',      icon: FilmIcon,    label: 'Overview',      badge: null },
    { key: 'editProfile',   icon: PencilIcon,  label: 'Edit Profile',  badge: null },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // OVERVIEW
  // ─────────────────────────────────────────────────────────────────────────────
  const renderOverviewContent = () => {
    const activeList = favTab === 'favorites' ? favorites : watchlist;
    return (
      <div className='space-y-8'>
        {/* Banner */}
        <div className='relative overflow-hidden rounded-3xl h-36 bg-gradient-to-r from-red-900/40 via-slate-900 to-amber-900/30 border border-slate-800/80'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.15),transparent_50%)]' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_50%)]' />
          <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent' />
          <div className='relative h-full flex items-center px-8 gap-6'>
            <div className='relative shrink-0'>
              <img src={avatar} alt='avatar' className='w-20 h-20 rounded-full border-3 border-amber-400 object-cover shadow-xl shadow-amber-400/20 ring-4 ring-slate-900' />
              <span className='absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900' />
            </div>
            <div>
              <h2 className='text-2xl font-black text-white tracking-tight'>{profile.name}</h2>
              <p className='text-slate-400 text-sm mt-0.5'>{profile.email}</p>
              <span className='inline-block mt-1.5 bg-teal-900/50 text-teal-300 border border-teal-700/40 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider'>
                🎬 Cinephile Gold
              </span>
            </div>
          </div>
        </div>


        {/* Tabs */}
        <div>
          <div className='flex gap-1 mb-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-1.5 w-fit'>
            {[
              { key: 'favorites', icon: HeartIcon,   label: 'Favorites', count: favorites.length },
              { key: 'watchlist', icon: BookmarkIcon, label: 'Watchlist', count: watchlist.length },
            ].map(({ key, icon: Icon, label, count }) => (
              <button key={key} onClick={() => setFavTab(key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  favTab === key
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className='w-4 h-4' />
                {label}
                {count > 0 && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none ${favTab === key ? 'bg-white/20' : 'bg-slate-700 text-slate-300'}`}>{count}</span>
                )}
              </button>
            ))}
          </div>

          {activeList.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
              {activeList.map((item) => (
                <div key={item.id} className='group relative bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 hover:-translate-y-1 transition-all duration-300'>
                  <button
                    onClick={() => favTab === 'favorites' ? removeFromFavorites(item.id) : removeFromWatchlist(item.id)}
                    className='absolute top-2 right-2 z-10 p-1.5 rounded-full bg-slate-950/80 border border-white/10 text-slate-400 hover:bg-red-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer'
                  >
                    <XMarkIcon className='w-3.5 h-3.5' />
                  </button>
                  <Link
                    to={item.type === 'tv' ? '#' : `/movies/${item.id}`}
                    onClick={(e) => { if (item.type === 'tv') { e.preventDefault(); setSelectedTvShow(item.id); } }}
                  >
                    <div className='relative h-44 overflow-hidden bg-slate-950'>
                      {item.image ? (
                        <img src={item.image} alt={item.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center'><FilmIcon className='w-10 h-10 text-slate-800' /></div>
                      )}
                      <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent' />
                      <div className='absolute bottom-2 left-2 flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-md border border-white/5'>
                        <StarIcon className='w-3 h-3 text-amber-400' />
                        <span className='text-xs font-bold text-slate-100'>{item.rating}</span>
                      </div>
                      {item.type === 'tv' && (
                        <div className='absolute top-2 left-2 bg-purple-600/90 px-2 py-0.5 rounded-md'>
                          <span className='text-[9px] uppercase font-bold text-white'>TV</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className='p-3'>
                    <h3 className='text-white font-bold text-xs line-clamp-1 group-hover:text-amber-400 transition-colors'>{item.title}</h3>
                    <p className='text-slate-500 text-[10px] mt-0.5'>{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-16 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl gap-4'>
              {favTab === 'favorites' ? <HeartIcon className='w-12 h-12 text-slate-800' /> : <BookmarkIcon className='w-12 h-12 text-slate-800' />}
              <div className='text-center'>
                <p className='text-slate-300 font-bold text-lg'>{favTab === 'favorites' ? 'No favorites yet' : 'Watchlist is empty'}</p>
                <p className='text-slate-500 text-sm mt-1'>{favTab === 'favorites' ? 'Click the ❤️ on any card to add it here.' : 'Add movies or shows to watch later.'}</p>
              </div>
              <div className='flex gap-3'>
                <Link to='/Movies' className='px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition active:scale-95'>Movies</Link>
                <Link to='/TvShows' className='px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition active:scale-95'>TV Shows</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // NOTIFICATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  const renderNotificationsContent = () => {
    const unread = notifications.filter(n => n.unread);
    const read   = notifications.filter(n => !n.unread);

    const NotifRow = ({ n, isUnread }) => (
      <div
        onClick={() => isUnread && markAsRead(n.id)}
        className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
          isUnread
            ? 'border-slate-700/80 bg-slate-900/80 hover:border-red-500/30 hover:bg-slate-900'
            : 'border-slate-800/50 bg-slate-900/30 hover:border-slate-700'
        }`}
      >
        {isUnread && <span className='absolute top-4 right-12 w-2 h-2 rounded-full bg-red-500 shadow-md shadow-red-500/40' />}
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${n.bg} ${!isUnread ? 'opacity-50' : ''}`}>
          <n.icon className={`w-5 h-5 ${n.iconColor}`} />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2'>
            <p className={`text-sm font-bold ${isUnread ? 'text-white' : 'text-slate-300'}`}>{n.title}</p>
            <span className='text-slate-500 text-xs shrink-0'>{n.time}</span>
          </div>
          <p className={`text-xs mt-0.5 leading-relaxed ${isUnread ? 'text-slate-400' : 'text-slate-500'}`}>{n.body}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
          className='shrink-0 p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-slate-700 transition-all opacity-0 group-hover:opacity-100 cursor-pointer'
        >
          <XMarkIcon className='w-4 h-4' />
        </button>
      </div>
    );

    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-black text-white'>Notifications</h2>
            <p className='text-slate-400 text-sm mt-1'>
              {unreadCount > 0 ? <><span className='text-red-400 font-bold'>{unreadCount}</span> unread</> : 'All caught up! 🎉'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className='flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer border border-slate-700/60'
            >
              <CheckIcon className='w-4 h-4' />
              Mark all read
            </button>
          )}
        </div>

        {unread.length > 0 && (
          <div className='space-y-3'>
            <p className='text-xs font-bold uppercase tracking-widest text-slate-500 px-1'>New</p>
            {unread.map(n => <NotifRow key={n.id} n={n} isUnread={true} />)}
          </div>
        )}
        {read.length > 0 && (
          <div className='space-y-3'>
            <p className='text-xs font-bold uppercase tracking-widest text-slate-500 px-1'>Earlier</p>
            {read.map(n => <NotifRow key={n.id} n={n} isUnread={false} />)}
          </div>
        )}
        {notifications.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl gap-4'>
            <BellIcon className='w-14 h-14 text-slate-800' />
            <p className='text-slate-300 font-bold text-lg'>No notifications</p>
            <p className='text-slate-500 text-sm'>You're all caught up! 🎉</p>
          </div>
        )}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // EDIT PROFILE
  // ─────────────────────────────────────────────────────────────────────────────
  const renderEditProfileContent = () => (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-black text-white'>Edit Profile</h2>
          <p className='text-slate-400 text-sm mt-1'>Update your personal information and save changes.</p>
        </div>
        {saved && (
          <div className='flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-sm font-semibold animate-pulse'>
            <CheckIcon className='w-4 h-4' /> Saved!
          </div>
        )}
      </div>

      {/* Avatar Section */}
      <div className='bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6'>
        <h3 className='text-white font-bold mb-4 flex items-center gap-2'>
          <CameraIcon className='w-5 h-5 text-amber-400' /> Profile Avatar
        </h3>
        <div className='flex items-center gap-6'>
          <div className='relative cursor-pointer group' onClick={() => setShowAvatarPicker(true)}>
            <img src={avatar} alt='avatar' className='w-20 h-20 rounded-full border-4 border-amber-400 object-cover shadow-xl ring-4 ring-slate-900 group-hover:ring-amber-400/40 transition-all duration-300' />
            <div className='absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center'>
              <CameraIcon className='w-6 h-6 text-white' />
            </div>
          </div>
          <div className='space-y-2'>
            <button
              onClick={() => setShowAvatarPicker(true)}
              className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl text-sm font-bold transition active:scale-95 cursor-pointer shadow-lg shadow-red-600/25'
            >
              <CameraIcon className='w-4 h-4' /> Change Avatar
            </button>
            <p className='text-slate-500 text-xs'>Choose from our cinematic personas collection.</p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className='bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 space-y-5'>
        <h3 className='text-white font-bold flex items-center gap-2'>
          <UserCircleIcon className='w-5 h-5 text-slate-400' /> Personal Information
        </h3>
        <div className='grid sm:grid-cols-2 gap-5'>
          {[
            { key: 'name',     label: 'Full Name',     type: 'text',  placeholder: 'Your name' },
            { key: 'email',    label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
            { key: 'location', label: 'Location',      type: 'text',  placeholder: 'City, Country' },
            { key: 'website',  label: 'Website',       type: 'url',   placeholder: 'https://yoursite.com' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key} className='space-y-1.5'>
              <label className='text-slate-400 text-xs font-bold uppercase tracking-wider'>{label}</label>
              <input
                type={type}
                value={profile[key]}
                placeholder={placeholder}
                onChange={(e) => setProfile(p => ({ ...p, [key]: e.target.value }))}
                className='w-full bg-slate-800/60 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition'
              />
            </div>
          ))}
        </div>
        <div className='space-y-1.5'>
          <label className='text-slate-400 text-xs font-bold uppercase tracking-wider'>Bio</label>
          <textarea
            value={profile.bio}
            rows={3}
            placeholder='Tell us about yourself...'
            onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
            className='w-full bg-slate-800/60 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition resize-none'
          />
        </div>
        <button
          onClick={handleSave}
          className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-bold transition active:scale-95 cursor-pointer shadow-lg shadow-red-600/20'
        >
          <CheckIcon className='w-5 h-5' /> Save Changes
        </button>
      </div>

      {/* Change Password */}
      <div className='bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 space-y-5'>
        <div className='flex items-center justify-between'>
          <h3 className='text-white font-bold flex items-center gap-2'>
            <KeyIcon className='w-5 h-5 text-slate-400' /> Change Password
          </h3>
          {passwordSaved && (
            <span className='flex items-center gap-1.5 text-emerald-400 text-sm font-semibold'>
              <CheckIcon className='w-4 h-4' /> Updated!
            </span>
          )}
        </div>
        {passwordError && (
          <div className='bg-red-600/15 border border-red-500/30 text-red-400 text-sm px-4 py-2.5 rounded-xl'>
            {passwordError}
          </div>
        )}
        {[
          { key: 'current', label: 'Current Password' },
          { key: 'next',    label: 'New Password (min 8 chars)' },
          { key: 'confirm', label: 'Confirm New Password' },
        ].map(({ key, label }) => (
          <div key={key} className='space-y-1.5'>
            <label className='text-slate-400 text-xs font-bold uppercase tracking-wider'>{label}</label>
            <input
              type='password'
              value={passwordForm[key]}
              placeholder='••••••••'
              onChange={(e) => setPasswordForm(f => ({ ...f, [key]: e.target.value }))}
              className='w-full bg-slate-800/60 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition'
            />
          </div>
        ))}
        <button
          onClick={handlePasswordSave}
          className='flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-sm transition active:scale-95 cursor-pointer'
        >
          Update Password
        </button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // SETTINGS
  // ─────────────────────────────────────────────────────────────────────────────
  const renderSettingsContent = () => (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-black text-white'>Settings</h2>
        <p className='text-slate-400 text-sm mt-1'>Manage your account preferences and privacy. Changes are saved automatically.</p>
      </div>

      {[
        {
          title: 'Notification Preferences', icon: BellIcon, iconColor: 'text-amber-400',
          items: [
            { key: 'emailNotif', label: 'Email Notifications', desc: 'Updates and recommendations via email', icon: EnvelopeIcon },
            { key: 'pushNotif',  label: 'Push Notifications',  desc: 'Get notified on your device',          icon: DevicePhoneMobileIcon },
            { key: 'newsletter', label: 'Weekly Newsletter',   desc: 'Top picks and trending content',       icon: SparklesIcon },
          ],
        },
        {
          title: 'Privacy & Security', icon: ShieldCheckIcon, iconColor: 'text-emerald-400',
          items: [
            { key: 'showWatchlist', label: 'Public Watchlist', desc: 'Let others see your watchlist',   icon: EyeIcon },
            { key: 'showFavorites', label: 'Public Favorites', desc: 'Let others see your favorites',   icon: HeartIcon },
            { key: 'twoFactor',     label: 'Two-Factor Auth',  desc: 'Extra security for your account', icon: KeyIcon },
          ],
        },
      ].map(({ title, icon: SectionIcon, iconColor, items }) => (
        <div key={title} className='bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden'>
          <div className='px-6 py-4 border-b border-slate-800 flex items-center gap-3'>
            <SectionIcon className={`w-5 h-5 ${iconColor}`} />
            <h3 className='text-white font-bold'>{title}</h3>
          </div>
          <div className='divide-y divide-slate-800/60'>
            {items.map(({ key, label, desc, icon: ItemIcon }) => (
              <div key={key} className='flex items-center justify-between px-6 py-4 hover:bg-slate-800/30 transition-colors'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center'>
                    <ItemIcon className='w-4 h-4 text-slate-400' />
                  </div>
                  <div>
                    <p className='text-white text-sm font-semibold'>{label}</p>
                    <p className='text-slate-500 text-xs mt-0.5'>{desc}</p>
                  </div>
                </div>
                <Toggle checked={settings[key]} onChange={(v) => setSettings(s => ({ ...s, [key]: v }))} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Preferences */}
      <div className='bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden'>
        <div className='px-6 py-4 border-b border-slate-800 flex items-center gap-3'>
          <CogIcon className='w-5 h-5 text-slate-400' />
          <h3 className='text-white font-bold'>Preferences</h3>
        </div>
        <div className='divide-y divide-slate-800/60'>
          {[
            { key: 'language', label: 'Language',        options: ['English', 'العربية', 'Français', 'Español'] },
            { key: 'quality',  label: 'Default Quality', options: ['Auto', '4K Ultra HD', '1080p HD', '720p'] },
          ].map(({ key, label, options }) => (
            <div key={key} className='flex items-center justify-between px-6 py-4 hover:bg-slate-800/30 transition-colors'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center'>
                  <GlobeAltIcon className='w-4 h-4 text-slate-400' />
                </div>
                <p className='text-white text-sm font-semibold'>{label}</p>
              </div>
              <select
                value={settings[key]}
                onChange={(e) => setSettings(s => ({ ...s, [key]: e.target.value }))}
                className='bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer'
              >
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className='bg-red-950/20 rounded-2xl border border-red-900/40 overflow-hidden'>
        <div className='px-6 py-4 border-b border-red-900/40 flex items-center gap-3'>
          <TrashIcon className='w-5 h-5 text-red-400' />
          <h3 className='text-red-400 font-bold'>Danger Zone</h3>
        </div>
        <div className='px-6 py-4 flex items-center justify-between'>
          <div>
            <p className='text-white text-sm font-semibold'>Clear All Data</p>
            <p className='text-slate-500 text-xs mt-0.5'>Permanently reset your profile, settings, and preferences.</p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition active:scale-95 cursor-pointer shadow-lg shadow-red-600/20'
          >
            Clear Data
          </button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div className='bg-[#020617] min-h-screen text-white pb-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:px-8'>
        <div className='flex flex-col md:flex-row gap-6 items-start'>

          {/* ── Mobile Profile Header & Tabs ── */}
          <div className='w-full md:hidden bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-5 mb-2 flex flex-col gap-4 shadow-xl'>
            <div className='flex items-center gap-4'>
              <div className='relative shrink-0' onClick={() => setShowAvatarPicker(true)}>
                <img src={avatar} alt='avatar' className='w-16 h-16 rounded-full border-3 border-amber-400 object-cover shadow-lg' />
                <span className='absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-400 border border-slate-900 rounded-full' />
              </div>
              <div className='min-w-0'>
                <h2 className='text-lg font-black text-white leading-tight truncate'>{profile.name}</h2>
                <p className='text-slate-400 text-xs truncate'>{profile.email}</p>
                <span className='inline-block mt-1 bg-teal-900/50 text-teal-300 border border-teal-700/40 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider'>
                  🎬 Cinephile Gold
                </span>
              </div>
            </div>

            {/* Mobile Tab List */}
            <nav className='flex gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x'>
              {navItems.map(({ key, icon: Icon, label, badge }) => {
                const isActive = activeSection === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap snap-align-start active:scale-95 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25'
                        : 'bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Icon className='w-4 h-4' />
                    <span>{label}</span>
                    {badge && (
                      <span className='bg-red-600 text-white text-[9px] font-black rounded-full px-1.5 py-0.5 leading-none'>
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className='flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap snap-align-start active:scale-95 transition-all cursor-pointer bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-red-400 hover:border-red-600/20'
              >
                <ArrowRightOnRectangleIcon className='w-4 h-4' />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* ── Sidebar ── */}
          <aside
            className='hidden md:block shrink-0 w-16'
          >
            <div className='sticky top-20 bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl shadow-black/40'>

              {/* Profile Header */}
              <div className='flex flex-col items-center px-2 py-5 gap-2'>
                <div className='relative cursor-pointer' onClick={() => setShowAvatarPicker(true)}>
                  <img
                    src={avatar}
                    alt='avatar'
                    className={`rounded-full border-4 border-amber-400 object-cover shadow-xl shadow-amber-400/20 transition-all duration-500 ${isCollapsed ? 'w-10 h-10 border-2' : 'w-20 h-20'}`}
                  />
                  <span className={`absolute bg-emerald-400 border-2 border-slate-900 rounded-full transition-all duration-500 ${isCollapsed ? 'w-2.5 h-2.5 bottom-0 right-0' : 'w-3.5 h-3.5 bottom-1 right-1'}`} />
                </div>
                <div className={`text-center transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'}`}>
                  <h2 className='text-base font-black text-white whitespace-nowrap leading-tight'>{profile.name}</h2>
                  <p className='text-amber-400 text-[11px] font-semibold mt-0.5 whitespace-nowrap truncate max-w-[180px]'>{profile.email}</p>
                  <span className='inline-block mt-2 bg-teal-900/50 text-teal-300 border border-teal-700/40 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap'>
                    🎬 Cinephile Gold
                  </span>
                </div>
              </div>

              <div className='mx-3 border-t border-slate-800/80' />

              {/* Nav Items */}
              <nav className={`flex flex-col gap-1 transition-all duration-500 ${isCollapsed ? 'p-1.5' : 'p-2.5'}`}>
                {navItems.map(({ key, icon: Icon, label, badge }) => {
                  const isActive = activeSection === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      title={isCollapsed ? label : ''}
                      className={`relative flex items-center gap-3 rounded-2xl transition-all duration-200 cursor-pointer group ${
                        isCollapsed ? 'justify-center px-0 py-3' : 'px-4 py-3'
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25 font-bold'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className='shrink-0 w-5 h-5 transition-all duration-200' />
                      <span className={`text-sm font-semibold whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>
                        {label}
                      </span>
                      {badge && (
                        <span className={`bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'bg-white/20' : ''
                        } ${isCollapsed ? 'absolute top-1.5 right-1.5 w-4 h-4' : 'ml-auto px-1.5 py-0.5 min-w-[18px]'}`}>
                          {badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className='mx-3 border-t border-slate-800/80' />

              {/* Logout */}
              <div className={`transition-all duration-500 ${isCollapsed ? 'p-1.5' : 'p-2.5'}`}>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  title={isCollapsed ? 'Logout' : ''}
                  className={`w-full flex items-center gap-3 rounded-2xl text-sm font-semibold text-slate-400 hover:bg-red-600/20 hover:text-red-400 border border-transparent hover:border-red-600/20 transition-all duration-200 cursor-pointer ${isCollapsed ? 'justify-center px-0 py-3' : 'px-4 py-3'}`}
                >
                  <ArrowRightOnRectangleIcon className='w-5 h-5 shrink-0' />
                  <span className={`transition-all duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────────────────── */}
          <div className='flex-1 min-w-0 w-full'>
            {activeSection === 'overview'      && renderOverviewContent()}
            {activeSection === 'notifications' && renderNotificationsContent()}
            {activeSection === 'editProfile'   && renderEditProfileContent()}
          </div>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────────── */}
      {showAvatarPicker && (
        <AvatarPicker current={avatar} onSelect={handleSelectAvatar} onClose={() => setShowAvatarPicker(false)} />
      )}

      {showDeleteConfirm && (
        <ConfirmModal
          title='Clear All Data?'
          description='This will permanently reset your profile, settings, and saved preferences. Your favorites and watchlist are stored in memory and will also be cleared on page reload.'
          confirmLabel='Yes, Clear Everything'
          danger
          onConfirm={handleDeleteData}
          onClose={() => setShowDeleteConfirm(false)}
        />
      )}

      {showLogoutConfirm && (
        <ConfirmModal
          title='Log Out?'
          description='You will be redirected to the login screen. Your data will remain saved.'
          confirmLabel='Log Out'
          onConfirm={handleLogout}
          onClose={() => setShowLogoutConfirm(false)}
        />
      )}

      {selectedTvShow && (
        <TvQuickViewModal showId={selectedTvShow} onClose={() => setSelectedTvShow(null)} />
      )}
    </div>
  );
}
