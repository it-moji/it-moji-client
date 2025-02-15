import type { Meta, StoryObj } from '@storybook/react'
import { NotFound } from './not-found'

const meta: Meta<typeof NotFound> = {
  title: '대체 UI/404 페이지',
  component: NotFound,
  parameters: {
    nextjs: {
      react: { rsc: false },
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof NotFound>

export const 기본_상태: Story = {}
