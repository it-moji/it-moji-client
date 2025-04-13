import type { Meta, StoryObj } from '@storybook/react'
import { searchPostEmptyMock } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { AnnouncementManagementSearchPage } from './announcement-management-search-page'

const meta: Meta<typeof AnnouncementManagementSearchPage> = {
  title: '관리자 페이지/공지사항 관리/검색',
  component: AnnouncementManagementSearchPage,
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
type Story = StoryObj<typeof AnnouncementManagementSearchPage>

export const 검색결과_없음: Story = {
  render: (args) => <AnnouncementManagementSearchPage {...args} />,
  args: {
    searchPost: () => searchPostEmptyMock({}),
  },
}
