import { describe, expect, test } from 'vitest'
import { ATTENDANCE_BADGE_MOCK_DATA } from '@/entities/attendance-badge/@x/text-parsing'
import { getAttendanceBadgeId } from '../parse-text'

describe('출석 통계를 바탕으로 배지를 계산한다.', () => {
  test('배지가 있는 경우 배지 아이디를 반환한다.', () => {
    expect(
      getAttendanceBadgeId(
        [
          { key: 'attendance', detailKeyId: null, count: 4 },
          { key: 'attendance', detailKeyId: 1, count: 2 },
          { key: 'absence', detailKeyId: null, count: 1 },
          { key: 'rest', detailKeyId: null, count: 2 },
        ],
        ATTENDANCE_BADGE_MOCK_DATA,
      ),
    ).toBe(5)

    expect(
      getAttendanceBadgeId(
        [
          { key: 'attendance', detailKeyId: null, count: 5 },
          { key: 'attendance', detailKeyId: 1, count: 2 },
          { key: 'absence', detailKeyId: null, count: 1 },
          { key: 'rest', detailKeyId: null, count: 1 },
        ],
        ATTENDANCE_BADGE_MOCK_DATA,
      ),
    ).toBe(3)

    expect(
      getAttendanceBadgeId(
        [
          { key: 'attendance', detailKeyId: null, count: 7 },
          { key: 'attendance', detailKeyId: 1, count: 2 },
        ],
        ATTENDANCE_BADGE_MOCK_DATA,
      ),
    ).toBe(2)
  })
})
