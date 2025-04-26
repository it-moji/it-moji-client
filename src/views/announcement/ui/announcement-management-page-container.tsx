'use client'

import { useSearchParams } from 'next/navigation'
import { AnnouncementListErrorFallback } from '@/widgets/announcement-list'
import { usePinnedPostListSuspenseQuery, usePostListSuspenseQuery } from '@/entities/announcement'
import { QueryFallbackBoundary } from '@/shared/api'
import { AnnouncementManagementPageView } from './announcement-management-page-view'

export const AnnouncementManagementPageContainer: React.FC = () => (
  <QueryFallbackBoundary
    errorFallback={({ resetErrorBoundary }) => (
      <AnnouncementListErrorFallback onReset={resetErrorBoundary} />
    )}
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
