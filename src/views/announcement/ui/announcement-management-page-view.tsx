'use client'

import { Center, Loader } from '@mantine/core'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AdminErrorPage from '@/app/admin/error'
import { AnnouncementManagementPage } from './announcement-management-page'

export const AnnouncementManagementPageView: React.FC = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={({ error }) => <AdminErrorPage error={error} reset={reset} />}
        >
          <Suspense
            fallback={
              <Center>
                <Loader className="mb-48 mt-40" color="var(--mantine-color-placeholder)" />
              </Center>
            }
          >
            <AnnouncementManagementPage />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
