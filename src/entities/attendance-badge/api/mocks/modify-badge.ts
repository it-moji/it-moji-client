import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_BADGE_ENDPOINT } from '../endpoint'
import { PutAttendanceBadgeBodySchema } from '../modify-badge'
import { ATTENDANCE_BADGE_MOCK_DATA } from './badge-list'

export const modifyBadgeMockHandler = createMockHandler({
  endpoint: ATTENDANCE_BADGE_ENDPOINT.DETAIL(':badgeId'),
  handler: async ({ request, params }) => {
    const body = await request.json()
    const { data } = PutAttendanceBadgeBodySchema.safeParse(body)

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
      id: ATTENDANCE_BADGE_MOCK_DATA[targetIndex].id,
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
                return badge.conditionGroups.flatMap(({ conditions }) => {
                  return conditions.map(({ id }) => id)
                })
              }),
            ) + 1,
          ...condition,
        })),
      })),
    }

    return { data: null }
  },
  method: 'put',
  delay: 1_200,
})
