import {
  type GetAttendanceBadgeListWithConditionsResponseData,
  AttendanceBadgeRangeSchema,
} from '@/entities/attendance-badge/@x/text-parsing'
import {
  type GetAttendanceOptionsAllResponseData,
  ATTENDANCE_OPTIONS_LABEL,
  AttendanceOptionKeySchema,
} from '@/entities/attendance-option/@x/text-parsing'
import { Exception } from '@/shared/api'
import { DEFAULT_LINE_DELIMITER, TIL_DEFAULT_BADGE } from '../../config'
import type {
  EditableParsingResultWithError,
  EditableParsingResult,
  AttendanceInfoValue,
  DayKey,
  ParsingOptions,
} from '../../model'
import { DayKeySchema, TextParsingException } from '../../model'
import { findParentKeyById } from './find-parent-key-by-id'
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
) => {
  const lines = text.split(DEFAULT_LINE_DELIMITER)

  const nameLineIndex = lines.findIndex((line) => line.includes(nameIdentifier))

  if (nameLineIndex === -1) {
    throw new TextParsingException('이름 판단 기준이 누락되었어요', text, [1])
  }

  const nameLine = lines[nameLineIndex]

  if (nameLine.split(titleDelimiter).length === 1) {
    throw new TextParsingException('이름 키/값 분리 기준이 누락되었어요', text, [nameLineIndex])
  }

  const name = nameLine.split(titleDelimiter)[1].trim()

  return name
}

/**
 * TIL 작성 내용과 출석 상세 옵션 판단 기준을 기반으로 출석 정보를 결정하는 함수입니다.
 *
 * @param content TIL 작성 내용
 * @param dayKey 현재 요일을 나타내는 키
 * @param attendanceDetailOptions 출석 상세 옵션 판단 기준
 * @param attendanceOptions 출석 옵션
 * @returns 출석 정보
 */
export const determineAttendanceInfo = (
  content: string,
  dayKey: DayKey,
  attendanceDetailOptions: ParsingOptions['attendanceDetailOptions'],
  attendanceOptions: GetAttendanceOptionsAllResponseData,
): AttendanceInfoValue => {
  const isWeekend = dayKey === DayKeySchema.Enum.saturday || dayKey === DayKeySchema.Enum.sunday

  if (!content.trim() || content.trim() === TIL_DEFAULT_BADGE) {
    return {
      key: isWeekend ? AttendanceOptionKeySchema.Enum.rest : AttendanceOptionKeySchema.Enum.absence,
      detailKeyId: null,
    }
  }

  const badge = attendanceDetailOptions.find((badge) => content.includes(badge.identifier))

  if (badge) {
    const key = findParentKeyById(badge.id, attendanceOptions)

    return {
      key: key || AttendanceOptionKeySchema.Enum.attendance,
      detailKeyId: badge.id,
    }
  }

  const attendanceKey = AttendanceOptionKeySchema.options.find((optionKey) =>
    content.includes(ATTENDANCE_OPTIONS_LABEL[optionKey]),
  )

  return { key: attendanceKey || AttendanceOptionKeySchema.Enum.attendance, detailKeyId: null }
}

/**
 * 주어진 텍스트에서 날짜(요일)을 찾는 함수입니다.
 *
 * @param line 날짜(요일)을 찾을 텍스트(한 줄)
 * @param dayMapping 날짜 판단 기준
 * @param titleDelimiter 키/값 분리 기준
 * @returns 날짜(요일) 반환 (찾지 못한 경우 `undefined`)
 */
export const findDayInLine = (
  line: string,
  dayMapping: ParsingOptions['dayMapping'],
  titleDelimiter: ParsingOptions['delimiter']['title'],
) => {
  const titleDelimiterIndex = line.indexOf(titleDelimiter)

  if (titleDelimiterIndex === -1) {
    return
  }

  const day = Object.values(dayMapping).find((day) =>
    line.slice(0, titleDelimiterIndex).includes(day),
  )

  return day
}

/**
 * TIL 템플릿 텍스트에서 요일, TIL 내용을 추출하여 출석 정보를 생성하는 함수입니다.
 *
 * @param text TIL 템플릿 텍스트
 * @param dayMapping 날짜 판단 기준
 * @param titleDelimiter 키/값 분리 기준
 * @param attendanceDetailOptions 출석 상세 옵션 판단 기준
 * @param attendanceOptions 출석 옵션
 * @returns 출석 정보
 */
