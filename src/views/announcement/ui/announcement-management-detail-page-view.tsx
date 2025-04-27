'use client'

import { Button } from '@mantine/core'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { DetailView } from '@/widgets/announcement-detail'
import { DeleteButton } from '@/widgets/announcement-list'
import { useIsPostMutating, type PostDetail } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { useRouter } from '@/shared/lib'
import { LinkWithLoader } from '@/shared/ui'
import { ModifyAnnouncementFormPage } from './modify-announcement-form-page'

export interface AnnouncementManagementDetailPageViewProps {
  post: PostDetail
}

export const AnnouncementManagementDetailPageView: React.FC<
  AnnouncementManagementDetailPageViewProps
> = ({ post }) => {
  const { replace, off } = useRouter()

  const isPostMutating = useIsPostMutating()

  const [isModifyMode, setIsModifyMode] = useState(false)

  if (isModifyMode) {
    return (
      <ModifyAnnouncementFormPage
        id={post.id}
        initialBody={post}
        onSuccess={(message) => {
          off()
          setIsModifyMode(false)
          toast.success(message)
        }}
        onCancel={() => setIsModifyMode(false)}
      />
    )
  }

  return (
    <>
      <DetailView post={post} />
      <div className="mt-8 flex items-center justify-end space-x-2">
        <Button
          variant="light"
          color="gray"
          disabled={isPostMutating}
          onClick={() => setIsModifyMode(true)}
        >
          수정
        </Button>
        <DeleteButton
          id={post.id}
          onSuccess={(message) => {
            replace(ROUTES.ADMIN.ANNOUNCEMENT())
            toast.success(message)
          }}
          onFailed={(message) => {
            toast.error(message)
          }}
        />
        <Button
          href={ROUTES.ADMIN.ANNOUNCEMENT()}
          title="목록 페이지 이동"
          component={LinkWithLoader}
          disabled={isPostMutating}
        >
          목록
        </Button>
      </div>
    </>
  )
}
