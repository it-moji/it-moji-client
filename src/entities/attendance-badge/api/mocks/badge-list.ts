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
          { id: 1, key: 'attendance', detailKeyId: 2, count: 0, range: 'less' },
          { id: 2, key: 'rest', detailKeyId: null, count: 1, range: 'less' },
          { id: 3, key: 'attendance', detailKeyId: null, count: 6, range: 'more' },
          { id: 4, key: 'attendance', detailKeyId: 1, count: 5, range: 'more' },
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
          { id: 5, key: 'attendance', detailKeyId: 2, count: 0, range: 'less' },
          { id: 6, key: 'rest', detailKeyId: null, count: 1, range: 'less' },
          { id: 7, key: 'attendance', detailKeyId: null, count: 6, range: 'more' },
          { id: 8, key: 'attendance', detailKeyId: 1, count: 2, range: 'more' },
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
          { id: 9, key: 'attendance', detailKeyId: 2, count: 0, range: 'less' },
          { id: 10, key: 'rest', detailKeyId: null, count: 2, range: 'less' },
          { id: 11, key: 'attendance', detailKeyId: null, count: 5, range: 'more' },
          { id: 12, key: 'attendance', detailKeyId: 1, count: 2, range: 'more' },
        ],
      },
      {
        groupId: 4,
        conditions: [
          { id: 13, key: 'attendance', detailKeyId: 2, count: 0, range: 'less' },
          { id: 14, key: 'rest', detailKeyId: null, count: 1, range: 'less' },
          { id: 15, key: 'attendance', detailKeyId: null, count: 6, range: 'more' },
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
          { id: 16, key: 'attendance', detailKeyId: 2, count: 0, range: 'less' },
          { id: 17, key: 'rest', detailKeyId: null, count: 2, range: 'less' },
          { id: 18, key: 'attendance', detailKeyId: null, count: 5, range: 'more' },
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
          { id: 19, key: 'attendance', detailKeyId: 2, count: 0, range: 'less' },
          { id: 20, key: 'rest', detailKeyId: null, count: 3, range: 'less' },
          { id: 21, key: 'attendance', detailKeyId: null, count: 4, range: 'more' },
        ],
      },
    ],
  },
  {
    id: 6,
    icon: '❌',
    name: '4회 미만 출석',
    conditionGroups: [
      {
        groupId: 6,
        conditions: [
          { id: 22, key: 'attendance', detailKeyId: 2, count: 0, range: 'less' },
          { id: 23, key: 'rest', detailKeyId: null, count: 4, range: 'more' },
        ],
      },
      {
        groupId: 7,
        conditions: [
          { id: 24, key: 'attendance', detailKeyId: 2, count: 0, range: 'less' },
          { id: 25, key: 'attendance', detailKeyId: null, count: 3, range: 'less' },
        ],
      },
    ],
  },
  {
    id: 7,
    icon: '🎉',
    name: '오늘 합류',
    conditionGroups: [
      {
        groupId: 8,
        conditions: [{ id: 16, key: 'attendance', detailKeyId: 2, count: 1, range: 'more' }],
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
