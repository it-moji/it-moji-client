'use client'

import { Center, Loader } from '@mantine/core'
import { AnnouncementDetailErrorFallback } from '@/widgets/announcement-detail'
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
    errorFallback={({ resetErrorBoundary }) => (
      <AnnouncementDetailErrorFallback onReset={resetErrorBoundary} />
    )}
    loadingFallback={
      <Center>
        <Loader className="pb-48 pt-36" color="var(--mantine-color-placeholder)" />
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
