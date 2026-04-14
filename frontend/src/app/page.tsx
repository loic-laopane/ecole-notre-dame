import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import RubanSection from '@/components/sections/RubanSection'
import AboutSection from '@/components/sections/AboutSection'
import ProgrammesSection from '@/components/sections/ProgrammesSection'
import NewsSection from '@/components/sections/NewsSection'
import AgendaSection from '@/components/sections/AgendaSection'
import CtaSection from '@/components/sections/CtaSection'
import { getActualites, getEvenements, getEtablissements } from '@/lib/api'

export const revalidate = 60 // ISR: revalidate every 60s

export default async function HomePage() {
  const [actualitesData, evenementsData, etablissements] = await Promise.all([
    getActualites({ page: 1 }).catch(() => ({ 'hydra:member': [], 'hydra:totalItems': 0 })),
    getEvenements({ upcoming: true, limit: 5 }).catch(() => ({ 'hydra:member': [], 'hydra:totalItems': 0 })),
    getEtablissements().catch(() => []),
  ])

  const actualites = actualitesData['hydra:member']
  const evenements = evenementsData['hydra:member']

  return (
    <>
      <Header />
      <main>
        <HeroSection etablissements={etablissements} />
        <RubanSection />
        <AboutSection />
        <ProgrammesSection etablissements={etablissements} />
        <NewsSection actualites={actualites} evenements={evenements} />
        <AgendaSection evenements={evenements} />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
