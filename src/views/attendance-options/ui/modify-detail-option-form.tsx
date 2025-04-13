import { ActionIcon, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useModifyDetailOption } from '@/entities/attendance-option'
import { Exception } from '@/shared/api'
import { Icon } from '@/shared/ui'
import { isValidDetailOptionName } from './create-detail-option-form-dialog'
import { type DetailOptionItemProps } from './detail-option-item'

export interface ModifyDetailOptionFormProps extends DetailOptionItemProps {
  onCancel: () => void
}

export const ModifyDetailOptionForm: React.FC<ModifyDetailOptionFormProps> = ({
  optionKey,
  id,
  name,
  onCancel,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name },
    validate: { name: isValidDetailOptionName },
  })

  const { mutate: update, isPending } = useModifyDetailOption({
    optionKey,
    detailOptionId: id,
    onSuccess: () => {
      toast.success('상세 옵션 수정에 성공했어요!')
      onCancel()
    },
    onException: (exception) => toast.error(Exception.extractMessage(exception)),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 상세 옵션 수정에 실패했어요')
    },
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <form
      className="flex items-start space-x-1.5"
      onSubmit={form.onSubmit(({ name }) => {
        update({ name })
      })}
    >
      <TextInput
        key={form.key('name')}
        ref={inputRef}
        placeholder="변경할 상세 옵션 이름을 입력해주세요"
        type="text"
        autoComplete="off"
        classNames={{ root: 'flex-1', error: 'px-1 mt-2' }}
        {...form.getInputProps('name')}
      />
      <ActionIcon
        type="submit"
        title="저장하기"
        variant="light"
        size="input-sm"
        disabled={isPending}
      >
        <Icon query="fluent:checkmark-16-regular" />
      </ActionIcon>
      <ActionIcon
        title="취소하기"
        variant="light"
        color="gray"
        size="input-sm"
        onClick={onCancel}
        disabled={isPending}
      >
        <Icon query="fluent:dismiss-16-regular" />
      </ActionIcon>
    </form>
  )
}
