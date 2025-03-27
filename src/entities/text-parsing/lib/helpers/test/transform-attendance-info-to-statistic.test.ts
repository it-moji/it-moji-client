import { describe, expect, test } from 'vitest'
import type { ParsingOptions } from '@/entities/text-parsing'
import { generateAttendanceInfo, transformAttendanceInfoToStatistic } from '@/entities/text-parsing'
import { PARSING_OPTIONS_MOCK_DATA } from '@/entities/text-parsing/api/mocks/parsing-options'
import { createTestData } from './create-test-data'

describe('요일별 출석 정보를 바탕으로 출석 통계를 계산한다.', () => {
  test('출석 상세 옵션이 있는 경우', () => {
    const attendanceDetailOptions = [
      {
        id: 1,
        name: '5시간 이상 출석',
        identifier: '🎖️',
      },
    ]

    const attendanceInfo = generateAttendanceInfo(
      createTestData({
        dayMapping: PARSING_OPTIONS_MOCK_DATA.dayMapping,
        titleDelimiter: PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      }),
      PARSING_OPTIONS_MOCK_DATA.dayMapping,
      PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      PARSING_OPTIONS_MOCK_DATA.delimiter.line,
      attendanceDetailOptions,
    )

    const attendanceOptions = {
      attendance: {
        name: '출석',
        detailOptions: [
          {
            id: 1,
            name: '5시간 이상 출석',
          },
        ],
      },
      absence: {
        name: '결석',
        detailOptions: [],
      },
      gap: {
        name: '공결',
        detailOptions: [],
      },
      rest: {
        name: '휴식',
        detailOptions: [],
      },
      vacation: {
        name: '휴가',
        detailOptions: [
          {
            id: 2,
            name: '운영진 휴가',
          },
          {
            id: 3,
            name: '열정멤버 휴가',
          },
        ],
      },
    }

    const expectedResult = [
      { key: 'attendance', count: 4 },
      { key: 'attendance', detailId: 1, count: 2 },
      { key: 'absence', count: 1 },
      { key: 'rest', count: 2 },
    ]

    const result = transformAttendanceInfoToStatistic(attendanceInfo, attendanceOptions)
    expect(result).toEqual(expectedResult)
  })

  test('출석 상세 옵션이 없는 경우', () => {
    const attendanceDetailOptions: ParsingOptions['attendanceDetailOptions'] = []

    const attendanceInfo = generateAttendanceInfo(
      createTestData({
        dayMapping: PARSING_OPTIONS_MOCK_DATA.dayMapping,
        titleDelimiter: PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      }),
      PARSING_OPTIONS_MOCK_DATA.dayMapping,
      PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      PARSING_OPTIONS_MOCK_DATA.delimiter.line,
      attendanceDetailOptions,
    )

    const attendanceOptions = {
      attendance: {
        name: '출석',
        detailOptions: [],
      },
      absence: {
        name: '결석',
        detailOptions: [],
      },
      gap: {
        name: '공결',
        detailOptions: [],
      },
      rest: {
        name: '휴식',
        detailOptions: [],
      },
      vacation: {
        name: '휴가',
        detailOptions: [],
      },
    }

    const expectedResult = [
      { key: 'attendance', count: 4 },
      { key: 'absence', count: 1 },
      { key: 'rest', count: 2 },
    ]

    const result = transformAttendanceInfoToStatistic(attendanceInfo, attendanceOptions)
    expect(result).toEqual(expectedResult)
  })
})
