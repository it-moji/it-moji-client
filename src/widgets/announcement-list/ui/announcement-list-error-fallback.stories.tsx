import type { Meta, StoryObj } from '@storybook/react'
import { ROUTES } from '@/shared/config'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'
import { AnnouncementListErrorFallback } from './announcement-list-error-fallback'

const meta: Meta<typeof AnnouncementListErrorFallback> = {
  title: '관리자 페이지/공지사항 관리/리스트 뷰',
  component: AnnouncementListErrorFallback,
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: ROUTES.ADMIN.ANNOUNCEMENT(),
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AnnouncementListErrorFallback>

export const 공지사항_에러: Story = {
  render: (args) => (
    <AdminContainer className="overflow-hidden">
      <AdminTitle>
        <Icon query="fluent-emoji:pushpin" className="mr-2" />
        공지사항 관리
      </AdminTitle>
      <AnnouncementListErrorFallback {...args} />
    </AdminContainer>
  ),
}
