import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AnnouncementManagementDetailPage } from '@/views/announcement'
import { getPostDetail } from '@/entities/announcement'

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
      title: post.data.title,
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

  const post = await getPostDetail(id, ({ status }) => {
    if (status === 404) notFound()
  })

  return <AnnouncementManagementDetailPage post={post.data} />
}

export default AnnouncementDetailPage
