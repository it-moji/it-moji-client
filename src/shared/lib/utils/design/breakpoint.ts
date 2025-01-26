import { useMediaQuery } from '@mantine/hooks'

export const breakpoints = {
  xs: '20rem',
  sm: '30rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
} as const

export type BreakpointKey = keyof typeof breakpoints

export const useBreakpoint = (key: BreakpointKey, initialValue = true) =>
  useMediaQuery(`(min-width: ${breakpoints[key]})`, initialValue, {
    getInitialValueInEffect: initialValue,
  }) ?? initialValue
