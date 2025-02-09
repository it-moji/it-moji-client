import { createMockHandler } from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import { PostBodySchema } from '../../model'
import { POST_LIST_MOCK_DATA } from './post-list'

export const MAX_PINNED_POST = 3

export const createPostMockHandler = createMockHandler({
  endpoint: POST_ENDPOINT.LIST,
  handler: async ({ request }) => {
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

    POST_LIST_MOCK_DATA.push({
      id: POST_LIST_MOCK_DATA.length + 1,
      title: data.title,
      content: data.content,
      postCategory: data.postCategory,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      viewCount: 0,
      isPinned: data.isPinned,
    })

    return { data: {} }
  },
  method: 'post',
  delay: 1_200,
})
