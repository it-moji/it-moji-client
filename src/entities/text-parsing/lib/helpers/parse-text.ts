import {
  AttendanceBadgeRangeSchema,
  ATTENDANCE_BADGE_MOCK_DATA,
  type GetAttendanceBadgeDetailResponse,
} from '@/entities/attendance-badge/@x/text-parsing'
import {
  ATTENDANCE_OPTIONS_LABEL,
  AttendanceOptionKeySchema,
  type AttendanceOptionKey,
  type GetAttendanceOptionsAll,
} from '@/entities/attendance-option/@x/text-parsing'
import { Exception } from '@/shared/api'
import { TIL_DEFAULT_BADGE } from '../../config'
import {
  DayKeySchema,
  type EditableParsingResult,
  type AttendanceInfoValue,
  type DayKey,
  type ParsingOptions,
} from '../../model'
import { transformAttendanceInfoToStatistic } from './transform-attendance-info-to-statistic'

/**
 * TIL 템플릿 텍스트에서 작성자 이름을 추출하는 함수입니다.
 *
 * @param text TIL 템플릿 텍스트
 * @param nameIdentifier 이름 판단 기준
 * @param titleDelimiter 키/값 판단 기준
 * @returns TIL 작성자 이름
 */
export const extractName = (
  text: string,
  nameIdentifier: ParsingOptions['name'],
  titleDelimiter: ParsingOptions['delimiter']['title'],
  lineDelimiter: ParsingOptions['delimiter']['line'],
) => {
  const nameLine = text.split(lineDelimiter).find((line) => line.includes(nameIdentifier))

  if (!nameLine) {
    throw new Exception('이름 및 구분자가 올바르게 입력되었는지 확인해주세요')
  }

  return nameLine.split(titleDelimiter)[1].trim()
}

/**
 * TIL 작성 내용(배지 포함)을 기반으로 출석 옵션 키를 결정하는 함수입니다.
 *
 * @param content TIL 작성 내용(배지 포함)
 * @param dayKey 현재 요일을 나타내는 키
 * @returns 출석 옵션 키
 */
export const determineAttendanceOptionKey = (
  content: string,
  dayKey: DayKey,
): AttendanceOptionKey => {
  const isWeekend = dayKey === DayKeySchema.Enum.saturday || dayKey === DayKeySchema.Enum.sunday

  if (content.trim() === '' || content.trim() === TIL_DEFAULT_BADGE) {
    return isWeekend ? AttendanceOptionKeySchema.Enum.rest : AttendanceOptionKeySchema.Enum.absence
  }

  const attendanceKey = AttendanceOptionKeySchema.options.find((optionKey) =>
    content.includes(ATTENDANCE_OPTIONS_LABEL[optionKey]),
  )

  return attendanceKey || AttendanceOptionKeySchema.Enum.attendance
}

/**
 * TIL 템플릿 텍스트에서 요일, TIL 내용을 추출하여 출석 정보를 생성하는 함수입니다.
 *
 * @param text TIL 템플릿 텍스트
 * @param dayMapping 날짜 판단 기준
 * @param titleDelimiter 키/값 분리 기준
 * @param lineDelimiter 개행 분리 기준
 * @param attendanceDetailOptions 출석 상세 옵션
 * @returns 출석 정보
 */
export const generateAttendanceInfo = (
  text: string,
  dayMapping: ParsingOptions['dayMapping'],
  titleDelimiter: ParsingOptions['delimiter']['title'],
  lineDelimiter: ParsingOptions['delimiter']['line'],
  attendanceDetailOptions: ParsingOptions['attendanceDetailOptions'],
): EditableParsingResult['attendanceInfo'] => {
  const attendanceInfo = {} as Record<DayKey, AttendanceInfoValue>

  const lines = text.split(lineDelimiter)

  lines.forEach((line, idx) => {
    if (!Object.values(dayMapping).includes(line.split(titleDelimiter)[0])) {
      return
    }

    const day = line.split(titleDelimiter)[0]
    const dayKey = Object.entries(dayMapping).find(([, value]) => day === value)![0] as DayKey
    const nextLine = lines[idx + 1]

    const content =
      !nextLine || Object.values(dayMapping).includes(nextLine.split(titleDelimiter)[0])
        ? ''
        : line.split(titleDelimiter)[1] + nextLine

    attendanceInfo[dayKey] = {
      key: determineAttendanceOptionKey(content, dayKey),
    }

    attendanceDetailOptions.forEach((badge) => {
      if (content.includes(badge.identifier)) {
        attendanceInfo[dayKey].detailId = badge.id
      }
    })
  })

  if (Object.keys(attendanceInfo).length !== 7) {
    throw new Exception('요일 및 구분자가 올바르게 입력되었는지 확인해주세요')
  }

  return attendanceInfo
}

