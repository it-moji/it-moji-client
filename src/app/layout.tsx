import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import { MockProvider } from '@/mocks/mock-provider'
import { QueryProvider } from '@/shared/api'
import { DesignSystemProvider } from '@/shared/lib'
import { LoadingProgressBar } from '@/shared/ui'
import { Pretendard } from './assets/font'

import './assets/style/reset.css'
import '@mantine/core/styles.css'
import './assets/style/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | IT-MOJI',
    default: '🧑🏻‍💻 IT인들끼리 MO여 JI식을 나누는 모임 | IT-MOJI',
  },
  description: 'IT인들끼리 모여 지식을 나누는 모임 IT-MOJI의 공식 홈페이지입니다.',
}

if (
  process.env.NEXT_RUNTIME === 'nodejs' &&
  process.env.NODE_ENV !== 'production' &&
  process.env.MOCK_ENABLED === 'true'
) {
  const { server } = await import('@/mocks/server')

  server.listen({
    onUnhandledRequest: 'bypass',
  })
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="ko" className={Pretendard.variable} suppressHydrationWarning>
    <body className="relative flex min-h-screen min-w-[17.5rem] flex-col items-stretch justify-start bg-white text-gray-800 dark:bg-dark-900 dark:text-dark-50">
      <QueryProvider>
        <DesignSystemProvider>
          <MockProvider>
            <LoadingProgressBar />
            {children}
            <Toaster position="bottom-right" />
          </MockProvider>
        </DesignSystemProvider>
      </QueryProvider>
    </body>
  </html>
)

export default RootLayout
