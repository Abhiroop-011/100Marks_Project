import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiFilter, FiCamera, FiGrid } from 'react-icons/fi'
import { fetchMarsRoverPhotos } from '../api/nasa'
import Loader from '../components/Loader'
import SpaceCard from '../components/SpaceCard'

function MarsExplorerPage() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Filter states
  const [selectedRover, setSelectedRover] = useState('curiosity')
  const [selectedSol, setSelectedSol] = useState(1000)
  const [selectedCamera, setSelectedCamera] = useState('')
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // Available rovers and cameras
  const rovers = [
    { id: 'curiosity', name: 'Curiosity' },
    { id: 'perseverance', name: 'Perseverance' },
    { id: 'opportunity', name: 'Opportunity' },
    { id: 'spirit', name: 'Spirit' }
  ]
  
  const cameras = [
    { id: '', name: 'All Cameras' },
    { id: 'FHAZ', name: 'Front Hazard Avoidance Camera' },
    { id: 'RHAZ', name: 'Rear Hazard Avoidance Camera' },
    { id: 'MAST', name: 'Mast Camera' },
    { id: 'CHEMCAM', name: 'Chemistry and Camera Complex' },
    { id: 'MAHLI', name: 'Mars Hand Lens Imager' },
    { id: 'NAVCAM', name: 'Navigation Camera' }
  ]
  
  useEffect(() => {
    const getMarsPhotos = async () => {
      try {
        setLoading(true)
        const data = await fetchMarsRoverPhotos(
          selectedRover, 
          selectedSol, 
          selectedCamera || null
        )
        setPhotos(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch Mars photos:', err)
        setError('Failed to load Mars rover photos. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    getMarsPhotos()
  }, [selectedRover, selectedSol, selectedCamera])
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <header 
        ref={headerRef}
        className={`text-center mb-8 transition-all duration-1000 ${
          headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl font-futuristic font-bold mb-2">
          Mars <span className="text-space-accent">Explorer</span>
        </h1>
        <div className="h-1 w-20 bg-space-accent mx-auto rounded-full mb-4"></div>
        <p className="text-white/80 max-w-2xl mx-auto">
          Explore the surface of Mars through the eyes of NASA's rovers. Browse through 
          photos captured on the red planet and discover its alien landscapes.
        </p>
      </header>
      
      {/* Filters */}
      <div className="glass-card rounded-xl p-4 mb-8">
        <div className="flex items-center mb-4">
          <FiFilter className="text-space-teal mr-2" />
          <h2 className="text-xl font-futuristic">Filter Photos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rover Selection */}
          <div>
            <label className="block text-sm text-space-gray mb-1">Rover</label>
            <select
              value={selectedRover}
              onChange={(e) => setSelectedRover(e.target.value)}
              className="w-full p-2 bg-space-midnight border border-space-navy rounded-md focus:outline-none focus:ring-1 focus:ring-space-teal"
            >
              {rovers.map(rover => (
                <option key={rover.id} value={rover.id}>
                  {rover.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sol Selection */}
          <div>
            <label className="block text-sm text-space-gray mb-1">
              Sol (Martian Day)
            </label>
            <input
              type="number"
              min="1"
              max="3000"
              value={selectedSol}
              onChange={(e) => setSelectedSol(Number(e.target.value))}
              className="w-full p-2 bg-space-midnight border border-space-navy rounded-md focus:outline-none focus:ring-1 focus:ring-space-teal"
            />
          </div>
          
          {/* Camera Selection */}
          <div>
            <label className="flex items-center text-sm text-space-gray mb-1">
              <FiCamera className="mr-1" /> Camera
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full p-2 bg-space-midnight border border-space-navy rounded-md focus:outline-none focus:ring-1 focus:ring-space-teal"
            >
              {cameras.map(camera => (
                <option key={camera.id} value={camera.id}>
                  {camera.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Photo Gallery */}
      <div className="mb-8">
        {loading ? (
          <Loader message="Downloading images from Mars..." />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-space-accent mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-space-nebula hover:bg-space-violet text-white rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-futuristic flex items-center">
                <FiGrid className="text-space-teal mr-2" />
                Mars Photos
              </h2>
              <div className="text-sm text-space-gray">
                {photos.length} images found
              </div>
            </div>
            
            {photos.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <p className="text-lg mb-2">No photos found for the selected filters.</p>
                <p className="text-space-gray">Try a different rover, sol, or camera.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.slice(0, 15).map(photo => (
                  <SpaceCard 
                    key={photo.id} 
                    item={photo} 
                    type="rover" 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MarsExplorerPage