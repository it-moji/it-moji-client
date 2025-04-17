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
import type { UseFormReturnType } from '@mantine/form'
import { AttendanceOptionSelect } from '@/widgets/attendance-options-select'
import type { GetAttendanceBadgeListWithConditionsResponseData } from '@/entities/attendance-badge'
import { useAttendanceOptionListSuspenseQuery } from '@/entities/attendance-option'
import type { DayKey, EditableParsingResultWithError } from '@/entities/text-parsing'
import {
  DAY_OPTIONS_LABEL,
  getAttendanceBadgeId,
  transformAttendanceInfoToStatistic,
  useParsingResult,
} from '@/entities/text-parsing'
import { Icon } from '@/shared/ui'
import { TextParsingResultStatistic } from './text-parsing-result-statistic'

export interface TextParsingResultFormFieldsProps {
  form: Omit<
    UseFormReturnType<{ result: EditableParsingResultWithError[] }>,
    'setInitialValues' | 'reset'
  >
  setInitialValues: (values: { result: EditableParsingResultWithError[] }) => void
  personResult: EditableParsingResultWithError
  personResultIndex: number
  badgeOptions: GetAttendanceBadgeListWithConditionsResponseData
}

export const TextParsingResultFormFields: React.FC<TextParsingResultFormFieldsProps> = ({
  form,
  setInitialValues,
  personResult,
  personResultIndex,
  badgeOptions,
}) => {
  const { data: attendanceOptions } = useAttendanceOptionListSuspenseQuery()

  const result = useParsingResult()

  if (!personResult || !personResult.data) {
    return null
  }

  return (
    <>
      <Group gap="md">
        <TextInput
          label="이름"
          className="w-40"
          classNames={{ label: 'mb-2 font-semibold' }}
          key={form.key(`result.${personResultIndex}.data.name`)}
          {...form.getInputProps(`result.${personResultIndex}.data.name`)}
        />
        <Group gap="0.325rem" wrap="nowrap" align="flex-end">
          <Select
            label={`적용 배지${form.isDirty(`result.${personResultIndex}.data.badgeId`) ? ' (동기화 해제됨)' : ''}`}
            className="w-40"
            classNames={{ label: 'mb-2 pt-0.5' }}
            data={badgeOptions.map(({ id, name, icon }) => ({
              value: id.toString(),
              label: `${icon} ${name}`,
            }))}
            value={personResult.data.badgeId?.toString()}
            onChange={(value) => {
              const updatedBadgeId = Number(value)
              const targetStatistic = transformAttendanceInfoToStatistic(
                personResult.data.attendanceInfo,
                attendanceOptions,
              )
              const computedBadgeId = getAttendanceBadgeId(targetStatistic, badgeOptions)

              if (updatedBadgeId === computedBadgeId) {
                setInitialValues({
                  result: result.map((initialPerson) => {
                    if (initialPerson.data?.name === personResult.data.name) {
                      return {
                        ...initialPerson,
                        data: {
                          ...initialPerson.data,
                          badgeId: updatedBadgeId,
                        },
                      } as EditableParsingResultWithError
                    }

                    return initialPerson
                  }),
                })
              }

              form.setFieldValue(`result.${personResultIndex}.data.badgeId`, updatedBadgeId)
            }}
            checkIconPosition="right"
            allowDeselect={false}
          />
          <CopyButton
            value={badgeOptions.find(({ id }) => id === personResult.data.badgeId)?.icon || ''}
          >
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
                {Object.entries(personResult.data.attendanceInfo).map(([day, info]) => (
                  <Table.Tr key={day}>
                    <Table.Th>{DAY_OPTIONS_LABEL[day as DayKey]}</Table.Th>
                    <Table.Td>
                      <AttendanceOptionSelect
                        className="w-40"
                        attendanceOptions={attendanceOptions}
                        value={info}
                        onChange={(updatedDayInfo) => {
                          const updatedAttendanceInfo = {
                            ...personResult.data.attendanceInfo,
                            data: {
                              [day]: updatedDayInfo,
                            },
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
                            `result.${personResultIndex}.data.attendanceStatistic`,
                            updatedStatistic,
                          )
                          form.setFieldValue(
                            `result.${personResultIndex}.data.attendanceInfo.${day}`,
                            updatedDayInfo,
                          )

                          if (
                            !form.isDirty(`result.${personResultIndex}.data.badgeId`) ||
                            updatedBadgeId === personResult.data.badgeId
                          ) {
                            setInitialValues({
                              result: result.map((initialPerson) => {
                                if (initialPerson.data?.name === personResult.data.name) {
                                  return {
                                    ...initialPerson,
                                    data: {
                                      ...initialPerson.data,
                                      badgeId: updatedBadgeId,
                                      attendanceInfo: updatedAttendanceInfo,
                                      attendanceStatistic: updatedStatistic,
                                    },
                                  } as EditableParsingResultWithError
                                }

                                return initialPerson
                              }),
                            })
                            form.setFieldValue(
                              `result.${personResultIndex}.data.badgeId`,
                              updatedBadgeId,
                            )
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
          attendanceStatistic={personResult.data.attendanceStatistic}
          className="flex-1"
        />
      </div>
    </>
  )
}
