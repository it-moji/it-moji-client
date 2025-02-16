import { FallbackRouteButtonGroup, NotFound } from '@/shared/ui'

const NotFoundPage: React.FC = () => (
  <main className="flex flex-1 flex-col items-center justify-center pb-16">
    <NotFound>
      <FallbackRouteButtonGroup />
    </NotFound>
  </main>
)

export default NotFoundPage
