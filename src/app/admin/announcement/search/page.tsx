import { z } from 'zod'
import type { Metadata } from 'next'
import { AnnouncementManagementSearchPage } from '@/views/announcement'
import { searchPost, SearchPostParamsSchema, SearchPostTypeSchema } from '@/entities/announcement'
import { type SearchParams } from '@/shared/api'

export const metadata: Metadata = {
  title: '공지사항 검색',
}

interface AnnouncementSearchPageProps {
  searchParams: Promise<SearchParams>
}

const AnnouncementSearchPage: React.FC<AnnouncementSearchPageProps> = async ({ searchParams }) => {
  const params = await searchParams

  const query = z.string().safeParse(params[SearchPostParamsSchema.Enum.q])?.data || ''
  const type =
    SearchPostTypeSchema.safeParse(params[SearchPostParamsSchema.Enum.type])?.data ||
    SearchPostTypeSchema.Enum.TITLE

  return (
    <AnnouncementManagementSearchPage
      defaultQuery={query}
      searchPost={() => searchPost({ query, type, params })}
    />
  )
}

export default AnnouncementSearchPage
