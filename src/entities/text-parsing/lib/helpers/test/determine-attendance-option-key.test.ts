import { describe, test, expect } from 'vitest'
import { TIL_DEFAULT_BADGE } from '../../../config'
import { determineAttendanceOptionKey } from '../parse-text'

describe('TIL 작성 내용을 기반으로 출석 옵션 키를 결정한다.', () => {
  test('내용이 작성되어 있으면 "출석"을 반환한다.', () => {
    expect(determineAttendanceOptionKey(`${TIL_DEFAULT_BADGE} TIL 내용 작성`, 'monday')).toBe(
      'attendance',
    )
  })

  test(`내용에 "휴식", "휴가" 등 출석 옵션에 있는 값이 포함되어 있으면 해당 옵션을 반환한다.`, () => {
    expect(determineAttendanceOptionKey(`${TIL_DEFAULT_BADGE} 휴식`, 'monday')).toBe('rest')
    expect(determineAttendanceOptionKey(`${TIL_DEFAULT_BADGE} 휴가`, 'monday')).toBe('vacation')
  })

  test(`주말이 아니며, 작성된 내용 없이 ${TIL_DEFAULT_BADGE} 배지만 있는 경우 "결석"을 반환한다.`, () => {
    expect(determineAttendanceOptionKey(`${TIL_DEFAULT_BADGE} `, 'monday')).toBe('absence')
    expect(determineAttendanceOptionKey(`${TIL_DEFAULT_BADGE} `, 'tuesday')).toBe('absence')
  })

  test(`주말이며, 작성된 내용 없이 ${TIL_DEFAULT_BADGE} 배지만 있는 경우 "휴식"을 반환한다.`, () => {
    expect(determineAttendanceOptionKey(`${TIL_DEFAULT_BADGE} `, 'saturday')).toBe('rest')
    expect(determineAttendanceOptionKey(`${TIL_DEFAULT_BADGE} `, 'sunday')).toBe('rest')
  })
})
