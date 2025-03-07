'use server'

import { revalidateTag } from 'next/cache'
import { ATTENDANCE_BADGE_TAG } from './endpoint'

export const createBadgeWithRevalidate = async () =>
  [ATTENDANCE_BADGE_TAG.LIST].forEach(revalidateTag)
