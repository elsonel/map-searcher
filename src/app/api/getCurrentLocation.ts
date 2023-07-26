/**
 * Retrieves the current geolocation coordinates (latitude and longitude) of
 * the user's device.
 * @returns {Promise<{ latitude: number; longitude: number }>} A promise that
 * resolves to an object containing the latitude and longitude of the current
 * location.
 * @throws {Error} If the geolocation is not supported by the user's browser or
 * if there is an error while retrieving the coordinates.
 */
export async function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'))
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        resolve({ latitude, longitude })
      },
      (error) => {
        reject(error)
      }
    )
  })
}
