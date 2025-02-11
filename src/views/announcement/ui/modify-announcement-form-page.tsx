'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DeleteButton } from '@/widgets/announcement-list'
import { modifyPost, modifyPostWithRevalidate } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { useLoaderSwitch } from '@/shared/lib'
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
  const { on } = useLoaderSwitch()
  const { replace } = useRouter()

  return (
    <CreateAnnouncementFormPage
      label="수정"
      fetcher={(body, onException) => modifyPost({ id, body, onException })}
      revalidate={(body) => modifyPostWithRevalidate(id, body)}
      extraButton={({ isPending, setIsPending }) => (
        <DeleteButton
          id={id}
          onStart={() => setIsPending(true)}
          onSuccess={(message) => {
            on()
            replace(ROUTES.ADMIN.ANNOUNCEMENT())
            toast.success(message)
          }}
          onFailed={(message) => {
            setIsPending(false)
            toast.error(message)
          }}
          disabled={isPending}
        />
      )}
      onSuccess={(message) => {
        on()
        replace(ROUTES.ADMIN.ANNOUNCEMENT.DETAIL(id))
        toast.success(message)
      }}
      {...props}
    />
  )
}
