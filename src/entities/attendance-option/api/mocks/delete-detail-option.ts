import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'
import { OPTION_LIST_MOCK_DATA } from './option-list'

export const deleteAttendanceDetailOptionMockHandler = createMockHandler({
  endpoint: ATTENDANCE_OPTION_ENDPOINT.DETAIL(':detailOptionId'),
  handler: async ({ params }) => {
    const { detailOptionId } = params
    const targetId = Number(detailOptionId)

    const hasDeletedTarget = Object.values(OPTION_LIST_MOCK_DATA).some((option) => {
      const targetIndex = option.detailOptions.findIndex((opt) => opt.id === targetId)

      if (targetIndex !== -1) {
        option.detailOptions.splice(targetIndex, 1)
        return true
      }

      return false
    })

    if (hasDeletedTarget) {
      return { data: {} }
    }

    return { status: 404 }
  },
  method: 'delete',
  delay: 1_200,
})
