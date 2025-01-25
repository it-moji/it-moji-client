import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { MockProvider } from '@/mocks/mock-provider'
import { QueryProvider } from '@/shared/api'
import { THEME_KEY, ThemeProvider } from '@/shared/lib'
import { Pretendard } from './font'

import './globals.css'

export const metadata: Metadata = {
  title: 'ITMOJI - IT인들끼리 MO여 JI식을 나누는 모임 🧑🏻‍💻',
  description: 'IT인들끼리 모여 지식을 나누는 모임 ITMOJI의 공식 홈페이지입니다.',
}

if (
  process.env.NEXT_RUNTIME === 'nodejs' &&
  process.env.NODE_ENV !== 'production' &&
  process.env.MOCK_ENABLED === 'true'
) {
  const { server } = await import('@/mocks/server')

  server.listen()
}

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_KEY)

  return (
    <html lang="ko" className={Pretendard.variable}>
      <ThemeProvider
        className="relative flex min-h-screen flex-col items-stretch justify-start bg-white text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-50"
        defaultValue={theme?.value}
      >
        <MockProvider>
          <QueryProvider>{children}</QueryProvider>
        </MockProvider>
      </ThemeProvider>
    </html>
  )
}
export default RootLayout
