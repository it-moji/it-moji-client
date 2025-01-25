'use client'

import { useIsomorphicLayoutEffect } from 'motion/react'
import { useEffect, useState } from 'react'
import { DEFAULT_SYSTEM_THEME, ThemeSchema } from './model'
import { matchDarkThemeMedia, useThemeStore } from './store'

const useThemeProvider = (defaultValue = DEFAULT_SYSTEM_THEME as string) => {
  const { data: defaultTheme = DEFAULT_SYSTEM_THEME } = ThemeSchema.safeParse(defaultValue)

  const [darkThemeMedia, setMedia] = useState<MediaQueryList | null>(null)

  const systemTheme = useThemeStore((store) => store.systemTheme)
  const setTheme = useThemeStore((store) => store.setTheme)
  const setSystemTheme = useThemeStore((store) => store.setSystemTheme)

  useIsomorphicLayoutEffect(() => {
    setMedia(matchDarkThemeMedia)
    setSystemTheme(defaultTheme)
  }, [])

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      if (systemTheme === ThemeSchema.Enum.system)
        setTheme(event.matches ? ThemeSchema.Enum.dark : ThemeSchema.Enum.light)
    }

    darkThemeMedia?.addEventListener('change', handleChange)

    return () => {
      darkThemeMedia?.removeEventListener('change', handleChange)
    }
  }, [darkThemeMedia, systemTheme, setTheme])

  return { systemTheme: !darkThemeMedia ? defaultTheme : systemTheme }
}

export interface ThemeProviderProps
  extends Omit<React.JSX.IntrinsicElements['body'], 'defaultValue'> {
  defaultValue?: string | undefined
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultValue,
  children,
  ...props
}) => {
  const { systemTheme } = useThemeProvider(defaultValue)

  return (
    <body {...props} data-theme={systemTheme}>
      {children}
    </body>
  )
}
