import { createMockHandler } from '@/shared/api'
import { CreatePostBodySchema } from '../create-post'
import { POST_ENDPOINT } from '../endpoint'
import { PINNED_POST_LIST_MOCK_DATA } from './pinned-post-list'
import { POST_LIST_MOCK_DATA } from './post-list'

const MAX_PINNED_POST = 3

export const createPostMockHandler = createMockHandler({
  endpoint: POST_ENDPOINT.LIST,
  handler: async ({ request }) => {
    const body = await request.json()
    const { data } = CreatePostBodySchema.safeParse(body)

    if (!data) {
      return { data: {}, status: 400 }
    }

    if (data.isPinned && PINNED_POST_LIST_MOCK_DATA.length >= MAX_PINNED_POST) {
      return { data: {}, status: 400 }
    }

    if (data.isPinned) {
      PINNED_POST_LIST_MOCK_DATA.push({
        id: PINNED_POST_LIST_MOCK_DATA.length + 1,
        title: data.title,
        content: data.content,
        postCategory: data.postCategory,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        viewCount: 0,
      })

      return { data: {} }
    }

    POST_LIST_MOCK_DATA.push({
      id: POST_LIST_MOCK_DATA.length + 1,
      title: data.title,
      content: data.content,
      postCategory: data.postCategory,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      viewCount: 0,
    })

    return { data: {} }
  },
  method: 'post',
  delay: 1_200,
})
