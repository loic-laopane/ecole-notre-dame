import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function SecondePage() {
  return (
    <PageLayout>
      <PageHero title="La classe de seconde" breadcrumbs={[{ label: 'Lycée', href: '/lycee' }, { label: 'Classe de seconde' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          <p className="text-muted leading-relaxed mb-8">La seconde est une année charnière entre le collège et le lycée. Elle permet aux élèves de consolider leurs acquis tout en découvrant les différentes voies qui s'offrent à eux pour la suite de leur parcours.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-cream rounded-xl p-6 border border-border">
              <h3 className="font-display text-xl text-navy mb-4">Enseignements communs</h3>
              <ul className="space-y-2 text-[.85rem] text-muted">
                {['Français', 'Mathématiques', 'Histoire-Géographie', 'LV1 Anglais', 'LV2 Espagnol/Allemand', 'SES', 'SVT', 'Physique-Chimie', 'EPS', 'EMC', 'SNT'].map(m => (
                  <li key={m} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />{m}</li>
                ))}
              </ul>
            </div>
            <div className="bg-cream rounded-xl p-6 border border-border">
              <h3 className="font-display text-xl text-navy mb-4">Options disponibles</h3>
              <ul className="space-y-2 text-[.85rem] text-muted">
                {['Latin', 'LV3 (Espagnol, Allemand, Italien)', 'Arts plastiques', 'Théâtre', 'Section sportive'].map(o => (
                  <li key={o} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sky flex-shrink-0" />{o}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-navy rounded-xl p-6 text-white">
            <h3 className="font-display text-xl mb-2">Accompagnement à l'orientation</h3>
            <p className="text-white/70 text-[.85rem]">Dès la seconde, un suivi personnalisé est mis en place pour accompagner chaque élève dans le choix de ses spécialités de première. Des stages de découverte professionnelle et des rencontres avec des professionnels sont organisés tout au long de l'année.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
