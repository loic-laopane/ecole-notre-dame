import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function HorairesPage() {
  return (
    <PageLayout>
      <PageHero title="Horaires des cours"
        breadcrumbs={[{ label: 'Infos pratiques', href: '/infos-pratiques' }, { label: 'Horaires des cours' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Collège Notre-Dame', horaires: ['Lundi : 8h00 – 17h30', 'Mardi : 8h00 – 17h30', 'Mercredi : 8h00 – 12h30', 'Jeudi : 8h00 – 17h30', 'Vendredi : 8h00 – 16h30'] },
              { title: 'Lycée Notre-Dame',   horaires: ['Lundi : 8h00 – 18h00', 'Mardi : 8h00 – 18h00', 'Mercredi : 8h00 – 13h00', 'Jeudi : 8h00 – 18h00', 'Vendredi : 8h00 – 17h00'] },
            ].map(etab => (
              <div key={etab.title} className="bg-cream rounded-xl p-8 border border-border">
                <h2 className="font-display text-xl text-navy mb-5 pb-3 border-b-2 border-gold">{etab.title}</h2>
                <ul className="space-y-3">
                  {etab.horaires.map(h => (
                    <li key={h} className="flex items-center gap-3 text-[.88rem] text-text">
                      <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-navy/5 rounded-xl p-6 border border-navy/10">
            <p className="text-[.85rem] text-muted">⚠️ Les horaires peuvent être modifiés en cas d'événements particuliers. Consultez l'espace parents pour les dernières informations.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
