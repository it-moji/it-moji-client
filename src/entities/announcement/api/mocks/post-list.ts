import type { SearchParams } from '@/shared/api'
import {
  createMockHandler,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MOCK_COMMON_RESPONSE,
} from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import { type GetPostListResponse, GetPostListParamsSchema } from '../../api'
import type { PostCategory, PostItem } from '../../model'

export const POST_LIST_MOCK_DATA: (PostItem & { isPinned: boolean })[] = [
  {
    id: 1,
    title: '서비스 점검 안내',
    content: '<p>내일 오전 2시부터 4시까지 정기 점검이 진행됩니다.</p>',
    postCategory: 'MAINTENANCE',
    createdAt: '2025-02-01T10:00:00Z',
    modifiedAt: '2025-02-06T10:00:00Z',
    viewCount: 102,
    isPinned: false,
  },
  {
    id: 2,
    title: '신규 업데이트 안내',
    content: '<p>새로운 기능이 추가되었습니다! 자세한 내용은 본문을 확인해주세요.</p>',
    postCategory: 'UPDATE',
    createdAt: '2025-01-24T12:30:00Z',
    modifiedAt: '2025-01-30T12:30:00Z',
    viewCount: 257,
    isPinned: true,
  },
  {
    id: 3,
    title: '이벤트 공지 - 겨울맞이 특별 할인',
    content: '<p>겨울 시즌을 맞아 특별 할인 이벤트를 진행합니다!</p>',
    postCategory: 'EVENT',
    createdAt: '2025-01-25T15:00:00Z',
    modifiedAt: '2025-01-28T15:00:00Z',
    viewCount: 315,
    isPinned: false,
  },
  {
    id: 4,
    title: '공지사항 - 서비스 이용 약관 변경',
    content: '<p>서비스 이용 약관이 2025년 3월 1일부터 변경됩니다.</p>',
    postCategory: 'NOTICE',
    createdAt: '2025-01-20T08:00:00Z',
    modifiedAt: '2025-01-20T08:00:00Z',
    viewCount: 189,
    isPinned: true,
  },
  {
    id: 5,
    title: '긴급 서버 점검 안내',
    content: '<p>예기치 않은 장애로 인해 긴급 점검을 진행합니다.</p>',
    postCategory: 'MAINTENANCE',
    createdAt: '2025-01-18T22:00:00Z',
    modifiedAt: '2025-01-18T22:00:00Z',
    viewCount: 412,
    isPinned: false,
  },
  {
    id: 6,
    title: '버그 수정 및 성능 개선 업데이트',
    content: '<p>사용자 경험 개선을 위한 업데이트가 진행되었습니다.</p>',
    postCategory: 'UPDATE',
    createdAt: '2025-01-15T10:30:00Z',
    modifiedAt: '2025-01-15T10:30:00Z',
    viewCount: 290,
    isPinned: false,
  },
  {
    id: 7,
    title: '설 연휴 특별 이벤트',
    content: '<p>설 명절을 기념하여 다양한 이벤트가 진행됩니다!</p>',
    postCategory: 'EVENT',
    createdAt: '2025-01-10T18:45:00Z',
    modifiedAt: '2025-01-10T18:45:00Z',
    viewCount: 550,
    isPinned: false,
  },
  {
    id: 8,
    title: '서비스 점검 일정 변경 안내',
    content: '<p>정기 점검 시간이 변경되었습니다. 새로운 일정을 확인해주세요.</p>',
    postCategory: 'MAINTENANCE',
    createdAt: '2025-01-05T09:15:00Z',
    modifiedAt: '2025-01-05T09:15:00Z',
    viewCount: 134,
    isPinned: false,
  },
  {
    id: 9,
    title: '업데이트 예정 기능 미리보기',
    content: '<p>다음 업데이트에 추가될 주요 기능을 소개합니다.</p>',
    postCategory: 'UPDATE',
    createdAt: '2024-12-30T14:20:00Z',
    modifiedAt: '2024-12-30T14:20:00Z',
    viewCount: 220,
    isPinned: false,
  },
  {
    id: 10,
    title: '이벤트 당첨자 발표',
    content: '<p>최근 진행된 이벤트의 당첨자를 발표합니다!</p>',
    postCategory: 'EVENT',
    createdAt: '2024-12-25T17:00:00Z',
    modifiedAt: '2024-12-25T17:00:00Z',
    viewCount: 376,
    isPinned: false,
  },
  {
    id: 11,
    title: '공지사항 - 개인 정보 처리 방침 변경',
    content: '<p>개인 정보 보호 정책이 변경되어 안내드립니다.</p>',
    postCategory: 'NOTICE',
    createdAt: '2024-12-20T08:40:00Z',
    modifiedAt: '2024-12-20T08:40:00Z',
    viewCount: 210,
    isPinned: false,
  },
  {
    id: 12,
    title: '긴급 패치 적용 안내',
    content: '<p>보안 취약점을 해결하기 위한 긴급 패치가 적용되었습니다.</p>',
    postCategory: 'UPDATE',
    createdAt: '2024-12-15T11:00:00Z',
    modifiedAt: '2024-12-15T11:00:00Z',
    viewCount: 398,
    isPinned: false,
  },
  {
    id: 13,
    title: '연말 맞이 특별 프로모션',
    content: '<p>연말을 맞아 특별 프로모션을 진행합니다!</p>',
    postCategory: 'EVENT',
    createdAt: '2024-12-10T14:10:00Z',
    modifiedAt: '2024-12-10T14:10:00Z',
    viewCount: 512,
    isPinned: false,
  },
  {
    id: 14,
    title: '공지사항 - 시스템 변경 안내',
    content: '<p>시스템이 새로운 환경으로 이전될 예정입니다.</p>',
    postCategory: 'NOTICE',
    createdAt: '2024-12-05T07:30:00Z',
    modifiedAt: '2024-12-05T07:30:00Z',
    viewCount: 325,
    isPinned: false,
  },
]

export const postListMockHandler = createMockHandler<GetPostListResponse['data']>({
  endpoint: POST_ENDPOINT.LIST,
  handler: ({ request }) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const page = Number(searchParams.get(GetPostListParamsSchema.Enum.page)) || DEFAULT_PAGE
    const size = Number(searchParams.get(GetPostListParamsSchema.Enum.size)) || DEFAULT_PAGE_SIZE
    const category = searchParams.get(GetPostListParamsSchema.Enum.category) as PostCategory | null

    const filteredData = category
      ? POST_LIST_MOCK_DATA.filter((post) => !post.isPinned && post.postCategory === category)
      : POST_LIST_MOCK_DATA.filter((post) => !post.isPinned)

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
        category,
      },
    })
  },
})

export const getPostListEmptyMock = (searchParams: SearchParams) =>
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
      category: searchParams[GetPostListParamsSchema.Enum.category] || null,
    },
  } as GetPostListResponse)
