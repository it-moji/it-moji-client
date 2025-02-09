'use server'

import { revalidateTag } from 'next/cache'
import { POST_TAG } from './endpoint'

export const deletePostWithRevalidate = async (id: number) =>
  [POST_TAG.LIST, POST_TAG.PINNED_LIST, POST_TAG.SEARCH, POST_TAG.DETAIL(id)].forEach(revalidateTag)
