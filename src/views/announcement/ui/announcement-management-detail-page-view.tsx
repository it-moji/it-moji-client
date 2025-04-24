'use client'

import { Center, Loader } from '@mantine/core'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AdminErrorPage from '@/app/admin/error'
import type { PostDetail } from '@/entities/announcement'
import { AnnouncementManagementDetailPage } from './announcement-management-detail-page'

export interface AnnouncementManagementDetailPageViewProps {
  id: PostDetail['id']
}

export const AnnouncementManagementDetailPageView: React.FC<
  AnnouncementManagementDetailPageViewProps
> = ({ id }) => {
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
            <AnnouncementManagementDetailPage id={id} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
