import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_BADGE_ENDPOINT } from '../endpoint'
import { type GetAttendanceBadgeListWithConditionsResponseData } from '../get-badge-list-with-conditions'
import { ATTENDANCE_BADGE_MOCK_DATA } from './badge-list'

export const badgeListWithConditionsMockHandler =
  createMockHandler<GetAttendanceBadgeListWithConditionsResponseData>({
    endpoint: ATTENDANCE_BADGE_ENDPOINT.LIST_WITH_CONDITIONS,
    handler: () =>
      Promise.resolve({
        data: ATTENDANCE_BADGE_MOCK_DATA,
      }),
    delay: 300,
  })
