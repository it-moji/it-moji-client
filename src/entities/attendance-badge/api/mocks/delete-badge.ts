import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_BADGE_ENDPOINT } from '../endpoint'
import { ATTENDANCE_BADGE_MOCK_DATA } from './badge-list'

export const deleteBadgeMockHandler = createMockHandler({
  endpoint: ATTENDANCE_BADGE_ENDPOINT.DETAIL(':badgeId'),
  handler: ({ params }) => {
    const targetId = Number(params.badgeId)
    const targetIndex = ATTENDANCE_BADGE_MOCK_DATA.findIndex((badge) => badge.id === targetId)

    if (!targetId) {
      return Promise.resolve({ status: 400 })
    }

    if (targetIndex < 0) {
      return Promise.resolve({ status: 404 })
    }

    ATTENDANCE_BADGE_MOCK_DATA.splice(targetIndex, 1)

    return Promise.resolve({ data: null })
  },
  method: 'delete',
  delay: 1_200,
})

export const deleteBadgeDetailOptionInMockData = (targetId: number) => {
  ATTENDANCE_BADGE_MOCK_DATA.forEach((badge, badgeIdx) => {
    badge.options.forEach((option, optionIdx) => {
      ATTENDANCE_BADGE_MOCK_DATA[badgeIdx].options[optionIdx] = option.filter((detailOption) => {
        return detailOption.key !== targetId
      })
    })
  })
}
