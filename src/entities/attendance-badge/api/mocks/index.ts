import { badgeDetailMockHandler } from './badge-detail'
import { badgeListMockHandler } from './badge-list'
import { badgeListWithConditionsMockHandler } from './badge-list-with-conditions'
import { createBadgeMockHandler } from './create-badge'
import { deleteBadgeMockHandler } from './delete-badge'
import { modifyBadgeMockHandler } from './modify-badge'

export const badgeHandlers = [
  badgeListMockHandler,
  badgeListWithConditionsMockHandler,
  badgeDetailMockHandler,
  createBadgeMockHandler,
  deleteBadgeMockHandler,
  modifyBadgeMockHandler,
]

export * from './badge-list'
