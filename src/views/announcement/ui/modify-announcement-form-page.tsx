'use client'

import toast from 'react-hot-toast'
import type { CreateAnnouncementFormPageProps } from './create-announcement-form-page'
import { DeleteButton } from '@/widgets/announcement-list'
import { useModifyPost, usePostDetailSuspenseQuery } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { useRouter } from '@/shared/lib'
import { CreateAnnouncementFormPage } from './create-announcement-form-page'

export interface ModifyAnnouncementFormPageProps
  extends Omit<CreateAnnouncementFormPageProps, 'mutation'> {
  id: number
}

export const ModifyAnnouncementFormPage: React.FC<ModifyAnnouncementFormPageProps> = ({
  id,
  ...props
}) => {
  const { replace } = useRouter()

  const { data: initialBody } = usePostDetailSuspenseQuery(id)

  const mutation = useModifyPost({ id })

  return (
    <CreateAnnouncementFormPage
      mutation={mutation}
      label="수정"
      extraButton={() => (
        <DeleteButton
          id={id}
          onSuccess={(message) => {
            replace(ROUTES.ADMIN.ANNOUNCEMENT())
            toast.success(message)
          }}
          onFailed={(message) => {
            toast.error(message)
          }}
        />
      )}
      onSuccess={(message) => {
        replace(ROUTES.ADMIN.ANNOUNCEMENT.DETAIL(id))
        toast.success(message)
      }}
      initialBody={initialBody}
      {...props}
    />
  )
}
