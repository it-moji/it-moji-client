import {
  AnnouncementList,
  AnnouncementTable,
  CategoryTabs,
  EmptyList,
  PageController,
} from '@/widgets/announcement-list'
import type { GetPinnedPostListResponse, GetPostListResponse } from '@/entities/announcement'
import { GetPostListParamsSchema } from '@/entities/announcement'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/shared/api'
import { createSearchParamsFilter } from '@/shared/lib'
import { FallbackRender, Icon } from '@/shared/ui'

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
    pathname: '/admin/announcement',
  })

  return (
    <div className="overflow-hidden rounded-lg border border-solid border-gray-300 bg-white p-5 dark:border-dark-400 dark:bg-dark-800">
      <h2 className="mb-8 flex items-center border text-lg font-bold">
        <Icon query="fluent-emoji:pushpin" className="mr-2" />
        공지사항 관리
      </h2>
      <div className="mb-6">
        <CategoryTabs
          baseURL={href([GetPostListParamsSchema.Enum.page, GetPostListParamsSchema.Enum.category])}
          current={data.category}
        />
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
        <PageController
          page={data.number}
          total={data.totalPages}
          baseURL={href([GetPostListParamsSchema.Enum.page])}
        />
      </div>
    </div>
  )
}
