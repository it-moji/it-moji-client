import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'
import { PutAttendanceOptionBodySchema } from '../modify-detail-option'
import { OPTION_LIST_MOCK_DATA } from './option-list'

export const modifyAttendanceDetailOptionMockHandler = createMockHandler({
  endpoint: ATTENDANCE_OPTION_ENDPOINT.DETAIL(':detailOptionId'),
  handler: async ({ request, params }) => {
    const body = await request.json()
    const { data } = PutAttendanceOptionBodySchema.safeParse(body)

    if (!data) {
      return { status: 400 }
    }

    const { name } = data
    const { detailOptionId } = params
    const targetId = Number(detailOptionId)

    for (const option of Object.values(OPTION_LIST_MOCK_DATA)) {
      const targetOption = option.detailOptions.find((opt) => opt.id === targetId)

      if (targetOption) {
        targetOption.name = name
        return { data: {} }
      }
    }

    return { status: 404 }
  },
  method: 'put',
  delay: 1_200,
})
