import type { GetAttendanceOptionsAllResponseData } from '../get-option-list'
import { createMockHandler } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from '../endpoint'

export const OPTION_LIST_MOCK_DATA: GetAttendanceOptionsAllResponseData = {
  attendance: {
    name: '출석',
    detailOptions: [
      {
        id: 1,
        name: '5시간 이상 출석',
      },
    ],
  },
  absence: {
    name: '결석',
    detailOptions: [],
  },
  gap: {
    name: '공결',
    detailOptions: [],
  },
  rest: {
    name: '휴식',
    detailOptions: [],
  },
  vacation: {
    name: '휴가',
    detailOptions: [
      {
        id: 2,
        name: '운영진 휴가',
      },
      {
        id: 3,
        name: '열정멤버 휴가',
      },
    ],
  },
}

export const optionListMockHandler = createMockHandler<GetAttendanceOptionsAllResponseData>({
  endpoint: ATTENDANCE_OPTION_ENDPOINT.LIST,
  handler: () =>
    Promise.resolve({
      data: OPTION_LIST_MOCK_DATA,
    }),
  delay: 300,
})
