import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

export type AccentPreset = 'default' | 'pulse' | 'ficopay' | 'gold' | 'vision';

export interface AccentColorConfig {
  id: AccentPreset;
  name: string;
  navy: string;
  navyHover: string;
  green: string;
  gold: string;
}

export const ACCENT_PRESETS: Record<AccentPreset, AccentColorConfig> = {
  default: {
    id: 'default',
    name: 'QINDE Navy & Emerald',
    navy: '#102A43',
    navyHover: '#173F5F',
    green: '#198754',
    gold: '#D9A441',
  },
  pulse: {
    id: 'pulse',
    name: 'Midnight Indigo & Purple',
    navy: '#4F46E5',
    navyHover: '#4338CA',
    green: '#9333EA',
    gold: '#F59E0B',
  },
  ficopay: {
    id: 'ficopay',
    name: 'Royal Sapphire & Cyan',
    navy: '#0284C7',
    navyHover: '#0369A1',
    green: '#06B6D4',
    gold: '#F59E0B',
  },
  gold: {
    id: 'gold',
    name: 'Warm Obsidian & Amber',
    navy: '#1E293B',
    navyHover: '#0F172A',
    green: '#D9A441',
    gold: '#F59E0B',
  },
  vision: {
    id: 'vision',
    name: 'Clean Emerald & Mint',
    navy: '#059669',
    navyHover: '#047857',
    green: '#10B981',
    gold: '#D9A441',
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  accentPreset: AccentPreset;
  setAccentPreset: (preset: AccentPreset) => void;
  activeAccentConfig: AccentColorConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_THEME = 'qinde_theme_mode';
const LOCAL_STORAGE_ACCENT = 'qinde_accent_preset';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME) as ThemeMode;
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [accentPreset, setAccentPresetState] = useState<AccentPreset>(() => {
    const savedAccent = localStorage.getItem(LOCAL_STORAGE_ACCENT) as AccentPreset;
    if (savedAccent && ACCENT_PRESETS[savedAccent]) return savedAccent;
    return 'default';
  });

  const activeAccentConfig = ACCENT_PRESETS[accentPreset] || ACCENT_PRESETS.default;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LOCAL_STORAGE_THEME, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-brand-navy', activeAccentConfig.navy);
    root.style.setProperty('--color-brand-navy-hover', activeAccentConfig.navyHover);
    root.style.setProperty('--color-brand-green', activeAccentConfig.green);
    root.style.setProperty('--color-brand-gold', activeAccentConfig.gold);
    localStorage.setItem(LOCAL_STORAGE_ACCENT, accentPreset);
  }, [accentPreset, activeAccentConfig]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setAccentPreset = (newPreset: AccentPreset) => {
    setAccentPresetState(newPreset);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        accentPreset,
        setAccentPreset,
        activeAccentConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
