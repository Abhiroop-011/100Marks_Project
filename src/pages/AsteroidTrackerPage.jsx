import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiAlertTriangle, FiStar } from 'react-icons/fi'
import { fetchAsteroids } from '../api/nasa'
import Loader from '../components/Loader'
import SpaceCard from '../components/SpaceCard'

function AsteroidTrackerPage() {
  const [asteroids, setAsteroids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showHazardousOnly, setShowHazardousOnly] = useState(false)
  
  // Get today's date and format it for the API
  const today = new Date()
  const formattedToday = today.toISOString().split('T')[0]
  
  // Get date 7 days from now
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)
  const formattedNextWeek = nextWeek.toISOString().split('T')[0]
  
  const [startDate, setStartDate] = useState(formattedToday)
  const [endDate, setEndDate] = useState(formattedNextWeek)
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  useEffect(() => {
    const getAsteroidData = async () => {
      try {
        setLoading(true)
        const data = await fetchAsteroids(startDate, endDate)
        setAsteroids(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch asteroid data:', err)
        setError('Failed to load asteroid data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    getAsteroidData()
  }, [startDate, endDate])
  
  // Filter asteroids by hazardous status if needed
  const filteredAsteroids = showHazardousOnly 
    ? asteroids.filter(asteroid => asteroid.isHazardous)
    : asteroids
  
  // Sort by close approach date
  const sortedAsteroids = [...filteredAsteroids].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  )
  
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
          Asteroid <span className="text-space-teal">Tracker</span>
        </h1>
        <div className="h-1 w-20 bg-space-teal mx-auto rounded-full mb-4"></div>
        <p className="text-white/80 max-w-2xl mx-auto">
          Monitor near-Earth objects (NEOs) detected by NASA. Track asteroids 
          approaching our planet and their potential impact risk.
        </p>
      </header>
      
      {/* Date Filters */}
      <div className="glass-card rounded-xl p-4 mb-8">
        <div className="flex items-center mb-4">
          <FiCalendar className="text-space-teal mr-2" />
          <h2 className="text-xl font-futuristic">Date Range</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-space-gray mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min="2000-01-01"
              max={endDate}
              className="w-full p-2 bg-space-midnight border border-space-navy rounded-md focus:outline-none focus:ring-1 focus:ring-space-teal"
            />
          </div>
          
          <div>
            <label className="block text-sm text-space-gray mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full p-2 bg-space-midnight border border-space-navy rounded-md focus:outline-none focus:ring-1 focus:ring-space-teal"
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hazardous-filter"
            checked={showHazardousOnly}
            onChange={() => setShowHazardousOnly(!showHazardousOnly)}
            className="mr-2"
          />
          <label 
            htmlFor="hazardous-filter"
            className="flex items-center text-sm cursor-pointer"
          >
            <FiAlertTriangle className="text-space-accent mr-1" />
            Show potentially hazardous asteroids only
          </label>
        </div>
      </div>
      
      {/* Asteroid List */}
      <div className="mb-8">
        {loading ? (
          <Loader message="Scanning for near-Earth objects..." />
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
                <FiStar className="text-space-teal mr-2" />
                Approaching Asteroids
              </h2>
              <div className="text-sm text-space-gray">
                {sortedAsteroids.length} objects detected
              </div>
            </div>
            
            {sortedAsteroids.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <p className="text-lg mb-2">
                  No asteroids found for the selected date range.
                </p>
                <p className="text-space-gray">
                  Try extending your search period or removing filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedAsteroids.map(asteroid => (
                  <SpaceCard 
                    key={asteroid.id} 
                    item={asteroid} 
                    type="asteroid" 
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

export default AsteroidTrackerPage