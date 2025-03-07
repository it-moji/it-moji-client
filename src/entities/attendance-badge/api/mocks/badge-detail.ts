import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_BADGE_ENDPOINT } from '../endpoint'
import { type GetAttendanceBadgeDetailResponse } from '../get-badge-detail'
import { ATTENDANCE_BADGE_MOCK_DATA } from './badge-list'

export const badgeDetailMockHandler = createMockHandler<GetAttendanceBadgeDetailResponse['data']>({
  endpoint: ATTENDANCE_BADGE_ENDPOINT.DETAIL(':badgeId'),
  handler: ({ params }) => {
    const targetId = Number(params.badgeId)
    const targetBadge = ATTENDANCE_BADGE_MOCK_DATA.find((badge) => badge.id === targetId)

    if (Number.isNaN(targetId)) {
      return Promise.resolve({ data: null, status: 400 })
    }

    if (!targetBadge) {
      return Promise.resolve({ data: null, status: 404 })
    }

    return Promise.resolve({ data: targetBadge })
  },
  delay: 800,
})
