/**
 * General location data
 */
export type Location = {
  name: string
  position: { lat: number; lng: number }
}

/**
 * Data associated with each row card in the search history table.
 */
export interface SearchEntry extends Location {
  id: string
  marker: google.maps.Marker | null
}
