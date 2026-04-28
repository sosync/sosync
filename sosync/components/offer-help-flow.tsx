'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, MapPin, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCurrentLocation, watchLocation, stopWatchingLocation, LocationCoords } from '@/lib/geolocation'
import { calculateDistance, getDistance, Location, sortByDistance } from '@/lib/maps'
import { Language, useTranslation } from '@/lib/i18n'

interface OfferHelpFlowProps {
  language: Language
  onBack: () => void
}

interface EmergencyAlert {
  id: string
  location: string
  distance: number
  responseTime: number
  responders: number
  type: string
  urgency: 'critical' | 'high' | 'medium'
  lat: number
  lng: number
}

// Mock emergencies database with real coordinates
const mockEmergenciesDatabase: EmergencyAlert[] = [
  {
    id: '1',
    location: 'Central Park, Manhattan',
    distance: 0,
    responseTime: 0,
    responders: 2,
    type: 'Medical Emergency',
    urgency: 'critical',
    lat: 40.7829,
    lng: -73.9654,
  },
  {
    id: '2',
    location: '5th Avenue',
    distance: 0,
    responseTime: 0,
    responders: 1,
    type: 'Accident Response',
    urgency: 'high',
    lat: 40.7614,
    lng: -73.9776,
  },
  {
    id: '3',
    location: 'Greenwich Village',
    distance: 0,
    responseTime: 0,
    responders: 3,
    type: 'Welfare Check',
    urgency: 'medium',
    lat: 40.7220,
    lng: -74.0099,
  },
]

