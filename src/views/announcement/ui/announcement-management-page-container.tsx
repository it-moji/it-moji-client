'use client'

import { Center, Loader } from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import AdminErrorPage from '@/app/admin/error'
import { usePinnedPostListSuspenseQuery, usePostListSuspenseQuery } from '@/entities/announcement'
import { QueryFallbackBoundary } from '@/shared/api'
import { AnnouncementManagementPageView } from './announcement-management-page-view'

export const AnnouncementManagementPageContainer: React.FC = () => (
  <QueryFallbackBoundary
    errorFallback={({ error, resetErrorBoundary }) => (
      <AdminErrorPage error={error} reset={resetErrorBoundary} />
    )}
    loadingFallback={
      <Center>
        <Loader className="mb-48 mt-40" color="var(--mantine-color-placeholder)" />
      </Center>
    }
  >
    <AnnouncementManagementPage />
  </QueryFallbackBoundary>
)

const AnnouncementManagementPage: React.FC = () => {
  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())

  const { data: postList } = usePostListSuspenseQuery(params)
  const { data: pinnedPostList } = usePinnedPostListSuspenseQuery()

  return <AnnouncementManagementPageView postList={postList} pinnedPostList={pinnedPostList} />
}
