import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Language, useTranslation } from '@/lib/i18n'

interface MainScreenProps {
  language: Language
  onGetHelp: () => void
  onOfferHelp: () => void
  onSOS: () => void
  onAmbulance: () => void
}

export default function MainScreen({
  language,
  onGetHelp,
  onOfferHelp,
  onSOS,
  onAmbulance,
}: MainScreenProps) {
  const t = useTranslation(language)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-b from-background to-[#141829]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertCircle className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold text-foreground">SOSync</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {t('main.emergency_response')}
          </p>
        </div>

        {/* Main Actions - All 4 buttons in column */}
        <div className="space-y-3">
          {/* SOS Button - Large Red */}
          <button
            onClick={onSOS}
            className="w-full py-6 px-6 bg-primary hover:bg-[#dc2626] text-primary-foreground rounded-xl font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/50 flex items-center gap-3 group"
          >
            <span className="text-3xl">🚨</span>
            <div className="text-left">
              <div className="font-bold">{t('main.sos')}</div>
              <div className="text-xs opacity-90">{t('main.emergency_response')}</div>
            </div>
          </button>

          {/* Get Medical Help Button */}
          <button
            onClick={onAmbulance}
            className="w-full py-5 px-6 bg-card hover:bg-[#252d48] border border-border rounded-xl font-semibold transition-all duration-200 text-foreground flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚑</span>
              <div className="text-left">
                <div className="font-semibold text-sm">{t('ambulance.title')}</div>
                <div className="text-xs text-muted-foreground">
                  {t('ambulance.subtitle')}
                </div>
              </div>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground">
              →
            </span>
          </button>

          {/* Get Help Button */}
          <button
            onClick={onGetHelp}
            className="w-full py-5 px-6 bg-card hover:bg-[#252d48] border border-border rounded-xl font-semibold transition-all duration-200 text-foreground flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div className="text-left">
                <div className="font-semibold text-sm">{t('main.get_help')}</div>
                <div className="text-xs text-muted-foreground">
                  {t('main.desc')}
                </div>
              </div>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground">
              →
            </span>
          </button>

          {/* Offer Help Button */}
          <button
            onClick={onOfferHelp}
            className="w-full py-5 px-6 bg-card hover:bg-[#252d48] border border-border rounded-xl font-semibold transition-all duration-200 text-foreground flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <div className="text-left">
                <div className="font-semibold text-sm">{t('main.offer_help')}</div>
                <div className="text-xs text-muted-foreground">
                  {t('main.desc')}
                </div>
              </div>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground">
              →
            </span>
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            ✓ {t('offer.verified_trained')}<br />
            ✓ {t('help.location_sharing')}<br />
            ✓ 24/7 {t('help.subtitle')}
          </p>
        </div>
      </div>
    </div>
  )
}