export default function OfferHelpFlow({ language, onBack }: OfferHelpFlowProps) {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [acceptedAlerts, setAcceptedAlerts] = useState<Set<string>>(new Set())
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [watchId, setWatchId] = useState<number | null>(null)
  const t = useTranslation(language)

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        console.log('[v0] Initializing offer help location...')
        const coords = await getCurrentLocation()
        console.log('[v0] Got location:', coords.latitude, coords.longitude)
        
        const location: Location = {
          lat: coords.latitude,
          lng: coords.longitude,
        }
        setUserLocation(location)
        updateAlertsWithDistances(location)

        // Watch for location updates
        const id = watchLocation(
          (newCoords) => {
            const newLocation: Location = {
              lat: newCoords.latitude,
              lng: newCoords.longitude,
            }
            setUserLocation(newLocation)
            updateAlertsWithDistances(newLocation)
          },
          (error) => {
            console.log('[v0] Location watch error:', error.message)
          }
        )
        setWatchId(id)
        setLoading(false)
      } catch (error: any) {
        console.log('[v0] Location init error:', error.message)
        setError(error?.message || 'Failed to get location')
        // Use mock location for demo if geolocation fails
        const mockLocation: Location = { lat: 40.7580, lng: -73.9855 }
        setUserLocation(mockLocation)
        updateAlertsWithDistances(mockLocation)
        setLoading(false)
      }
    }

    initializeLocation()

    return () => {
      if (watchId !== null) {
        stopWatchingLocation(watchId)
      }
    }
  }, [])

  const updateAlertsWithDistances = (location: Location) => {
    try {
      const updatedAlerts = mockEmergenciesDatabase.map((alert) => {
        const distInfo = getDistance(location, { lat: alert.lat, lng: alert.lng })
        return {
          ...alert,
          distance: distInfo.distance,
          responseTime: distInfo.duration,
        }
      })
      updatedAlerts.sort((a, b) => a.distance - b.distance)
      setAlerts(updatedAlerts)
    } catch (err) {
      console.log('[v0] Error updating distances:', err)
    }
  }

  const handleAccept = (alertId: string) => {
    setAcceptedAlerts(new Set([...acceptedAlerts, alertId]))
  }

  const handleDecline = (alertId: string) => {
    console.log('[v0] Declined alert:', alertId)
    setAlerts((prev) => prev.filter((a) => a.id !== alertId))
  }

  const navigateToLocation = (alert: EmergencyAlert) => {
    try {
      const mapsUrl = `https://www.google.com/maps?q=${alert.lat},${alert.lng}`
      window.open(mapsUrl, '_blank')
    } catch (err) {
      console.log('[v0] Error opening maps:', err)
    }
  }

  // Show loading state
  if (loading && !userLocation) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex items-center gap-4 p-6 border-b border-border">
          <button onClick={onBack} className="p-2 hover:bg-card rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{t('offer.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('offer.subtitle')}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-3"></div>
              <p className="text-foreground font-semibold">{t('offer.getting')}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error && !userLocation) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex items-center gap-4 p-6 border-b border-border">
          <button onClick={onBack} className="p-2 hover:bg-card rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{t('offer.title')}</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-4 bg-card border border-destructive/30 p-6 rounded-xl">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <button
              onClick={onBack}
              className="w-full py-2 px-4 bg-primary hover:bg-[#dc2626] text-primary-foreground rounded-lg font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-primary/20 text-primary border-primary/30'
      case 'high':
        return 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30'
      default:
        return 'bg-secondary/20 text-secondary border-secondary/30'
    }
  }

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return '🚨 CRITICAL'
      case 'high':
        return '⚠️ HIGH'
      default:
        return '📋 STANDARD'
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-border">
        <button
          onClick={onBack}
          className="p-2 hover:bg-card rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{t('offer.title')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('offer.subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        <div className="max-w-md mx-auto space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-12 h-12 text-secondary animate-spin mb-3" />
              <h3 className="font-bold">Getting your location...</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Loading nearby emergencies
              </p>
            </div>
          ) : (
            <>
          {acceptedAlerts.size > 0 && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 flex items-start gap-3 mb-6">
              <span className="text-2xl flex-shrink-0">✅</span>
              <div>
                <p className="font-bold text-sm">
                  {t('offer.thank')}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('offer.help_count')} {acceptedAlerts.size} emergency call
                  {acceptedAlerts.size > 1 ? 's' : ''}. 
                </p>
              </div>
            </div>
          )}

          {acceptedAlerts.size > 0 && (
            <div className="space-y-3 bg-card border border-border/50 rounded-xl p-6">
              {alerts
                .filter((alert) => acceptedAlerts.has(alert.id))
                .map((acceptedAlert) => (
                  <div key={acceptedAlert.id} className="space-y-3">
                    <button
                      onClick={() => navigateToLocation(acceptedAlert)}
                      className="w-full py-4 px-6 bg-secondary hover:bg-[#2563eb] text-secondary-foreground rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">🧭</span>
                      {t('offer.navigate')}
                    </button>
                  </div>
                ))}
            </div>
          )}

              {alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`bg-card border rounded-xl p-4 cursor-pointer transition-all hover:border-foreground/50 ${
                        acceptedAlerts.has(alert.id)
                          ? 'opacity-50 pointer-events-none'
                          : ''
                      }`}
                    >
                      {/* Alert Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold">
                              {alert.location}
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded border ${getUrgencyColor(
                                alert.urgency
                              )}`}
                            >
                              {getUrgencyLabel(alert.urgency)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {alert.type}
                          </p>
                        </div>
                      </div>

                      {/* Alert Details Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span className="text-lg font-bold">
                              {alert.distance}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">km away</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock className="w-4 h-4 text-accent" />
                            <span className="text-lg font-bold">
                              {alert.responseTime}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">min time</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1">
                            {alert.responders}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            responder{alert.responders > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(alert.id)}
                          className="flex-1 py-2 px-3 bg-accent hover:bg-[#059669] text-accent-foreground rounded-lg font-semibold text-sm transition-colors"
                        >
                          ✅ Accept
                        </button>
                        <button
                          onClick={() => handleDecline(alert.id)}
                          className="flex-1 py-2 px-3 bg-destructive hover:bg-[#dc2626] text-destructive-foreground rounded-lg font-semibold text-sm transition-colors"
                        >
                          ❌ Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
                  <h3 className="font-bold mb-1">No Active Emergencies</h3>
                  <p className="text-sm text-muted-foreground">
                    Check back soon. New emergencies will appear here.
                  </p>
                </div>
              )}

              {/* Info Card */}
              <div className="bg-card border border-border rounded-xl p-4 space-y-3 mt-6">
                <h4 className="font-bold text-sm">As a Responder</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>You must be verified and trained</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Location will be shared with dispatch</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Follow all emergency protocols</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onBack}
                className="w-full py-3 px-6 border border-border hover:bg-card rounded-xl font-semibold transition-colors"
              >
                Back to Home
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
