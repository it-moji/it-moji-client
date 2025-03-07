import { ATTENDANCE_BADGE_MOCK_DATA } from '../api/mocks/badge-list'

export const deleteBadgeDetailOptionInMockData = (targetId: number) => {
  ATTENDANCE_BADGE_MOCK_DATA.forEach((badge, badgeIdx) => {
    badge.options.forEach((option, optionIdx) => {
      ATTENDANCE_BADGE_MOCK_DATA[badgeIdx].options[optionIdx] = option.filter((detailOption) => {
        return detailOption.key !== targetId
      })
    })
  })
}

export { ATTENDANCE_BADGE_TAG } from '../api/endpoint'
