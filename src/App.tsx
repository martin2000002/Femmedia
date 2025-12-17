import { PageLayout } from './components/layout/PageLayout'
import { Footer } from './components/layout/Footer'
import { ConocenosSection } from './sections/ConocenosSection'
import { ActionsSection } from './sections/ActionsSection'
import { HeroSection } from './sections/HeroSection'
import { SerieSection } from './sections/SerieSection'
import { StatsSection } from './sections/StatsSection'

export default function App() {
  return (
    <PageLayout>
      <HeroSection />
      <StatsSection />
      <SerieSection />
      <ActionsSection />
      <ConocenosSection />
      <Footer />
    </PageLayout>
  )
}
