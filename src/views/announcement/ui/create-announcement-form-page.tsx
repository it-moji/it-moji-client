'use client'

import { Button, Checkbox, InputLabel, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import {
  type CreatePostBody,
  POST_CATEGORY_LABEL,
  PostCategorySchema,
  createPost,
  createPostWithRevalidate,
} from '@/entities/announcement'
import type { ExceptionInterceptor } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { AdminContainer, AdminTitle, Icon, TextEditor } from '@/shared/ui'

export interface CreateAnnouncementFormPageProps {
  fetcher?: (body: CreatePostBody, onException?: ExceptionInterceptor) => Promise<unknown>
  revalidate?: (body: CreatePostBody) => Promise<unknown>
  onSuccess?: (message: string) => void
  onError?: (message: string) => void
  label?: string
  route?: string
  extraButton?: React.ReactNode
  initialBody?: Partial<CreatePostBody>
}

export const CreateAnnouncementFormPage: React.FC<CreateAnnouncementFormPageProps> = ({
  fetcher = createPost,
  revalidate = createPostWithRevalidate,
  onSuccess = toast.success,
  onError = toast.error,
  label = '작성',
  route = ROUTES.ADMIN.ANNOUNCEMENT.CREATE,
  extraButton,
  initialBody = {},
}) => {
  const { back, push } = useRouter()

  const [isPending, setIsPending] = useState(false)

  const interceptor: ExceptionInterceptor = ({ status }) => {
    if (400 <= status && status < 500) {
      onError('지정된 고정된 공지사항 수를 초과했어요')
    }
  }

  const form = useForm<CreatePostBody>({
    mode: 'uncontrolled',
    initialValues: {
      title: initialBody.title ?? '',
      isPinned: initialBody.isPinned ?? false,
      content: initialBody.content ?? '',
      postCategory: initialBody.postCategory ?? PostCategorySchema.Enum.NOTICE,
    },
    validate: {
      title: (value) => {
        const { data, error } = z
          .string()
          .min(1, '제목은 1자리 이상 입력해주세요')
          .max(100, '제목은 100자 이내로 쓸 수 있어요')
          .safeParse(value)

        return data ? null : error?.issues[0].message
      },
    },
  })

  return (
    <form
      onSubmit={form.onSubmit(async (body) => {
        setIsPending(true)
        await fetcher(body, interceptor)
          .then(() => revalidate(body))
          .then(() => {
            if (window.location.pathname === route) {
              push(ROUTES.ADMIN.ANNOUNCEMENT())
            }

            onSuccess(`공지사항 ${label}에 성공했어요`)
          })
          .catch(() => {
            setIsPending(false)
            onError(`공지사항 ${label}에 실패했어요`)
          })
      })}
    >
      <AdminContainer>
        <AdminTitle>
          <Icon query="fluent-emoji:fountain-pen" className="mr-2 size-5" />
          공지사항 {label}
        </AdminTitle>
        <div className="mb-6 flex items-end space-x-8">
          <Select
            label="유형"
            className="w-32 min-w-32"
            defaultValue={PostCategorySchema.Enum.NOTICE}
            data={PostCategorySchema.options.map((category) => ({
              value: category,
              label: POST_CATEGORY_LABEL[category],
            }))}
            key={form.key('postCategory')}
            {...form.getInputProps('postCategory')}
          />
          <Checkbox
            label="상단 고정"
            classNames={{
              root: 'h-9 flex items-center',
              input: 'cursor-pointer',
              label: 'cursor-pointer select-none',
            }}
            key={form.key('isPinned')}
            {...form.getInputProps('isPinned')}
          />
        </div>
        <TextInput
          label="제목"
          placeholder="제목을 입력해주세요"
          className="mb-8"
          key={form.key('title')}
          {...form.getInputProps('title')}
        />
        <InputLabel>내용</InputLabel>
        <TextEditor
          placeholder="내용을 입력해주세요"
          key={form.key('content')}
          {...form.getInputProps('content')}
        />
        <div className="mt-8 flex items-center justify-end space-x-2">
          <Button variant="light" color="gray" onClick={back} disabled={isPending}>
            취소
          </Button>
          {extraButton}
          <Button type="submit" disabled={isPending}>
            저장
          </Button>
        </div>
      </AdminContainer>
    </form>
  )
}
