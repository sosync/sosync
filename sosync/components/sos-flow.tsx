'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Language, useTranslation } from '@/lib/i18n'

interface SOSFlowProps {
  language: Language
  onBack: () => void
}

type SOSState = 'triggered' | 'broadcasting' | 'responders-en-route'

export default function SOSFlow({ language, onBack }: SOSFlowProps) {
  const [state, setState] = useState<SOSState>('triggered')
  const [countdown, setCountdown] = useState(0)
  const [respondersCount, setRespondersCount] = useState(0)
  const t = useTranslation(language)

  useEffect(() => {
    if (state === 'triggered') {
      console.log('[v0] SOS triggered, starting broadcast in 1s')
      const timer = setTimeout(() => {
        setState('broadcasting')
        setCountdown(5)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [state])

  useEffect(() => {
    if (state === 'broadcasting' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (state === 'broadcasting' && countdown === 0) {
      console.log('[v0] Broadcasting complete, transitioning to responders-en-route')
      setRespondersCount(Math.floor(Math.random() * 3) + 2)
      setState('responders-en-route')
    }
  }, [state, countdown])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-[#1a1f3a] to-[#0f1219]">
      {/* Status Bar */}
      <div className="flex items-center justify-between p-6 border-b border-primary/30">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm font-semibold text-primary">
            {t('sos.emergency')}
          </span>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 border border-border hover:bg-card rounded-lg text-sm transition-colors"
        >
          {t('sos.cancel')}
        </button>
      </div>

      {/* Content Area - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Triggered State */}
          {state === 'triggered' && (
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <AlertCircle className="w-20 h-20 text-primary animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl font-black mb-2 text-primary">
                  {t('sos.title')}
                </h1>
                <p className="text-lg text-foreground mb-4">
                  {t('sos.emergency_active')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('sos.broadcasting')}
                </p>
              </div>
            </div>
          )}

          {/* Broadcasting State */}
          {state === 'broadcasting' && (
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-primary rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 border-4 border-primary/50 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <Radio className="absolute inset-0 w-24 h-24 text-primary m-auto animate-spin" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {t('sos.broadcast')}
                </h2>
                <p className="text-lg text-foreground mb-6">
                  {t('sos.broadcasting')}
                </p>
                <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Broadcasting to responders in your area...
                  </p>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      {countdown}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Waiting for responders...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Responders En Route State */}
          {state === 'responders-en-route' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
                  <AlertCircle className="w-10 h-10 text-accent" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-1">
                  Help on the Way!
                </h2>
                <p className="text-muted-foreground">
                  Emergency responders have been notified
                </p>
              </div>

              {/* Status Checks */}
              <div className="bg-card border border-border/50 rounded-xl p-6 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-accent text-lg">✔</span>
                  <p className="text-sm text-foreground">Location shared</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent text-lg">✔</span>
                  <p className="text-sm text-foreground">Responders notified</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent text-lg">✔</span>
                  <p className="text-sm text-foreground">Assistance incoming</p>
                </div>
              </div>

              {/* Responders Info */}
              <div className="bg-background/50 border border-border/50 rounded-xl p-4">
                <p className="text-2xl font-bold text-secondary mb-1">
                  {respondersCount}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('sos.responders_nearby')} - ETA 2-3 min
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={onBack}
                  className="w-full py-3 px-6 border border-border hover:bg-card rounded-xl font-semibold transition-colors text-foreground"
                >
                  Cancel SOS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
