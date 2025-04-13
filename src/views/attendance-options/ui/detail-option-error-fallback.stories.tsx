import type { Meta, StoryObj } from '@storybook/react'
import { DetailOptionListErrorFallback } from './detail-option-fallback-ui'

const meta: Meta<typeof DetailOptionListErrorFallback> = {
  title: '관리자 페이지/출석 관리/출석 옵션 설정/상세 옵션 대체 UI - 에러',
  component: DetailOptionListErrorFallback,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof DetailOptionListErrorFallback>

export const 기본_상태: Story = {
  render: (arg) => (
    <div className="my-4 flex min-h-64 border-x-0 border-y border-solid border-gray-300 py-3 dark:border-dark-400">
      <DetailOptionListErrorFallback {...arg} />
    </div>
  ),
}
