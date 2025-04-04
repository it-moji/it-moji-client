import { describe, test, expect } from 'vitest'
import { OPTION_LIST_MOCK_DATA } from '@/entities/attendance-option/@x/text-parsing'
import { PARSING_OPTIONS_MOCK_DATA } from '../../../api'
import { TIL_DEFAULT_BADGE, TIL_MORE_THAN_5_HOURS_BADGE } from '../../../config'
import { determineAttendanceInfo } from '../parse-text'

describe('TIL 작성 내용과 출석 상세 옵션 판단 기준을 기반으로 출석 정보를 결정한다.', () => {
  test('내용이 작성되어 있으면 "출석" 키를 반환한다.', () => {
    expect(
      determineAttendanceInfo(
        `${TIL_DEFAULT_BADGE} TIL 내용 작성`,
        'monday',
        PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toStrictEqual({ key: 'attendance' })
  })

  test('TIL 내용에 출석 상세 옵션 판단 기준과 일치하는 식별자가 있는 경우, 출석 상세 옵션과 출석 상세 옵션의 부모 키를 반환한다.', () => {
    expect(
      determineAttendanceInfo(
        `${TIL_MORE_THAN_5_HOURS_BADGE} TIL 내용 작성`,
        'tuesday',
        PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions.map((option) =>
          option.id === 1 ? { ...option, identifier: TIL_MORE_THAN_5_HOURS_BADGE } : option,
        ),

        OPTION_LIST_MOCK_DATA,
      ),
    ).toStrictEqual({ key: 'attendance', detailId: 1 })
  })

  test(`내용에 "휴식", "휴가" 등 출석 옵션에 있는 값이 포함되어 있으면 해당 옵션을 반환한다.`, () => {
    expect(
      determineAttendanceInfo(
        `${TIL_DEFAULT_BADGE} 휴식`,
        'monday',
        PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toStrictEqual({ key: 'rest' })

    expect(
      determineAttendanceInfo(
        `${TIL_DEFAULT_BADGE} 휴가`,
        'monday',
        PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toStrictEqual({ key: 'vacation' })
  })

  test(`주말이 아니며, 작성된 내용 없이 ${TIL_DEFAULT_BADGE} 배지만 있는 경우 "결석" 키를 반환한다.`, () => {
    expect(
      determineAttendanceInfo(
        `${TIL_DEFAULT_BADGE} `,
        'monday',
        PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toStrictEqual({ key: 'absence' })

    expect(
      determineAttendanceInfo(
        `${TIL_DEFAULT_BADGE} `,
        'tuesday',
        PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toStrictEqual({ key: 'absence' })
  })

  test(`주말이며, 작성된 내용 없이 ${TIL_DEFAULT_BADGE} 배지만 있는 경우 "휴식" 키를 반환한다.`, () => {
    expect(
      determineAttendanceInfo(
        `${TIL_DEFAULT_BADGE} `,
        'saturday',
        PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toStrictEqual({ key: 'rest' })

    expect(
      determineAttendanceInfo(
        `${TIL_DEFAULT_BADGE} `,
        'sunday',
        PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions,
        OPTION_LIST_MOCK_DATA,
      ),
    ).toStrictEqual({ key: 'rest' })
  })
})
