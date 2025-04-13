'use client'

import { AttendanceBadgeFormContainer } from './attendance-badge-form-container'
import { AttendanceBadgeTabs } from './attendance-badge-tabs'

export const AttendanceBadgeView: React.FC = () => (
  <div className="@container/badge">
    <div className="flex flex-col gap-8 @xl/badge:flex-row">
      <AttendanceBadgeTabs
        classNames={{
          root: 'flex flex-col gap-y-4 gap-x-4 @md/badge:flex-row @xl/badge:flex-col @xl/badge:w-40 @xl/badge:gap-y-12',
          list: 'flex flex-wrap flex-1 gap-1 @xl/badge:flex-col @xl/badge:flex-none',
        }}
      />
      <div className="flex flex-1 flex-col">
        <AttendanceBadgeFormContainer />
      </div>
    </div>
  </div>
)
