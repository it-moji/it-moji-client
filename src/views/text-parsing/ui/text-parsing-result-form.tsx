'use client'

import { Group, Paper, Select, Table, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { AttendanceOptionSelect } from '@/widgets/attendance-options-select'
import type { GetAttendanceBadgeDetailResponse } from '@/entities/attendance-badge'
import { ATTENDANCE_OPTIONS_LABEL, useOptionListSuspenseQuery } from '@/entities/attendance-option'
import type { DayKey, EditableParsingResult, ParsingResult } from '@/entities/text-parsing'
import {
  createParsingResult,
  DAY_OPTIONS_LABEL,
  getAttendanceBadgeId,
  findParentKeyById,
  transformAttendanceInfoToStatistic,
  useParsingResult,
  useParsingOptions,
} from '@/entities/text-parsing'
import { Exception } from '@/shared/api'
import { omit } from '@/shared/lib'
import { Icon } from '@/shared/ui'

export interface TextParsingResultFormProps {
  badgeOptions: GetAttendanceBadgeDetailResponse['data'][]
  team: string | null
}

export const TextParsingResultForm: React.FC<TextParsingResultFormProps> = ({
  badgeOptions,
  team,
}) => {
  const { data: attendanceOptions } = useOptionListSuspenseQuery()

  const result = useParsingResult()
  const options = useParsingOptions()

  const { setValues, ...form } = useForm({
    mode: 'uncontrolled',
    initialValues: { values: result },
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
              detailId: info.detailId && Number(info.detailId),
            },
          ]),
        ),
      })) as ParsingResult[]

    try {
      await createParsingResult(Number(team), body)

      toast.success('출석 정보 저장에 성공했어요')
    } catch (error: unknown) {
      if (error instanceof Exception) {
        toast.error(Exception.extractMessage(error))
        return
      }

      toast.error('출석 정보 저장에 실패했어요')
    }
  }

  useEffect(() => {
    setValues({ values: result })
  }, [result, setValues])

  return (
    <form
      id="parsing-result-form"
      onSubmit={form.onSubmit((values) => handleSave(values.values))}
      className="space-y-4"
    >
      {result.map((person, idx) => (
        <div
          className="rounded-lg border border-solid border-gray-300 p-4 @container/parsingResult dark:border-dark-400"
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
          <div className="mt-8 flex flex-col items-start gap-x-4 gap-y-8 @xl/parsingResult:flex-row">
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
                            defaultValue={
                              form
                                .getValues()
                                .values[idx].attendanceInfo[day as DayKey].detailId?.toString() ||
                              form.getValues().values[idx].attendanceInfo[day as DayKey].key
                            }
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
                                  detailId: isNaN(Number(value)) ? undefined : value,
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
                      <Table.Tr key={`${stat.key}-${stat.detailId}`}>
                        <Table.Th>
                          {stat.detailId
                            ? options?.attendanceDetailOptions.find(
                                (option) => option.id === stat.detailId,
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
