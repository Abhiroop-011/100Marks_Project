import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MarsExplorerPage from './pages/MarsExplorerPage'
import AsteroidTrackerPage from './pages/AsteroidTrackerPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="mars" element={<MarsExplorerPage />} />
        <Route path="asteroids" element={<AsteroidTrackerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App