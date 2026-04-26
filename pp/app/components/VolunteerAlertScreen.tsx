'use client';

import { useCrisis } from '@/app/context/CrisisContext';

export function VolunteerAlertScreen() {
  const { navigateTo } = useCrisis();

  const handleAccept = () => {
    navigateTo('navigation');
  };

  const handleDecline = () => {
    navigateTo('home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gap-6 slide-up" style={{ backgroundColor: '#0f0f0f', color: '#fafafa' }}>
      {/* Alert Card */}
      <div className="w-full max-w-sm">
        <div className="rounded-lg p-6 space-y-6" style={{ backgroundColor: '#404040', border: '1px solid #333333' }}>
          {/* Alert Header */}
          <div className="text-center">
            <div className="text-5xl mb-3 animate-bounce">🚨</div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#ff0000' }}>Emergency Nearby</h2>
            <p className="text-lg font-semibold mb-1">300 meters away</p>
            <p className="text-sm" style={{ color: '#b3b3b3' }}>Medical assistance needed</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded p-3 text-center" style={{ backgroundColor: '#0f0f0f' }}>
              <p className="text-2xl mb-1">⏱️</p>
              <p className="text-xs" style={{ color: '#b3b3b3' }}>Response Time</p>
              <p className="font-bold">2-3 mins</p>
            </div>
            <div className="rounded p-3 text-center" style={{ backgroundColor: '#0f0f0f' }}>
              <p className="text-2xl mb-1">📍</p>
              <p className="text-xs" style={{ color: '#b3b3b3' }}>Distance</p>
              <p className="font-bold">300m</p>
            </div>
            <div className="rounded p-3 text-center" style={{ backgroundColor: '#0f0f0f' }}>
              <p className="text-2xl mb-1">🚗</p>
              <p className="text-xs" style={{ color: '#b3b3b3' }}>Vehicles</p>
              <p className="font-bold">4 Active</p>
            </div>
            <div className="rounded p-3 text-center" style={{ backgroundColor: '#0f0f0f' }}>
              <p className="text-2xl mb-1">👥</p>
              <p className="text-xs" style={{ color: '#b3b3b3' }}>Responders</p>
              <p className="font-bold">2 Nearby</p>
            </div>
          </div>

          {/* Description */}
          <div className="rounded p-3" style={{ backgroundColor: '#0f0f0f' }}>
            <p className="text-sm text-center">
              Your help could save a life. Accept to receive navigation to the scene.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              className="w-full py-4 px-6 hover:opacity-90 active:scale-95 transition-all duration-150 rounded-lg text-white font-semibold text-lg"
              style={{ backgroundColor: '#22c55e' }}
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="w-full py-4 px-6 hover:opacity-80 active:scale-95 transition-all duration-150 rounded-lg font-semibold text-lg"
              style={{ backgroundColor: '#404040', color: '#fafafa' }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="w-full max-w-sm">
        <p className="text-xs text-center" style={{ color: '#b3b3b3' }}>
          By accepting, you agree to provide assistance and follow emergency protocols.
        </p>
      </div>
    </div>
  );
}
