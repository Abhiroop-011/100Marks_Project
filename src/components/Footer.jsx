import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="bg-space-midnight py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-space-gray text-sm">
              Data provided by NASA APIs
            </p>
            <p className="text-space-gray text-sm mt-1">
              © {year} FeelSpace. Done by Abhiroop
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-space-gray hover:text-space-teal transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="text-xl" />
            </a>
            <a 
              href="#" 
              className="text-space-gray hover:text-space-teal transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter className="text-xl" />
            </a>
            <a 
              href="#" 
              className="text-space-gray hover:text-space-teal transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer