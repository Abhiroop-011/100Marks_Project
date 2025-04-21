import { NavLink } from 'react-router-dom'

function Navbar() {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/mars', label: 'Mars Explorer' },
    { path: '/asteroids', label: 'Asteroid Tracker' }
  ]
  
  return (
    <header className="sticky top-0 z-50 bg-space-midnight bg-opacity-90 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-5">
        <div className="flex items-center space-x-8">
          <span className="text-2xl font-futuristic font-bold text-space-teal">
            Feel<span className="text-white">Space</span>
          </span>
          
          <div className="flex items-center space-x-6">
            {links.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  relative px-2 py-1 text-white transition-colors duration-300
                  hover:text-space-teal group
                  ${isActive ? 'text-space-teal' : ''}
                `}
                end
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-space-teal transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar