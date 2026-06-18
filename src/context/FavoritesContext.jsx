import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (item) => {
    setFavorites((prev) => {
      const exists = prev.find(f => f.id === item.id);
      if (exists) return prev;
      return [...prev, { ...item, favoritedAt: new Date() }];
    });
  };

  const removeFromFavorites = (itemId) => {
    setFavorites((prev) => prev.filter(f => f.id !== itemId));
  };

  const isInFavorites = (itemId) => {
    return favorites.some(f => f.id === itemId);
  };

  const toggleFavorite = (item) => {
    if (isInFavorites(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isInFavorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
