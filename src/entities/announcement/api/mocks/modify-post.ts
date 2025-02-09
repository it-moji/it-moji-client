import { createMockHandler } from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import { PostBodySchema } from '../../model'
import { MAX_PINNED_POST } from './create-post'
import { POST_LIST_MOCK_DATA } from './post-list'

export const modifyPostMockHandler = createMockHandler({
  endpoint: POST_ENDPOINT.DETAIL(':id'),
  handler: async ({ request, params }) => {
    const body = await request.json()
    const { data } = PostBodySchema.safeParse(body)

    if (!data) {
      return { status: 400 }
    }

    if (
      data.isPinned &&
      POST_LIST_MOCK_DATA.filter((post) => post.isPinned).length >= MAX_PINNED_POST
    ) {
      return { status: 400 }
    }

    const { id } = params
    const targetId = Number(id)

    const targetPostIndex = POST_LIST_MOCK_DATA.findIndex((post) => {
      return post.id === targetId
    })

    if (targetPostIndex < 0) {
      return Promise.resolve({ status: 400 })
    }

    POST_LIST_MOCK_DATA[targetPostIndex] = {
      ...POST_LIST_MOCK_DATA[targetPostIndex],
      ...data,
    }

    return { data: {} }
  },
  method: 'patch',
})
