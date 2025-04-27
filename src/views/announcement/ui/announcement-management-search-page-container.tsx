'use client'

import { useSearchParams } from 'next/navigation'
import { AnnouncementSearchErrorFallback } from '@/widgets/announcement-list'
import type { SearchPostType } from '@/entities/announcement'
import { useSearchPostSuspenseQuery } from '@/entities/announcement'
import { QueryFallbackBoundary } from '@/shared/api'
import { AnnouncementManagementSearchPageView } from './announcement-management-search-page-view'

export interface AnnouncementManagementSearchPageContainerProps {
  defaultQuery: string
  defaultType: SearchPostType
}

export const AnnouncementManagementSearchPageContainer: React.FC<
  AnnouncementManagementSearchPageContainerProps
> = ({ defaultQuery, defaultType }) => (
  <QueryFallbackBoundary
    errorFallback={({ resetErrorBoundary }) => (
      <AnnouncementSearchErrorFallback onReset={resetErrorBoundary} />
    )}
  >
    <AnnouncementManagementSearchPage defaultQuery={defaultQuery} defaultType={defaultType} />
  </QueryFallbackBoundary>
)

export interface AnnouncementManagementSearchPageProps {
  defaultQuery: string
  defaultType: SearchPostType
}

const AnnouncementManagementSearchPage: React.FC<AnnouncementManagementSearchPageProps> = ({
  defaultQuery,
  defaultType,
}) => {
  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())

  const { data } = useSearchPostSuspenseQuery({
    query: defaultQuery,
    type: defaultType,
    params: params,
  })

  return (
    <AnnouncementManagementSearchPageView
      defaultQuery={defaultQuery}
      defaultType={defaultType}
      data={data}
    />
  )
}
