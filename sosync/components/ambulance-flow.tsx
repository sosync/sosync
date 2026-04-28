'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Ambulance, MapPin, Clock, AlertCircle } from 'lucide-react'
import { getCurrentLocation } from '@/lib/geolocation'
import { getDistance, Location } from '@/lib/maps'
import { Language, useTranslation } from '@/lib/i18n'

interface AmbulanceFlowProps {
  language: Language
  onBack: () => void
}

type AmbulanceState = 'initial' | 'locating' | 'searching' | 'ambulance-assigned' | 'error'

interface HospitalInfo {
  name: string
  distance: number
  eta: number
  hasTrauma: boolean
  address: string
}

const mockHospitals: (HospitalInfo & Location)[] = [
  {
    name: 'Central Medical Center',
    distance: 0,
    eta: 0,
    hasTrauma: true,
    address: '123 Medical Plaza, NY',
    lat: 40.7580,
    lng: -73.9855,
  },
  {
    name: 'Emergency Care Hospital',
    distance: 0,
    eta: 0,
    hasTrauma: true,
    address: '456 Healthcare Blvd, NY',
    lat: 40.7489,
    lng: -73.9680,
  },
  {
    name: 'St. Mary Hospital',
    distance: 0,
    eta: 0,
    hasTrauma: false,
    address: '789 Hospital Ave, NY',
    lat: 40.7505,
    lng: -74.0055,
  },
]

export default function AmbulanceFlow({ language, onBack }: AmbulanceFlowProps) {
  const [state, setState] = useState<AmbulanceState>('initial')
  const [location, setLocation] = useState<Location | null>(null)
  const [hospital, setHospital] = useState<HospitalInfo | null>(null)
  const [error, setError] = useState<string>('')
  const [ambulanceETA, setAmbulanceETA] = useState(12)
  const t = useTranslation(language)

  const handleGetAmbulance = async () => {
    setState('locating')
    setError('')

    try {
      const coords = await getCurrentLocation()
      const userLocation: Location = {
        lat: coords.latitude,
        lng: coords.longitude,
      }
      setLocation(userLocation)
      setState('searching')

      setTimeout(() => {
        try {
          const nearest = mockHospitals.reduce((prev, current) => {
            const prevDist = getDistance(userLocation, prev)
            const currDist = getDistance(userLocation, current)
            return prevDist.distance < currDist.distance ? prev : current
          })

          const distInfo = getDistance(userLocation, nearest)
          setHospital({
            ...nearest,
            distance: distInfo.distance,
            eta: distInfo.duration,
          })
          setAmbulanceETA(8 + Math.floor(Math.random() * 5))
          setState('ambulance-assigned')
        } catch (err) {
          setError('Failed to find nearest hospital')
          setState('error')
        }
      }, 2000)
    } catch (err: any) {
      setError(err?.message || 'Failed to get location. Please try again.')
      setState('error')
    }
  }

  if (!location && state !== 'initial' && state !== 'error') {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex items-center gap-4 p-6 border-b border-border">
          <button onClick={onBack} className="p-2 hover:bg-card rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{t('ambulance.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('ambulance.subtitle')}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-3"></div>
              <p className="text-foreground font-semibold">
                {state === 'locating' ? t('ambulance.please_wait') : t('ambulance.dispatching')}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || state === 'error') {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex items-center gap-4 p-6 border-b border-border">
          <button onClick={onBack} className="p-2 hover:bg-card rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{t('ambulance.error')}</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-4 bg-card border border-destructive/30 p-6 rounded-xl">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <button
              onClick={handleGetAmbulance}
              className="w-full py-2 px-4 bg-primary hover:bg-[#dc2626] text-primary-foreground rounded-lg font-semibold"
            >
              {t('ambulance.try_again')}
            </button>
            <button
              onClick={onBack}
              className="w-full py-2 px-4 border border-border hover:bg-card rounded-lg font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="flex items-center gap-4 p-6 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-card rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{t('ambulance.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('ambulance.subtitle')}</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          {state === 'initial' && (
            <div className="space-y-6">
              <div className="text-center">
                <Ambulance className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">{t('ambulance.get_ambulance')}</h2>
                <p className="text-muted-foreground text-sm">{t('ambulance.immediate_medical')}</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <p className="font-semibold text-sm">{t('ambulance.rapid_response')}</p>
                    <p className="text-xs text-muted-foreground">{t('ambulance.within_minutes')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <p className="font-semibold text-sm">{t('ambulance.trained_paramedics')}</p>
                    <p className="text-xs text-muted-foreground">{t('ambulance.professional_care')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <p className="font-semibold text-sm">{t('ambulance.hospital_routing')}</p>
                    <p className="text-xs text-muted-foreground">{t('ambulance.best_facility')}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGetAmbulance}
                className="w-full py-4 px-6 bg-primary hover:bg-[#dc2626] text-primary-foreground rounded-xl font-bold text-lg transition-all duration-200"
              >
                {t('ambulance.call_ambulance')}
              </button>
            </div>
          )}

          {state === 'locating' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Ambulance className="w-12 h-12 text-primary animate-pulse mb-3" />
              <h3 className="font-bold text-lg">{t('ambulance.contacting')}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t('ambulance.please_wait')}</p>
            </div>
          )}

          {state === 'searching' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Ambulance className="w-12 h-12 text-primary animate-bounce mb-3" />
              <h3 className="font-bold text-lg">{t('ambulance.dispatching')}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t('ambulance.nearest_hospital')}</p>
            </div>
          )}

          {state === 'ambulance-assigned' && hospital && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-accent">{t('ambulance.dispatched')}</h2>
                <p className="text-muted-foreground">{t('ambulance.ambulance_arriving')}</p>
              </div>

              <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{ambulanceETA}</div>
                <p className="text-muted-foreground">{t('ambulance.minutes_eta')}</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-lg">{hospital.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('ambulance.distance')}</p>
                      <p className="font-semibold">{hospital.distance} km</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('ambulance.to_hospital')}</p>
                      <p className="font-semibold">{hospital.eta} {t('ambulance.minutes')}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">{hospital.address}</p>
                  {hospital.hasTrauma && (
                    <p className="text-xs text-accent pt-2">✓ {t('ambulance.trauma_center')}</p>
                  )}
                </div>
              </div>

              <div className="bg-background/50 border border-primary/30 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-foreground">{t('ambulance.stay_calm')}</p>
                <p className="text-xs text-muted-foreground mt-1">{t('ambulance.emergency_operator')}</p>
              </div>

              {location && (
                <div className="bg-background/50 border border-border/50 rounded-lg p-3 text-center text-xs text-muted-foreground">
                  {t('ambulance.location')}: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </div>
              )}

              <button
                onClick={onBack}
                className="w-full py-3 px-6 border border-border hover:bg-card rounded-xl font-semibold transition-colors"
              >
                {t('ambulance.back')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
