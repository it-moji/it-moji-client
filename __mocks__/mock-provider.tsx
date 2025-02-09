'use client'

import { Suspense, use } from 'react'

const enableMocking =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({ browser }) => {
        if (process.env.MOCK_ENABLED !== 'true') return
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
  enabled?: boolean
}

const MockWrapper: React.FC<MockProviderProps> = ({ enabled = false, children }) => {
  if (enabled) {
    use(enableMocking)
  }

  return children
}

export const MockProvider: React.FC<MockProviderProps> = ({ enabled, children }) => (
  <Suspense fallback={null}>
    <MockWrapper enabled={enabled}>{children}</MockWrapper>
  </Suspense>
)