export const generateAttendanceInfo = (
  text: string,
  dayMapping: ParsingOptions['dayMapping'],
  titleDelimiter: ParsingOptions['delimiter']['title'],
  attendanceDetailOptions: ParsingOptions['attendanceDetailOptions'],
  attendanceOptions: GetAttendanceOptionsAllResponseData,
): EditableParsingResult['attendanceInfo'] => {
  const attendanceInfo = {} as Record<DayKey, AttendanceInfoValue>

  const lines = text.split(DEFAULT_LINE_DELIMITER)

  lines.forEach((line, idx) => {
    const day = findDayInLine(line, dayMapping, titleDelimiter)

    if (!day) {
      return
    }

    const dayKey = Object.entries(dayMapping).find(([, value]) => day === value)![0] as DayKey
    const nextLine = lines[idx + 1]

    const content =
      line.split(titleDelimiter)[1] +
      (!nextLine || findDayInLine(nextLine, dayMapping, titleDelimiter) ? '' : nextLine)

    attendanceInfo[dayKey] = determineAttendanceInfo(
      content,
      dayKey,
      attendanceDetailOptions,
      attendanceOptions,
    )
  })

  if (Object.keys(attendanceInfo).length !== 7) {
    const parsedDays = new Set(Object.keys(attendanceInfo))

    const missingDays: string[] = Object.entries(dayMapping)
      .filter(([dayKey]) => !parsedDays.has(dayKey))
      .map(([, mappedValue]) => mappedValue)

    const errorLineIndexArray = lines
      .map((line, idx) => (missingDays.some((day) => line.includes(day)) ? idx : null))
      .filter((idx) => idx !== null)

    throw new TextParsingException(
      errorLineIndexArray.length > 0
        ? '날짜 키/값 분리 기준이 누락되었을 수 있어요'
        : '날짜 판단 기준과 키/값 분리 기준이 올바르게 입력되었는지 확인해주세요',
      text,
      errorLineIndexArray,
    )
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
  badgeList: GetAttendanceBadgeListWithConditionsResponseData,
): EditableParsingResult['badgeId'] => {
  const badge = badgeList
    .filter((badge) =>
      badge.conditionGroups.some(({ conditions }) =>
        conditions.every(({ key, detailKeyId, count, range }) => {
          const stat = attendanceStatistic.find((s) => {
            if (detailKeyId) {
              return s.key === key && s.detailKeyId === detailKeyId
            }

            return s.key === key
          })

          if (range === AttendanceBadgeRangeSchema.Enum.more) {
            return (stat?.count || 0) >= count
          }

          return (stat?.count || 0) <= count
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
 * @param badgeList 배지 정보
 * @returns 추출된 분석 데이터와 분석 도중 발생한 예외 리스트를 포함한 텍스트 분석 결과 객체
 */
const generateAttendanceData = (
  text: string,
  parsingOptions: ParsingOptions,
  attendanceOptions: GetAttendanceOptionsAllResponseData,
  badgeList: GetAttendanceBadgeListWithConditionsResponseData,
): EditableParsingResultWithError => {
  const exceptionList: TextParsingException[] = []

  const result: Partial<EditableParsingResult> = {}

  try {
    result.name = extractName(text, parsingOptions.name, parsingOptions.delimiter.title)
  } catch (error: unknown) {
    if (error instanceof TextParsingException) {
      exceptionList.push(error)
    } else {
      throw error
    }
  }

  try {
    const attendanceInfo = generateAttendanceInfo(
      text,
      parsingOptions.dayMapping,
      parsingOptions.delimiter.title,
      parsingOptions.attendanceDetailOptions,
      attendanceOptions,
    )

    const attendanceStatistic = transformAttendanceInfoToStatistic(
      attendanceInfo,
      attendanceOptions,
    )

    const badgeId = getAttendanceBadgeId(attendanceStatistic, badgeList)

    result.attendanceInfo = attendanceInfo
    result.attendanceStatistic = attendanceStatistic
    result.badgeId = badgeId
  } catch (error: unknown) {
    if (error instanceof TextParsingException) {
      exceptionList.push(error)
    } else {
      throw error
    }
  }

  if (
    exceptionList.length > 0 ||
    result.name === null ||
    !result.attendanceInfo ||
    !result.attendanceStatistic ||
    !result.badgeId
  ) {
    return { data: null, error: exceptionList }
  }

  return { data: result as EditableParsingResult, error: null }
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
 * @param badgeList 배지 정보
 * @returns 텍스트 분석 결과 (출석 데이터 배열)
 */
export const parseText = (
  text: string,
  parsingOptions: ParsingOptions,
  attendanceOptions: GetAttendanceOptionsAllResponseData,
  badgeList: GetAttendanceBadgeListWithConditionsResponseData,
): EditableParsingResultWithError[] => {
  const persons = separatePeople(text, parsingOptions.delimiter.person)

  if (persons.length === 0) {
    throw new Exception('인원 분리 기준이 누락되었어요')
  }

  return persons.map((person) => {
    return generateAttendanceData(person, parsingOptions, attendanceOptions, badgeList)
  })
}
