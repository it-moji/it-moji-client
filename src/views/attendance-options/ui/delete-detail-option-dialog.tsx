'use client'

import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import toast from 'react-hot-toast'
import {
  type UseDeleteDetailOptionParams,
  useDeleteDetailOption,
} from '@/entities/attendance-option'

export interface DeleteDetailOptionDialogProps
  extends Pick<UseDeleteDetailOptionParams, 'optionKey' | 'detailOptionId'> {
  children: (props: { open: () => void }) => React.ReactNode
}

export const DeleteDetailOptionDialog: React.FC<DeleteDetailOptionDialogProps> = ({
  optionKey,
  detailOptionId,
  children: Trigger,
}) => {
  const { mutate: onConfirm } = useDeleteDetailOption({
    optionKey,
    detailOptionId,
    onSuccess: () => {
      toast.success('상세 옵션이 삭제되었어요!')
    },
    onException: (exception) => toast.error(exception.message),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 상세 옵션 삭제에 실패했어요')
    },
  })

  const open = () =>
    modals.openConfirmModal({
      title: <span className="font-bold">상세 옵션 삭제</span>,
      children: (
        <Text size="sm">
          정말 삭제하시겠어요? <br />
          삭제하면 다시는 복구할 수 없어요
        </Text>
      ),
      labels: { confirm: '삭제', cancel: '취소' },
      radius: 'md',
      confirmProps: { color: 'red' },
      groupProps: { gap: 8, mt: 'md' },
      onConfirm,
    })

  return <Trigger open={open} />
}
