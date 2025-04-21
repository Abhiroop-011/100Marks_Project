import { useEffect, useRef } from 'react'

function StarField() {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight
    const starCount = 150
    
    // Clear any existing stars
    container.innerHTML = ''
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      star.classList.add('star')
      
      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      
      // Random position
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      
      // Random animation delay
      star.style.animationDelay = `${Math.random() * 3}s`
      
      container.appendChild(star)
    }
    
    // Parallax effect for stars
    const handleMouseMove = (e) => {
      const x = e.clientX / containerWidth - 0.5
      const y = e.clientY / containerHeight - 0.5
      
      container.style.transform = `translate(${x * 20}px, ${y * 20}px)`
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return <div ref={containerRef} className="stars fixed inset-0 z-0" />
}

export default StarField