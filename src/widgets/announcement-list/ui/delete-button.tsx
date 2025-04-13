'use client'

import { type ButtonProps, Button, Loader, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { deletePost, deletePostWithRevalidate } from '@/entities/announcement'

export interface DeleteButtonProps extends ButtonProps {
  id: number
  fetcher?: (id: number) => Promise<unknown>
  revalidate?: (id: number) => Promise<unknown>
  onStart?: () => void
  onSuccess?: (message: string) => void
  onFailed?: (message: string) => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  fetcher = deletePost,
  revalidate = deletePostWithRevalidate,
  onStart,
  onSuccess = toast.success,
  onFailed = toast.error,
  ...props
}) => {
  const [isPending, setIsPending] = useState(false)

  const onConfirm = async () => {
    setIsPending(true)
    onStart?.()
    await fetcher(id)
      .then(() => revalidate(id))
      .then(() => {
        onSuccess('공지사항 삭제에 성공했어요')
      })
      .catch(() => {
        setIsPending(false)
        onFailed('공지사항 삭제에 실패했어요')
      })
  }

  const handleClick = () =>
    modals.openConfirmModal({
      title: <span className="font-bold">공지사항 삭제</span>,
      children: (
        <Text size="sm">
          정말 삭제하시겠어요? <br />
          삭제하면 다시는 복구할 수 없어요
        </Text>
      ),
      labels: { confirm: '삭제', cancel: isPending ? '닫기' : '취소' },
      radius: 'md',
      confirmProps: { color: 'red' },
      groupProps: { gap: 8, mt: 'md' },
      onConfirm,
    })

  return (
    <Button onClick={handleClick} color="red" variant="light" disabled={isPending} {...props}>
      {isPending ? <Loader size="xs" color="gray" /> : '삭제'}
    </Button>
  )
}
