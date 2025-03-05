import type { GetAttendanceOptionsResponse } from '../get-option-detail'
import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'
import { AttendanceOptionKeySchema } from '../../model'
import { OPTION_LIST_MOCK_DATA } from './option-list'

export const attendanceOptionDetailMockHandler = createMockHandler<
  GetAttendanceOptionsResponse['data']
>({
  endpoint: ATTENDANCE_OPTION_ENDPOINT.PRIMARY(':optionKey'),
  handler: ({ params }) => {
    const { data: optionKey } = AttendanceOptionKeySchema.safeParse(params.optionKey)

    if (!optionKey) {
      return Promise.resolve({ data: null, status: 400 })
    }

    if (!OPTION_LIST_MOCK_DATA[optionKey]) {
      return Promise.resolve({ data: null, status: 404 })
    }

    return Promise.resolve({
      data: OPTION_LIST_MOCK_DATA[optionKey].detailOptions,
    })
  },
  delay: 300,
})
