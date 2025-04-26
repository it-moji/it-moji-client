'use client'

import { Center, Loader } from '@mantine/core'
import AdminErrorPage from '@/app/admin/error'
import { usePostDetailSuspenseQuery, type PostDetail } from '@/entities/announcement'
import { QueryFallbackBoundary } from '@/shared/api'
import { AnnouncementManagementDetailPageView } from './announcement-management-detail-page-view'

export interface AnnouncementManagementDetailPageContainerProps {
  id: PostDetail['id']
}

export const AnnouncementManagementDetailPageContainer: React.FC<
  AnnouncementManagementDetailPageContainerProps
> = ({ id }) => (
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
    <AnnouncementManagementDetailPage id={id} />
  </QueryFallbackBoundary>
)

export interface AnnouncementManagementDetailPageContainerProps {
  id: PostDetail['id']
}

const AnnouncementManagementDetailPage: React.FC<
  AnnouncementManagementDetailPageContainerProps
> = ({ id }) => {
  const { data: post } = usePostDetailSuspenseQuery(id)

  return <AnnouncementManagementDetailPageView post={post} />
}
