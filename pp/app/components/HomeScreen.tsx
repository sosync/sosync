'use client';

import { useCrisis } from '@/app/context/CrisisContext';
import { useSettings } from '@/app/context/SettingsContext';
import { translations } from '@/app/lib/translations';
import { useState, useEffect } from 'react';

export function HomeScreen() {
  const { navigateTo, setUserRole } = useCrisis();
  const { language, theme, setShowSettings } = useSettings();
  const t = translations[language];
  const isDark = theme === 'dark';

  const [ambulanceRequested, setAmbulanceRequested] = useState(false);
  const [hospitalETA, setHospitalETA] = useState(420);
  const [displayHospitalETA, setDisplayHospitalETA] = useState(420);
  const [responderCount, setResponderCount] = useState(0);

  useEffect(() => {
    // Animate responder count - simulates responders joining
    if (!ambulanceRequested) {
      const interval = setInterval(() => {
        setResponderCount((prev) => {
          if (prev < 2) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [ambulanceRequested]);

  const formatETA = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const handleSOSClick = () => {
    setUserRole('caller');
    navigateTo('sos-countdown');
  };

  const handleHelpClick = () => {
    setUserRole('volunteer');
    navigateTo('volunteer-alert');
  };

  const handleAmbulanceClick = () => {
    setAmbulanceRequested(true);
    setDisplayHospitalETA(nearestHospital.eta);
  };

  const bgColor = isDark ? '#0f0f0f' : '#ffffff';
  const fgColor = isDark ? '#fafafa' : '#0f0f0f';
  const secondaryBg = isDark ? '#404040' : '#f0f0f0';
  const secondaryText = isDark ? '#b3b3b3' : '#666666';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gap-6" style={{ backgroundColor: bgColor, color: fgColor }}>
      {/* Settings Button - Top Right */}
      <div className="w-full max-w-sm flex justify-end">
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-lg hover:opacity-70 transition-opacity"
          style={{ backgroundColor: secondaryBg, color: fgColor }}
        >
          ⚙️
        </button>
      </div>

      {/* Status Bar */}
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between text-xs mb-8" style={{ color: secondaryText }}>
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{t.locationOn}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📡</span>
            <span>{t.networkOk}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-sm flex-1 flex flex-col items-center justify-center gap-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{t.appName}</h1>
          <p className="text-sm" style={{ color: secondaryText }}>
            {t.appSubtitle}
          </p>
        </div>

        {/* Responder Count Display */}
        <div className="text-center text-sm" style={{ color: secondaryText }}>
          <p>
            {responderCount > 0 ? (
              <>
                <span style={{ color: '#22c55e' }}>✓</span> {responderCount} {responderCount === 1 ? 'responder' : 'responders'} nearby
              </>
            ) : (
              <span style={{ opacity: 0.5 }}>Responders standing by...</span>
            )}
          </p>
        </div>

        {/* SOS Button */}
        <button
          onClick={handleSOSClick}
          className="sos-pulse w-40 h-40 rounded-full hover:opacity-90 active:scale-95 transition-all duration-150 flex items-center justify-center font-bold text-2xl shadow-2xl"
          style={{ backgroundColor: '#ff0000', color: '#ffffff' }}
        >
          {t.sos}
        </button>

        {/* Ambulance Button */}
        <button
          onClick={handleAmbulanceClick}
          disabled={ambulanceRequested}
          className="w-full max-w-xs py-3 px-6 hover:opacity-90 active:scale-95 transition-all duration-150 rounded-lg font-semibold text-lg"
          style={{
            backgroundColor: ambulanceRequested ? '#666666' : '#ff9800',
            color: '#ffffff',
            cursor: ambulanceRequested ? 'not-allowed' : 'pointer',
            opacity: ambulanceRequested ? 0.6 : 1,
          }}
        >
          {ambulanceRequested ? `✓ ${t.medicalHelpDispatched}` : `🚑 ${t.getMedicalHelp}`}
        </button>

        {/* Hospital Info */}
        {ambulanceRequested && (
          <div className="w-full max-w-sm rounded-lg p-4 border-2 fade-in" style={{ backgroundColor: secondaryBg, borderColor: '#ff9800' }}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">🏥</span>
              <div className="flex-1">
                <p className="font-bold text-sm">{nearestHospital.name}</p>
                <p className="text-xs" style={{ color: secondaryText }}>
                  {nearestHospital.distance} {t.distanceAway}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded p-2 text-center"
                style={{ backgroundColor: isDark ? '#0f0f0f' : '#e0e0e0' }}
              >
                <p className="text-xs" style={{ color: secondaryText }}>
                  {t.etaToHospital}
                </p>
                <p className="font-bold text-lg" style={{ color: '#ff9800' }}>
                  {formatETA(displayHospitalETA)}
                </p>
              </div>
              <div
                className="rounded p-2 text-center"
                style={{ backgroundColor: isDark ? '#0f0f0f' : '#e0e0e0' }}
              >
                <p className="text-xs" style={{ color: secondaryText }}>
                  {t.status}
                </p>
                <p className="font-bold" style={{ color: '#22c55e' }}>
                  {t.inTransit}
                </p>
              </div>
            </div>
            <p className="text-xs text-center mt-3" style={{ color: secondaryText }}>
              {t.alertSentToHospital}
            </p>
          </div>
        )}

        {/* Options */}
        <div className="w-full space-y-3 pt-4 opacity-70">
          <button
            onClick={handleHelpClick}
            className="w-full py-3 px-6 hover:opacity-80 active:scale-95 transition-all duration-150 rounded-lg font-medium text-base"
            style={{ backgroundColor: secondaryBg, color: fgColor }}
          >
            {t.iNeedHelp}
          </button>
          <button
            onClick={handleHelpClick}
            className="w-full py-3 px-6 hover:opacity-80 active:scale-95 transition-all duration-150 rounded-lg font-medium text-base"
            style={{ backgroundColor: secondaryBg, color: fgColor }}
          >
            {t.helpSomeoneNearby}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-sm">
        <p className="text-xs text-center" style={{ color: secondaryText }}>
          {t.emergencyWarning}
        </p>
      </div>
    </div>
  );
}
