'use client'

import { Suspense, use } from 'react'

const enableMocking =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({ browser }) => {
        if (process.env.NODE_ENV === 'production') return

        await browser.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes('_next')) return
            if (request.url.includes('_rsc')) return

            print.warning()
          },
        })
        console.log(browser.listHandlers())
      })
    : Promise.resolve()

export interface MockProviderProps extends React.PropsWithChildren {
  forceEnabled?: true
}

const MockWrapper: React.FC<MockProviderProps> = ({ forceEnabled, children }) => {
  if (forceEnabled || process.env.MOCK_ENABLED === 'true') {
    use(enableMocking)
  }

  return children
}

export const MockProvider: React.FC<MockProviderProps> = ({ forceEnabled, children }) => (
  <Suspense fallback={null}>
    <MockWrapper forceEnabled={forceEnabled}>{children}</MockWrapper>
  </Suspense>
)
