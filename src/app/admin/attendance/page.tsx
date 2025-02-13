import { AdminContainer, FallbackRouteButtonGroup, UnderConstruction } from '@/shared/ui'

const AttendancePage: React.FC = () => (
  <AdminContainer>
    <UnderConstruction>
      <FallbackRouteButtonGroup admin />
    </UnderConstruction>
  </AdminContainer>
)

export default AttendancePage
