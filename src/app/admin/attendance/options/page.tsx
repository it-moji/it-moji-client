import type { Metadata } from 'next'
import { AttendanceOptionsView } from '@/views/attendance-options'
import {
  AdminContainer,
  AdminTitle,
  Icon,
  FallbackRouteButtonGroup,
  UnderConstruction,
} from '@/shared/ui'

export const metadata: Metadata = {
  title: '출석 및 배지 기준 설정',
}

const AttendanceOptionsPage: React.FC = () => (
  <div className="flex flex-col items-start justify-between gap-5 xl:flex-row">
    <AdminContainer className="w-full flex-1 xl:max-w-80">
      <AdminTitle className="mb-6">
        <Icon query="fluent-emoji:check-mark-button" className="mr-2" />
        출석 옵션 설정
      </AdminTitle>
      <AttendanceOptionsView />
    </AdminContainer>
    <AdminContainer className="w-full flex-1">
      <UnderConstruction>
        <FallbackRouteButtonGroup admin />
      </UnderConstruction>
    </AdminContainer>
  </div>
)

export default AttendanceOptionsPage
