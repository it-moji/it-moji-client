import type { Metadata } from 'next'
import { AdminContainer, FallbackRouteButtonGroup, UnderConstruction } from '@/shared/ui'

export const metadata: Metadata = {
  title: '출석 관리',
}

const AttendancePage: React.FC = () => (
  <AdminContainer>
    <UnderConstruction>
      <FallbackRouteButtonGroup admin />
    </UnderConstruction>
  </AdminContainer>
)

export default AttendancePage
