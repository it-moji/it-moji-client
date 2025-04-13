'use client'

import {
  ActionIcon,
  CopyButton,
  Group,
  Paper,
  Select,
  Table,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { AttendanceOptionSelect } from '@/widgets/attendance-options-select'
import type { GetAttendanceBadgeListWithConditionsResponseData } from '@/entities/attendance-badge'
import { useAttendanceOptionListSuspenseQuery } from '@/entities/attendance-option'
import {
  type DayKey,
  type EditableParsingResult,
  type PostTextParsingResult,
  DAY_OPTIONS_LABEL,
  getAttendanceBadgeId,
  transformAttendanceInfoToStatistic,
  useParsingResult,
  useIsTextParsingMutating,
} from '@/entities/text-parsing'
import { omit } from '@/shared/lib'
import { Icon } from '@/shared/ui'
import { TextParsingResultStatistic } from './text-parsing-result-statistic'

export const TEXT_PARSING_RESULT_FORM_ID = 'parsing-result-form'

export interface TextParsingResultFormProps {
  badgeOptions: GetAttendanceBadgeListWithConditionsResponseData
  team: string | null
}

export const TextParsingResultForm: React.FC<TextParsingResultFormProps> = ({
  badgeOptions,
  team,
}) => {
  const { data: attendanceOptions } = useAttendanceOptionListSuspenseQuery()

  const result = useParsingResult()

  const isSubmitting = useIsTextParsingMutating()

  const { setInitialValues, reset, ...form } = useForm({
    mode: 'controlled',
    initialValues: { result },
    enhanceGetInputProps: () => ({ disabled: isSubmitting }),
  })

  const handleSave = async (parsingResultList: EditableParsingResult[]) => {
    for (const parsingResult of parsingResultList) {
      if (!parsingResult.name.trim()) {
        toast.error('이름을 모두 입력해주세요')
        return
      }

      if (!parsingResult.badgeId) {
        toast.error('배지를 모두 선택해주세요')
        return
      }
    }

    const body = parsingResultList.map<PostTextParsingResult[number]>((value) => ({
      ...omit(value, ['attendanceStatistic']),
      badgeId: Number(value.badgeId),
      attendanceInfo: Object.fromEntries(
        Object.entries(value.attendanceInfo).map(([day, info]) => [
          day,
          {
            ...info,
            detailKeyId: info.detailKeyId && Number(info.detailKeyId),
          },
        ]),
      ) as PostTextParsingResult[number]['attendanceInfo'],
    }))

    // TODO: 추후 스터디원 관리기능 추가 시 적용
    console.log(Number(team) + '팀: ', body)
    toast('준비 중인 기능이에요', { icon: '🙏' })
  }

  useEffect(() => {
    setInitialValues({ result })
    reset()
  }, [result, setInitialValues, reset])

  return (
    <form
      id={TEXT_PARSING_RESULT_FORM_ID}
      onSubmit={form.onSubmit(({ result }) => handleSave(result))}
      className="space-y-4"
    >
      {form.values.result.map((person, personIndex) => (
        <div
          className="rounded-lg border border-solid border-gray-300 p-4 @container/parsing-result dark:border-dark-400"
          key={person.name}
        >
          <Group gap="md">
            <TextInput
              label="이름"
              className="w-40"
              classNames={{ label: 'mb-2 font-semibold' }}
              key={form.key(`result.${personIndex}.name`)}
              {...form.getInputProps(`result.${personIndex}.name`)}
            />
            <Group gap="0.325rem" wrap="nowrap" align="flex-end">
              <Select
                label={`적용 배지${form.isDirty(`result.${personIndex}.badgeId`) ? ' (동기화 해제됨)' : ''}`}
                className="w-40"
                classNames={{ label: 'mb-2 pt-0.5' }}
                data={badgeOptions.map(({ id, name, icon }) => ({
                  value: id.toString(),
                  label: `${icon} ${name}`,
                }))}
                value={person.badgeId?.toString()}
                onChange={(value) => {
                  const updatedBadgeId = Number(value)
                  const targetStatistic = transformAttendanceInfoToStatistic(
                    person.attendanceInfo,
                    attendanceOptions,
                  )
                  const computedBadgeId = getAttendanceBadgeId(targetStatistic, badgeOptions)

                  if (updatedBadgeId === computedBadgeId) {
                    setInitialValues({
                      result: result.map((initialPerson) => {
                        if (initialPerson.name === person.name) {
                          return {
                            ...initialPerson,
                            badgeId: updatedBadgeId,
                          }
                        }

                        return initialPerson
                      }),
                    })
                  }

                  form.setFieldValue(`result.${personIndex}.badgeId`, updatedBadgeId)
                }}
                checkIconPosition="right"
                allowDeselect={false}
              />
              <CopyButton value={badgeOptions.find(({ id }) => id === person.badgeId)?.icon || ''}>
                {({ copied, copy }) => (
                  <ActionIcon
                    title="배지 아이콘 복사하기"
                    variant="default"
                    size="input-sm"
                    onClick={copy}
                  >
                    <Icon
                      query={copied ? 'fluent:checkmark-16-regular' : 'fluent:copy-16-regular'}
                      className="text-[var(--mantine-color-text)]"
                    />
                  </ActionIcon>
                )}
              </CopyButton>
            </Group>
          </Group>
          <div className="mt-8 flex flex-col items-start gap-x-4 gap-y-8 @xl/parsing-result:flex-row">
            <div className="flex-1">
              <Title order={4} className="mb-2 flex items-center text-base font-semibold">
                <Icon query="fluent-emoji:spiral-calendar" className="mr-2" />
                출석 정보
              </Title>
              <Paper withBorder className="overflow-hidden">
                <Table
                  layout="fixed"
                  withColumnBorders
                  classNames={{ th: 'w-20 font-normal', td: 'h-14' }}
                >
                  <Table.Tbody>
                    {Object.entries(person.attendanceInfo).map(([day, info]) => (
                      <Table.Tr key={day}>
                        <Table.Th>{DAY_OPTIONS_LABEL[day as DayKey]}</Table.Th>
                        <Table.Td>
                          <AttendanceOptionSelect
                            className="w-40"
                            attendanceOptions={attendanceOptions}
                            value={info}
                            onChange={(updatedDayInfo) => {
                              const updatedAttendanceInfo = {
                                ...person.attendanceInfo,
                                [day]: updatedDayInfo,
                              }

                              const updatedStatistic = transformAttendanceInfoToStatistic(
                                updatedAttendanceInfo,
                                attendanceOptions,
                              )
                              const updatedBadgeId = getAttendanceBadgeId(
                                updatedStatistic,
                                badgeOptions,
                              )

                              form.setFieldValue(
                                `result.${personIndex}.attendanceStatistic`,
                                updatedStatistic,
                              )
                              form.setFieldValue(
                                `result.${personIndex}.attendanceInfo.${day}`,
                                updatedDayInfo,
                              )

                              if (
                                !form.isDirty(`result.${personIndex}.badgeId`) ||
                                updatedBadgeId === person.badgeId
                              ) {
                                setInitialValues({
                                  result: result.map((initialPerson) => {
                                    if (initialPerson.name === person.name) {
                                      return {
                                        ...initialPerson,
                                        badgeId: updatedBadgeId,
                                        attendanceInfo: updatedAttendanceInfo,
                                        attendanceStatistic: updatedStatistic,
                                      }
                                    }

                                    return initialPerson
                                  }),
                                })
                                form.setFieldValue(`result.${personIndex}.badgeId`, updatedBadgeId)
                              }
                            }}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
            </div>
            <TextParsingResultStatistic
              attendanceStatistic={person.attendanceStatistic}
              className="flex-1"
            />
          </div>
        </div>
      ))}
    </form>
  )
}
