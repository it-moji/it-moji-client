import { createMockHandler } from '@/shared/api'
import { PostParsingResultBodySchema } from '../create-parsing-result'
import { TEXT_PARSING_ENDPOINT } from '../endpoint'

export const postParsingResultMockHandler = createMockHandler({
  endpoint: TEXT_PARSING_ENDPOINT.RESULT(':teamId'),
  handler: async ({ request, params }) => {
    const body = await request.json()

    const { data } = PostParsingResultBodySchema.safeParse(body)

    if (!data) {
      return { status: 400 }
    }

    const teamId = Number(params.teamId)

    if (Number.isNaN(teamId)) {
      return { status: 400 }
    }

    return { data: {} }
  },
  method: 'post',
  delay: 1_200,
})
