const API_ERROR_MESSAGE = 'Error fetching location data'
const LOCATION_ERROR_MESSAGE = 'Location not found'

type Response = {
  placeId: string
  name: string
  address: string
  latitude: number
  longitude: number
}

/**
 * Retrieves the name, address, latitude, and longitude of a location using the
 * Google Places API. This function returns the first result if there are
 * multiple.
 * @async
 * @param {string} query - The location query to be used in the Google Places
 * API request.
 * @param {google.maps.Map} map - The Google Maps instance to be used with the
 * Places API service.
 * @returns {Promise<Response>} - A promise that resolves to an object
 * containing the name, address, latitude, and longitude of the location.
 * @throws {Error} - If there is an error fetching the location data or if the
 * location is not found.
 */
export async function getMapLocation(query: string, map: google.maps.Map): Promise<Response> {
  return new Promise((resolve, reject) => {
    const request = {
      query: query,
      fields: ['name', 'formatted_address', 'geometry', 'place_id']
    }

    const service = new google.maps.places.PlacesService(map)
    service.findPlaceFromQuery(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          const location = results[0]
          const geometry = location.geometry?.location
          if (geometry) {
            resolve({
              placeId: location.place_id || '',
              name: location.name || '',
              address: location.formatted_address || '',
              latitude: geometry.lat(),
              longitude: geometry.lng()
            })
          } else {
            reject(new Error(LOCATION_ERROR_MESSAGE))
          }
        } else {
          reject(new Error(API_ERROR_MESSAGE))
        }
      }
    )
  })
}
