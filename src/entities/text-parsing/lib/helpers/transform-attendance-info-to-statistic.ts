import type { GetAttendanceOptionsAll } from '@/entities/attendance-option'
import type { AttendanceStatisticValue, ParsingResult } from '@/entities/text-parsing'

/**
 * 출석 정보를 바탕으로 출석 통계 Map을 생성하는 함수입니다.
 *
 * 출석 기본 옵션과 상세 옵션에 대해 고유한 키를 생성하고, 각 옵션의 수를 계산합니다.
 *
 * @param attendanceInfo 출석 정보
 * @returns 출석 통계 Map
 *
 * @example
 * generateAttendanceStatsMap({ monday: { key: attendance }, tuesday: { key: attendance, detailId: 1 }})
 * // Map(2) { 'attendance-1' => { key: 'attendance', detailId: 1, count: 2 }, 'attendance' => { key: 'attendance', detailId: undefined, count: 2 }}
 */
const generateAttendanceStatsMap = (
  attendanceInfo: ParsingResult['attendanceInfo'],
): Map<string, AttendanceStatisticValue> => {
  const statsMap = new Map<string, AttendanceStatisticValue>()

  Object.values(attendanceInfo).forEach(({ key, detailId }) => {
    const statKey = detailId ? `${key}-${detailId}` : key

    const statValue = statsMap.get(statKey)?.count || 0
    statsMap.set(statKey, { key, detailId, count: statValue + 1 })

    if (detailId) {
      const statValue = statsMap.get(key)?.count || 0
      statsMap.set(key, { key, detailId, count: statValue + 1 })
    }
  })

  return statsMap
}

/**
 * 출석 옵션을 평탄화하는 함수입니다.
 *
 * 중첩된 출석 옵션 객체(기본 옵션-상세 옵션)를 출석 통계 value(`AttendanceStatisticValue`) 형태와 일치하도록 평탄화합니다.
 *
 * @example
 * flattenAttendanceOptionsStructure(
 *   attendance: {
 *     name: '출석',
 *     detailOptions: [{ id: 1, name: '5시간 이상 출석' }],
 *   },
 * )
 * // [ { key: 'attendance', count: 0 }, { key: 'attendance', detailId: 1, count: 0 }]
 *
 * @param attendanceOptions 출석 옵션
 * @returns 평탄화된 출석 옵션 (초기 count가 0으로 설정된 출석 통계 항목)
 */
const flattenAttendanceOptionStructure = (
  attendanceOptions: GetAttendanceOptionsAll,
): AttendanceStatisticValue[] =>
  Object.entries(attendanceOptions).flatMap(([key, { detailOptions }]) => [
    { key, count: 0 } as AttendanceStatisticValue,
    ...detailOptions.map(({ id }) => ({ key, detailId: id, count: 0 }) as AttendanceStatisticValue),
  ])

/**
 * 계산된 통계를 평탄화된 출석 옵션과 병합하는 함수입니다.
 *
 * 평탄화된 출석 옵션에 출석 정보 통계 Map을 병합함으로써 출석 통계 항목의 순서를 출석 옵션과 일관되게 유지합니다.
 * 통계 맵의 count로 평탄화된 출석 옵션의 개수를 업데이트하고, 개수가 0인 항목을 필터링합니다.
 *
 * @param flattenedAttendanceOptions 평탄화된 출석 옵션
 * @param statsMap 출석 옵션 별 횟수를 저장한 Map 객체
 * @returns 출석 횟수가 반영된 최종 출석 통계 배열
 */
const mergeStatsToFlattenedAttendanceOptions = (
  flattenedAttendanceOptions: AttendanceStatisticValue[],
  statsMap: Map<string, AttendanceStatisticValue>,
): ParsingResult['attendanceStatistic'] =>
  flattenedAttendanceOptions
    .map((item) => {
      const statKey = item.detailId ? `${item.key}-${item.detailId}` : item.key
      const stat = statsMap.get(statKey)

      if (stat) {
        return { ...item, count: stat.count }
      }

      return item
    })
    .filter((item) => item.count !== 0)

/**
 * 출석 정보를 기반으로 최종 출석 통계를 계산하는 함수입니다.
 *
 * @param attendanceInfo 출석 정보
 * @param attendanceOptions 출석 옵션
 * @returns 출석 통계
 */
export const transformAttendanceInfoToStatistic = (
  attendanceInfo: ParsingResult['attendanceInfo'],
  attendanceOptions: GetAttendanceOptionsAll,
) => {
  const flattenedAttendanceOptions = flattenAttendanceOptionStructure(attendanceOptions)
  const statsMap = generateAttendanceStatsMap(attendanceInfo)
  const sortedStatsArray = mergeStatsToFlattenedAttendanceOptions(
    flattenedAttendanceOptions,
    statsMap,
  )

  return sortedStatsArray
}
