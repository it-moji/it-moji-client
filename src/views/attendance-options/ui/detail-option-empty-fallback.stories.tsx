import type { Meta, StoryObj } from '@storybook/react'
import { DetailOptionListEmptyFallback } from './detail-option-fallback-ui'

const meta: Meta<typeof DetailOptionListEmptyFallback> = {
  title: '관리자 페이지/출석 관리/출석 옵션 설정/상세 옵션 대체 UI - 빈값',
  component: DetailOptionListEmptyFallback,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof DetailOptionListEmptyFallback>

export const 기본_상태: Story = {
  render: (arg) => (
    <div className="my-4 flex min-h-64 border-x-0 border-y border-solid border-gray-300 py-3 dark:border-dark-400">
      <DetailOptionListEmptyFallback {...arg} />
    </div>
  ),
}
