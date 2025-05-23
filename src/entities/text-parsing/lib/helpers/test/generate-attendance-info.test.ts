import { describe, expect, test } from 'vitest'
import { OPTION_LIST_MOCK_DATA } from '@/entities/attendance-option/@x/text-parsing'
import { PARSING_OPTIONS_MOCK_DATA } from '../../../api'
import { TIL_MORE_THAN_5_HOURS_BADGE } from '../../../config'
import { generateAttendanceInfo } from '../parse-text'
import { createTestData } from './create-test-data'

describe('날짜 판단 기준과 키/값 분리 기준을 사용해 요일별 출석 정보를 추출한다.', () => {
  const testCases = [
    {
      name: '홍길동',
      titleDelimiter: ':',
      dayMapping: PARSING_OPTIONS_MOCK_DATA.dayMapping,
    },
    {
      name: '김철수',
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
      identifier: TIL_MORE_THAN_5_HOURS_BADGE,
    },
  ]

  const expectedResult = {
    monday: {
      key: 'attendance',
      detailKeyId: 1,
    },
    tuesday: {
      key: 'attendance',
      detailKeyId: 1,
    },
    wednesday: {
      key: 'absence',
      detailKeyId: null,
    },
    thursday: {
      key: 'attendance',
      detailKeyId: null,
    },
    friday: {
      key: 'rest',
      detailKeyId: null,
    },
    saturday: {
      key: 'attendance',
      detailKeyId: null,
    },
    sunday: {
      key: 'rest',
      detailKeyId: null,
    },
  }

  test.each(testCases)(
    '날짜 판단 기준: $dayMapping.monday, 키/값 판단 기준: $titleDelimiter',
    ({ name, dayMapping }) => {
      const testData = createTestData({ name, dayMapping })
      const result = generateAttendanceInfo(
        testData,
        dayMapping,
        ':',
        attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      )

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
      generateAttendanceInfo(
        testDataWithEmptyString,
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        ':',
        attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toThrow()

    expect(() =>
      generateAttendanceInfo(
        testDataWithWrongString,
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        ':',
        attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toThrow()
  })

  test('키/값 분리 기준이 올바르게 작성되어 있지 않은 경우 예외가 발생한다.', () => {
    const testData = createTestData({ titleDelimiter: '-' })

    expect(() =>
      generateAttendanceInfo(
        testData,
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        ':',
        attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toThrow()
  })
})
