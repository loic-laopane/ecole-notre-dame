import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function FCEPage() {
  return (
    <PageLayout>
      <PageHero title="First Certificate in English" subtitle="Certification Cambridge – Lycée Notre-Dame"
        breadcrumbs={[{ label: 'Lycée', href: '/lycee' }, { label: 'FCE' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="bg-[#003087]/10 border border-[#003087]/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl">🇬🇧</span>
              <div>
                <h2 className="font-display text-xl text-navy">Cambridge First Certificate in English (FCE)</h2>
                <p className="text-[.8rem] text-muted">Niveau B2 du Cadre Européen Commun de Référence</p>
              </div>
            </div>
            <p className="text-[.88rem] text-muted">Le Lycée Notre-Dame prépare ses élèves à l'examen Cambridge FCE, certification internationale reconnue dans le monde entier, attestant d'un niveau B2 en anglais.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cream rounded-xl p-6 border border-border">
              <h3 className="font-display text-xl text-navy mb-4">L'examen en détail</h3>
              <ul className="space-y-2 text-[.85rem] text-muted">
                {['Reading & Use of English (75 min)', 'Writing (80 min)', 'Listening (40 min)', 'Speaking (14 min)'].map(e => (
                  <li key={e} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" />{e}</li>
                ))}
              </ul>
            </div>
            <div className="bg-cream rounded-xl p-6 border border-border">
              <h3 className="font-display text-xl text-navy mb-4">Pourquoi passer le FCE ?</h3>
              <ul className="space-y-2 text-[.85rem] text-muted">
                {['Certification reconnue mondialement', 'Valorise le dossier Parcoursup', 'Facilite les études à l\'étranger', 'Atout pour le marché du travail', 'Valable à vie'].map(e => (
                  <li key={e} className="flex items-center gap-2"><span className="text-gold">✓</span>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
