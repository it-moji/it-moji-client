import { expect, fn, userEvent, waitFor, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { PostCategorySchema } from '@/entities/announcement'
import { CreateAnnouncementFormPage } from './create-announcement-form-page'

const meta: Meta<typeof CreateAnnouncementFormPage> = {
  title: '관리자 페이지/공지사항 관리 - 생성 및 수정 폼',
  component: CreateAnnouncementFormPage,
  parameters: {
    nextjs: {
      react: { rsc: false },
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof CreateAnnouncementFormPage>

export const EmptyForm: Story = {
  render: (args) => <CreateAnnouncementFormPage {...args} />,
  args: {
    fetcher: fn(() => new Promise((resolve) => setTimeout(resolve, 100))),
    revalidate: fn(() => Promise.resolve()),
    onSuccess: fn(),
    onFailed: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('유형 선택', async () => {
      const selectEl = canvas.getByLabelText('유형') as HTMLInputElement
      const firstCategory = selectEl.value

      await userEvent.click(selectEl)
      await userEvent.keyboard('{ArrowDown}', { delay: 50 })
      await userEvent.keyboard('{ArrowDown}', { delay: 50 })
      await userEvent.keyboard('{Enter}', { delay: 50 })

      expect(selectEl).not.toBe(firstCategory)
    })

    await step('제목 입력', async () => {
      const titleTestValue = 'Hello World!! 123'
      const titleInputEl = canvas.getByLabelText('제목')

      await userEvent.type(titleInputEl, titleTestValue, { delay: 50 })
      expect(titleInputEl).toHaveValue(titleTestValue)
    })

    await step('공지 여부 입력', async () => {
      const checkboxEl = canvas.getByRole('checkbox') as HTMLInputElement
      const firstValue = checkboxEl.checked

      await userEvent.click(checkboxEl, { delay: 50 })
      await userEvent.click(checkboxEl, { delay: 50 })
      await userEvent.click(checkboxEl, { delay: 50 })

      expect(checkboxEl).not.toBe(firstValue)
    })

    await step('내용 입력', async () => {
      const contentTestValue = 'Hello World!! 321'
      const inputEls = canvas.getAllByRole('textbox')
      const editorEl = inputEls[inputEls.length - 1]

      await userEvent.type(editorEl, contentTestValue, { delay: 50 })
      expect(editorEl).toHaveTextContent(contentTestValue)
    })

    await step('저장', async () => {
      const buttonEl = canvas.getByRole('button', { name: '저장' })

      await userEvent.click(buttonEl)
      await userEvent.click(buttonEl)

      await waitFor(() => expect(args.fetcher).toHaveBeenCalled())
      await waitFor(() => expect(args.revalidate).toHaveBeenCalledOnce())
      expect(args.onSuccess).toHaveBeenCalledOnce()
      expect(args.onFailed).not.toHaveBeenCalledOnce()
    })
  },
}

const filledTitle = 'Hello 123'
const filledContent = 'Hello 321'

export const FilledForm: Story = {
  render: (args) => <CreateAnnouncementFormPage {...args} />,
  args: {
    initialBody: {
      title: filledTitle,
      isPinned: true,
      content: filledContent,
      postCategory: PostCategorySchema.Enum.MAINTENANCE,
    },
    fetcher: fn(() => new Promise((resolve) => setTimeout(resolve, 100))),
    revalidate: fn(() => Promise.resolve()),
    onSuccess: fn(),
    onFailed: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('유형 선택', async () => {
      const selectEl = canvas.getByLabelText('유형') as HTMLInputElement
      const firstCategory = selectEl.value

      await userEvent.click(selectEl)
      await userEvent.keyboard('{ArrowDown}', { delay: 50 })
      await userEvent.keyboard('{ArrowDown}', { delay: 50 })
      await userEvent.keyboard('{Enter}', { delay: 50 })

      expect(selectEl).not.toBe(firstCategory)
    })

    await step('제목 입력', async () => {
      const titleTestValue = 'Hello World!! 123'
      const titleInputEl = canvas.getByLabelText('제목')

      expect(titleInputEl).toHaveValue(filledTitle)
      await userEvent.type(titleInputEl, titleTestValue, { delay: 50 })
      expect(titleInputEl).toHaveValue(`${filledTitle}${titleTestValue}`)
    })

    await step('공지 여부 입력', async () => {
      const checkboxEl = canvas.getByRole('checkbox') as HTMLInputElement
      const firstValue = checkboxEl.checked

      await userEvent.click(checkboxEl, { delay: 50 })
      await userEvent.click(checkboxEl, { delay: 50 })
      await userEvent.click(checkboxEl, { delay: 50 })

      expect(checkboxEl).not.toBe(firstValue)
    })

    await step('내용 입력', async () => {
      const contentTestValue = 'Hello World!! 321'
      const inputEls = canvas.getAllByRole('textbox')
      const editorEl = inputEls[inputEls.length - 1]

      expect(editorEl).toHaveTextContent(filledContent)
      await userEvent.type(editorEl, contentTestValue, { delay: 50 })
      expect(editorEl).toHaveTextContent(`${filledContent}${contentTestValue}`)
    })

    await step('저장', async () => {
      const buttonEl = canvas.getByRole('button', { name: '저장' })

      await userEvent.click(buttonEl)
      await userEvent.click(buttonEl)

      await waitFor(() => expect(args.fetcher).toHaveBeenCalled())
      await waitFor(() => expect(args.revalidate).toHaveBeenCalledOnce())
      expect(args.onSuccess).toHaveBeenCalledOnce()
      expect(args.onFailed).not.toHaveBeenCalledOnce()
    })
  },
}
