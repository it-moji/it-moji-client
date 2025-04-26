import type { Meta, StoryObj } from '@storybook/react'
import { ROUTES } from '@/shared/config'
import { AdminContainer } from '@/shared/ui'
import { AnnouncementDetailErrorFallback } from './detail-view-error-fallback'

const meta: Meta<typeof AnnouncementDetailErrorFallback> = {
  title: '관리자 페이지/공지사항 관리/디테일 뷰',
  component: AnnouncementDetailErrorFallback,
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: ROUTES.ADMIN.ANNOUNCEMENT.DETAIL(1),
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AnnouncementDetailErrorFallback>

export const 공지사항_상세_에러: Story = {
  render: (args) => (
    <AdminContainer>
      <AnnouncementDetailErrorFallback {...args} />
    </AdminContainer>
  ),
}
