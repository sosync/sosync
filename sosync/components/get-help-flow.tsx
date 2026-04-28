'use client'

import { useState } from 'react'
import { ArrowLeft, MapPin, Clock, AlertCircle } from 'lucide-react'
import { getCurrentLocation } from '@/lib/geolocation'
import { getDistance, Location } from '@/lib/maps'
import { Language, useTranslation } from '@/lib/i18n'

interface GetHelpFlowProps {
  language: Language
  onBack: () => void
}

type HelpState = 'initial' | 'loading' | 'found' | 'error'

interface ResponderInfo {
  id: string
  name: string
  distance: number
  eta: number
  responders: number
}

const mockResponders: (ResponderInfo & Location)[] = [
  {
    id: '1',
    name: 'Central Medical Response',
    responders: 3,
    lat: 40.7580,
    lng: -73.9855,
    distance: 0,
    eta: 0,
  },
  {
    id: '2',
    name: 'Downtown Emergency Unit',
    responders: 2,
    lat: 40.7489,
    lng: -73.9680,
    distance: 0,
    eta: 0,
  },
  {
    id: '3',
    name: 'West Side Response Team',
    responders: 1,
    lat: 40.7505,
    lng: -74.0055,
    distance: 0,
    eta: 0,
  },
]

export default function GetHelpFlow({ language, onBack }: GetHelpFlowProps) {
  const [state, setState] = useState<HelpState>('initial')
  const [responder, setResponder] = useState<ResponderInfo | null>(null)
  const [error, setError] = useState<string>('')
  const t = useTranslation(language)

  const handleGetHelp = async () => {
    setState('loading')
    setError('')
    
    try {
      const coords = await getCurrentLocation()
      const userLocation: Location = {
        lat: coords.latitude,
        lng: coords.longitude,
      }

      setTimeout(() => {
        const nearest = mockResponders.reduce((prev, current) => {
          const prevDist = getDistance(userLocation, prev)
          const currDist = getDistance(userLocation, current)
          return prevDist.distance < currDist.distance ? prev : current
        })

        const distInfo = getDistance(userLocation, nearest)
        setResponder({
          ...nearest,
          distance: distInfo.distance,
          eta: distInfo.duration,
        })
        setState('found')
      }, 1500)
    } catch (err: any) {
      setError(err?.message || 'Failed to get location')
      setState('error')
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
          <h1 className="text-2xl font-bold">{t('help.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('help.subtitle')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Initial State */}
          {state === 'initial' && (
            <div className="space-y-8 text-center">
              <AlertCircle className="w-20 h-20 text-primary animate-pulse mx-auto" />
              <div>
                <h2 className="text-3xl font-bold mb-3">Need Emergency Help?</h2>
                <p className="text-muted-foreground mb-8">
                  Click below to request help and get connected with nearby responders
                </p>
              </div>
              <button
                onClick={handleGetHelp}
                className="w-full py-4 px-6 bg-primary hover:bg-[#dc2626] text-primary-foreground rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95"
              >
                Get Help Now
              </button>
            </div>
          )}

          {/* Loading State */}
          {state === 'loading' && (
            <div className="space-y-6 text-center">
              <div className="animate-pulse w-12 h-12 bg-primary/20 rounded-full mx-auto"></div>
              <p className="text-foreground font-semibold">Finding responders near you...</p>
            </div>
          )}

          {/* Found State */}
          {state === 'found' && responder && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Help is on the way!</h2>
                <p className="text-muted-foreground">Responders notified</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{responder.name}</h3>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded inline-block mt-1">
                    ✓ Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-secondary">{responder.distance}</p>
                    <p className="text-xs text-muted-foreground">km away</p>
                  </div>
                  <div className="bg-background rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-accent">{responder.eta}</p>
                    <p className="text-xs text-muted-foreground">min ETA</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-sm">
                    <strong>{responder.responders}</strong> responder{responder.responders > 1 ? 's' : ''} on route
                  </p>
                </div>
              </div>

              <div className="bg-background/50 border border-border/50 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold">Stay calm and safe</p>
                <p className="text-xs text-muted-foreground mt-1">Keep this app open</p>
              </div>

              <button
                onClick={onBack}
                className="w-full py-3 px-6 border border-border hover:bg-card rounded-xl font-semibold"
              >
                Back to Home
              </button>
            </div>
          )}

          {/* Error State */}
          {state === 'error' && (
            <div className="space-y-6 text-center bg-card border border-destructive/30 p-6 rounded-xl">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
              <div>
                <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleGetHelp}
                  className="w-full py-3 px-6 bg-primary hover:bg-[#dc2626] text-primary-foreground rounded-lg font-semibold"
                >
                  Try Again
                </button>
                <button
                  onClick={onBack}
                  className="w-full py-3 px-6 border border-border hover:bg-card rounded-lg font-semibold"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
