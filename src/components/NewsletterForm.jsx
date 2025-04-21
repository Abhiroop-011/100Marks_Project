import { useState } from 'react'
import { FiSend, FiCheckCircle } from 'react-icons/fi'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Reset error
    setEmailError('')
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required')
      return
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    
    // Mock submission (would connect to a backend in a real app)
    console.log('Subscribing email:', email)
    setIsSubmitted(true)
    setEmail('')
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }
  
  return (
    <div className="glass-card p-6 rounded-lg max-w-md mx-auto">
      <h3 className="text-xl font-futuristic font-semibold mb-2 text-space-teal">
        Subscribe to Space News
      </h3>
      
      <p className="text-sm text-white/80 mb-4">
        Get the latest updates about space exploration, astronomy events, and NASA missions.
      </p>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={`w-full p-3 bg-space-midnight border rounded-md focus:outline-none focus:ring-2 focus:ring-space-teal transition-colors
                ${emailError ? 'border-space-accent' : 'border-space-navy'}`}
            />
            {emailError && (
              <p className="text-space-accent text-sm mt-1">{emailError}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-space-nebula hover:bg-space-violet text-white py-3 rounded-md transition-colors duration-300 flex items-center justify-center"
          >
            <FiSend className="mr-2" />
            Subscribe Now
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center py-4 text-center">
          <FiCheckCircle className="text-4xl text-green-400 mb-2" />
          <p className="text-white font-medium">
            Thanks for subscribing!
          </p>
          <p className="text-sm text-white/80 mt-1">
            We'll keep you updated with the latest cosmic events.
          </p>
        </div>
      )}
    </div>
  )
}

export default NewsletterForm