'use client';

import { CrisisProvider } from './context/CrisisContext';
import { SettingsProvider } from './context/SettingsContext';
import { AppContainer } from './components/AppContainer';

export default function Home() {
  return (
    <SettingsProvider>
      <CrisisProvider>
        <AppContainer />
      </CrisisProvider>
    </SettingsProvider>
  );
}
