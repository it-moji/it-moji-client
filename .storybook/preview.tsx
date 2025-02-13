import { withThemeByDataAttribute } from '@storybook/addon-themes'
import { initialize, mswLoader } from 'msw-storybook-addon'
import type { Preview } from '@storybook/react'
import { handlers } from '@/mocks/handlers'
import { QueryProvider } from '@/shared/api'
import { DesignSystemProvider } from '@/shared/lib'

import '@/app/reset.css'
import '@mantine/core/styles.css'
import '@/app/globals.css'

// Initialize MSW
initialize()

const preview: Preview = {
  parameters: {
    msw: { handlers },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
  decorators: [
    withThemeByDataAttribute({
      themes: {
        // nameOfTheme: 'dataAttributeForTheme',
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-mantine-color-scheme',
    }),
    (Story, context) => (
      <DesignSystemProvider>
        <QueryProvider withoutDevtools>
          <Story {...context} />
        </QueryProvider>
      </DesignSystemProvider>
    ),
  ],
}

export default preview
