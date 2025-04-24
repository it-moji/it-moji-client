import { createMockHandler, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import {
  type SearchPostResponse,
  type SearchPostType,
  SearchPostTypeSchema,
  SearchPostParamsSchema,
} from '../../api'
import type { PostDetail } from '../../model'
import { POST_LIST_MOCK_DATA } from './post-list'

export const searchPostMockHandler = createMockHandler<SearchPostResponse['data']>({
  endpoint: POST_ENDPOINT.SEARCH,
  handler: ({ request }) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const query = searchParams.get(SearchPostParamsSchema.Enum.query) || ''
    const type =
      SearchPostTypeSchema.safeParse(searchParams.get(SearchPostParamsSchema.Enum.type))?.data ||
      null
    const page = Number(searchParams.get(SearchPostParamsSchema.Enum.page)) || DEFAULT_PAGE
    const size = Number(searchParams.get(SearchPostParamsSchema.Enum.size)) || DEFAULT_PAGE_SIZE

    const filter: Record<SearchPostType, (post: Pick<PostDetail, 'title' | 'content'>) => unknown> =
      {
        [SearchPostTypeSchema.Enum.TITLE]: (post) => post.title.includes(query),
        [SearchPostTypeSchema.Enum.CONTENT]: (post) => post.content.includes(query),
        [SearchPostTypeSchema.Enum.TITLE_CONTENT]: (post) =>
          post.title.includes(query) || post.content.includes(query),
      }

    const filteredData = POST_LIST_MOCK_DATA.filter(
      filter[type ?? SearchPostTypeSchema.Enum.TITLE],
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const totalElements = filteredData.length
    const totalPages = Math.ceil(totalElements / size)
    const startIdx = (page - DEFAULT_PAGE) * size
    const endIdx = startIdx + size
    const content = filteredData.slice(startIdx, endIdx)

    return Promise.resolve({
      data: {
        number: page,
        size: size,
        totalElements: totalElements,
        totalPages: totalPages,
        first: page === DEFAULT_PAGE,
        last: page === totalPages,
        content: content,
      },
    })
  },
  delay: 600,
})

export const searchPostEmptyMockHandler = createMockHandler<SearchPostResponse['data']>({
  endpoint: POST_ENDPOINT.SEARCH,
  handler: ({ request }) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)

    const type = searchParams.get(SearchPostParamsSchema.Enum.type)

    return Promise.resolve({
      data: {
        number: 1,
        size: 10,
        totalElements: 0,
        totalPages: 1,
        first: true,
        last: true,
        content: [],
        type,
      },
    })
  },
  storybook: true,
})
