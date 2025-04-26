import type { Meta, StoryObj } from '@storybook/react'
import { SearchPostTypeSchema } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'
import { AnnouncementManagementSearchPageView } from './announcement-management-search-page-view'

const meta: Meta<typeof AnnouncementManagementSearchPageView> = {
  title: '관리자 페이지/공지사항 관리/검색',
  component: AnnouncementManagementSearchPageView,
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
type Story = StoryObj<typeof AnnouncementManagementSearchPageView>

export const 검색결과_없음: Story = {
  render: (args) => (
    <AdminContainer>
      <AdminTitle>
        <Icon query="fluent-emoji:magnifying-glass-tilted-left" className="mr-2 size-5" />
        공지사항 검색
      </AdminTitle>
      <AnnouncementManagementSearchPageView {...args} />
    </AdminContainer>
  ),
  args: {
    defaultQuery: '',
    defaultType: SearchPostTypeSchema.Enum.TITLE,
    data: {
      number: 1,
      size: 10,
      totalElements: 0,
      totalPages: 1,
      first: true,
      last: true,
      content: [],
    },
  },
}
