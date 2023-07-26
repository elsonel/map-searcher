import type { Location } from './types'

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string
export const DEFAULT_MAP_ZOOM = 12
export const DEFAULT_LAT = 40.6892
export const DEFAULT_LNG = -73.9654
export const NUMBER_OF_ROWS = 10

export const markerLabelStyle = {
  color: '#000',
  fontSize: '16px',
  fontWeight: 'bold'
}

export const mockLocations: Location[] = [
  {
    name: 'Central Park',
    position: { lat: 40.7829, lng: -73.9654 }
  },
  {
    name: 'The Statue of Liberty in New York 10004',
    position: { lat: 40.6892, lng: -74.0445 }
  },
  {
    name: 'Eiffel Tower',
    position: { lat: 48.8584, lng: 2.2945 }
  },
  {
    name: 'Great Wall of China',
    position: { lat: 40.4319, lng: 116.5704 }
  },
  {
    name: 'Taj Mahal',
    position: { lat: 27.1751, lng: 78.0421 }
  },
  {
    name: 'Sydney Opera House',
    position: { lat: -33.8568, lng: 151.2153 }
  },
  {
    name: 'Machu Picchu',
    position: { lat: -13.1631, lng: -72.545 }
  },
  {
    name: 'Sagrada Familia',
    position: { lat: 41.4036, lng: 2.1744 }
  },
  {
    name: 'Mount Everest',
    position: { lat: 27.9881, lng: 86.9253 }
  },
  {
    name: 'Grand Canyon',
    position: { lat: 36.1069, lng: -112.1129 }
  },
  {
    name: 'Colosseum',
    position: { lat: 41.8902, lng: 12.4922 }
  },
  {
    name: 'Mount Fuji',
    position: { lat: 35.3606, lng: 138.7274 }
  }
]
