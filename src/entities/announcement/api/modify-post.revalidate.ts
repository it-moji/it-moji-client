'use server'

import { revalidateTag } from 'next/cache'
import type { PostBody } from '../model'
import { POST_TAG } from './endpoint'

export const modifyPostWithRevalidate = async (id: number, body: Pick<PostBody, 'isPinned'>) => {
  const tags: string[] = [POST_TAG.LIST, POST_TAG.SEARCH, POST_TAG.DETAIL(id)]

  if (body.isPinned) {
    tags.push(POST_TAG.PINNED_LIST)
  }

  tags.forEach(revalidateTag)
}
