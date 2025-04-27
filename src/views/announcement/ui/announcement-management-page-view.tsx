'use client'

import { Button } from '@mantine/core'
import {
  AnnouncementList,
  AnnouncementTable,
  CategoryTabs,
  EmptyList,
  PageController,
  SearchInput,
} from '@/widgets/announcement-list'
import type { GetPostListResponse, GetPinnedPostListResponse } from '@/entities/announcement'
import { GetPostListParamsSchema } from '@/entities/announcement'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { createSearchParamsFilter } from '@/shared/lib'
import { FallbackRender, LinkWithLoader } from '@/shared/ui'

export interface AnnouncementManagementPageViewProps {
  postList: GetPostListResponse['data']
  pinnedPostList: GetPinnedPostListResponse['data']
}

export const AnnouncementManagementPageView: React.FC<AnnouncementManagementPageViewProps> = ({
  postList,
  pinnedPostList,
}) => {
  const isEmpty = postList.content.length < 1 && pinnedPostList.length < 1

  const href = createSearchParamsFilter({
    params: [
      [GetPostListParamsSchema.Enum.page, postList.number, DEFAULT_PAGE],
      [GetPostListParamsSchema.Enum.size, postList.size, DEFAULT_PAGE_SIZE],
      [GetPostListParamsSchema.Enum.category, postList.category],
    ],
    pathname: ROUTES.ADMIN.ANNOUNCEMENT(),
  })

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <CategoryTabs
          baseURL={href([GetPostListParamsSchema.Enum.page, GetPostListParamsSchema.Enum.category])}
          current={postList.category}
        />
        <SearchInput />
      </div>
      <div className="overflow-x-auto pb-3">
        <AnnouncementTable className="min-w-[48rem]">
          <FallbackRender render={isEmpty} component={<EmptyList />}>
            <AnnouncementList contents={pinnedPostList} pinned />
            <AnnouncementList contents={postList.content} />
          </FallbackRender>
        </AnnouncementTable>
      </div>
      <div className="mt-2 flex flex-col items-center justify-center md:flex-row md:justify-between">
        <p className="mb-2 px-1 py-2 text-sm md:mb-0">
          총 {postList.totalElements + pinnedPostList.length}개의 공지가 있어요
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-8">
          {!isEmpty && (
            <PageController
              page={postList.number}
              total={postList.totalPages}
              baseURL={href([GetPostListParamsSchema.Enum.page])}
            />
          )}
          <Button
            component={LinkWithLoader}
            href={ROUTES.ADMIN.ANNOUNCEMENT.CREATE()}
            title="공지사항 작성 페이지 이동"
          >
            글쓰기
          </Button>
        </div>
      </div>
    </>
  )
}
