'use client'

import { Button, Divider, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import toast from 'react-hot-toast'
import {
  type AttendanceOptionKey,
  useCreateDetailOption,
  useIsDetailOptionMutating,
  ATTENDANCE_OPTIONS_LABEL,
} from '@/entities/attendance-option'

export interface CreateDetailOptionFormProps {
  optionKey: AttendanceOptionKey
}

export const isValidDetailOptionName = (value: string) =>
  value.length > 1 ? undefined : '최소 2글자 이상 입력해주세요'

export const CreateDetailOptionForm: React.FC<CreateDetailOptionFormProps> = ({ optionKey }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '' },
    validate: { name: isValidDetailOptionName },
  })

  const { mutate: create, isPending } = useCreateDetailOption({
    optionKey,
    onSuccess: () => {
      toast.success('상세 옵션 생성에 성공했어요!')
      modals.closeAll()
    },
    onException: (exception) => toast.error(exception.message),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 상세 옵션 생성에 실패했어요')
    },
  })

  return (
    <form
      onSubmit={form.onSubmit(({ name }) => {
        create({ name })
      })}
    >
      <TextInput
        key={form.key('name')}
        placeholder="추가할 상세 옵션 이름을 입력해주세요"
        type="text"
        autoComplete="off"
        classNames={{ error: 'px-1 mt-2' }}
        data-autofocus
        {...form.getInputProps('name')}
      />
      <Divider my="lg" />
      <Group justify="flex-end" gap={8}>
        <Button variant="light" color="gray" onClick={() => modals.closeAll()}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          추가하기
        </Button>
      </Group>
    </form>
  )
}

export interface CreateDetailOptionFormDialogProps extends CreateDetailOptionFormProps {
  children: (props: { isMutating: boolean; open: () => void }) => React.ReactNode
}

export const CreateDetailOptionFormDialog: React.FC<CreateDetailOptionFormDialogProps> = ({
  optionKey,
  children: Trigger,
}) => {
  const isMutating = useIsDetailOptionMutating()
  const open = () =>
    modals.open({
      title: (
        <span className="font-bold">{ATTENDANCE_OPTIONS_LABEL[optionKey]} 상세 옵션 추가</span>
      ),
      children: <CreateDetailOptionForm optionKey={optionKey} />,
      radius: 'md',
      closeOnClickOutside: false,
      centered: true,
    })

  return <Trigger isMutating={isMutating} open={open} />
}
