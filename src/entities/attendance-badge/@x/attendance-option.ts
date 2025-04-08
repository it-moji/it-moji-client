import { ATTENDANCE_BADGE_MOCK_DATA } from '../api/mocks/badge-list'

export const deleteBadgeDetailOptionInMockData = (targetId: number) => {
  ATTENDANCE_BADGE_MOCK_DATA.forEach((badge, badgeIdx) => {
    badge.conditionGroups.forEach((group, groupIndex) => {
      ATTENDANCE_BADGE_MOCK_DATA[badgeIdx].conditionGroups[groupIndex].conditions =
        group.conditions.filter((detailOption) => {
          return detailOption.key !== targetId
        })
    })
  })
}
