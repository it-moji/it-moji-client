'use server'

import { revalidateTag } from 'next/cache'
import { ATTENDANCE_BADGE_TAG } from '@/entities/attendance-badge/@x/revalidate-tag'
import type { AttendanceOptionKey } from '../model'
import { ATTENDANCE_OPTION_TAG } from './endpoint'

export const deleteAttendanceDetailOptionWithRevalidate = async (key: AttendanceOptionKey) =>
  [
    ATTENDANCE_OPTION_TAG.LIST,
    ATTENDANCE_OPTION_TAG.PRIMARY(key),
    ATTENDANCE_BADGE_TAG.DETAIL_ALL,
  ].forEach(revalidateTag)
