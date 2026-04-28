'use client'

/**
 * Geolocation utilities for getting user location
 */

export interface LocationCoords {
  latitude: number
  longitude: number
  accuracy: number
}

export interface LocationError {
  code: number
  message: string
}

/**
 * Get user's current location using browser Geolocation API
 */
export function getCurrentLocation(): Promise<LocationCoords> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: 'Geolocation is not supported by your browser',
      } as LocationError)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
      },
      (error) => {
        reject({
          code: error.code,
          message: error.message,
        } as LocationError)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })
}

/**
 * Watch user's location in real-time
 */
export function watchLocation(
  onSuccess: (coords: LocationCoords) => void,
  onError: (error: LocationError) => void
): number {
  return navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      })
    },
    (error) => {
      onError({
        code: error.code,
        message: error.message,
      })
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  )
}

/**
 * Stop watching location
 */
export function stopWatchingLocation(watchId: number): void {
  navigator.geolocation.clearWatch(watchId)
}
