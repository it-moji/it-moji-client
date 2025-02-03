import type { Metadata } from 'next'
import {
  AnnouncementList,
  AnnouncementTable,
  CategoryTabs,
  PageController,
} from '@/widgets/announcement-list'
import { getPostList, PostListParamsSchema } from '@/entities/announcement'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, type SearchParams } from '@/shared/api'
import { createSearchParamsFilter } from '@/shared/lib'
import { Icon } from '@/shared/ui'

export const metadata: Metadata = {
  title: '공지사항 관리',
}

interface AnnouncementManagementPageProps {
  searchParams: Promise<SearchParams>
}

const AnnouncementManagementPage: React.FC<AnnouncementManagementPageProps> = async ({
  searchParams,
}) => {
  const { data } = await getPostList(await searchParams)

  const href = createSearchParamsFilter({
    params: [
      [PostListParamsSchema.Enum.page, data.number, DEFAULT_PAGE],
      [PostListParamsSchema.Enum.size, data.size, DEFAULT_PAGE_SIZE],
      [PostListParamsSchema.Enum.category, data.category],
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
          baseURL={href([PostListParamsSchema.Enum.page, PostListParamsSchema.Enum.category])}
          current={data.category}
        />
      </div>
      <div className="overflow-x-auto pb-3">
        <AnnouncementTable className="min-w-[48rem]">
          <AnnouncementList contents={data.content} />
        </AnnouncementTable>
      </div>
      <div className="mt-2 flex flex-col items-center justify-center md:flex-row md:justify-between">
        <p className="mb-2 px-1 py-2 text-sm md:mb-0">총 {data.totalElements}개의 공지가 있어요</p>
        <PageController
          page={data.number}
          total={data.totalPages}
          baseURL={href([PostListParamsSchema.Enum.page])}
        />
      </div>
    </div>
  )
}

export default AnnouncementManagementPage
