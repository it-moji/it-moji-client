import { AdminContainer, FallbackRouteButtonGroup, UnderConstruction } from '@/shared/ui'

const AdminMainPage: React.FC = () => (
  <AdminContainer>
    <UnderConstruction>
      <FallbackRouteButtonGroup admin />
    </UnderConstruction>
  </AdminContainer>
)

export default AdminMainPage
