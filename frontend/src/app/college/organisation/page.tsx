import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function OrganisationPage() {
  return (
    <PageLayout>
      <PageHero title="Organisation de la scolarité" subtitle="Les cycles 3 et 4 au Collège Notre-Dame"
        breadcrumbs={[{ label: 'Collège', href: '/college' }, { label: 'Organisation de la scolarité' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          {[
            { cycle: 'Cycle 3 – Consolidation', classes: ['6ème'], color: 'bg-sky', desc: 'Le cycle 3 commence à la 6ème et assure la liaison avec le primaire. L\'accent est mis sur les fondamentaux : français, mathématiques, langues vivantes. Des projets interdisciplinaires favorisent la curiosité et l\'autonomie.' },
            { cycle: 'Cycle 4 – Approfondissement', classes: ['5ème', '4ème', '3ème'], color: 'bg-gold', desc: 'Le cycle 4 prépare les élèves au Diplôme National du Brevet et à l\'entrée au lycée. Les enseignements s\'approfondissent, les options se diversifient (latin, section euro...). Un accompagnement personnalisé est proposé pour chaque élève.' },
          ].map(c => (
            <div key={c.cycle} className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className={`${c.color} text-white px-4 py-1 rounded-full text-[.78rem] font-semibold uppercase tracking-wide`}>{c.cycle}</div>
                <div className="flex gap-2">
                  {c.classes.map(cl => <span key={cl} className="bg-cream border border-border text-navy text-[.78rem] px-3 py-1 rounded-full">{cl}</span>)}
                </div>
              </div>
              <p className="text-muted leading-relaxed">{c.desc}</p>
            </div>
          ))}
          <div className="bg-cream rounded-xl p-6 border border-border mt-6">
            <h3 className="font-display text-lg text-navy mb-3">Options & dispositifs</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Latin (5ème → 3ème)', 'Espagnol LV2 (5ème)', 'Section sportive', 'Atelier théâtre', 'Délégués de classe', 'Accompagnement personnalisé'].map(o => (
                <div key={o} className="flex items-center gap-2 text-[.85rem]">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
