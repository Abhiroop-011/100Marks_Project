import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiInfo, FiExternalLink, FiChevronsDown } from 'react-icons/fi'
import { fetchApod } from '../api/nasa'
import Loader from '../components/Loader'

function HomePage() {
  const [apod, setApod] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  })
  
  useEffect(() => {
    const getApodData = async () => {
      try {
        setLoading(true)
        const data = await fetchApod()
        setApod(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch APOD:', err)
        setError('Failed to load the Astronomy Picture of the Day. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    getApodData()
  }, [])
  
  const scrollToContent = () => {
    document.getElementById('apod-content').scrollIntoView({ 
      behavior: 'smooth' 
    })
  }
  
  if (loading) return <Loader />
  
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-futuristic text-space-teal mb-4">Houston, we have a problem!</h2>
        <p className="text-white/80 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-space-nebula hover:bg-space-violet text-white rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }
  
  return (
    <div className="space-y-16">
      {/* Hero Section with APOD image as background */}
      <section className="relative min-h-[80vh] flex items-center justify-center -mt-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
          style={{ 
            backgroundImage: `url(${apod.imageUrl})`,
            backgroundPosition: 'center',
            filter: 'brightness(0.5)'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-space-dark/80 to-space-dark z-0"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-futuristic font-bold mb-4 text-shadow animate-float">
            Explore The <span className="text-space-teal">Cosmos</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-shadow">
            {apod.title}
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Journey through the wonders of space with NASA's astronomy picture of the day and explore Mars and asteroid data.
          </p>
          
          <button 
            onClick={scrollToContent}
            className="flex items-center mx-auto bg-space-nebula hover:bg-space-violet text-white px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-space-nebula/30"
          >
            Discover More <FiChevronsDown className="ml-2" />
          </button>
        </div>
      </section>
      
      {/* APOD Content Section */}
      <section id="apod-content" className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-futuristic font-bold mb-2">
            Astronomy Picture of the Day
          </h2>
          <div className="h-1 w-24 bg-space-teal mx-auto rounded-full mb-4"></div>
          <p className="text-space-gray">
            <FiCalendar className="inline mr-2" />
            {new Date(apod.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div 
          ref={infoRef}
          className={`glass-card rounded-xl p-6 transition-all duration-1000 ${
            infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-start space-x-3 mb-4">
            <FiInfo className="text-space-teal text-xl mt-1 flex-shrink-0" />
            <h3 className="text-xl font-medium">About This Image</h3>
          </div>
          
          <p className="text-white/90 leading-relaxed mb-6">
            {apod.explanation}
          </p>
          
          {apod.copyright && (
            <p className="text-sm text-space-gray">
              Image Credit & Copyright: {apod.copyright}
            </p>
          )}
          
          {apod.hdurl && (
            <a 
              href={apod.hdurl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-space-teal hover:text-space-nebula mt-4 transition-colors"
            >
              View High-Resolution Image <FiExternalLink className="ml-1" />
            </a>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage