import { createContext, useContext, useState } from 'react';
import {
  HeartIcon, StarIcon, BellIcon, TrophyIcon, CheckCircleIcon,
  FilmIcon, SparklesIcon,
} from '@heroicons/react/24/solid';

// ─── Initial notifications data ───────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: HeartIcon,
    iconColor: 'text-red-500',
    bg: 'bg-red-500/10',
    title: 'New recommendation!',
    body: 'Based on your favorites, try "Oppenheimer" 🎥',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    icon: StarIcon,
    iconColor: 'text-amber-400',
    bg: 'bg-amber-400/10',
    title: 'Top Pick this week',
    body: '"Dune: Part Two" is trending in your region',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    icon: FilmIcon,
    iconColor: 'text-purple-400',
    bg: 'bg-purple-400/10',
    title: 'New release!',
    body: '"Interstellar 2" just dropped — don\'t miss it 🚀',
    time: '3 hours ago',
    unread: true,
  },
  {
    id: 4,
    icon: BellIcon,
    iconColor: 'text-blue-400',
    bg: 'bg-blue-400/10',
    title: 'Watchlist reminder',
    body: 'You have 2 movies waiting in your watchlist',
    time: '5 hours ago',
    unread: false,
  },
  {
    id: 5,
    icon: TrophyIcon,
    iconColor: 'text-teal-400',
    bg: 'bg-teal-400/10',
    title: 'Achievement Unlocked!',
    body: 'You reached "Cinephile Gold" level 🏆',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 6,
    icon: CheckCircleIcon,
    iconColor: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    title: 'Profile updated',
    body: 'Your profile changes were saved successfully',
    time: '3 days ago',
    unread: false,
  },
  {
    id: 7,
    icon: SparklesIcon,
    iconColor: 'text-pink-400',
    bg: 'bg-pink-400/10',
    title: 'Weekly picks are ready!',
    body: 'Your personalised top-10 list for this week is live',
    time: '4 days ago',
    unread: false,
  },
];

// ─── Context ──────────────────────────────────────────────────────────────────
const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  /** Mark a single notification as read */
  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );

  /** Mark all notifications as read */
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  /** Remove / dismiss a notification */
  const dismiss = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  /** Add a new notification (useful later for real events) */
  const addNotification = (notif) =>
    setNotifications((prev) => [
      { id: Date.now(), unread: true, ...notif },
      ...prev,
    ]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllRead, dismiss, addNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within a NotificationsProvider');
  return ctx;
}
