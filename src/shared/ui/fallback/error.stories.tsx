import type { Meta, StoryObj } from '@storybook/react'
import { Exception } from '@/shared/api'
import { FallbackError } from './error'

const meta: Meta<typeof FallbackError> = {
  title: '대체 UI/에러 페이지',
  component: FallbackError,
  parameters: {
    nextjs: {
      react: { rsc: false },
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof FallbackError>

export const 기본_상태: Story = {}

export const 공용_예외_처리_클래스: Story = {
  args: {
    error: new Exception('예외 메시지가 여기에 표시돼요'),
  },
}
