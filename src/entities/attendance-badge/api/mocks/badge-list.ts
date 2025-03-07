import { createMockHandler } from '@/shared/api'
import { omit } from '@/shared/lib'
import { ATTENDANCE_BADGE_ENDPOINT } from '../endpoint'
import { type GetAttendanceBadgeDetailResponse } from '../get-badge-detail'
import { type GetAttendanceBadgeListResponse } from '../get-badge-list'

export const ATTENDANCE_BADGE_MOCK_DATA: GetAttendanceBadgeDetailResponse['data'][] = [
  {
    id: 1,
    icon: '🏆',
    name: '블랙',
    options: [
      [
        { key: 'rest', count: 1, range: 'less' },
        { key: 'attendance', count: 6, range: 'more' },
        { key: 1, count: 5, range: 'more' },
      ],
    ],
  },
  {
    id: 2,
    icon: '🏵️',
    name: '레드',
    options: [
      [
        { key: 'rest', count: 1, range: 'less' },
        { key: 'attendance', count: 6, range: 'more' },
        { key: 1, count: 2, range: 'more' },
      ],
    ],
  },
  {
    id: 3,
    icon: '💎',
    name: '다이아몬드',
    options: [
      [
        { key: 'rest', count: 2, range: 'less' },
        { key: 'attendance', count: 5, range: 'more' },
        { key: 1, count: 2, range: 'more' },
      ],
      [
        { key: 'rest', count: 1, range: 'less' },
        { key: 'attendance', count: 6, range: 'more' },
      ],
    ],
  },
  {
    id: 4,
    icon: '🏅',
    name: '골드',
    options: [
      [
        { key: 'rest', count: 2, range: 'less' },
        { key: 'attendance', count: 5, range: 'more' },
      ],
    ],
  },
  {
    id: 5,
    icon: '✅',
    name: '4회 출석',
    options: [
      [
        { key: 'rest', count: 3, range: 'less' },
        { key: 'attendance', count: 4, range: 'more' },
      ],
    ],
  },
]

export const badgeListMockHandler = createMockHandler<GetAttendanceBadgeListResponse['data']>({
  endpoint: ATTENDANCE_BADGE_ENDPOINT.LIST,
  handler: () =>
    Promise.resolve({
      data: ATTENDANCE_BADGE_MOCK_DATA.map((data) => omit(data, ['options'])),
    }),
  delay: 300,
})
