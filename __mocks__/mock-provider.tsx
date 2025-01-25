'use client'

import { Suspense, use } from 'react'

const enableMocking =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({ browser }) => {
        if (process.env.NODE_ENV === 'production') return
        if (process.env.MOCK_ENABLED === 'false') return

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

const MockWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  use(enableMocking)

  return children
}

export const MockProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Suspense fallback={null}>
    <MockWrapper>{children}</MockWrapper>
  </Suspense>
)
