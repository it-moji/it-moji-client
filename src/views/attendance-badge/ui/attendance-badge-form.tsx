'use client'

import { Button, Fieldset, Group, InputLabel, NumberInput, Select, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { josa } from 'es-hangul'
import { useImperativeHandle, useMemo } from 'react'
import { z } from 'zod'
import { AttendanceOptionSelect } from '@/widgets/attendance-options-select'
import {
  type AttendanceBadgeCondition,
  type PostAttendanceBadgeBody,
  ATTENDANCE_BADGES_RANGE_LABEL,
  AttendanceBadgeRangeSchema,
  useIsBadgeMutating,
} from '@/entities/attendance-badge'
import {
  ATTENDANCE_OPTIONS_LABEL,
  AttendanceOptionKeySchema,
  useAttendanceOptionListQuery,
} from '@/entities/attendance-option'
import { type PropsWithClassName } from '@/shared/lib'
import { AttendanceBadgeIconInput } from './attendance-badge-icon-input'

const defaultCondition: Omit<AttendanceBadgeCondition, 'id'> = {
  key: AttendanceOptionKeySchema.Enum.attendance,
  detailKeyId: null,
  count: 1,
  range: AttendanceBadgeRangeSchema.Enum.more,
}

const defaultInitialValues: PostAttendanceBadgeBody = {
  icon: '',
  name: '',
  conditionGroups: [[defaultCondition]],
}

export interface AttendanceBadgeFormProps extends React.PropsWithChildren<PropsWithClassName> {
  controlRef?: React.Ref<{ initialize: () => void }>
  initialValues?: PostAttendanceBadgeBody
  submitButtonLabel?: string
  onSubmit?: (values: PostAttendanceBadgeBody) => void
}

export const AttendanceBadgeForm: React.FC<AttendanceBadgeFormProps> = ({
  controlRef,
  initialValues = defaultInitialValues,
  submitButtonLabel,
  onSubmit,
  className,
  children,
}) => {
  const { data: optionList, isLoading, isError } = useAttendanceOptionListQuery()
  const detailOptionNameMap = useMemo(
    () =>
      optionList &&
      Object.entries(optionList).reduce((map, [, { detailOptions }]) => {
        detailOptions.forEach(({ id, name }) => {
          map.set(id, name)
        })

        return map
      }, new Map<number, string>()),
    [optionList],
  )

  const isBadgeMutating = useIsBadgeMutating()

  const form = useForm<PostAttendanceBadgeBody>({
    mode: 'controlled',
    initialValues,
    validate: {
      name: (value) => {
        const { data, error } = z
          .string()
          .min(2, '배지 이름은 최소 2글자 이상 작성해주세요')
          .max(12, '배지 이름은 최대 12글자까지 작성할 수 있어요')
          .safeParse(value)

        return data ? null : error?.issues[0].message
      },
      icon: isNotEmpty(),
    },
    enhanceGetInputProps: () => ({ disabled: isBadgeMutating }),
  })

  const criteriaAction = {
    add: () => form.insertListItem('conditionGroups', [defaultCondition]),
    remove: (criteriaIndex: number) => form.removeListItem('conditionGroups', criteriaIndex),
  }

  const conditionAction = {
    add: (criteriaIndex: number) =>
      form.insertListItem(`conditionGroups.${criteriaIndex}`, defaultCondition),
    remove: (criteriaIndex: number, conditionIndex: number) =>
      form.removeListItem(`conditionGroups.${criteriaIndex}`, conditionIndex),
  }

  useImperativeHandle(controlRef, () => ({
    initialize: () => {
      form.setInitialValues(initialValues)
      form.setValues(initialValues)
    },
  }))

  return (
    <form className={className} onSubmit={form.onSubmit((values) => onSubmit?.(values))}>
      <Group justify="flex-end" align="center" mb="md" gap="xs">
        {children}
        {submitButtonLabel && (
          <Button type="submit" disabled={!form.isDirty() || isBadgeMutating}>
            {submitButtonLabel}
          </Button>
        )}
      </Group>
      <InputLabel mb="xs">배지 아이콘 및 이름</InputLabel>
      <Group align="flex-start" gap="xs">
        <AttendanceBadgeIconInput
          value={form.values.icon}
          onChange={(emoji) => form.setFieldValue('icon', emoji)}
          error={!!form.errors.icon}
          disabled={isBadgeMutating}
        />
        <TextInput
          key={form.key('name')}
          placeholder="배지 이름을 입력해주세요"
          className="flex-1"
          {...form.getInputProps('name')}
        />
      </Group>
      <Group justify="space-between" align="flex-end" mt="xl" mb="md">
        <InputLabel>배지 적용 기준 설정</InputLabel>
        <Button
          variant="light"
          color="gray"
          onClick={() => criteriaAction.add()}
          disabled={isBadgeMutating}
        >
          기준 추가하기
        </Button>
      </Group>
      <div className="space-y-4">
        {form.values.conditionGroups.map((criteria, criteriaIndex) => (
          <Fieldset
            key={form.key(`conditionGroups.${criteriaIndex}`)}
            legend={`기준 ${criteriaIndex + 1}`}
            className="space-y-4"
          >
            {criteria.map((condition, conditionIndex, conditionArray) => {
              const selectedOptionName =
                (condition.detailKeyId
                  ? detailOptionNameMap?.get(condition.detailKeyId)
                  : ATTENDANCE_OPTIONS_LABEL[condition.key]) || ''

              return (
                <div
                  key={form.key(`conditionGroups.${criteriaIndex}.${conditionIndex}`)}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <AttendanceOptionSelect
                        attendanceOptions={optionList}
                        className="w-36"
                        value={condition}
                        onChange={({ key, detailKeyId }) => {
                          form.setFieldValue(
                            `conditionGroups.${criteriaIndex}.${conditionIndex}.key`,
                            key,
                          )
                          form.setFieldValue(
                            `conditionGroups.${criteriaIndex}.${conditionIndex}.detailKeyId`,
                            detailKeyId,
                          )
                        }}
                        disabled={isLoading || isError || isBadgeMutating}
                      />
                      {josa(selectedOptionName, '이/가').replace(selectedOptionName, '')}
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <NumberInput
                        key={form.key(`conditionGroups.${criteriaIndex}.${conditionIndex}.count`)}
                        className="w-20"
                        min={0}
                        max={7}
                        disabled={isBadgeMutating}
                        {...form.getInputProps(
                          `conditionGroups.${criteriaIndex}.${conditionIndex}.count`,
                        )}
                      />
                      회
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Select
                        key={form.key(`conditionGroups.${criteriaIndex}.${conditionIndex}.range`)}
                        data={AttendanceBadgeRangeSchema.options.map((rangeOption) => ({
                          value: rangeOption,
                          label: ATTENDANCE_BADGES_RANGE_LABEL[rangeOption],
                        }))}
                        defaultValue={AttendanceBadgeRangeSchema.Enum.more}
                        className="w-20"
                        checkIconPosition="right"
                        allowDeselect={false}
                        {...form.getInputProps(
                          `conditionGroups.${criteriaIndex}.${conditionIndex}.range`,
                        )}
                      />
                      {conditionArray.length - 1 === conditionIndex ? '인 경우' : '이며,'}
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-end">
                    <Button
                      variant="light"
                      color="red"
                      onClick={() => {
                        if (conditionArray.length <= 1) {
                          criteriaAction.remove(criteriaIndex)
                          return
                        }

                        conditionAction.remove(criteriaIndex, conditionIndex)
                      }}
                      disabled={isBadgeMutating}
                    >
                      조건 삭제
                    </Button>
                  </div>
                </div>
              )
            })}
            <Group justify="flex-end" mt="xl" gap="xs">
              <Button
                variant="light"
                color="red"
                onClick={() => criteriaAction.remove(criteriaIndex)}
                disabled={isBadgeMutating}
              >
                기준 삭제
              </Button>
              <Button
                variant="light"
                color="gray"
                onClick={() => conditionAction.add(criteriaIndex)}
                disabled={isBadgeMutating}
              >
                조건 추가
              </Button>
            </Group>
          </Fieldset>
        ))}
      </div>
    </form>
  )
}
