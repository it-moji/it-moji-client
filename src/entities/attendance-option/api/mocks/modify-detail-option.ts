import { updateDetailOptionInTextParsingOptionMockData } from '@/entities/text-parsing/@x/attendance-option'
import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'
import { PutAttendanceOptionBodySchema } from '../modify-detail-option'
import { AttendanceOptionKeySchema } from '../../model'
import { OPTION_LIST_MOCK_DATA } from './option-list'

export const modifyAttendanceDetailOptionMockHandler = createMockHandler({
  endpoint: ATTENDANCE_OPTION_ENDPOINT.DETAIL(':optionKey', ':detailOptionId'),
  handler: async ({ request, params }) => {
    const body = await request.json()
    const { data } = PutAttendanceOptionBodySchema.safeParse(body)

    if (!data) {
      return { status: 400 }
    }

    const { data: optionKey } = AttendanceOptionKeySchema.safeParse(params.optionKey)

    if (!optionKey) {
      return { status: 400 }
    }

    if (!OPTION_LIST_MOCK_DATA[optionKey]) {
      return { status: 404 }
    }

    const { name } = data

    const { detailOptionId } = params
    const targetId = Number(detailOptionId)

    const hasModifiedTarget = Object.values(OPTION_LIST_MOCK_DATA).some((option) => {
      const targetOption = option.detailOptions.find((opt) => opt.id === targetId)

      if (targetOption) {
        targetOption.name = name
        return true
      }

      return false
    })

    if (hasModifiedTarget) {
      updateDetailOptionInTextParsingOptionMockData(targetId, name)

      return { data: {} }
    }

    return { status: 404 }
  },
  method: 'put',
  delay: 1_200,
})
