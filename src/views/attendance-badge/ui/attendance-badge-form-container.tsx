'use client'

import { Button, Center, Loader, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Suspense, useEffect, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import toast from 'react-hot-toast'
import {
  type AttendanceBadge,
  useActiveBadgeId,
  useAttendanceBadgeDetailSuspenseQuery,
  useCreateAttendanceBadge,
  useDeleteAttendanceBadge,
  useModifyAttendanceBadge,
  useResetAttendanceBadgeQuery,
} from '@/entities/attendance-badge'
import { Exception } from '@/shared/api'
import { omit, type PropsWithClassName } from '@/shared/lib'
import { AdminContainerFallbackUI, Icon } from '@/shared/ui'
import { AttendanceBadgeForm } from './attendance-badge-form'

const CreateAttendanceBadgeForm: React.FC<PropsWithClassName> = ({ className }) => {
  const controlRef = useRef<{ initialize: () => void }>(null)
  const { mutate: createBadge, isPending } = useCreateAttendanceBadge({
    onSuccess: () => {
      toast.success('배지 생성에 성공했어요')
      controlRef.current?.initialize()
    },
    onException: (exception) => toast.error(Exception.extractMessage(exception)),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 배지 생성에 실패했어요')
    },
  })

  useEffect(() => {
    controlRef.current?.initialize()
  }, [])

  return (
    <AttendanceBadgeForm controlRef={controlRef} onSubmit={createBadge} className={className}>
      <Button type="submit" disabled={isPending}>
        배지 추가하기
      </Button>
    </AttendanceBadgeForm>
  )
}

interface ModifyAttendanceBadgeFormProps extends PropsWithClassName {
  id: AttendanceBadge['id']
}

const ModifyAttendanceBadgeForm: React.FC<ModifyAttendanceBadgeFormProps> = ({ id, className }) => {
  const { data: badgeDetail } = useAttendanceBadgeDetailSuspenseQuery({ id })

  const controlRef = useRef<{ initialize: () => void }>(null)
  const setActiveBadgeId = useActiveBadgeId((store) => store.setActiveBadgeId)

  const { mutate: modifyBadge, isPending: isModifyPending } = useModifyAttendanceBadge({
    id,
    onSuccess: () => {
      toast.success('배지 수정에 성공했어요')
      controlRef.current?.initialize()
      setActiveBadgeId(null)
    },
    onException: (exception) => toast.error(Exception.extractMessage(exception)),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 배지 수정에 실패했어요')
    },
  })

  const { mutate: deleteBadge, isPending: isDeletePending } = useDeleteAttendanceBadge({
    id,
    onSuccess: () => {
      toast.success('배지 삭제에 성공했어요')
      setActiveBadgeId(null)
    },
    onException: (exception) => toast.error(Exception.extractMessage(exception)),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 배지 삭제에 실패했어요')
    },
  })

  const confirmDeleteBadge = () =>
    modals.openConfirmModal({
      title: <span className="font-bold">배지 삭제</span>,
      children: (
        <Text size="sm">
          정말 삭제하시겠어요? <br />
          삭제하면 다시는 복구할 수 없어요
        </Text>
      ),
      labels: { confirm: '삭제', cancel: isDeletePending ? '닫기' : '취소' },
      radius: 'md',
      confirmProps: { color: 'red' },
      groupProps: { gap: 8, mt: 'md' },
      onConfirm: deleteBadge,
    })

  const disabled = isModifyPending || isDeletePending

  useEffect(() => {
    controlRef.current?.initialize()
  }, [id])

  return (
    <AttendanceBadgeForm
      controlRef={controlRef}
      initialValues={{
        name: badgeDetail.name,
        icon: badgeDetail.icon,
        conditionGroups: badgeDetail.conditionGroups.map((group) => {
          return group.conditions.map((condition) => omit(condition, ['id']))
        }),
      }}
      onSubmit={modifyBadge}
      className={className}
    >
      <Button color="red" disabled={disabled} onClick={confirmDeleteBadge}>
        배지 삭제하기
      </Button>
      <Button type="submit" disabled={disabled}>
        변경사항 반영하기
      </Button>
    </AttendanceBadgeForm>
  )
}

export interface AttendanceBadgeDetailErrorFallbackProps {
  onReset: () => void
}

export const AttendanceBadgeDetailErrorFallback: React.FC<
  AttendanceBadgeDetailErrorFallbackProps
> = ({ onReset }) => (
  <AdminContainerFallbackUI
    query="fluent:warning-28-regular"
    comment="배지 조회에 실패했어요"
    className="pb-16 pt-12"
  >
    <Button
      variant="default"
      size="compact-md"
      className="mx-auto mt-7"
      leftSection={<Icon query="fluent:arrow-clockwise-16-regular" />}
      onClick={onReset}
    >
      재시도
    </Button>
  </AdminContainerFallbackUI>
)

export const AttendanceBadgeFormContainer: React.FC<PropsWithClassName> = ({ className }) => {
  const { activeBadgeId } = useActiveBadgeId()
  const reset = useResetAttendanceBadgeQuery()

  if (activeBadgeId !== null) {
    return (
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <AttendanceBadgeDetailErrorFallback
            onReset={() => {
              reset()
              resetErrorBoundary()
            }}
          />
        )}
      >
        <Suspense
          fallback={
            <Center className="flex-1 p-4 pb-16">
              <Loader color="var(--mantine-color-placeholder)" />
            </Center>
          }
        >
          <ModifyAttendanceBadgeForm id={activeBadgeId} className={className} />
        </Suspense>
      </ErrorBoundary>
    )
  }

  return <CreateAttendanceBadgeForm className={className} />
}
