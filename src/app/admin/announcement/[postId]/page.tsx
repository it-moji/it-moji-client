import { Button } from '@mantine/core'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DetailView } from '@/widgets/announcement-detail'
import { getPostDetail } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
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

  return (
    <AdminContainer>
      <DetailView post={post.data} />
      <div className="mt-8 flex items-center justify-end">
        <Button href={ROUTES.ADMIN.ANNOUNCEMENT()} title="목록 페이지 이동" component={Link}>
          목록
        </Button>
      </div>
    </AdminContainer>
  )
}

export default AnnouncementDetailPage
