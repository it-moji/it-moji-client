'use client'

import { Button, Loader } from '@mantine/core'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  type AttendanceOptionKey,
  AttendanceOptionKeySchema,
  useResetOptionDetailQuery,
} from '@/entities/attendance-option'
import { Icon } from '@/shared/ui'
import { CreateDetailOptionFormDialog } from './create-detail-option-form-dialog'
import { DetailOptionList, DetailOptionListFallbackUI } from './detail-option-list'
import { OptionTabs } from './option-tabs'

export const AttendanceOptionsView: React.FC = () => {
  const [selected, setSelected] = useState<AttendanceOptionKey>(() => {
    return AttendanceOptionKeySchema.Enum.attendance
  })

  const reset = useResetOptionDetailQuery({ optionKey: selected })

  return (
    <>
      <OptionTabs selected={selected} onSelect={setSelected} />
      <div className="my-4 flex min-h-64 border-x-0 border-y border-solid border-gray-300 py-3 dark:border-dark-400">
        <ErrorBoundary
          FallbackComponent={({ resetErrorBoundary }) => (
            <DetailOptionListFallbackUI
              query="fluent:warning-28-regular"
              comment="상세 옵션 조회에 실패했어요"
            >
              <Button
                variant="default"
                size="compact-md"
                className="mx-auto mt-7"
                leftSection={<Icon query="fluent:arrow-clockwise-16-regular" />}
                onClick={() => {
                  reset()
                  resetErrorBoundary()
                }}
              >
                재시도
              </Button>
            </DetailOptionListFallbackUI>
          )}
        >
          <Suspense
            fallback={
              <Loader className="mx-auto mb-24 mt-20" color="var(--mantine-color-placeholder)" />
            }
          >
            <DetailOptionList optionKey={selected} />
          </Suspense>
        </ErrorBoundary>
      </div>
      <CreateDetailOptionFormDialog optionKey={selected}>
        {({ isMutating, open }) => (
          <Button className="w-full" disabled={isMutating} onClick={open}>
            추가하기
          </Button>
        )}
      </CreateDetailOptionFormDialog>
    </>
  )
}
