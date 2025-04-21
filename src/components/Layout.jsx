import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import StarField from './StarField'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <StarField />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout