import type { GetPinnedPostListResponse } from '../get-pinned-post-list'
import { createMockHandler, MOCK_COMMON_RESPONSE } from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import type { PostItem } from '../../model'

export const PINNED_POST_LIST_MOCK_DATA: PostItem[] = [
  {
    id: 1,
    title: '긴급 서버 점검 공지',
    content:
      '<p>시스템 안정화를 위한 긴급 서버 점검이 예정되어 있습니다. 이용에 참고 바랍니다.</p>',
    postCategory: 'MAINTENANCE',
    createdAt: '2025-02-05T08:00:00Z',
    modifiedAt: '2025-02-05T08:00:00Z',
    viewCount: 98,
  },
  {
    id: 2,
    title: '모바일 앱 신규 기능 추가',
    content: '<p>이제 모바일 앱에서 다크 모드를 사용할 수 있습니다! 설정에서 변경해보세요.</p>',
    postCategory: 'UPDATE',
    createdAt: '2025-02-03T14:20:00Z',
    modifiedAt: '2025-02-03T14:20:00Z',
    viewCount: 185,
  },
  {
    id: 3,
    title: '봄맞이 특별 이벤트 안내',
    content:
      '<p>다가오는 봄을 맞아 특별한 이벤트를 준비했습니다. 자세한 사항은 공지를 확인해주세요!</p>',
    postCategory: 'EVENT',
    createdAt: '2025-02-01T10:30:00Z',
    modifiedAt: '2025-02-01T10:30:00Z',
    viewCount: 275,
  },
]

export const pinnedPostListMockHandler = createMockHandler({
  endpoint: POST_ENDPOINT.PINNED_LIST,
  handler: () => Promise.resolve({ data: PINNED_POST_LIST_MOCK_DATA }),
})

export const getPinnedPostListEmptyMock = () =>
  Promise.resolve({
    ...MOCK_COMMON_RESPONSE.SUCCESS,
    data: [],
  } as GetPinnedPostListResponse)
