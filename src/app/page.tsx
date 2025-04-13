import { FallbackRouteButtonGroup, UnderConstruction } from '@/shared/ui'

const Home: React.FC = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center pb-16">
      <UnderConstruction>
        <FallbackRouteButtonGroup admin />
      </UnderConstruction>
    </main>
  )
}

export default Home
