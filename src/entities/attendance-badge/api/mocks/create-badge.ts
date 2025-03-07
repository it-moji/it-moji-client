import { createMockHandler } from '@/shared/api'
import { PostAttendanceBadgeBodySchema } from '../create-badge'
import { ATTENDANCE_BADGE_ENDPOINT } from '../endpoint'
import { ATTENDANCE_BADGE_MOCK_DATA } from './badge-list'

export const createBadgeMockHandler = createMockHandler({
  endpoint: ATTENDANCE_BADGE_ENDPOINT.LIST,
  handler: async ({ request }) => {
    const body = await request.json()
    const { data } = PostAttendanceBadgeBodySchema.safeParse(body)

    if (!data) {
      return { status: 400 }
    }

    const maxId = Math.max(0, ...ATTENDANCE_BADGE_MOCK_DATA.map((option) => option.id))

    ATTENDANCE_BADGE_MOCK_DATA.push({ id: maxId + 1, ...data })

    return { data: null }
  },
  method: 'post',
  delay: 1_200,
})
