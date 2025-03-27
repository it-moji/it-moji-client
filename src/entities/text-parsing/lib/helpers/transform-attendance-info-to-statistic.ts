import type { GetAttendanceOptionsAll } from '@/entities/attendance-option'
import type { AttendanceStatisticValue, ParsingResult } from '@/entities/text-parsing'

const generateAttendanceStatsMap = (
  attendanceInfo: ParsingResult['attendanceInfo'],
): Map<string, AttendanceStatisticValue> => {
  const statsMap = new Map<string, AttendanceStatisticValue>()

  Object.values(attendanceInfo).forEach(({ key, detailId }) => {
    const statKey = detailId ? `${key}-${detailId}` : key

    if (!statsMap.has(statKey)) {
      statsMap.set(statKey, { key, detailId, count: 0 })
    }

    statsMap.get(statKey)!.count += 1

    if (detailId) {
      if (!statsMap.has(key)) {
        statsMap.set(key, { key, detailId: undefined, count: 0 })
      }

      statsMap.get(key)!.count += 1
    }
  })

  return statsMap
}

const flattenAttendanceOptionStructure = (attendanceOptions: GetAttendanceOptionsAll) => {
  return Object.entries(attendanceOptions).flatMap(([key, { detailOptions }]) => [
    { key, detailId: undefined, count: 0 } as AttendanceStatisticValue,
    ...detailOptions.map(({ id }) => ({ key, detailId: id, count: 0 }) as AttendanceStatisticValue),
  ])
}

const mergeStatsToFlattenedArray = (
  array: AttendanceStatisticValue[],
  statsMap: Map<string, AttendanceStatisticValue>,
) => {
  return array // 이름 수정
    .map((item) => {
      const statKey = item.detailId ? `${item.key}-${item.detailId}` : item.key
      const stat = statsMap.get(statKey)

      if (stat) {
        item.count = stat.count
      }

      return item
    })
    .filter((item) => item.count !== 0)
}

export const transformAttendanceInfoToStatistic = (
  attendanceInfo: ParsingResult['attendanceInfo'],
  attendanceOptions: GetAttendanceOptionsAll,
) => {
  const flattenedAttendanceOptions = flattenAttendanceOptionStructure(attendanceOptions)
  const statsMap = generateAttendanceStatsMap(attendanceInfo)
  const sortedStatsArray = mergeStatsToFlattenedArray(flattenedAttendanceOptions, statsMap)

  return sortedStatsArray
}
