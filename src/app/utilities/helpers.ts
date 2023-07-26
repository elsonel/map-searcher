import type { SearchEntry } from './types'

/**
 * Type guard function that checks whether a given value is an instance of the
 * `Error` class (with a valid message property string)
 *
 * @param error - The value to be checked for its type.
 * @returns A boolean indicating whether the input value is an error object.
 */
export function isError(error: any): error is Error {
  return error instanceof Error
}

/**
 * Adds a new SearchEntry to the provided array or moves an existing entry to
 * if it already exists with matching geo coordinates.
 *
 * @param arr - The array of SearchEntry objects.
 * @param position - The position coordinates { lat: number; lng: number } of
 * the new or existing entry.
 * @param createNewEntry - A callback function that creates a new SearchEntry
 * when an entry with the given position doesn't exist.
 *
 * @returns An updated array of SearchEntry objects with the new or moved entry
 * at the top.
 */
export function addSearchEntry(
  arr: SearchEntry[],
  position: { lat: number; lng: number },
  createNewEntry: () => SearchEntry
): SearchEntry[] {
  const existingIndex = arr.findIndex(
    (element) => element.position.lat === position.lat && element.position.lng === position.lng
  )

  if (existingIndex !== -1) {
    // Element with the given ID already exists in the array, move it to the top
    const existingElement = arr[existingIndex]
    arr.splice(existingIndex, 1)
    arr.unshift(existingElement)
  } else {
    // Element with the given ID doesn't exist, create a new element and add it to the top
    const newElement = createNewEntry()
    arr.unshift(newElement)
  }

  return arr
}
