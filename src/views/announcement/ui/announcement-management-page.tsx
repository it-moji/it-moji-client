import { Button } from '@mantine/core'
import {
  AnnouncementList,
  AnnouncementTable,
  CategoryTabs,
  EmptyList,
  PageController,
  SearchInput,
} from '@/widgets/announcement-list'
import type { GetPinnedPostListResponse, GetPostListResponse } from '@/entities/announcement'
import { GetPostListParamsSchema } from '@/entities/announcement'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { createSearchParamsFilter } from '@/shared/lib'
import { AdminContainer, AdminTitle, FallbackRender, Icon, LinkWithLoader } from '@/shared/ui'

export interface AnnouncementManagementPageProps {
  getPostList: () => Promise<GetPostListResponse>
  getPinnedPostList: () => Promise<GetPinnedPostListResponse>
}

export const AnnouncementManagementPage: React.FC<AnnouncementManagementPageProps> = async ({
  getPostList,
  getPinnedPostList,
}) => {
  const [{ data }, pinned] = await Promise.all([getPostList(), getPinnedPostList()])

  const isEmpty = data.content.length < 1 && pinned.data.length < 1

  const href = createSearchParamsFilter({
    params: [
      [GetPostListParamsSchema.Enum.page, data.number, DEFAULT_PAGE],
      [GetPostListParamsSchema.Enum.size, data.size, DEFAULT_PAGE_SIZE],
      [GetPostListParamsSchema.Enum.category, data.category],
    ],
    pathname: ROUTES.ADMIN.ANNOUNCEMENT(),
  })

  return (
    <AdminContainer className="overflow-hidden">
      <AdminTitle>
        <Icon query="fluent-emoji:pushpin" className="mr-2" />
        공지사항 관리
      </AdminTitle>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <CategoryTabs
          baseURL={href([GetPostListParamsSchema.Enum.page, GetPostListParamsSchema.Enum.category])}
          current={data.category}
        />
        <SearchInput />
      </div>
      <div className="overflow-x-auto pb-3">
        <AnnouncementTable className="min-w-[48rem]">
          <FallbackRender render={isEmpty} component={<EmptyList />}>
            <AnnouncementList contents={pinned.data} pinned />
            <AnnouncementList contents={data.content} />
          </FallbackRender>
        </AnnouncementTable>
      </div>
      <div className="mt-2 flex flex-col items-center justify-center md:flex-row md:justify-between">
        <p className="mb-2 px-1 py-2 text-sm md:mb-0">
          총 {data.totalElements + pinned.data.length}개의 공지가 있어요
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-8">
          {!isEmpty && (
            <PageController
              page={data.number}
              total={data.totalPages}
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
    </AdminContainer>
  )
}
