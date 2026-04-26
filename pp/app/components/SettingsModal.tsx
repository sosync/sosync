'use client';

import { useSettings } from '@/app/context/SettingsContext';
import { translations } from '@/app/lib/translations';

export function SettingsModal() {
  const { language, setLanguage, theme, setTheme, showSettings, setShowSettings } = useSettings();
  const t = translations[language];

  const isDark = theme === 'dark';

  if (!showSettings) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={() => setShowSettings(false)}
    >
      <div
        className="rounded-lg p-6 w-full max-w-sm max-h-96 overflow-y-auto"
        style={{
          backgroundColor: isDark ? '#404040' : '#f5f5f5',
          color: isDark ? '#fafafa' : '#0f0f0f',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t.settings}</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="text-2xl font-bold hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <p className="font-semibold mb-3" style={{ color: isDark ? '#fafafa' : '#0f0f0f' }}>
            {t.language}
          </p>
          <div className="space-y-2">
            {(['en', 'hi', 'mr'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className="w-full p-3 rounded-lg text-left font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    language === lang
                      ? isDark
                        ? '#ff0000'
                        : '#ff6b6b'
                      : isDark
                        ? '#0f0f0f'
                        : '#e0e0e0',
                  color: language === lang ? '#ffffff' : isDark ? '#fafafa' : '#0f0f0f',
                }}
              >
                {language === lang && '✓ '}
                {lang === 'en' && t.english}
                {lang === 'hi' && t.hindi}
                {lang === 'mr' && t.marathi}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div>
          <p className="font-semibold mb-3" style={{ color: isDark ? '#fafafa' : '#0f0f0f' }}>
            {t.theme}
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setTheme('dark')}
              className="w-full p-3 rounded-lg text-left font-medium transition-all duration-200"
              style={{
                backgroundColor:
                  theme === 'dark'
                    ? isDark
                      ? '#ff0000'
                      : '#ff6b6b'
                    : isDark
                      ? '#0f0f0f'
                      : '#e0e0e0',
                color: theme === 'dark' ? '#ffffff' : isDark ? '#fafafa' : '#0f0f0f',
              }}
            >
              {theme === 'dark' && '✓ '}
              🌙 {t.darkMode}
            </button>
            <button
              onClick={() => setTheme('light')}
              className="w-full p-3 rounded-lg text-left font-medium transition-all duration-200"
              style={{
                backgroundColor:
                  theme === 'light'
                    ? isDark
                      ? '#ff0000'
                      : '#ff6b6b'
                    : isDark
                      ? '#0f0f0f'
                      : '#e0e0e0',
                color: theme === 'light' ? '#ffffff' : isDark ? '#fafafa' : '#0f0f0f',
              }}
            >
              {theme === 'light' && '✓ '}
              ☀️ {t.lightMode}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
