'use server'

import { revalidateTag } from 'next/cache'
import type { AttendanceOptionKey } from '../model'
import { ATTENDANCE_OPTION_TAG } from './endpoint'

export const modifyAttendanceDetailOptionWithRevalidate = async (key: AttendanceOptionKey) =>
  [ATTENDANCE_OPTION_TAG.LIST, ATTENDANCE_OPTION_TAG.DETAIL(key)].forEach(revalidateTag)