/**
 * 출석 통계를 기반으로 적절한 배지를 찾고, 해당 배지의 ID를 반환하는 함수입니다.
 *
 * 배지의 조건은 배지 목록의 각 조건(`options`) 그룹과 출석 통계(`attendanceStatistic`)를 비교하여 결정됩니다.
 * - 각 배지의 `options` 그룹이 출석 통계와 일치하는 경우, 해당 배지가 선택됩니다.
 * - 여러 배지가 조건을 충족하면, ID가 가장 낮은 배지를 반환합니다.
 *
 * @param attendanceStatistic 출석 통계
 * @param badgeList 배지 목록
 * @returns 배지 ID (해당하는 배지가 없으면 `null`)
 */
export const getAttendanceBadgeId = (
  attendanceStatistic: EditableParsingResult['attendanceStatistic'],
  badgeList: GetAttendanceBadgeDetailResponse['data'][],
): EditableParsingResult['badgeId'] => {
  const badge = badgeList
    .filter((badge) =>
      badge.options.some((optionGroup) =>
        optionGroup.every(({ key, count, range }) => {
          const stat = attendanceStatistic.find((s) => s.key === key || s.detailId === key)

          if (!stat) {
            return false
          }

          return range === AttendanceBadgeRangeSchema.Enum.more
            ? stat.count >= count
            : stat.count <= count
        }),
      ),
    )
    .sort((a, b) => a.id - b.id)[0]

  return badge?.id || null
}

/**
 * TIL 템플릿 텍스트에서 출석 데이터를 추출하여 반환하는 함수입니다.
 *
 * 1. 텍스트에서 이름 추출
 * 2. 텍스트에서 요일별 출석 정보 추출
 * 3. 출석 정보를 바탕으로 출석 통계 계산
 * 4. 출석 통계를 기준으로 적절한 배지 선택
 *
 * @param text TIL 템플릿 텍스트
 * @param parsingOptions 텍스트 분석 옵션
 * @param attendanceOptions 출석 옵션
 * @returns 텍스트 분석 결과 (출석 데이터)
 */
const generateAttendanceData = (
  text: string,
  parsingOptions: ParsingOptions,
  attendanceOptions: GetAttendanceOptionsAll,
): EditableParsingResult => {
  const name = extractName(
    text,
    parsingOptions.name,
    parsingOptions.delimiter.title,
    parsingOptions.delimiter.line,
  )

  const attendanceInfo = generateAttendanceInfo(
    text,
    parsingOptions.dayMapping,
    parsingOptions.delimiter.title,
    parsingOptions.delimiter.line,
    parsingOptions.attendanceDetailOptions,
  )

  const attendanceStatistic = transformAttendanceInfoToStatistic(attendanceInfo, attendanceOptions)

  const badgeId = getAttendanceBadgeId(attendanceStatistic, ATTENDANCE_BADGE_MOCK_DATA)

  return { name, attendanceInfo, badgeId, attendanceStatistic }
}

/**
 * 원본 텍스트를 인원별로 분리하는 함수입니다.
 *
 * @param text 분석할 원본 텍스트
 * @param personDelimiter 인원 분리 기준
 * @returns 인원별로 분리된 텍스트 배열
 */
export const separatePeople = (
  text: string,
  personDelimiter: ParsingOptions['delimiter']['person'],
) => {
  return text
    .split(personDelimiter)
    .map((p) => p.trim())
    .slice(1)
}

/**
 * 원본 텍스트를 분석하여 모든 인원의 출석 데이터를 배열로 반환하는 함수입니다.
 *
 * @param text 분석할 원본 텍스트
 * @param parsingOptions 텍스트 분석 옵션
 * @param attendanceOptions 출석 옵션
 * @returns 텍스트 분석 결과 (출석 데이터 배열)
 */
export const parseText = (
  text: string,
  parsingOptions: ParsingOptions,
  attendanceOptions: GetAttendanceOptionsAll,
): EditableParsingResult[] => {
  if (text.trim() === '') {
    throw new Exception('분석할 텍스트를 입력해주세요')
  }

  const persons = separatePeople(text, parsingOptions.delimiter.person)

  return persons.map((person) => generateAttendanceData(person, parsingOptions, attendanceOptions))
}
