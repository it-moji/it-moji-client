'use client'

import { Button, Checkbox, InputLabel, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import type { PostDetail } from '@/entities/announcement'
import {
  type PostBody,
  POST_CATEGORY_LABEL,
  PostCategorySchema,
  useCreatePost,
  useIsPostMutating,
  useModifyPost,
} from '@/entities/announcement'
import { Exception } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { useRouter } from '@/shared/lib'
import { AdminContainer, AdminTitle, Icon, TextEditor } from '@/shared/ui'

export interface CreateAnnouncementFormPageProps {
  onSuccess?: (message: string) => void
  onFailed?: (message: string | null) => void
  onCancel?: () => void
  label?: string
  extraButton?: React.FC
  initialBody?: Partial<PostBody>
  id?: PostDetail['id']
  type?: 'CREATE' | 'MODIFY'
}

const initialValues: PostBody = {
  title: '',
  isPinned: false,
  content: '',
  postCategory: PostCategorySchema.Enum.NOTICE,
}

export const CreateAnnouncementFormPage: React.FC<CreateAnnouncementFormPageProps> = ({
  onSuccess = toast.success,
  onFailed = toast.error,
  onCancel,
  label = '작성',
  extraButton: ExtraButton,
  initialBody,
  id,
  type = 'CREATE',
}) => {
  const { back, push, on, off } = useRouter()

  const isPending = useIsPostMutating()

  const mutationParams = {
    onSuccess: () => {
      if (location.pathname === ROUTES.ADMIN.ANNOUNCEMENT.CREATE()) {
        push(ROUTES.ADMIN.ANNOUNCEMENT())
      }

      form.setValues(initialValues)
      onSuccess(`공지사항 ${label}에 성공했어요`)
    },
    onException: (exception: Exception) => {
      off()
      onFailed(Exception.extractMessage(exception))
    },
    onError: () => {
      off()
      onFailed(`예기치 못한 이유로 공지사항 ${label}에 실패했어요`)
    },
  }

  const { mutate: createPost } = useCreatePost(mutationParams)
  const { mutate: modifyPost } = useModifyPost(mutationParams)

  const form = useForm<PostBody>({
    mode: 'uncontrolled',
    initialValues: { ...initialValues, ...initialBody },
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

  const inputProps = form.getInputProps('isPinned')

  return (
    <form
      onSubmit={form.onSubmit(async (body) => {
        on()

        if (type === 'CREATE') {
          createPost(body)
          return
        }

        if (id) {
          modifyPost({ id, body })
        }
      })}
    >
      <AdminContainer>
        <AdminTitle>
          <Icon query="fluent-emoji:fountain-pen" className="mr-2 size-5" />
          공지사항 {label}
        </AdminTitle>
        <div className="mb-6 flex flex-wrap items-end gap-x-8 gap-y-3">
          <Select
            label="유형"
            className="w-32 min-w-32"
            defaultValue={PostCategorySchema.Enum.NOTICE}
            data={PostCategorySchema.options.map((category) => ({
              value: category,
              label: POST_CATEGORY_LABEL[category],
            }))}
            checkIconPosition="right"
            key={form.key('postCategory')}
            {...form.getInputProps('postCategory')}
          />
          <Checkbox
            label="상단 고정"
            classNames={{
              root: 'h-9 flex items-center',
              input: 'cursor-pointer',
              label: 'cursor-pointer select-none whitespace-nowrap',
            }}
            defaultChecked={inputProps.defaultValue}
            key={form.key('isPinned')}
            {...inputProps}
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
          <Button variant="light" color="gray" onClick={onCancel ?? back} disabled={isPending}>
            취소
          </Button>
          {ExtraButton && <ExtraButton />}
          <Button type="submit" disabled={isPending}>
            저장
          </Button>
        </div>
      </AdminContainer>
    </form>
  )
}
