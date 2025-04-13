'use client'

import { Button, Fieldset, Group, InputLabel, Text, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAttendanceBadgeListWithConditionsQuery } from '@/entities/attendance-badge'
import { useAttendanceOptionListSuspenseQuery } from '@/entities/attendance-option'
import {
  DAY_OPTIONS_LABEL,
  useTextParsingOptionsSuspenseQuery,
  useParsingText,
  useTextParsingActions,
  useModifyTextParsingOptions,
  useIsTextParsingMutating,
} from '@/entities/text-parsing'
import { Exception } from '@/shared/api'
import { cn } from '@/shared/lib'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'
import { parseTextSafely } from '../lib'

const TEXT_PARSING_OPTIONS_FORM = 'parsing-options-form'

export const TextParsingOptionsSetting: React.FC = () => {
  const { data: parsingOptions } = useTextParsingOptionsSuspenseQuery()
  const { data: attendanceOptions } = useAttendanceOptionListSuspenseQuery()
  const { data: badgeList } = useAttendanceBadgeListWithConditionsQuery()

  const text = useParsingText()
  const { setOptions } = useTextParsingActions()

  const isSubmitting = useIsTextParsingMutating()

  const form = useForm({
    mode: 'controlled',
    initialValues: parsingOptions,
    validate: {
      delimiter: {
        person: isNotEmpty(),
        title: isNotEmpty(),
      },
      dayMapping: {
        monday: isNotEmpty(),
        tuesday: isNotEmpty(),
        wednesday: isNotEmpty(),
        thursday: isNotEmpty(),
        friday: isNotEmpty(),
        saturday: isNotEmpty(),
        sunday: isNotEmpty(),
      },
      name: isNotEmpty(),
    },
    enhanceGetInputProps: () => ({ disabled: isSubmitting }),
  })

  const handleApplyOptions = () => {
    setOptions(form.getValues())
    form.resetTouched()

    parseTextSafely({
      text,
      parsingOptions: form.getValues(),
      attendanceOptions,
      badgeList,
      onSuccess: () => toast.success('분석 옵션이 적용됐어요'),
    })
  }

  const { mutate: modifyTextParsingOptions } = useModifyTextParsingOptions({
    onSuccess: () => {
      if (text.trim()) {
        handleApplyOptions()
      }

      toast.success('분석 옵션이 저장되었어요')
      form.resetDirty()
    },
    onException: (exception) => toast.error(Exception.extractMessage(exception)),
    onError: () => toast.error('예기치 못한 이유로 분석 옵션을 저장하지 못했어요'),
  })

  useEffect(() => {
    setOptions(parsingOptions)
  }, [parsingOptions, setOptions])

  return (
    <AdminContainer>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <AdminTitle className="mb-0 flex flex-none items-center">
          <Icon query="fluent-emoji:gear" className="mr-2" />
          분석 옵션 설정
        </AdminTitle>
        <Group gap="xs" className="flex-1" justify="flex-end" wrap="nowrap">
          <Button
            variant="light"
            onClick={handleApplyOptions}
            disabled={!form.isTouched() || !text.trim() || isSubmitting}
          >
            적용하기
          </Button>
          <Button
            form={TEXT_PARSING_OPTIONS_FORM}
            type="submit"
            disabled={!form.isDirty() || isSubmitting}
          >
            저장하기
          </Button>
        </Group>
      </div>

      {Object.keys(form.errors).length > 0 && (
        <Text c="var(--mantine-color-error)" className="mb-4 text-sm font-semibold">
          모든 옵션을 입력해주세요
        </Text>
      )}

      <form
        id={TEXT_PARSING_OPTIONS_FORM}
        onSubmit={form.onSubmit((body) => modifyTextParsingOptions(body))}
      >
        <Group gap="md">
          <TextInput
            type="text"
            label="인원 분리 기준"
            className={cn('w-40')}
            classNames={{ label: 'mb-2 font-semibold' }}
            key={form.key('delimiter.person')}
            {...form.getInputProps('delimiter.person')}
          />
          <TextInput
            type="text"
            label="키/값 분리 기준"
            className="w-40"
            classNames={{ label: 'mb-2 font-semibold' }}
            key={form.key('delimiter.title')}
            {...form.getInputProps('delimiter.title')}
          />
        </Group>

        <div className="mt-8 flex flex-row flex-wrap gap-8">
          <Fieldset
            className="flex flex-col space-y-2"
            legend="날짜 판단 기준"
            classNames={{ legend: 'font-semibold' }}
          >
            {Object.entries(DAY_OPTIONS_LABEL).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-4">
                <InputLabel htmlFor={`text-input-${key}`} className="flex-none font-semibold">
                  {value}
                </InputLabel>
                <TextInput
                  id={`text-input-${key}`}
                  type="text"
                  className="max-w-40"
                  key={form.key(`dayMapping.${key}`)}
                  {...form.getInputProps(`dayMapping.${key}`)}
                />
              </div>
            ))}
          </Fieldset>

          <div className="flex flex-col space-y-8">
            <TextInput
              label="이름 판단 기준"
              type="text"
              className="w-40"
              classNames={{ label: 'mb-2 font-semibold', input: 'flex-none' }}
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <Fieldset
              className="flex flex-col space-y-2"
              legend="출석 상세 옵션 판단 기준"
              classNames={{ legend: 'font-semibold' }}
              disabled={isSubmitting}
            >
              {form.values.attendanceDetailOptions.map((option, idx) => (
                <div className="flex items-center space-x-4" key={option.id}>
                  <InputLabel
                    htmlFor={`detail-option-${option.id}`}
                    className="min-w-24 flex-none font-semibold"
                  >
                    {option.name}
                  </InputLabel>
                  <TextInput
                    id={`detail-option-${option.id}`}
                    type="text"
                    className="max-w-40"
                    key={form.key(`attendanceDetailOptions.${idx}.identifier`)}
                    {...form.getInputProps(`attendanceDetailOptions.${idx}.identifier`)}
                  />
                </div>
              ))}
            </Fieldset>
          </div>
        </div>
      </form>
    </AdminContainer>
  )
}
