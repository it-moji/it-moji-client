import { createMockHandler } from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import type { PostDetail } from '../../model'
import { POST_LIST_MOCK_DATA } from './post-list'

export const postDetailMockHandler = createMockHandler<PostDetail>({
  endpoint: POST_ENDPOINT.DETAIL(':id'),
  handler: ({ params }) => {
    const { id } = params
    const targetId = Number(id)
    const targetPostIndex = POST_LIST_MOCK_DATA.findIndex((post) => {
      return post.id === targetId
    })

    if (targetPostIndex < 0) {
      return Promise.resolve({ data: null, status: 404 })
    }

    const targetPost = POST_LIST_MOCK_DATA[targetPostIndex]
    const prevPost = POST_LIST_MOCK_DATA[targetPostIndex - 1]
    const nextPost = POST_LIST_MOCK_DATA[targetPostIndex + 1]

    POST_LIST_MOCK_DATA[targetPostIndex].viewCount += 1

    return Promise.resolve({
      data: {
        ...targetPost,
        related: {
          prev: prevPost
            ? { id: prevPost.id, title: prevPost.title, createdAt: prevPost.createdAt }
            : null,
          next: nextPost
            ? { id: nextPost.id, title: nextPost.title, createdAt: nextPost.createdAt }
            : null,
        },
      },
    })
  },
  delay: 400,
})
