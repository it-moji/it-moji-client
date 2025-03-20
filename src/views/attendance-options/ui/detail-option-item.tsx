'use client'

import { ActionIcon, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  type AttendanceDetailOption,
  type AttendanceOptionKey,
  useIsDetailOptionMutating,
} from '@/entities/attendance-option'
import { Icon } from '@/shared/ui'
import { DeleteDetailOptionDialog } from './delete-detail-option-dialog'
import { ModifyDetailOptionForm } from './modify-detail-option-form'

export interface DetailOptionItemProps extends AttendanceDetailOption {
  optionKey: AttendanceOptionKey
}

export const DetailOptionItem: React.FC<DetailOptionItemProps> = (props) => {
  const [isEditMode, { open: enableEditMode, close: disableEditMode }] = useDisclosure(false)
  const isMutating = useIsDetailOptionMutating()

  if (isEditMode) {
    return <ModifyDetailOptionForm {...props} onCancel={disableEditMode} />
  }

  return (
    <div className="flex items-center space-x-1.5">
      <TextInput className="flex-1" value={props.name} readOnly />
      <ActionIcon
        title="수정하기"
        variant="light"
        size="input-sm"
        onClick={enableEditMode}
        disabled={isMutating}
      >
        <Icon query="fluent:edit-24-regular" />
      </ActionIcon>
      <DeleteDetailOptionDialog optionKey={props.optionKey} detailOptionId={props.id}>
        {({ open }) => (
          <ActionIcon
            title="삭제하기"
            variant="light"
            size="input-sm"
            color="red"
            onClick={open}
            disabled={isMutating}
          >
            <Icon query="fluent:delete-24-regular" />
          </ActionIcon>
        )}
      </DeleteDetailOptionDialog>
    </div>
  )
}
