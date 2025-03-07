import { createMockHandler } from '@/shared/api'
import { PostAttendanceBadgeBodySchema } from '../create-badge'
import { ATTENDANCE_BADGE_ENDPOINT } from '../endpoint'
import { ATTENDANCE_BADGE_MOCK_DATA } from './badge-list'

export const modifyBadgeMockHandler = createMockHandler({
  endpoint: ATTENDANCE_BADGE_ENDPOINT.DETAIL(':badgeId'),
  handler: async ({ request, params }) => {
    const body = await request.json()
    const { data } = PostAttendanceBadgeBodySchema.partial().safeParse(body)

    if (!data) {
      return { status: 400 }
    }

    const targetId = Number(params.badgeId)
    const targetIndex = ATTENDANCE_BADGE_MOCK_DATA.findIndex((badge) => badge.id === targetId)

    if (!targetId) {
      return { status: 400 }
    }

    if (targetIndex < 0) {
      return { status: 404 }
    }

    ATTENDANCE_BADGE_MOCK_DATA[targetIndex] = {
      ...ATTENDANCE_BADGE_MOCK_DATA[targetIndex],
      ...data,
    }

    return { data: null }
  },
})
