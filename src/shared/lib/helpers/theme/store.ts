import Cookies from 'js-cookie'
import { create } from 'zustand'
import {
  type SystemTheme,
  type Theme,
  DEFAULT_SYSTEM_THEME,
  DEFAULT_THEME,
  THEME_KEY,
  ThemeSchema,
} from './model'

export interface ThemeState {
  theme: Theme
  systemTheme: SystemTheme
  setSystemTheme: (theme: SystemTheme) => void
}

export interface ThemeStore extends ThemeState {
  setTheme: (theme: Theme) => void
}

export const matchDarkThemeMedia = () => window.matchMedia('(prefers-color-scheme: dark)')

export const themeInterceptor = (
  systemTheme: SystemTheme,
): Pick<ThemeStore, 'theme' | 'systemTheme'> => {
  if (systemTheme === ThemeSchema.Enum.system) {
    const { matches: isDarkTheme } = matchDarkThemeMedia()

    Cookies.remove(THEME_KEY)

    return { systemTheme, theme: isDarkTheme ? ThemeSchema.Enum.dark : ThemeSchema.Enum.light }
  }

  Cookies.set(THEME_KEY, systemTheme)

  return { systemTheme, theme: systemTheme }
}

export const useThemeStore = create<ThemeStore>((set) => ({
  systemTheme: DEFAULT_SYSTEM_THEME,
  setSystemTheme: (systemTheme) => set(themeInterceptor(systemTheme)),
  theme: DEFAULT_THEME,
  setTheme: (theme) => set({ theme }),
}))

export const useTheme = (): ThemeState => ({
  theme: useThemeStore((store) => store.theme),
  systemTheme: useThemeStore((store) => store.systemTheme),
  setSystemTheme: useThemeStore((store) => store.setSystemTheme),
})
