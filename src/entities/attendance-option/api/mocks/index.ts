import { createAttendanceDetailOptionMockHandlers } from './create-detail-option'
import { deleteAttendanceDetailOptionMockHandler } from './delete-detail-option'
import { modifyAttendanceDetailOptionMockHandler } from './modify-detail-option'
import { attendanceOptionDetailMockHandlers } from './option-detail'
import { optionListMockHandler } from './option-list'

export const attendanceHandlers = [
  optionListMockHandler,
  ...attendanceOptionDetailMockHandlers,
  ...createAttendanceDetailOptionMockHandlers,
  modifyAttendanceDetailOptionMockHandler,
  deleteAttendanceDetailOptionMockHandler,
]
