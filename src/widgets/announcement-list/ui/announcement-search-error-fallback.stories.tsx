import type { Meta, StoryObj } from '@storybook/react'
import { ROUTES } from '@/shared/config'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'
import { AnnouncementSearchErrorFallback } from './announcement-search-error-fallback'

const meta: Meta<typeof AnnouncementSearchErrorFallback> = {
  title: '관리자 페이지/공지사항 관리/검색',
  component: AnnouncementSearchErrorFallback,
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: ROUTES.ADMIN.ANNOUNCEMENT.SEARCH(),
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AnnouncementSearchErrorFallback>

export const 검색_에러: Story = {
  render: (args) => (
    <AdminContainer>
      <AdminTitle>
        <Icon query="fluent-emoji:magnifying-glass-tilted-left" className="mr-2 size-5" />
        공지사항 검색
      </AdminTitle>
      <AnnouncementSearchErrorFallback {...args} />
    </AdminContainer>
  ),
}
