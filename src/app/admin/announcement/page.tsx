import type { Metadata } from 'next'
import { AnnouncementManagementPage } from '@/views/announcement'
import { getPinnedPostList, getPostList } from '@/entities/announcement'
import { type SearchParams } from '@/shared/api'

export const metadata: Metadata = {
  title: '공지사항 관리',
}

interface AnnouncementPageProps {
  searchParams: Promise<SearchParams>
}

const AnnouncementPage: React.FC<AnnouncementPageProps> = async ({ searchParams }) => {
  const params = await searchParams

  return (
    <AnnouncementManagementPage
      getPostList={() => getPostList(params)}
      getPinnedPostList={getPinnedPostList}
    />
  )
}

export default AnnouncementPage
