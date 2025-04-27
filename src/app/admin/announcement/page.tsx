import type { Metadata } from 'next'
import { AnnouncementManagementPageContainer } from '@/views/announcement'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'

export const metadata: Metadata = {
  title: '공지사항 관리',
}

const AnnouncementPage: React.FC = async () => {
  return (
    <AdminContainer className="overflow-hidden">
      <AdminTitle>
        <Icon query="fluent-emoji:pushpin" className="mr-2" />
        공지사항 관리
      </AdminTitle>
      <AnnouncementManagementPageContainer />
    </AdminContainer>
  )
}

export default AnnouncementPage
