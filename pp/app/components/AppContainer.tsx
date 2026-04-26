'use client';

import { useCrisis } from '@/app/context/CrisisContext';
import { useSettings } from '@/app/context/SettingsContext';
import { HomeScreen } from './HomeScreen';
import { SOSCountdownScreen } from './SOSCountdownScreen';
import { AlertSentScreen } from './AlertSentScreen';
import { VolunteerAlertScreen } from './VolunteerAlertScreen';
import { NavigationScreen } from './NavigationScreen';
import { OnSceneGuidanceScreen } from './OnSceneGuidanceScreen';
import { SettingsModal } from './SettingsModal';

export function AppContainer() {
  const { currentScreen } = useCrisis();
  const { theme } = useSettings();
  const isDark = theme === 'dark';

  const bgColor = isDark ? '#0f0f0f' : '#ffffff';

  return (
    <div className="min-h-screen overflow-hidden" style={{ backgroundColor: bgColor }}>
      <SettingsModal />
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'sos-countdown' && <SOSCountdownScreen />}
      {currentScreen === 'alert-sent' && <AlertSentScreen />}
      {currentScreen === 'volunteer-alert' && <VolunteerAlertScreen />}
      {currentScreen === 'navigation' && <NavigationScreen />}
      {currentScreen === 'on-scene-guidance' && <OnSceneGuidanceScreen />}
    </div>
  );
}
