'use client'

import { Center, Loader } from '@mantine/core'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AdminErrorPage from '@/app/admin/error'
import type { SearchPostType } from '@/entities/announcement'
import { AnnouncementManagementSearchPage } from './announcement-management-search-page'

export interface AnnouncementManagementSearchPageViewProps {
  defaultQuery: string
  defaultType: SearchPostType
}

export const AnnouncementManagementSearchPageView: React.FC<
  AnnouncementManagementSearchPageViewProps
> = ({ defaultQuery, defaultType }) => {
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
            <AnnouncementManagementSearchPage
              defaultQuery={defaultQuery}
              defaultType={defaultType}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
