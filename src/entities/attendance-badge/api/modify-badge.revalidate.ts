'use server'

import { revalidateTag } from 'next/cache'
import { type AttendanceBadge } from '../model'
import { ATTENDANCE_BADGE_TAG } from './endpoint'

export const modifyBadgeWithRevalidate = async (badgeId: AttendanceBadge['id']) =>
  [ATTENDANCE_BADGE_TAG.LIST, ATTENDANCE_BADGE_TAG.DETAIL(badgeId)].forEach(revalidateTag)
