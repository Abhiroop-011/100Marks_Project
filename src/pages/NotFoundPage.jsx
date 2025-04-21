import { Link } from 'react-router-dom'
import { FiHome, FiAlertCircle } from 'react-icons/fi'

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <FiAlertCircle className="text-5xl text-space-accent mb-4" />
      
      <h1 className="text-4xl font-futuristic font-bold mb-2">
        404: Space Anomaly Detected
      </h1>
      
      <p className="text-xl text-space-gray mb-8">
        The cosmic coordinates you're looking for don't exist in this universe.
      </p>
      
      <Link 
        to="/"
        className="flex items-center bg-space-nebula hover:bg-space-violet text-white px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-space-nebula/30"
      >
        <FiHome className="mr-2" /> Return to Mission Control
      </Link>
    </div>
  )
}

export default NotFoundPage