import { transformAttendanceInfoToStatistic } from '@/views/text-parsing'
import {
  AttendanceBadgeRangeSchema,
  type AttendanceBadge,
  type GetAttendanceBadgeDetailResponse,
} from '@/entities/attendance-badge'
import { ATTENDANCE_BADGE_MOCK_DATA } from '@/entities/attendance-badge/api/mocks/badge-list'
import type { GetAttendanceOptionsAll } from '@/entities/attendance-option'
import { ATTENDANCE_OPTIONS_LABEL, AttendanceOptionKeySchema } from '@/entities/attendance-option'
import type { ParsingResult } from '@/entities/text-parsing'
import {
  DayKeySchema,
  type AttendanceInfoValue,
  type DayKey,
  type ParsingOptions,
} from '@/entities/text-parsing'
import { Exception } from '@/shared/api'

export const extractName = (
  text: string,
  nameIdentifier: ParsingOptions['name'],
  titleDelimiter: ParsingOptions['delimiter']['title'],
) => {
  const namePattern = new RegExp(`${nameIdentifier}\\s*${titleDelimiter}\\s*(\\S+)`)
  const match = text.match(namePattern)

  return match ? match[1] : null
}

const getKeyByValue = <T>(obj: Record<string, T>, value: T): string | null => {
  const entry = Object.entries(obj).find(([, val]) => value === val)

  return entry ? entry[0] : null
}

export const extractAttendanceInfoValues = (
  text: string,
  dayMapping: ParsingOptions['dayMapping'],
  titleDelimiter: ParsingOptions['delimiter']['title'],
) => {
  const days = Object.values(dayMapping).join('|')

  const regex = new RegExp(
    `(${days})\\s*${titleDelimiter}\\s*([\\s\\S]*?)(?=(?:${days})${titleDelimiter}|$)`,
    'g',
  )

  const result = []
  let match

  while ((match = regex.exec(text)) !== null) {
    result.push({
      day: getKeyByValue(dayMapping, match[1]) as DayKey,
      content: match[2].trim(),
    })
  }

  if (result.length !== 7) {
    throw new Exception('요일 및 구분자가 올바르게 입력되었는지 확인해주세요')
  }

  return result
}

export const getAttendanceInfo = (
  text: string,
  dayMapping: ParsingOptions['dayMapping'],
  titleDelimiter: ParsingOptions['delimiter']['title'],
  attendanceDetailOptions: ParsingOptions['attendanceDetailOptions'],
) => {
  const rawAttendanceInfo = extractAttendanceInfoValues(text, dayMapping, titleDelimiter)

  const attendanceInfo = DayKeySchema.options.reduce(
    (acc, day) => {
      acc[day] = { key: AttendanceOptionKeySchema.Enum.attendance }

      return acc
    },
    {} as Record<DayKey, AttendanceInfoValue>,
  )

  rawAttendanceInfo.forEach(({ day, content }) => {
    AttendanceOptionKeySchema.options.map((optionKey) => {
      if (content.includes(ATTENDANCE_OPTIONS_LABEL[optionKey])) {
        attendanceInfo[day].key = optionKey
      }
    })

    if (content.trim() === '') {
      if (day === DayKeySchema.Enum.saturday || day === DayKeySchema.Enum.sunday) {
        attendanceInfo[day].key = AttendanceOptionKeySchema.Enum.rest
        return
      } else {
        attendanceInfo[day].key = AttendanceOptionKeySchema.Enum.absence
      }
    }

    attendanceDetailOptions.map((badge) => {
      if (content.includes(badge.identifier)) {
        attendanceInfo[day].detailId = badge.id
      }
    })
  })

  return attendanceInfo
}

export const getAttendanceBadgeId = (
  attendanceStatistic: ParsingResult['attendanceStatistic'],
  badgeList: GetAttendanceBadgeDetailResponse['data'][],
): AttendanceBadge['id'] | null => {
  const badge = badgeList
    .filter((badge) =>
      badge.options.some((optionGroup) =>
        optionGroup.every(({ key, count, range }) => {
          const stat = attendanceStatistic.find((s) => s.key === key || s.detailId === key)
          if (!stat) return false
          return range === AttendanceBadgeRangeSchema.Enum.more
            ? stat.count >= count
            : stat.count <= count
        }),
      ),
    )
    .sort((a, b) => a.id - b.id)[0]

  return badge ? badge.id : null
}

const generateAttendanceData = (
  text: string,
  options: ParsingOptions,
  attendanceOptions: GetAttendanceOptionsAll,
) => {
  const name = extractName(text, options.name, options.delimiter.title)
  const attendanceInfo = getAttendanceInfo(
    text,
    options.dayMapping,
    options.delimiter.title,
    options.attendanceDetailOptions,
  )
  const attendanceStatistic = transformAttendanceInfoToStatistic(attendanceInfo, attendanceOptions)
  const badgeId = getAttendanceBadgeId(attendanceStatistic, ATTENDANCE_BADGE_MOCK_DATA)
  console.log(badgeId)

  return { name, attendanceInfo, badgeId, attendanceStatistic }
}

export const separatePeople = (
  text: string,
  personDelimiter: ParsingOptions['delimiter']['person'],
) => {
  return text
    .split(personDelimiter)
    .map((p) => p.trim())
    .slice(1)
}

export const parseText = (
  text: string,
  options: ParsingOptions,
  attendanceOptions: GetAttendanceOptionsAll,
): ParsingResult[] => {
  const persons = separatePeople(text, options.delimiter.person)

  return persons.map((person) =>
    generateAttendanceData(person, options, attendanceOptions),
  ) as ParsingResult[]
}
