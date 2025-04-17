import { Paper, Table, Title } from '@mantine/core'
import { ATTENDANCE_OPTIONS_LABEL } from '@/entities/attendance-option'
import { type EditableParsingResult, useParsingOptions } from '@/entities/text-parsing'
import { Icon } from '@/shared/ui'

export interface TextParsingResultStatisticProps
  extends Omit<React.JSX.IntrinsicElements['div'], keyof React.PropsWithChildren> {
  attendanceStatistic: EditableParsingResult['attendanceStatistic']
}

export const TextParsingResultStatistic: React.FC<TextParsingResultStatisticProps> = ({
  attendanceStatistic,
  ...props
}) => {
  const options = useParsingOptions()

  return (
    <div {...props}>
      <Title order={4} className="mb-2 flex items-center text-sm font-semibold">
        <Icon query="fluent-emoji:bar-chart" className="mr-2" />
        출석 통계
      </Title>
      <Paper withBorder className="overflow-hidden">
        <Table layout="fixed" withColumnBorders classNames={{ th: 'w-28 font-normal', td: 'h-14' }}>
          <Table.Tbody>
            {attendanceStatistic.map((stat) => (
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
  )
}
