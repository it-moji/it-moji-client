import { badgeDetailMockHandler } from './badge-detail'
import { badgeListMockHandler } from './badge-list'
import { createBadgeMockHandler } from './create-badge'
import { deleteBadgeMockHandler } from './delete-badge'
import { modifyBadgeMockHandler } from './modify-badge'

export const badgeHandlers = [
  badgeListMockHandler,
  badgeDetailMockHandler,
  createBadgeMockHandler,
  deleteBadgeMockHandler,
  modifyBadgeMockHandler,
]
