'use client';

import { useEffect, useState } from 'react';
import { useCrisis } from '@/app/context/CrisisContext';

export function AlertSentScreen() {
  const { responderCount, emergencyETA, setEmergencyETA } = useCrisis();
  const [displayETA, setDisplayETA] = useState(emergencyETA);
  const [ambulanceRequested, setAmbulanceRequested] = useState(false);
  const [hospitalETA, setHospitalETA] = useState(420); // 7 minutes in seconds
  const [displayHospitalETA, setDisplayHospitalETA] = useState(420);

  // Mock nearby hospitals
  const nearestHospital = {
    name: 'Central Medical Hospital',
    distance: '2.3 km',
    eta: 420,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayETA((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!ambulanceRequested) return;
    const interval = setInterval(() => {
      setDisplayHospitalETA((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [ambulanceRequested]);

  const formatETA = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const handleAmbulanceClick = () => {
    setAmbulanceRequested(true);
    setDisplayHospitalETA(nearestHospital.eta);
    // Simulate sending alert to hospital
    console.log('[v0] Ambulance requested to nearest hospital:', nearestHospital.name);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 gap-6 slide-up" style={{ backgroundColor: '#0f0f0f', color: '#fafafa' }}>
      {/* Header */}
      <div className="w-full text-center py-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#22c55e' }}>Alert Sent!</h2>
        <p style={{ color: '#b3b3b3' }}>Help is on the way</p>
      </div>

      {/* Map Placeholder */}
      <div className="w-full max-w-sm aspect-square bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#404040' }}>
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(to bottom right, #404040, #666666)' }}></div>
        <div className="relative text-center">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-sm" style={{ color: '#b3b3b3' }}>Your Location</p>
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute inset-0 border-2 rounded-full opacity-30" style={{ borderColor: '#22c55e' }}></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#404040' }}>
          <div className="text-3xl font-bold mb-1" style={{ color: '#ff0000' }}>{responderCount}</div>
          <p className="text-xs" style={{ color: '#b3b3b3' }}>Responders Notified</p>
        </div>
        <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#404040' }}>
          <div className="text-3xl font-bold mb-1" style={{ color: '#22c55e' }}>{formatETA(displayETA)}</div>
          <p className="text-xs" style={{ color: '#b3b3b3' }}>Est. Arrival</p>
        </div>
      </div>

      {/* Status Messages */}
      <div className="w-full max-w-sm space-y-2">
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#404040' }}>
          <span className="text-lg">📍</span>
          <span className="text-sm">Location shared with responders</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#404040' }}>
          <span className="text-lg">🔔</span>
          <span className="text-sm">Emergency contacts notified</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#404040' }}>
          <span className="text-lg">📱</span>
          <span className="text-sm">Your location is being tracked</span>
        </div>
      </div>

      {/* Hospital Alert Section (shown when ambulance requested) */}
      {ambulanceRequested && (
        <div className="w-full max-w-sm rounded-lg p-4 border-2" style={{ backgroundColor: '#404040', borderColor: '#ff0000' }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xl">🚑</span>
            <p className="font-bold">Ambulance Dispatched</p>
          </div>
          <p className="text-sm mb-3" style={{ color: '#b3b3b3' }}>{nearestHospital.name}</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded p-2 text-center" style={{ backgroundColor: '#0f0f0f' }}>
              <p className="text-xs" style={{ color: '#b3b3b3' }}>Distance</p>
              <p className="font-bold">{nearestHospital.distance}</p>
            </div>
            <div className="rounded p-2 text-center" style={{ backgroundColor: '#0f0f0f' }}>
              <p className="text-xs" style={{ color: '#b3b3b3' }}>ETA to Hospital</p>
              <p className="font-bold" style={{ color: '#ff0000' }}>{formatETA(displayHospitalETA)}</p>
            </div>
          </div>
          <p className="text-xs" style={{ color: '#b3b3b3' }}>Alert sent to hospital. Prepare for arrival.</p>
        </div>
      )}

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-3 pt-4">
        <button
          onClick={handleAmbulanceClick}
          disabled={ambulanceRequested}
          className="w-full py-4 px-6 hover:opacity-90 active:scale-95 transition-all duration-150 rounded-lg text-white font-semibold text-lg"
          style={{
            backgroundColor: ambulanceRequested ? '#666666' : '#ff0000',
            cursor: ambulanceRequested ? 'not-allowed' : 'pointer',
            opacity: ambulanceRequested ? 0.6 : 1,
          }}
        >
          {ambulanceRequested ? 'Ambulance Dispatched' : 'Call Ambulance'}
        </button>

        <button className="w-full py-4 px-6 hover:opacity-90 active:scale-95 transition-all duration-150 rounded-lg text-white font-semibold text-lg" style={{ backgroundColor: '#404040' }}>
          Call Emergency Contact
        </button>
      </div>

      {/* Footer */}
      <div className="flex-1"></div>
      <div className="w-full max-w-sm pb-4">
        <p className="text-xs text-center" style={{ color: '#b3b3b3' }}>
          Stay calm. Help is on the way. Keep your phone nearby.
        </p>
      </div>
    </div>
  );
}
