const API_ERROR_MESSAGE = 'Error fetching timezone data'
const TIMEZONE_ERROR_MESSAGE = 'Unable to obtain timezone'

type Response = {
  utcOffsetMinutes: number
}

/**
 * Retrieves the UTC offset in minutes for a specified location using the
 * Google Maps Places API.
 * @param placeId - The unique identifier of the location to retrieve timezone
 * information for.
 * @param map - A Google Maps `Map` object required for initializing the Places
 * Service.
 * @returns A promise that resolves to the `Response` object containing the UTC
 * offset in minutes.
 */
export async function getLocationTimezone(
  placeId: string,
  map: google.maps.Map
): Promise<Response> {
  return new Promise<{ utcOffsetMinutes: number }>((resolve, reject) => {
    const request = {
      placeId: placeId,
      fields: ['utc_offset_minutes']
    }

    const service = new google.maps.places.PlacesService(map)
    service.getDetails(
      request,
      (
        result: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          if (result.utc_offset_minutes) {
            resolve({ utcOffsetMinutes: result.utc_offset_minutes })
          } else {
            reject(new Error(TIMEZONE_ERROR_MESSAGE))
          }
        } else {
          reject(new Error(API_ERROR_MESSAGE))
        }
      }
    )
  })
}
