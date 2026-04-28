'use client'

/**
 * Google Maps utilities for distance calculations and location services
 */

export interface Location {
  lat: number
  lng: number
}

export interface Distance {
  distance: number // in kilometers
  duration: number // in minutes
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * This works without needing a Google API key
 */
export function calculateDistance(
  from: Location,
  to: Location
): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((to.lat - from.lat) * Math.PI) / 180
  const dLon = ((to.lng - from.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distanceKm = R * c
  // Return distance rounded to 1 decimal place
  return Math.round(distanceKm * 10) / 10
}

/**
 * Estimate travel time based on distance (roughly 15 km/h average emergency response speed)
 */
export function estimateTravelTime(distanceKm: number): number {
  const avgSpeedKmPerMin = 0.25 // 15 km/h = 0.25 km/min
  return Math.ceil(distanceKm / avgSpeedKmPerMin)
}

/**
 * Get distance and duration between two points
 */
export function getDistance(from: Location, to: Location): Distance {
  const distance = calculateDistance(from, to)
  const duration = estimateTravelTime(distance)
  return { distance, duration }
}

/**
 * Sort locations by distance from a reference point
 */
export function sortByDistance(
  referencePoint: Location,
  locations: Array<Location & { id: string }>
): Array<{ location: Location & { id: string }; distance: number }> {
  return locations
    .map((location) => ({
      location,
      distance: calculateDistance(referencePoint, location),
    }))
    .sort((a, b) => a.distance - b.distance)
}

/**
 * Get nearby locations within a radius
 */
export function getNearbyLocations(
  referencePoint: Location,
  locations: Array<Location & { id: string }>,
  radiusKm: number = 10
): Array<Location & { id: string }> {
  return locations.filter(
    (location) => calculateDistance(referencePoint, location) <= radiusKm
  )
}
