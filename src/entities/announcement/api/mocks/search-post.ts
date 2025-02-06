import type { SearchParams } from '@/shared/api'
import {
  createMockHandler,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MOCK_COMMON_RESPONSE,
} from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import {
  type SearchPostResponse,
  type SearchPostType,
  SearchPostTypeSchema,
  SearchPostParamsSchema,
} from '../../api'
import type { PostItem } from '../../model'
import { POST_LIST_MOCK_DATA } from './post-list'

export const searchPostMockHandler = createMockHandler<SearchPostResponse['data']>({
  endpoint: POST_ENDPOINT.SEARCH,
  handler: ({ request }) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const query = searchParams.get(SearchPostParamsSchema.Enum.q) || ''
    const type =
      SearchPostTypeSchema.safeParse(searchParams.get(SearchPostParamsSchema.Enum.type))?.data ||
      null
    const page = Number(searchParams.get(SearchPostParamsSchema.Enum.page)) || DEFAULT_PAGE
    const size = Number(searchParams.get(SearchPostParamsSchema.Enum.size)) || DEFAULT_PAGE_SIZE

    const filter: Record<SearchPostType, (post: PostItem) => unknown> = {
      [SearchPostTypeSchema.Enum.TITLE]: (post) => post.title.includes(query),
      [SearchPostTypeSchema.Enum.CONTENT]: (post) => post.content.includes(query),
      [SearchPostTypeSchema.Enum.TITLE_CONTENT]: (post) =>
        post.title.includes(query) || post.content.includes(query),
    }

    const filteredData = POST_LIST_MOCK_DATA.filter(filter[type ?? SearchPostTypeSchema.Enum.TITLE])

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
        type: type,
      },
    })
  },
})

export const searchPostEmptyMock = (searchParams: SearchParams) =>
  Promise.resolve({
    ...MOCK_COMMON_RESPONSE.SUCCESS,
    data: {
      number: 1,
      size: 10,
      totalElements: 0,
      totalPages: 1,
      first: true,
      last: true,
      content: [],
      type: searchParams[SearchPostParamsSchema.Enum.type] || null,
    },
  } as SearchPostResponse)
