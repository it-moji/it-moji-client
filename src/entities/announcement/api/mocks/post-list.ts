import { http, HttpResponse } from 'msw'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import { type PostListResponse, PostListParamsSchema } from '../../api'
import type { PostCategory, PostItem } from '../../model'

export const POST_LIST_MOCK_DATA: PostItem[] = [
  {
    id: 1,
    title: '서비스 점검 안내',
    content: '내일 오전 2시부터 4시까지 정기 점검이 진행됩니다.',
    postCategory: 'MAINTENANCE',
    createdAt: '2025-02-01T10:00:00Z',
    modifiedAt: '2025-02-01T10:00:00Z',
    viewCount: 102,
  },
  {
    id: 2,
    title: '신규 업데이트 안내',
    content: '새로운 기능이 추가되었습니다! 자세한 내용은 본문을 확인해주세요.',
    postCategory: 'UPDATE',
    createdAt: '2025-01-30T12:30:00Z',
    modifiedAt: '2025-01-30T12:30:00Z',
    viewCount: 257,
  },
  {
    id: 3,
    title: '이벤트 공지 - 겨울맞이 특별 할인',
    content: '겨울 시즌을 맞아 특별 할인 이벤트를 진행합니다!',
    postCategory: 'EVENT',
    createdAt: '2025-01-25T15:00:00Z',
    modifiedAt: '2025-01-25T15:00:00Z',
    viewCount: 315,
  },
  {
    id: 4,
    title: '공지사항 - 서비스 이용 약관 변경',
    content: '서비스 이용 약관이 2025년 3월 1일부터 변경됩니다.',
    postCategory: 'NOTICE',
    createdAt: '2025-01-20T08:00:00Z',
    modifiedAt: '2025-01-20T08:00:00Z',
    viewCount: 189,
  },
  {
    id: 5,
    title: '긴급 서버 점검 안내',
    content: '예기치 않은 장애로 인해 긴급 점검을 진행합니다.',
    postCategory: 'MAINTENANCE',
    createdAt: '2025-01-18T22:00:00Z',
    modifiedAt: '2025-01-18T22:00:00Z',
    viewCount: 412,
  },
  {
    id: 6,
    title: '버그 수정 및 성능 개선 업데이트',
    content: '사용자 경험 개선을 위한 업데이트가 진행되었습니다.',
    postCategory: 'UPDATE',
    createdAt: '2025-01-15T10:30:00Z',
    modifiedAt: '2025-01-15T10:30:00Z',
    viewCount: 290,
  },
  {
    id: 7,
    title: '설 연휴 특별 이벤트',
    content: '설 명절을 기념하여 다양한 이벤트가 진행됩니다!',
    postCategory: 'EVENT',
    createdAt: '2025-01-10T18:45:00Z',
    modifiedAt: '2025-01-10T18:45:00Z',
    viewCount: 550,
  },
  {
    id: 8,
    title: '서비스 점검 일정 변경 안내',
    content: '정기 점검 시간이 변경되었습니다. 새로운 일정을 확인해주세요.',
    postCategory: 'MAINTENANCE',
    createdAt: '2025-01-05T09:15:00Z',
    modifiedAt: '2025-01-05T09:15:00Z',
    viewCount: 134,
  },
  {
    id: 9,
    title: '업데이트 예정 기능 미리보기',
    content: '다음 업데이트에 추가될 주요 기능을 소개합니다.',
    postCategory: 'UPDATE',
    createdAt: '2024-12-30T14:20:00Z',
    modifiedAt: '2024-12-30T14:20:00Z',
    viewCount: 220,
  },
  {
    id: 10,
    title: '이벤트 당첨자 발표',
    content: '최근 진행된 이벤트의 당첨자를 발표합니다!',
    postCategory: 'EVENT',
    createdAt: '2024-12-25T17:00:00Z',
    modifiedAt: '2024-12-25T17:00:00Z',
    viewCount: 376,
  },
  {
    id: 11,
    title: '공지사항 - 개인 정보 처리 방침 변경',
    content: '개인 정보 보호 정책이 변경되어 안내드립니다.',
    postCategory: 'NOTICE',
    createdAt: '2024-12-20T08:40:00Z',
    modifiedAt: '2024-12-20T08:40:00Z',
    viewCount: 210,
  },
  {
    id: 12,
    title: '긴급 패치 적용 안내',
    content: '보안 취약점을 해결하기 위한 긴급 패치가 적용되었습니다.',
    postCategory: 'UPDATE',
    createdAt: '2024-12-15T11:00:00Z',
    modifiedAt: '2024-12-15T11:00:00Z',
    viewCount: 398,
  },
  {
    id: 13,
    title: '연말 맞이 특별 프로모션',
    content: '연말을 맞아 특별 프로모션을 진행합니다!',
    postCategory: 'EVENT',
    createdAt: '2024-12-10T14:10:00Z',
    modifiedAt: '2024-12-10T14:10:00Z',
    viewCount: 512,
  },
  {
    id: 14,
    title: '공지사항 - 시스템 변경 안내',
    content: '시스템이 새로운 환경으로 이전될 예정입니다.',
    postCategory: 'NOTICE',
    createdAt: '2024-12-05T07:30:00Z',
    modifiedAt: '2024-12-05T07:30:00Z',
    viewCount: 325,
  },
]

export const postListMockHandler = http.get(
  `${process.env.NEXT_PUBLIC_SERVER_DOMAIN_ADDRESS}${POST_ENDPOINT.LIST}`,
  ({ request }) => {
    console.log(`✅ ${request.method} - ${request.url}`)

    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const page = Number(searchParams.get(PostListParamsSchema.Enum.page)) || DEFAULT_PAGE
    const size = Number(searchParams.get(PostListParamsSchema.Enum.size)) || DEFAULT_PAGE_SIZE
    const category = searchParams.get(PostListParamsSchema.Enum.category) as PostCategory | null

    const filteredData = category
      ? POST_LIST_MOCK_DATA.filter((post) => post.postCategory === category)
      : POST_LIST_MOCK_DATA

    const totalElements = filteredData.length
    const totalPages = Math.ceil(totalElements / size)
    const startIdx = (page - DEFAULT_PAGE) * size
    const endIdx = startIdx + size
    const content = filteredData.slice(startIdx, endIdx)

    return HttpResponse.json({
      message: 'Success',
      status: 'OK',
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
    } satisfies PostListResponse)
  },
)
