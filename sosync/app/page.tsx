'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Globe, AlertCircle } from 'lucide-react'
import MainScreen from '@/components/main-screen'
import GetHelpFlow from '@/components/get-help-flow'
import OfferHelpFlow from '@/components/offer-help-flow'
import SOSFlow from '@/components/sos-flow'
import AmbulanceFlow from '@/components/ambulance-flow'
import { Language } from '@/lib/i18n'

type AppState = 'main' | 'get-help' | 'offer-help' | 'sos' | 'ambulance'

export default function Page() {
  const [appState, setAppState] = useState<AppState>('main')
  const [language, setLanguage] = useState<Language>('en')
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
  ]

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-primary mb-4">Loading...</div>
        </div>
      </div>
    )
  }

  // Show error state if something fails
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="bg-card border border-destructive/30 rounded-xl p-8 max-w-md text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Something went wrong</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            onClick={() => {
              setError(null)
              setAppState('main')
            }}
            className="w-full py-3 px-6 bg-primary hover:bg-[#dc2626] text-primary-foreground rounded-lg font-semibold transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-card border border-border p-2 rounded-lg shadow-lg">
        <Globe className="w-5 h-5 text-primary self-center" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-background text-foreground border border-border rounded px-2 py-1 text-sm font-semibold cursor-pointer hover:border-primary transition-colors"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {appState === 'main' && (
          <MainScreen
            language={language}
            onGetHelp={() => setAppState('get-help')}
            onOfferHelp={() => setAppState('offer-help')}
            onSOS={() => setAppState('sos')}
            onAmbulance={() => setAppState('ambulance')}
          />
        )}
        {appState === 'get-help' && (
          <GetHelpFlow language={language} onBack={() => setAppState('main')} />
        )}
        {appState === 'offer-help' && (
          <OfferHelpFlow language={language} onBack={() => setAppState('main')} />
        )}
        {appState === 'sos' && (
          <SOSFlow language={language} onBack={() => setAppState('main')} />
        )}
        {appState === 'ambulance' && (
          <AmbulanceFlow language={language} onBack={() => setAppState('main')} />
        )}
      </div>
    </main>
  )
}
