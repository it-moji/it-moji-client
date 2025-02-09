'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DeleteButton } from '@/widgets/announcement-list'
import { modifyPost, modifyPostWithRevalidate } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import {
  type CreateAnnouncementFormPageProps,
  CreateAnnouncementFormPage,
} from './create-announcement-form-page'

export interface ModifyAnnouncementFormPageProps extends CreateAnnouncementFormPageProps {
  id: number
}

export const ModifyAnnouncementFormPage: React.FC<ModifyAnnouncementFormPageProps> = ({
  id,
  initialBody = {},
  ...props
}) => {
  const { replace } = useRouter()

  return (
    <CreateAnnouncementFormPage
      label="수정"
      fetcher={(body, onException) => modifyPost({ id, body, onException })}
      revalidate={(body) => modifyPostWithRevalidate(id, body)}
      initialBody={initialBody}
      route={ROUTES.ADMIN.ANNOUNCEMENT.MODIFY(id)}
      extraButton={
        <DeleteButton
          id={id}
          onSuccess={(message) => {
            replace(ROUTES.ADMIN.ANNOUNCEMENT())
            toast.success(message)
          }}
        />
      }
      onSuccess={(message) => {
        replace(ROUTES.ADMIN.ANNOUNCEMENT.DETAIL(id))
        toast.success(message)
      }}
      {...props}
    />
  )
}
