import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AnnouncementManagementDetailPageContainer } from '@/views/announcement'
import { getPostDetail } from '@/entities/announcement'
import { AdminContainer } from '@/shared/ui'

interface AnnouncementDetailPageParams {
  postId: string
}

interface AnnouncementDetailPageProps {
  params: Promise<AnnouncementDetailPageParams>
}

export const generateMetadata = async ({
  params,
}: AnnouncementDetailPageProps): Promise<Metadata> => {
  const { postId } = await params
  const id = Number(postId)

  if (Number.isNaN(id)) {
    return {}
  }

  try {
    const post = await getPostDetail(id)

    return {
      title: `[공지사항] ${post.data.title}`,
    }
  } catch {
    return {}
  }
}

const AnnouncementDetailPage: React.FC<AnnouncementDetailPageProps> = async ({ params }) => {
  const { postId } = await params
  const id = Number(postId)

  if (Number.isNaN(id)) {
    notFound()
  }

  return (
    <AdminContainer>
      <AnnouncementManagementDetailPageContainer id={id} />
    </AdminContainer>
  )
}

export default AnnouncementDetailPage
