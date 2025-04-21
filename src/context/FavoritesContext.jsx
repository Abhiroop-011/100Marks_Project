import { createContext, useState, useContext, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage on initial render
    const savedFavorites = localStorage.getItem('spaceAppFavorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })
  
  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('spaceAppFavorites', JSON.stringify(favorites))
  }, [favorites])
  
  const toggleFavorite = (item, type) => {
    const itemWithType = { 
      ...item, 
      type,
      // Ensure we have an id for every favorited item
      id: item.id || item.date || `${type}-${Date.now()}`
    }
    
    setFavorites(prevFavorites => {
      const existingIndex = prevFavorites.findIndex(
        fav => fav.id === itemWithType.id && fav.type === type
      )
      
      if (existingIndex >= 0) {
        // Remove from favorites
        return prevFavorites.filter((_, index) => index !== existingIndex)
      } else {
        // Add to favorites
        return [...prevFavorites, itemWithType]
      }
    })
  }
  
  const getFavoritesByType = (type) => {
    return favorites.filter(fav => fav.type === type)
  }
  
  const value = {
    favorites,
    toggleFavorite,
    getFavoritesByType
  }
  
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}