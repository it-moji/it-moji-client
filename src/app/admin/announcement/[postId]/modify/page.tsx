import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ModifyAnnouncementFormPage } from '@/views/announcement'
import { getPostDetail } from '@/entities/announcement'

interface AnnouncementModifyPageParams {
  postId: string
}

interface AnnouncementModifyPageProps {
  params: Promise<AnnouncementModifyPageParams>
}

export const generateMetadata = async ({
  params,
}: AnnouncementModifyPageProps): Promise<Metadata> => {
  const { postId } = await params
  const id = Number(postId)

  if (Number.isNaN(id)) {
    return {}
  }

  try {
    const post = await getPostDetail(id)

    return {
      title: `[공지사항 수정] ${post.data.title}`,
    }
  } catch {
    return {}
  }
}

const AnnouncementModifyPage: React.FC<AnnouncementModifyPageProps> = async ({ params }) => {
  const { postId } = await params
  const id = Number(postId)

  if (Number.isNaN(id)) {
    notFound()
  }

  return <ModifyAnnouncementFormPage id={id} />
}

export default AnnouncementModifyPage
