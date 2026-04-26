'use client';

import { useState } from 'react';
import { useCrisis } from '@/app/context/CrisisContext';

interface Step {
  id: number;
  emoji: string;
  title: string;
  description: string;
  completed: boolean;
}

export function OnSceneGuidanceScreen() {
  const { navigateTo } = useCrisis();
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      emoji: '📞',
      title: 'Call Ambulance',
      description: 'Alert emergency medical services immediately',
      completed: false,
    },
    {
      id: 2,
      emoji: '💨',
      title: 'Check Breathing',
      description: 'Ensure airway is clear, position recovery',
      completed: false,
    },
    {
      id: 3,
      emoji: '🩸',
      title: 'Stop Bleeding',
      description: 'Apply pressure with clean cloth, elevate if possible',
      completed: false,
    },
    {
      id: 4,
      emoji: '🧊',
      title: 'Apply First Aid',
      description: 'Use first aid kit if available, keep patient calm',
      completed: false,
    },
  ]);

  const handleStepComplete = (stepId: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const handleFinish = () => {
    navigateTo('home');
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const allCompleted = completedCount === steps.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 gap-4 slide-up" style={{ backgroundColor: '#0f0f0f', color: '#fafafa' }}>
      {/* Header */}
      <div className="w-full max-w-sm text-center py-4">
        <h2 className="text-2xl font-bold mb-1">On-Scene Guidance</h2>
        <p className="text-sm" style={{ color: '#b3b3b3' }}>Follow the steps below</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm" style={{ color: '#b3b3b3' }}>Progress</p>
          <p className="text-sm font-semibold">
            {completedCount} of {steps.length}
          </p>
        </div>
        <div className="w-full rounded-full h-2 overflow-hidden" style={{ backgroundColor: '#404040' }}>
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{ width: `${(completedCount / steps.length) * 100}%`, backgroundColor: '#22c55e' }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="w-full max-w-sm space-y-3 py-4">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => handleStepComplete(step.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 active:scale-95`}
            style={{
              backgroundColor: step.completed ? 'rgba(34, 197, 94, 0.1)' : '#404040',
              borderColor: step.completed ? '#22c55e' : '#333333',
              opacity: step.completed ? 0.6 : 1,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 pt-1">
                {step.completed ? (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#22c55e' }}>
                    ✓
                  </div>
                ) : (
                  <div className="text-2xl">{step.emoji}</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold mb-1 ${step.completed ? 'line-through' : ''}`} style={{ color: step.completed ? '#b3b3b3' : '#fafafa' }}>
                  {step.title}
                </p>
                <p className="text-sm" style={{ color: '#b3b3b3' }}>{step.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Help Text */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#404040', border: '1px solid #333333' }}>
        <p className="text-sm">
          <span className="font-semibold block mb-1">💡 Tips:</span>
          Keep the person comfortable and conscious. Communicate with emergency responders when they arrive.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-3 pt-4 flex-1 flex flex-col justify-end pb-4">
        <button
          onClick={handleFinish}
          disabled={!allCompleted}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-150 active:scale-95`}
          style={{
            backgroundColor: allCompleted ? '#22c55e' : '#666666',
            color: '#ffffff',
            opacity: allCompleted ? 1 : 0.5,
            cursor: allCompleted ? 'pointer' : 'not-allowed'
          }}
        >
          {allCompleted ? 'Return to Home' : 'Complete All Steps'}
        </button>
        <button className="w-full py-4 px-6 hover:opacity-80 active:scale-95 transition-all duration-150 rounded-lg font-semibold text-lg" style={{ backgroundColor: '#404040', color: '#fafafa' }}>
          Call Support
        </button>
      </div>
    </div>
  );
}
