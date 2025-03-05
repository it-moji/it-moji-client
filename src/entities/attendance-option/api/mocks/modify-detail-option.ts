import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'
import { PutAttendanceOptionBodySchema } from '../modify-detail-option'
import { AttendanceOptionKeySchema } from '../../model'
import { OPTION_LIST_MOCK_DATA } from './option-list'

export const modifyAttendanceDetailOptionMockHandler = createMockHandler({
  endpoint: ATTENDANCE_OPTION_ENDPOINT.DETAIL(':optionKey'),
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

    OPTION_LIST_MOCK_DATA[optionKey].detailOptions = data

    return { data: {} }
  },
  method: 'put',
  delay: 1_200,
})
