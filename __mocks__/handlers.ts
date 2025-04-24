import { http, HttpResponse } from 'msw'
import { postHandlers, postTestHandlers } from '@/entities/announcement'
import { badgeHandlers } from '@/entities/attendance-badge'
import { attendanceHandlers } from '@/entities/attendance-option'
import { textParsingHandlers } from '@/entities/text-parsing'

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/mock-test`, () => {
    return HttpResponse.json({ message: 'mock success!!' })
  }),
  ...postHandlers,
  ...attendanceHandlers,
  ...badgeHandlers,
  ...textParsingHandlers,
]

export const testHandlers = [...postTestHandlers]
