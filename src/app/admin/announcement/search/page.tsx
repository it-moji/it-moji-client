import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { Metadata } from 'next'
import { AnnouncementManagementSearchPageView } from '@/views/announcement'
import { SearchPostParamsSchema, SearchPostTypeSchema } from '@/entities/announcement'
import { type SearchParams } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'

export const metadata: Metadata = {
  title: '공지사항 검색',
}

interface AnnouncementSearchPageProps {
  searchParams: Promise<SearchParams>
}

const AnnouncementSearchPage: React.FC<AnnouncementSearchPageProps> = async ({ searchParams }) => {
  const params = await searchParams

  const query = z.string().safeParse(params[SearchPostParamsSchema.Enum.query])?.data || ''
  const type =
    SearchPostTypeSchema.safeParse(params[SearchPostParamsSchema.Enum.type])?.data ||
    SearchPostTypeSchema.Enum.TITLE

  if (!query) {
    redirect(ROUTES.ADMIN.ANNOUNCEMENT())
  }

  return (
    <AdminContainer>
      <AdminTitle>
        <Icon query="fluent-emoji:magnifying-glass-tilted-left" className="mr-2 size-5" />
        공지사항 검색
      </AdminTitle>
      <AnnouncementManagementSearchPageView defaultQuery={query} defaultType={type} />
    </AdminContainer>
  )
}

export default AnnouncementSearchPage
