import { createMockHandler } from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import { POST_LIST_MOCK_DATA } from './post-list'

export const deletePostMockHandler = createMockHandler({
  endpoint: POST_ENDPOINT.DETAIL(':id'),
  handler: ({ params }) => {
    const { id } = params
    const targetId = Number(id)

    const targetPostIndex = POST_LIST_MOCK_DATA.findIndex((post) => {
      return post.id === targetId
    })

    if (targetPostIndex < 0) {
      return Promise.resolve({ status: 400 })
    }

    POST_LIST_MOCK_DATA.splice(targetPostIndex, 1)

    return Promise.resolve({ data: {} })
  },
  method: 'delete',
  delay: 1_200,
})
