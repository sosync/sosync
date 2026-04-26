'use client';

import { useCrisis } from '@/app/context/CrisisContext';

export function NavigationScreen() {
  const { navigateTo } = useCrisis();

  const handleReached = () => {
    navigateTo('on-scene-guidance');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 gap-4 slide-up" style={{ backgroundColor: '#0f0f0f', color: '#fafafa' }}>
      {/* Header */}
      <div className="w-full max-w-sm text-center py-4">
        <h2 className="text-2xl font-bold mb-1">Navigate to Emergency</h2>
        <p className="text-sm" style={{ color: '#b3b3b3' }}>Follow the route below</p>
      </div>

      {/* Map with Route */}
      <div className="w-full max-w-sm aspect-video bg-secondary rounded-lg relative overflow-hidden" style={{ backgroundColor: '#404040', border: '1px solid #333333' }}>
        {/* Simple route visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <line
                x1="20%"
                y1="20%"
                x2="80%"
                y2="80%"
                stroke="#ff0000"
                strokeWidth="3"
                opacity="0.6"
              />
            </svg>
            {/* Start marker */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 rounded-full border-2" style={{ backgroundColor: '#22c55e', borderColor: '#fafafa' }}></div>
                <p className="text-xs font-bold mt-1 whitespace-nowrap">You</p>
              </div>
            </div>
            {/* End marker */}
            <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 rounded-full border-2 animate-pulse" style={{ backgroundColor: '#ff0000', borderColor: '#fafafa' }}></div>
                <p className="text-xs font-bold mt-1 whitespace-nowrap" style={{ color: '#ff0000' }}>Scene</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direction Info */}
      <div className="w-full max-w-sm space-y-3 pt-4">
        <div className="rounded-lg p-4" style={{ backgroundColor: '#404040', border: '1px solid #333333' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">↗️</span>
            <div>
              <p className="font-semibold">Continue Northeast</p>
              <p className="text-sm" style={{ color: '#b3b3b3' }}>280 meters</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4" style={{ backgroundColor: '#404040', border: '1px solid #333333' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚗</span>
            <div>
              <p className="font-semibold">Turn Right on Main St</p>
              <p className="text-sm" style={{ color: '#b3b3b3' }}>Follow the arrows</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4" style={{ backgroundColor: '#404040', border: '1px solid #333333' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏁</span>
            <div>
              <p className="font-semibold">Destination on Right</p>
              <p className="text-sm" style={{ color: '#b3b3b3' }}>Red marker near traffic light</p>
            </div>
          </div>
        </div>
      </div>

      {/* Distance and Time */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3 pt-4">
        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#404040', border: '1px solid #333333' }}>
          <p className="text-2xl font-bold" style={{ color: '#ff0000' }}>280m</p>
          <p className="text-xs" style={{ color: '#b3b3b3' }}>Distance</p>
        </div>
        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#404040', border: '1px solid #333333' }}>
          <p className="text-2xl font-bold">3 min</p>
          <p className="text-xs" style={{ color: '#b3b3b3' }}>Estimated Time</p>
        </div>
      </div>

      {/* Reached Button */}
      <div className="w-full max-w-sm pt-6 flex-1 flex flex-col justify-end pb-4">
        <button
          onClick={handleReached}
          className="w-full py-4 px-6 hover:opacity-90 active:scale-95 transition-all duration-150 rounded-lg text-white font-semibold text-lg"
          style={{ backgroundColor: '#22c55e' }}
        >
          I&apos;ve Reached the Scene
        </button>
      </div>
    </div>
  );
}
