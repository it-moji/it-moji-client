import type { Meta, StoryObj } from '@storybook/react'
import { UnderConstruction } from './under-construction'

const meta: Meta<typeof UnderConstruction> = {
  title: '대체 UI/준비중 페이지',
  component: UnderConstruction,
  parameters: {
    nextjs: {
      react: { rsc: false },
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof UnderConstruction>

export const 기본_상태: Story = {}
