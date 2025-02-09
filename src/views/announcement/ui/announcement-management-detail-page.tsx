'use client'

import { Button } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DetailView } from '@/widgets/announcement-detail'
import { DeleteButton } from '@/widgets/announcement-list'
import type { PostDetail } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { AdminContainer } from '@/shared/ui'

export interface AnnouncementManagementDetailPageProps {
  post: PostDetail
}

export const AnnouncementManagementDetailPage: React.FC<AnnouncementManagementDetailPageProps> = ({
  post,
}) => {
  const { replace } = useRouter()

  return (
    <AdminContainer>
      <DetailView post={post} />
      <div className="mt-8 flex items-center justify-end space-x-2">
        <DeleteButton
          id={post.id}
          onSuccess={(message) => {
            replace(ROUTES.ADMIN.ANNOUNCEMENT())
            toast.success(message)
          }}
        />
        <Button href={ROUTES.ADMIN.ANNOUNCEMENT()} title="목록 페이지 이동" component={Link}>
          목록
        </Button>
      </div>
    </AdminContainer>
  )
}
