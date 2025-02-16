import type { Meta, StoryObj } from '@storybook/react'
import { getPinnedPostListEmptyMock, getPostListEmptyMock } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { AnnouncementManagementPage } from './announcement-management-page'

const meta: Meta<typeof AnnouncementManagementPage> = {
  title: '관리자 페이지/공지사항 관리/리스트 뷰',
  component: AnnouncementManagementPage,
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
type Story = StoryObj<typeof AnnouncementManagementPage>

export const 공지사항_없음: Story = {
  render: (args) => <AnnouncementManagementPage {...args} />,
  args: {
    getPostList: () => getPostListEmptyMock({}),
    getPinnedPostList: getPinnedPostListEmptyMock,
  },
}
