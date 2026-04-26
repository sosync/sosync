'use client';

import { useEffect, useState } from 'react';
import { useCrisis } from '@/app/context/CrisisContext';

export function SOSCountdownScreen() {
  const { navigateTo, setSosTriggered, setResponderCount } = useCrisis();
  const [countdown, setCountdown] = useState(10);
  const [canCancel, setCanCancel] = useState(true);

  useEffect(() => {
    if (countdown <= 0) {
      setSosTriggered(true);
      // Simulate responders being notified
      setResponderCount(0);
      const interval = setInterval(() => {
        setResponderCount((prev) => Math.min(prev + 1, 8));
      }, 300);
      
      setTimeout(() => {
        clearInterval(interval);
        navigateTo('alert-sent');
      }, 2000);
      return;
    }

    setCanCancel(countdown > 5);
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigateTo, setSosTriggered, setResponderCount]);

  const handleCancel = () => {
    if (canCancel) {
      navigateTo('home');
    }
  };

  const handleSendNow = () => {
    setCountdown(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gap-6 slide-up" style={{ backgroundColor: '#0f0f0f', color: '#fafafa' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#ff0000' }}>SOS Alert</h2>
        <p style={{ color: '#b3b3b3' }}>Sending emergency alert...</p>
      </div>

      {/* Countdown Circle */}
      <div className="relative w-48 h-48 mb-8">
        <div className="absolute inset-0 rounded-full border-4 opacity-30" style={{ borderColor: '#ff0000' }}></div>
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
          style={{ animationDuration: '2s', borderTopColor: '#ff0000', borderRightColor: '#ff0000' }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-6xl font-bold count-down-pulse`} style={{ color: '#ff0000' }}>
              {countdown}
            </div>
            <p className="text-sm mt-2" style={{ color: '#b3b3b3' }}>seconds</p>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="w-full max-w-sm text-center mb-8">
        <p className="text-sm">
          Your location and emergency contact info are being shared with nearby responders
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={handleSendNow}
          className="w-full py-4 px-6 hover:opacity-90 active:scale-95 transition-all duration-150 rounded-lg text-white font-semibold text-lg"
          style={{ backgroundColor: '#ff0000' }}
        >
          Send Now
        </button>
        <button
          onClick={handleCancel}
          disabled={!canCancel}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-150 active:scale-95`}
          style={{
            backgroundColor: canCancel ? '#404040' : '#666666',
            color: canCancel ? '#fafafa' : '#b3b3b3',
            opacity: canCancel ? 1 : 0.5,
            cursor: canCancel ? 'pointer' : 'not-allowed'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
