'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type AppScreen = 
  | 'home' 
  | 'sos-countdown' 
  | 'alert-sent' 
  | 'volunteer-alert' 
  | 'navigation' 
  | 'on-scene-guidance';

export interface CrisisContextType {
  currentScreen: AppScreen;
  navigateTo: (screen: AppScreen) => void;
  sosTriggered: boolean;
  setSosTriggered: (triggered: boolean) => void;
  userRole: 'caller' | 'volunteer' | null;
  setUserRole: (role: 'caller' | 'volunteer') => void;
  responderCount: number;
  setResponderCount: (count: number) => void;
  emergencyETA: number;
  setEmergencyETA: (eta: number) => void;
}

const CrisisContext = createContext<CrisisContextType | undefined>(undefined);

export function CrisisProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [sosTriggered, setSosTriggered] = useState(false);
  const [userRole, setUserRole] = useState<'caller' | 'volunteer' | null>(null);
  const [responderCount, setResponderCount] = useState(0);
  const [emergencyETA, setEmergencyETA] = useState(120);

  const navigateTo = useCallback((screen: AppScreen) => {
    setCurrentScreen(screen);
  }, []);

  return (
    <CrisisContext.Provider
      value={{
        currentScreen,
        navigateTo,
        sosTriggered,
        setSosTriggered,
        userRole,
        setUserRole,
        responderCount,
        setResponderCount,
        emergencyETA,
        setEmergencyETA,
      }}
    >
      {children}
    </CrisisContext.Provider>
  );
}

export function useCrisis() {
  const context = useContext(CrisisContext);
  if (!context) {
    throw new Error('useCrisis must be used within CrisisProvider');
  }
  return context;
}
