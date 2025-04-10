'use client'

import { Group, Paper, Select, Table, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { AttendanceOptionSelect } from '@/widgets/attendance-options-select'
import type { GetAttendanceBadgeListWithConditionsResponseData } from '@/entities/attendance-badge'
import {
  ATTENDANCE_OPTIONS_LABEL,
  useAttendanceOptionListSuspenseQuery,
} from '@/entities/attendance-option'
import {
  type DayKey,
  type EditableParsingResult,
  type ParsingResult,
  DAY_OPTIONS_LABEL,
  getAttendanceBadgeId,
  findParentKeyById,
  transformAttendanceInfoToStatistic,
  useParsingResult,
  useParsingOptions,
  useIsTextParsingMutating,
} from '@/entities/text-parsing'
import { omit } from '@/shared/lib'
import { Icon } from '@/shared/ui'

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
  const options = useParsingOptions()

  const isSubmitting = useIsTextParsingMutating()

  const { setValues, ...form } = useForm({
    mode: 'uncontrolled',
    initialValues: { values: result },
    enhanceGetInputProps: () => ({ disabled: isSubmitting }),
  })

  const handleSave = async (parsingResultList: EditableParsingResult[]) => {
    for (const parsingResult of parsingResultList) {
      if (!parsingResult.name) {
        toast.error('이름을 모두 입력해주세요')
        return
      }

      if (!parsingResult.badgeId) {
        toast.error('배지를 모두 선택해주세요')
        return
      }
    }

    const body = parsingResultList
      .map((value) => omit(value, ['attendanceStatistic']))
      .map((value) => ({
        ...value,
        badgeId: Number(value.badgeId),
        attendanceInfo: Object.fromEntries(
          Object.entries(value.attendanceInfo).map(([day, info]) => [
            day,
            {
              ...info,
              detailKeyId: info.detailKeyId && Number(info.detailKeyId),
            },
          ]),
        ),
      })) as ParsingResult[]

    // TODO: 추후 스터디원 관리기능 추가 시 적용
    console.log(Number(team) + '팀: ', body)
    toast('준비 중인 기능이에요', { icon: '🙏' })
  }

  useEffect(() => {
    setValues({ values: result })
  }, [result, setValues])

  return (
    <form
      id={TEXT_PARSING_RESULT_FORM_ID}
      onSubmit={form.onSubmit((values) => handleSave(values.values))}
      className="space-y-4"
    >
      {result.map((person, idx) => (
        <div
          className="rounded-lg border border-solid border-gray-300 p-4 @container/parsing-result dark:border-dark-400"
          key={person.name}
        >
          <Group gap="md">
            <TextInput
              label="이름"
              className="w-40"
              classNames={{ label: 'mb-2 font-semibold' }}
              key={form.key(`values.${idx}.name`)}
              {...form.getInputProps(`values.${idx}.name`)}
            />
            <Select
              label={
                <div className="flex items-center font-semibold">
                  <Icon query="fluent-emoji:trophy" className="mr-1" />
                  적용 배지
                </div>
              }
              className="w-40"
              classNames={{ label: 'mb-2 pt-0.5' }}
              data={badgeOptions.map(({ id, name, icon }) => ({
                value: id.toString(),
                label: `${icon} ${name}`,
              }))}
              key={form.key(`values.${idx}.badgeId`)}
              {...form.getInputProps(`values.${idx}.badgeId`)}
              defaultValue={form.getValues().values[idx].badgeId?.toString()}
              checkIconPosition="right"
              allowDeselect={false}
            />
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
                    {Object.entries(person.attendanceInfo).map(([day]) => (
                      <Table.Tr key={day}>
                        <Table.Th>{DAY_OPTIONS_LABEL[day as DayKey]}</Table.Th>
                        <Table.Td>
                          <AttendanceOptionSelect
                            className="w-40"
                            attendanceOptions={attendanceOptions}
                            key={form.key(`values.${idx}.attendanceInfo`)}
                            {...form.getInputProps(`values.${idx}.attendanceInfo`)}
                            // TODO: API 인터페이스 변경사항 반영 필요
                            // defaultValue={
                            //   form
                            //     .getValues()
                            //     .values[
                            //       idx
                            //     ].attendanceInfo[day as DayKey].detailKeyId?.toString() ||
                            //   form.getValues().values[idx].attendanceInfo[day as DayKey].key
                            // }
                            onChange={(value) => {
                              const updatedAttendanceInfo = {
                                ...form.getValues().values[idx].attendanceInfo,
                                [day]: {
                                  key: isNaN(Number(value))
                                    ? value
                                    : findParentKeyById(
                                        Number(value),
                                        attendanceOptions,
                                      )?.toString(),
                                  detailKeyId: isNaN(Number(value)) ? undefined : value,
                                },
                              }

                              const statistic = transformAttendanceInfoToStatistic(
                                updatedAttendanceInfo,
                                attendanceOptions,
                              )

                              const badgeId = getAttendanceBadgeId(statistic, badgeOptions)

                              form.setFieldValue(
                                `values.${idx}.attendanceInfo`,
                                updatedAttendanceInfo,
                              )

                              form.setFieldValue(`values.${idx}.attendanceStatistic`, statistic)

                              form.setFieldValue(`values.${idx}.badgeId`, badgeId)
                            }}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
            </div>
            <div className="flex-1">
              <Title order={4} className="mb-2 flex items-center text-base font-semibold">
                <Icon query="fluent-emoji:bar-chart" className="mr-2" />
                출석 통계
              </Title>
              <Paper withBorder className="overflow-hidden">
                <Table
                  layout="fixed"
                  withColumnBorders
                  classNames={{ th: 'w-28 font-normal', td: 'h-14' }}
                >
                  <Table.Tbody>
                    {form.getValues().values[idx].attendanceStatistic.map((stat) => (
                      <Table.Tr key={`${stat.key}-${stat.detailKeyId}`}>
                        <Table.Th>
                          {stat.detailKeyId
                            ? options?.attendanceDetailOptions.find(
                                (option) => option.id === stat.detailKeyId,
                              )?.name
                            : ATTENDANCE_OPTIONS_LABEL[stat.key]}
                        </Table.Th>
                        <Table.Td>
                          <p>{stat.count}회</p>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
            </div>
          </div>
        </div>
      ))}
    </form>
  )
}
