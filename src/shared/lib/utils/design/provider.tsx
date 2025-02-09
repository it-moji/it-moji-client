import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { createTheme, rem } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { breakpoints } from './breakpoint'

export const defaultThemeSchema = createTheme({
  fontFamily:
    'var(--pretendard), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontSizes: { xs: rem(12), sm: rem(14), md: rem(16), lg: rem(18), xl: rem(20) },
  breakpoints,
})

export const DesignSystemProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MantineProvider theme={defaultThemeSchema} defaultColorScheme="auto">
    <ColorSchemeScript defaultColorScheme="auto" />
    <ModalsProvider labels={{ confirm: '확인', cancel: '취소' }}>{children}</ModalsProvider>
  </MantineProvider>
)
