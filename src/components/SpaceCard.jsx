import { FiHeart } from 'react-icons/fi'
import { useFavorites } from '../context/FavoritesContext'

function SpaceCard({ item, type }) {
  const { favorites, toggleFavorite } = useFavorites()
  
  const isFavorite = favorites.some(fav => 
    fav.id === item.id && fav.type === type
  )
  
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-space-nebula/20 h-full flex flex-col">
      {item.imageUrl && (
        <div className="relative overflow-hidden h-48">
          <img 
            src={item.imageUrl} 
            alt={item.title || 'Space image'} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <button 
            onClick={() => toggleFavorite(item, type)}
            className={`absolute top-2 right-2 p-2 rounded-full 
              ${isFavorite ? 'bg-space-accent text-white' : 'bg-space-navy bg-opacity-70 text-white hover:bg-space-nebula'} 
              transition-colors duration-300`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart className={isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      )}
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-futuristic font-semibold mb-2 text-space-teal">
          {item.title || 'Untitled'}
        </h3>
        
        {item.date && (
          <div className="text-sm text-space-gray mb-2">
            {new Date(item.date).toLocaleDateString()}
          </div>
        )}
        
        {item.explanation && (
          <p className="text-sm text-white/80 line-clamp-3 mb-2">
            {item.explanation}
          </p>
        )}
        
        {/* Additional fields based on card type */}
        {type === 'asteroid' && (
          <div className="mt-auto pt-2 text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-space-gray">Size:</span>
              <span>{item.diameter ? `~${item.diameter.toFixed(2)} km` : 'Unknown'}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-space-gray">Miss Distance:</span>
              <span>{item.missDistance ? `${parseInt(item.missDistance).toLocaleString()} km` : 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-space-gray">Hazardous:</span>
              <span className={item.isHazardous ? 'text-space-accent' : 'text-green-400'}>
                {item.isHazardous ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        )}

        {type === 'rover' && (
          <div className="mt-auto pt-2 text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-space-gray">Rover:</span>
              <span>{item.rover || 'Unknown'}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-space-gray">Camera:</span>
              <span>{item.camera || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-space-gray">Sol:</span>
              <span>{item.sol || 'Unknown'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SpaceCard