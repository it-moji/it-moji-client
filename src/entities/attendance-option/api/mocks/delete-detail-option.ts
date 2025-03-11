import { deleteBadgeDetailOptionInMockData } from '@/entities/attendance-badge/@x/attendance-option'
import { deleteDetailOptionInTextParsingOptionMockData } from '@/entities/text-parsing/@x/attendance-option'
import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'
import { AttendanceOptionKeySchema } from '../../model'
import { OPTION_LIST_MOCK_DATA } from './option-list'

export const deleteAttendanceDetailOptionMockHandler = createMockHandler({
  endpoint: ATTENDANCE_OPTION_ENDPOINT.DETAIL(':optionKey', ':detailOptionId'),
  handler: ({ params }) => {
    const { data: optionKey } = AttendanceOptionKeySchema.safeParse(params.optionKey)
    const targetId = Number(params.detailOptionId)

    if (!optionKey || Number.isNaN(targetId)) {
      return Promise.resolve({ status: 400 })
    }

    if (!OPTION_LIST_MOCK_DATA[optionKey]) {
      return Promise.resolve({ status: 404 })
    }

    const hasDeletedTarget = Object.values(OPTION_LIST_MOCK_DATA).some((option) => {
      const targetIndex = option.detailOptions.findIndex((opt) => opt.id === targetId)

      if (targetIndex !== -1) {
        OPTION_LIST_MOCK_DATA[optionKey].detailOptions.splice(targetIndex, 1)
        deleteBadgeDetailOptionInMockData(targetId)

        return true
      }

      return false
    })

    if (hasDeletedTarget) {
      deleteDetailOptionInTextParsingOptionMockData(targetId)

      return Promise.resolve({ data: {} })
    }

    return Promise.resolve({ status: 404 })
  },
  method: 'delete',
  delay: 1_200,
})
