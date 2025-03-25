import { describe, expect, test } from 'vitest'
import {
  extractName,
  getAttendanceBadgeId,
  getAttendanceInfo,
  separatePeople,
} from '@/views/text-parsing'
import { transformAttendanceInfoToStatistic } from '@/views/text-parsing'
import { ATTENDANCE_BADGE_MOCK_DATA } from '@/entities/attendance-badge/api/mocks/badge-list'
import type { ParsingOptions } from '@/entities/text-parsing'
import { PARSING_OPTIONS_MOCK_DATA } from '@/entities/text-parsing/api/mocks/parsing-options'
import { createTestData, createTestDataList } from './create-test-data'

describe('인원 분리 기준을 사용해 인원 목록을 분리한다.', () => {
  const testCases = [
    {
      nameList: ['이름1', '이름2'],
      personDelimiter: '—',
    },
    {
      nameList: ['이름1', '이름2'],
      personDelimiter: '_',
    },
    {
      nameList: ['이름1', '이름2'],
      personDelimiter: '&',
    },
  ]

  test.each(testCases)('인원 분리 기준: $personDelimiter', ({ nameList, personDelimiter }) => {
    const testData = createTestDataList({ nameList, personDelimiter })
    const result = separatePeople(testData, personDelimiter)

    expect(result).toHaveLength(nameList.length)
  })
})

describe('이름 판단 기준과 키/값 판단 기준을 사용해 이름을 추출한다.', () => {
  const testCases = [
    { name: '이름', nameIdentifier: '이름', titleDelimiter: ':' },
    { name: '이름', nameIdentifier: '성명', titleDelimiter: ':' },
    { name: '이름', nameIdentifier: '이름', titleDelimiter: '-' },
  ]

  test.each(testCases)(
    '이름 판단 기준: $nameIdentifier, 키/값 판단 기준: $titleDelimiter',
    ({ name, nameIdentifier, titleDelimiter }) => {
      const testData = createTestData({ name, nameIdentifier, titleDelimiter })
      const result = extractName(testData, nameIdentifier, titleDelimiter)

      expect(result).toEqual(name)
    },
  )
})

describe('날짜 판단 기준과 키/값 분리 기준을 사용해 요일별 출석 정보를 추출한다.', () => {
  const testCases = [
    {
      name: '이름',
      titleDelimiter: ':',
      dayMapping: PARSING_OPTIONS_MOCK_DATA.dayMapping,
    },
    {
      name: '이름',
      titleDelimiter: '-',
      dayMapping: {
        monday: '월요일',
        tuesday: '화요일',
        wednesday: '수요일',
        thursday: '목요일',
        friday: '금요일',
        saturday: '토요일',
        sunday: '일요일',
      },
    },
  ]

  const attendanceDetailOptions = [
    {
      id: 1,
      name: '5시간 이상 출석',
      identifier: '🎖️',
    },
  ]

  const expectedResult = {
    monday: {
      key: 'attendance',
      detailId: 1,
    },
    tuesday: {
      key: 'attendance',
      detailId: 1,
    },
    wednesday: {
      key: 'absence',
    },
    thursday: {
      key: 'attendance',
    },
    friday: {
      key: 'rest',
    },
    saturday: {
      key: 'attendance',
    },
    sunday: {
      key: 'rest',
    },
  }

  test.each(testCases)(
    '날짜 판단 기준: $dayMapping.monday, 키/값 판단 기준: $titleDelimiter',
    ({ name, dayMapping }) => {
      const testData = createTestData({ name, dayMapping })
      const result = getAttendanceInfo(testData, dayMapping, ':', attendanceDetailOptions)

      expect(result).toStrictEqual(expectedResult)
    },
  )

  test('요일이 올바르게 작성되어 있지 않은 경우 예외가 발생한다.', () => {
    const testDataWithEmptyString = createTestData({
      dayMapping: {
        monday: '',
        tuesday: '화',
        wednesday: '수',
        thursday: '목',
        friday: '',
        saturday: '토',
        sunday: '일',
      },
    })

    const testDataWithWrongString = createTestData({
      dayMapping: {
        monday: '김',
        tuesday: '화',
        wednesday: '수',
        thursday: '목',
        friday: '금',
        saturday: '토',
        sunday: '일',
      },
    })

    expect(() =>
      getAttendanceInfo(
        testDataWithEmptyString,
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        ':',
        attendanceDetailOptions,
      ),
    ).toThrow()

    expect(() =>
      getAttendanceInfo(
        testDataWithWrongString,
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        ':',
        attendanceDetailOptions,
      ),
    ).toThrow()
  })

  test('키/값 분리 기준이 올바르게 작성되어 있지 않은 경우 예외가 발생한다.', () => {
    const testData = createTestData({ titleDelimiter: '-' })

    expect(() =>
      getAttendanceInfo(
        testData,
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        ':',
        attendanceDetailOptions,
      ),
    ).toThrow()
  })
})

describe('요일별 출석 정보를 바탕으로 출석 통계를 계산한다.', () => {
  test('출석 상세 옵션이 있는 경우', () => {
    const attendanceDetailOptions = [
      {
        id: 1,
        name: '5시간 이상 출석',
        identifier: '🎖️',
      },
    ]

    const attendanceInfo = getAttendanceInfo(
      createTestData({
        dayMapping: PARSING_OPTIONS_MOCK_DATA.dayMapping,
        titleDelimiter: PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      }),
      PARSING_OPTIONS_MOCK_DATA.dayMapping,
      PARSING_OPTIONS_MOCK_DATA.delimiter.title,
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

    const attendanceInfo = getAttendanceInfo(
      createTestData({
        dayMapping: PARSING_OPTIONS_MOCK_DATA.dayMapping,
        titleDelimiter: PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      }),
      PARSING_OPTIONS_MOCK_DATA.dayMapping,
      PARSING_OPTIONS_MOCK_DATA.delimiter.title,
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

describe('출석 통계를 바탕으로 배지를 계산한다.', () => {
  test('배지가 있는 경우 배지 아이디를 반환한다.', () => {
    expect(
      getAttendanceBadgeId(
        [
          { key: 'attendance', count: 4 },
          { key: 'attendance', detailId: 1, count: 2 },
          { key: 'absence', count: 1 },
          { key: 'rest', count: 2 },
        ],
        ATTENDANCE_BADGE_MOCK_DATA,
      ),
    ).toBe(5)

    expect(
      getAttendanceBadgeId(
        [
          { key: 'attendance', count: 5 },
          { key: 'attendance', detailId: 1, count: 2 },
          { key: 'absence', count: 1 },
          { key: 'rest', count: 1 },
        ],
        ATTENDANCE_BADGE_MOCK_DATA,
      ),
    ).toBe(3)
  })

  test('배지가 없는 경우 null을 반환한다.', () => {
    expect(
      getAttendanceBadgeId(
        [
          { key: 'attendance', count: 3 },
          { key: 'attendance', detailId: 1, count: 2 },
          { key: 'absence', count: 1 },
          { key: 'rest', count: 2 },
        ],
        ATTENDANCE_BADGE_MOCK_DATA,
      ),
    ).toBeNull()
  })
})
