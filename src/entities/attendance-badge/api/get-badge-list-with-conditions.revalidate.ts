'use server'

import { revalidateTag } from 'next/cache'
import { ATTENDANCE_BADGE_TAG } from './endpoint'

export const revalidateAttendanceBadgeListWithConditions = async () =>
  revalidateTag(ATTENDANCE_BADGE_TAG.BADGE_LIST_WITH_CONDITIONS)
