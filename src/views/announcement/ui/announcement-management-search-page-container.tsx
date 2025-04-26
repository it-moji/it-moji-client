'use client'

import { Center, Loader } from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import AdminErrorPage from '@/app/admin/error'
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
    errorFallback={({ error, resetErrorBoundary }) => (
      <AdminErrorPage error={error} reset={resetErrorBoundary} />
    )}
    loadingFallback={
      <Center>
        <Loader className="mb-48 mt-40" color="var(--mantine-color-placeholder)" />
      </Center>
    }
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
