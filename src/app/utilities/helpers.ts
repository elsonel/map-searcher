import type { SearchEntry } from './types'
import * as moment from 'moment-timezone'

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

/**
 * This function takes an offset in minutes as input and returns either a
 * single timezone or a list of possible timezones that match the given offset.
 *
 * @param offsetMinutes - The offset in minutes from UTC. Positive values
 * indicate time ahead of UTC, and negative values indicate time behind UTC.
 * @returns If there is a unique timezone that matches the given offset, the
 * function returns a single string representing that timezone. If multiple
 * timezones match the given offset, the function returns an array of strings
 * containing all possible timezones. If no timezones match the given offset,
 * the function returns an empty array ([]).
 */
export function getTimezoneByOffset(offsetMinutes: number): string | string[] {
  const dummyDate = moment.utc().add(offsetMinutes, 'minutes')

  const possibleTimezones = moment.tz.names().filter((tz) => {
    const offset = dummyDate.tz(tz).utcOffset()
    return offset === offsetMinutes
  })

  return possibleTimezones.length === 1 ? possibleTimezones[0] : possibleTimezones
}

/**
 * Gets the formatted time based on the provided UTC offset in minutes.
 *
 * This function takes a UTC offset in minutes and returns the current time
 * formatted as "h:mm A" (e.g., 9:30 AM) for the specified timezone.
 *
 * @param utcOffsetInMinutes - The UTC offset in minutes. Positive values
 * represent time zones ahead of UTC, and negative values represent time zones
 * behind UTC. For example, -420 represents PDT (Pacific Daylight Time) with
 * UTC-7:00.
 *
 * @returns The formatted time as a string in "h:mm A" format (e.g., 9:30 AM)
 * for the specified timezone. If the provided UTC offset is invalid or causes
 * an invalid date, it returns undefined.
 *
 */
export function getFormattedTimeByOffset(offsetMinutes: number): string | undefined {
  const currentTime = moment.utc().utcOffset(offsetMinutes)

  if (!currentTime.isValid()) return undefined

  return currentTime.format('h:mm A')
}
