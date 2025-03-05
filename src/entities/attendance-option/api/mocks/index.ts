import { createAttendanceDetailOptionMockHandler } from './create-detail-option'
import { deleteAttendanceDetailOptionMockHandler } from './delete-detail-option'
import { modifyAttendanceDetailOptionMockHandler } from './modify-detail-option'
import { attendanceOptionDetailMockHandler } from './option-detail'
import { optionListMockHandler } from './option-list'

export const attendanceHandlers = [
  optionListMockHandler,
  attendanceOptionDetailMockHandler,
  createAttendanceDetailOptionMockHandler,
  modifyAttendanceDetailOptionMockHandler,
  deleteAttendanceDetailOptionMockHandler,
]
