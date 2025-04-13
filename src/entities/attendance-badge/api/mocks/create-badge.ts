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

    ATTENDANCE_BADGE_MOCK_DATA.push({
      id: Math.max(0, ...ATTENDANCE_BADGE_MOCK_DATA.map((badge) => badge.id)) + 1,
      name: data.name,
      icon: data.icon,
      conditionGroups: data.conditionGroups.map((group) => ({
        groupId:
          Math.max(
            0,
            ...ATTENDANCE_BADGE_MOCK_DATA.flatMap(({ conditionGroups }) => {
              return conditionGroups.map(({ groupId }) => groupId)
            }),
          ) + 1,
        conditions: group.map((condition) => ({
          id:
            Math.max(
              0,
              ...ATTENDANCE_BADGE_MOCK_DATA.flatMap((badge) => {
                return badge.conditionGroups.flatMap(({ conditions }) =>
                  conditions.map(({ id }) => id),
                )
              }),
            ) + 1,
          ...condition,
        })),
      })),
    })

    return { data: null }
  },
  method: 'post',
  delay: 1_200,
})
