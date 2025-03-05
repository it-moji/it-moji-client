import { createMockHandler } from '@/shared/api'
import { PostAttendanceOptionBodySchema } from '../create-detail-option'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'
import { AttendanceOptionKeySchema } from '../../model'
import { OPTION_LIST_MOCK_DATA } from './option-list'

export const createAttendanceDetailOptionMockHandler = createMockHandler({
  endpoint: ATTENDANCE_OPTION_ENDPOINT.PRIMARY(':optionKey'),
  handler: async ({ request, params }) => {
    const body = await request.json()
    const { data } = PostAttendanceOptionBodySchema.safeParse(body)

    if (!data) {
      return { status: 400 }
    }

    const { name } = data

    const { data: optionKey } = AttendanceOptionKeySchema.safeParse(params.optionKey)

    if (!optionKey) {
      return { status: 400 }
    }

    if (!OPTION_LIST_MOCK_DATA[optionKey]) {
      return { status: 404 }
    }

    const allDetailOptions = Object.values(OPTION_LIST_MOCK_DATA).flatMap(
      (option) => option.detailOptions,
    )

    const maxId =
      allDetailOptions.length > 0 ? Math.max(...allDetailOptions.map((opt) => opt.id)) : 0

    OPTION_LIST_MOCK_DATA[optionKey].detailOptions.push({ id: maxId + 1, name })

    return { data: {} }
  },
  method: 'post',
  delay: 1_200,
})
