import { z } from 'zod'

export const THEME_KEY = 'theme'

export const THEME_LIST = ['system', 'light', 'dark'] as const

export const ThemeSchema = z.enum(THEME_LIST)

export const THEME_LABEL = {
  [ThemeSchema.Enum.system]: '시스템 테마',
  [ThemeSchema.Enum.light]: '밝은 테마',
  [ThemeSchema.Enum.dark]: '어두운 테마',
} as const

export const DEFAULT_SYSTEM_THEME: SystemTheme = ThemeSchema.Enum.system

export const DEFAULT_THEME: Theme = ThemeSchema.Enum.light

export type SystemTheme = z.infer<typeof ThemeSchema>

export type Theme = Exclude<SystemTheme, typeof ThemeSchema.Enum.system>
