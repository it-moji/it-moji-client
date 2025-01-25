'use client'

import { type QueryClientConfig, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
} as const

export const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [client] = useState(() => new QueryClient(QUERY_CLIENT_CONFIG))

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
