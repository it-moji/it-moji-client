import type { Meta, StoryObj } from '@storybook/react'
import { ROUTES } from '@/shared/config'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'
import { AnnouncementManagementPageView } from './announcement-management-page-view'

const meta: Meta<typeof AnnouncementManagementPageView> = {
  title: '관리자 페이지/공지사항 관리/리스트 뷰',
  component: AnnouncementManagementPageView,
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
type Story = StoryObj<typeof AnnouncementManagementPageView>

export const 공지사항_없음: Story = {
  render: (args) => (
    <AdminContainer className="overflow-hidden">
      <AdminTitle>
        <Icon query="fluent-emoji:pushpin" className="mr-2" />
        공지사항 관리
      </AdminTitle>
      <AnnouncementManagementPageView {...args} />
    </AdminContainer>
  ),
  args: {
    postList: {
      number: 1,
      size: 10,
      totalElements: 0,
      totalPages: 1,
      first: true,
      last: true,
      content: [],
      category: null,
    },
    pinnedPostList: [],
  },
}
