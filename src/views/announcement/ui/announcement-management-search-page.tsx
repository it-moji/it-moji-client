'use client'

import { useSearchParams } from 'next/navigation'
import {
  AnnouncementList,
  AnnouncementTable,
  EmptyList,
  PageController,
  SearchInput,
} from '@/widgets/announcement-list'
import type { SearchPostType } from '@/entities/announcement'
import { SearchPostParamsSchema, useSearchPostSuspenseQuery } from '@/entities/announcement'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { createSearchParamsFilter } from '@/shared/lib'
import { FallbackRender } from '@/shared/ui'

export interface AnnouncementManagementSearchPageProps {
  defaultQuery: string
  defaultType: SearchPostType
}

export const AnnouncementManagementSearchPage: React.FC<AnnouncementManagementSearchPageProps> = ({
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

  const isEmpty = data.content.length < 1

  const href = createSearchParamsFilter({
    params: [
      [SearchPostParamsSchema.Enum.query, defaultQuery],
      [SearchPostParamsSchema.Enum.type, defaultType],
      [SearchPostParamsSchema.Enum.page, data.number, DEFAULT_PAGE],
      [SearchPostParamsSchema.Enum.size, data.size, DEFAULT_PAGE_SIZE],
    ],
    pathname: ROUTES.ADMIN.ANNOUNCEMENT.SEARCH(),
  })

  return (
    <>
      <div className="mb-6 flex items-center justify-end">
        <SearchInput defaultQuery={defaultQuery} defaultType={defaultType} />
      </div>
      <div className="overflow-x-auto pb-3">
        <AnnouncementTable className="min-w-[48rem]">
          <FallbackRender
            render={isEmpty}
            component={<EmptyList comment="검색 결과가 없어요 ㅠ" />}
          >
            <AnnouncementList contents={data.content} />
          </FallbackRender>
        </AnnouncementTable>
      </div>
      {!isEmpty && (
        <div className="mt-2 flex flex-col items-center justify-center md:flex-row md:justify-between">
          <p className="mb-2 px-1 py-2 text-sm md:mb-0">
            총 {data.totalElements}개의 검색결과가 있어요
          </p>
          <PageController
            page={data.number}
            total={data.totalPages}
            baseURL={href([SearchPostParamsSchema.Enum.page])}
          />
        </div>
      )}
    </>
  )
}
