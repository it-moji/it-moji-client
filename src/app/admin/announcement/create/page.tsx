'use client'

import { CreateAnnouncementFormPage } from '@/views/announcement'
import { useCreatePost } from '@/entities/announcement'

const AnnouncementFormPage: React.FC = () => {
  const mutation = useCreatePost({})

  return <CreateAnnouncementFormPage mutation={mutation} />
}

export default AnnouncementFormPage
