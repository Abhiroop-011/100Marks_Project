import axios from 'axios'

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY

// Base NASA API URL
const NASA_API_URL = 'https://api.nasa.gov'

// Create axios instance with default config
const nasaApi = axios.create({
  baseURL: NASA_API_URL,
  params: {
    api_key: NASA_API_KEY
  }
})

// Fetch Astronomy Picture of the Day
export const fetchApod = async (date = null) => {
  try {
    const params = date ? { date } : {}
    const response = await nasaApi.get('/planetary/apod', { params })
    return {
      ...response.data,
      id: response.data.date,
      imageUrl: response.data.media_type === 'image' ? response.data.url : response.data.thumbnail_url
    }
  } catch (error) {
    console.error('Error fetching APOD:', error)
    throw error
  }
}

// Fetch Mars Rover Photos
export const fetchMarsRoverPhotos = async (rover = 'curiosity', sol = 1000, camera = null) => {
  try {
    const params = { sol }
    if (camera) params.camera = camera
    
    const response = await nasaApi.get(`/mars-photos/api/v1/rovers/${rover}/photos`, { params })
    
    return response.data.photos.map(photo => ({
      id: photo.id,
      imageUrl: photo.img_src,
      title: `${photo.rover.name} - ${photo.camera.full_name}`,
      date: photo.earth_date,
      rover: photo.rover.name,
      camera: photo.camera.name,
      sol: photo.sol
    }))
  } catch (error) {
    console.error(`Error fetching Mars Rover photos:`, error)
    throw error
  }
}

// Fetch Near-Earth Objects (Asteroids)
export const fetchAsteroids = async (startDate = null, endDate = null) => {
  try {
    // If no dates provided, use today and next 7 days
    if (!startDate) {
      const today = new Date()
      startDate = today.toISOString().split('T')[0]
      
      // Default to 7 day period if no end date
      if (!endDate) {
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        endDate = nextWeek.toISOString().split('T')[0]
      }
    }
    
    const response = await nasaApi.get('/neo/rest/v1/feed', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    })
    
    // Flatten and transform asteroid data
    const { near_earth_objects } = response.data
    const dates = Object.keys(near_earth_objects)
    
    // Flatten the date-based objects into a single array
    const asteroids = dates.flatMap(date => 
      near_earth_objects[date].map(asteroid => ({
        id: asteroid.id,
        title: asteroid.name,
        date: asteroid.close_approach_data[0]?.close_approach_date,
        diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
        velocity: asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_hour,
        missDistance: asteroid.close_approach_data[0]?.miss_distance.kilometers,
        isHazardous: asteroid.is_potentially_hazardous_asteroid,
        imageUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${asteroid.id}&backgroundColor=0A1128&width=300&height=300`
      }))
    )
    
    return asteroids
  } catch (error) {
    console.error('Error fetching asteroids:', error)
    throw error
  }
}