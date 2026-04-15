import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import RubanSection from '@/components/sections/RubanSection'
import AboutSection from '@/components/sections/AboutSection'
import ProgrammesSection from '@/components/sections/ProgrammesSection'
import NewsSection from '@/components/sections/NewsSection'
import AgendaSection from '@/components/sections/AgendaSection'
import CtaSection from '@/components/sections/CtaSection'
import {
  getActualites, getEvenements, getEtablissements,
  MOCK_ACTUALITES, MOCK_EVENEMENTS, MOCK_ETABLISSEMENTS,
} from '@/lib/api'

export const revalidate = 60

export default async function HomePage() {
  const [{ items: actualites }, { items: evenements }, etabsApi] = await Promise.all([
    getActualites({ page: 1 }),
    getEvenements({ upcoming: true, limit: 5 }),
    getEtablissements(),
  ])

  // Fall back to mock data when API is not yet connected
  const displayActualites  = actualites.length  > 0 ? actualites  : MOCK_ACTUALITES
  const displayEvenements  = evenements.length  > 0 ? evenements  : MOCK_EVENEMENTS
  const displayEtablissements = etabsApi.length > 0 ? etabsApi    : MOCK_ETABLISSEMENTS

  return (
    <>
      <Header />
      <main>
        <HeroSection etablissements={displayEtablissements} />
        <RubanSection />
        <AboutSection />
        <ProgrammesSection etablissements={displayEtablissements} />
        <NewsSection actualites={displayActualites} evenements={displayEvenements} />
        <AgendaSection evenements={displayEvenements} />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
