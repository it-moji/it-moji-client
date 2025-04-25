'use client'

import toast from 'react-hot-toast'
import { DeleteButton } from '@/widgets/announcement-list'
import { usePostDetailSuspenseQuery } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { useRouter } from '@/shared/lib'
import {
  type CreateAnnouncementFormPageProps,
  CreateAnnouncementFormPage,
} from './create-announcement-form-page'

export interface ModifyAnnouncementFormPageProps extends CreateAnnouncementFormPageProps {
  id: number
}

export const ModifyAnnouncementFormPage: React.FC<ModifyAnnouncementFormPageProps> = ({
  id,
  ...props
}) => {
  const { replace } = useRouter()

  const { data: initialBody } = usePostDetailSuspenseQuery(id)

  return (
    <CreateAnnouncementFormPage
      type="MODIFY"
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
      id={id}
      {...props}
    />
  )
}
