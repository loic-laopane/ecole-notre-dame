import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function EspagnolPage() {
  return (
    <PageLayout>
      <PageHero title="Espagnol – ELYTE & eTwinning" breadcrumbs={[{ label: 'Lycée', href: '/lycee' }, { label: 'Espagnol' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cream rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4"><span className="text-3xl">🇪🇸</span><h2 className="font-display text-xl text-navy">Certification ELYTE</h2></div>
              <p className="text-[.85rem] text-muted mb-4">Le lycée prépare les élèves à la certification ELYTE (Évaluation en Langue Vivante en Terminale en Espagnol), qui valorise les compétences linguistiques en espagnol dans le dossier Parcoursup.</p>
              <p className="text-[.85rem] text-muted">Des ateliers de préparation sont organisés tout au long de l'année pour entraîner les élèves aux différentes épreuves de la certification.</p>
            </div>
            <div className="bg-cream rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4"><span className="text-3xl">🌐</span><h2 className="font-display text-xl text-navy">Projet eTwinning</h2></div>
              <p className="text-[.85rem] text-muted mb-4">Le lycée participe au programme européen eTwinning, qui met en relation les élèves avec des établissements scolaires d'autres pays européens autour de projets collaboratifs.</p>
              <p className="text-[.85rem] text-muted">Ces échanges virtuels permettent aux élèves de pratiquer la langue dans des contextes authentiques et de développer leur ouverture sur le monde.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
