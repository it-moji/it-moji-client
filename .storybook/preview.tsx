import { withThemeByDataAttribute } from '@storybook/addon-themes'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { initialize, mswLoader } from 'msw-storybook-addon'
import type { Preview } from '@storybook/react'
import { handlers } from '@/mocks/handlers'
import { QueryProvider } from '@/shared/api'
import { DesignSystemProvider } from '@/shared/lib'

import '@/app/assets/style/reset.css'
import '@mantine/core/styles.css'
import '@/app/assets/style/globals.css'

// Initialize MSW
initialize({
  serviceWorker: {
    url: './mockServiceWorker.js',
  },
})

const preview: Preview = {
  parameters: {
    msw: { handlers },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    nextjs: {
      appDirectory: true,
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
