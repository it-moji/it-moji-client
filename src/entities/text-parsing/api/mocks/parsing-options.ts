import type { GetParsingOptionsResponse } from '../get-parsing-options'
import { createMockHandler } from '@/shared/api'
import { TEXT_PARSING_ENDPOINT } from '../endpoint'

export const PARSING_OPTIONS_MOCK_DATA: GetParsingOptionsResponse['data'] = {
  delimiter: {
    person: '-',
    line: '\n',
    title: ':',
  },
  dayMapping: {
    monday: '월',
    tuesday: '화',
    wednesday: '수',
    thursday: '목',
    friday: '금',
    saturday: '토',
    sunday: '일',
  },
  name: '이름',
  attendanceDetailOptions: [
    {
      id: 1,
      name: '5시간 이상 출석',
      identifier: '5시간 이상 출석',
    },
  ],
}

export const parsingOptionsMockHandler = createMockHandler<GetParsingOptionsResponse['data']>({
  endpoint: TEXT_PARSING_ENDPOINT.PARSING_OPTIONS,
  handler: () => Promise.resolve({ data: PARSING_OPTIONS_MOCK_DATA }),
  delay: 300,
})
