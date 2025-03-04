import type { GetAttendanceOptionsResponse } from '../get-option-detail'
import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'
import type { AttendanceOptionKey } from '../../model'
import { AttendanceOptionKeySchema } from '../../model'
import { OPTION_LIST_MOCK_DATA } from './option-list'

const generateAttendanceDetailOptionMockHandler = (optionKey: AttendanceOptionKey) =>
  createMockHandler<GetAttendanceOptionsResponse['data']>({
    endpoint: ATTENDANCE_OPTION_ENDPOINT.DETAIL(optionKey),
    handler: () => {
      return Promise.resolve({
        data: OPTION_LIST_MOCK_DATA[optionKey]?.detailOptions || [],
      })
    },
    delay: 300,
  })

export const attendanceOptionDetailMockHandlers = AttendanceOptionKeySchema.options.map(
  (optionKey) => generateAttendanceDetailOptionMockHandler(optionKey),
)
