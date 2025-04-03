'use client'

import { Button, Fieldset, Group, InputLabel, Text, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useOptionListSuspenseQuery } from '@/entities/attendance-option'
import type { DayKey, ParsingOptions } from '@/entities/text-parsing'
import {
  DAY_OPTIONS_LABEL,
  modifyParsingOptions,
  modifyTextParsingOptionsWithRevalidate,
  useParsingText,
  useTextParsingActions,
} from '@/entities/text-parsing'
import { Exception } from '@/shared/api'
import { cn } from '@/shared/lib'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'
import { parseTextSafely } from '../lib'

export interface TextParsingOptionsSettingProps {
  parsingOptions: ParsingOptions
}

export const TextParsingOptionsSetting: React.FC<TextParsingOptionsSettingProps> = ({
  parsingOptions,
}) => {
  const { data: attendanceOptions } = useOptionListSuspenseQuery()

  const text = useParsingText()

  const { setOptions } = useTextParsingActions()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: parsingOptions,
    validate: {
      delimiter: {
        person: isNotEmpty(),
        line: (value) => !JSON.stringify(value).replaceAll('"', ''),
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
  })

  const handleApplyOptions = () => {
    setOptions(form.getValues())

    parseTextSafely({
      text,
      parsingOptions: form.getValues(),
      attendanceOptions,
      onSuccess: () => toast.success('분석 옵션이 적용됐어요'),
    })
  }

  const handleSaveOptions = async () => {
    try {
      await modifyParsingOptions(form.getValues())
      await modifyTextParsingOptionsWithRevalidate()

      toast.success('분석 옵션 저장에 성공했어요')

      if (!text.trim()) {
        return
      }

      parseTextSafely({
        text,
        parsingOptions: form.getValues(),
        attendanceOptions,
        onSuccess: () => toast.success('분석 옵션이 적용됐어요'),
      })

      setOptions(form.getValues())
    } catch (error: unknown) {
      if (error instanceof Exception) {
        toast.error(Exception.extractMessage(error))
        return
      }

      toast.error('분석 옵션 저장에 실패했어요')
    }
  }

  useEffect(() => {
    setOptions(parsingOptions)
  }, [parsingOptions, setOptions])

  return (
    <AdminContainer>
      <AdminTitle className="mb-6 flex items-center justify-between">
        <div className="flex flex-none items-center">
          <Icon query="fluent-emoji:gear" className="mr-2" />
          분석 옵션 설정
        </div>
        <Group gap="xs" justify="flex-end">
          <Button variant="light" onClick={handleApplyOptions} disabled={!text.trim()}>
            적용하기
          </Button>
          <Button form="parsing-options-form" type="submit">
            저장하기
          </Button>
        </Group>
      </AdminTitle>

      {Object.keys(form.errors).length > 0 && (
        <Text c="var(--mantine-color-error)" className="mb-4 text-sm font-semibold">
          모든 옵션을 입력해주세요
        </Text>
      )}

      <form id="parsing-options-form" onSubmit={form.onSubmit(handleSaveOptions)}>
        <Group gap="md">
          <TextInput
            label="인원 분리 기준"
            className={cn('w-40')}
            classNames={{ label: 'mb-2 font-semibold' }}
            key={form.key('delimiter.person')}
            {...form.getInputProps('delimiter.person')}
          />
          <TextInput
            label="개행 분리 기준"
            className="w-40"
            classNames={{ label: 'mb-2 font-semibold' }}
            key={form.key('delimiter.line')}
            {...form.getInputProps('delimiter.line')}
            defaultValue={JSON.stringify(form.getValues().delimiter.line)
              .replaceAll('"', '')
              .replaceAll(/\\\\/g, '\\')}
          />
          <TextInput
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
                  className="max-w-40"
                  defaultValue={parsingOptions.dayMapping[key as DayKey]}
                  key={form.key(`dayMapping.${key}`)}
                  {...form.getInputProps(`dayMapping.${key}`)}
                />
              </div>
            ))}
          </Fieldset>

          <div className="flex flex-col space-y-8">
            <TextInput
              label="이름 판단 기준"
              className="w-40"
              classNames={{ label: 'mb-2 font-semibold', input: 'flex-none' }}
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <Fieldset
              className="flex flex-col space-y-2"
              legend="출석 상세 옵션 판단 기준"
              classNames={{ legend: 'font-semibold' }}
            >
              {parsingOptions.attendanceDetailOptions.map((option, idx) => (
                <div className="flex items-center space-x-4" key={option.id}>
                  <InputLabel
                    htmlFor={`detail-option-${option.id}`}
                    className="min-w-24 flex-none font-semibold"
                  >
                    {option.name}
                  </InputLabel>
                  <TextInput
                    id={`detail-option-${option.id}`}
                    className="max-w-40"
                    key={form.key(`attendanceDetailOptions.${option}`)}
                    onChange={(e) => {
                      form.setFieldValue(`attendanceDetailOptions.${idx}`, {
                        ...option,
                        identifier: e.target.value,
                      })
                    }}
                    defaultValue={option.identifier}
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
