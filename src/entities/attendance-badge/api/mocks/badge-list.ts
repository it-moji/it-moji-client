import { createMockHandler } from '@/shared/api'
import { omit } from '@/shared/lib'
import { ATTENDANCE_BADGE_ENDPOINT } from '../endpoint'
import { type GetAttendanceBadgeListResponse } from '../get-badge-list'
import { type GetAttendanceBadgeListWithConditionsResponseData } from '../get-badge-list-with-conditions'

export const ATTENDANCE_BADGE_MOCK_DATA: GetAttendanceBadgeListWithConditionsResponseData = [
  {
    id: 1,
    icon: '🏆',
    name: '블랙',
    conditionGroups: [
      {
        groupId: 1,
        conditions: [
          { id: 1, key: 'rest', count: 1, range: 'LESS' },
          { id: 2, key: 'attendance', count: 6, range: 'MORE' },
          { id: 3, key: 1, count: 5, range: 'MORE' },
        ],
      },
    ],
  },
  {
    id: 2,
    icon: '🏵️',
    name: '레드',
    conditionGroups: [
      {
        groupId: 2,
        conditions: [
          { id: 4, key: 'rest', count: 1, range: 'LESS' },
          { id: 5, key: 'attendance', count: 6, range: 'MORE' },
          { id: 6, key: 1, count: 2, range: 'MORE' },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: '💎',
    name: '다이아몬드',
    conditionGroups: [
      {
        groupId: 3,
        conditions: [
          { id: 7, key: 'rest', count: 2, range: 'LESS' },
          { id: 8, key: 'attendance', count: 5, range: 'MORE' },
          { id: 9, key: 1, count: 2, range: 'MORE' },
        ],
      },
      {
        groupId: 4,
        conditions: [
          { id: 10, key: 'rest', count: 1, range: 'LESS' },
          { id: 11, key: 'attendance', count: 6, range: 'MORE' },
        ],
      },
    ],
  },
  {
    id: 4,
    icon: '🏅',
    name: '골드',
    conditionGroups: [
      {
        groupId: 5,
        conditions: [
          { id: 12, key: 'rest', count: 2, range: 'LESS' },
          { id: 13, key: 'attendance', count: 5, range: 'MORE' },
        ],
      },
    ],
  },
  {
    id: 5,
    icon: '✅',
    name: '4회 출석',
    conditionGroups: [
      {
        groupId: 6,
        conditions: [
          { id: 14, key: 'rest', count: 3, range: 'LESS' },
          { id: 15, key: 'attendance', count: 4, range: 'MORE' },
        ],
      },
    ],
  },
]

export const badgeListMockHandler = createMockHandler<GetAttendanceBadgeListResponse['data']>({
  endpoint: ATTENDANCE_BADGE_ENDPOINT.LIST,
  handler: () =>
    Promise.resolve({
      data: ATTENDANCE_BADGE_MOCK_DATA.map((data) => omit(data, ['conditionGroups'])),
    }),
  delay: 300,
})
