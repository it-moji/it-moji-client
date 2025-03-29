import { describe, expect, test } from 'vitest'
import { ATTENDANCE_BADGE_MOCK_DATA } from '@/entities/attendance-badge/@x/text-parsing'
import { getAttendanceBadgeId } from '../parse-text'

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
