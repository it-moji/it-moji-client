import { createMockHandler } from '@/shared/api'
import { TEXT_PARSING_ENDPOINT } from '../endpoint'
import { ParsingOptionsSchema } from '../../model'
import { PARSING_OPTIONS_MOCK_DATA } from './parsing-options'

export const modifyParsingOptionsMockHandler = createMockHandler({
  endpoint: TEXT_PARSING_ENDPOINT.PARSING_OPTIONS,
  handler: async ({ request }) => {
    const body = await request.json()
    const { data } = ParsingOptionsSchema.safeParse(body)

    if (!data) {
      return { status: 400 }
    }

    Object.assign(PARSING_OPTIONS_MOCK_DATA, data)

    return { data: {} }
  },
  method: 'put',
  delay: 1_200,
})
