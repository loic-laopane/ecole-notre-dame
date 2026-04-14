import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
export default function CDILycéePage() {
  return (
    <PageLayout>
      <PageHero title="CDI Lycée" breadcrumbs={[{ label: 'CDI', href: '/cdi' }, { label: 'CDI Lycée' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🕐', title: 'Horaires', desc: 'Ouvert du lundi au vendredi de 8h00 à 17h30. Accès libre pendant les heures de permanence.' },
              { icon: '📚', title: 'Fonds documentaire', desc: 'Plus de 5 000 ouvrages, revues, BD, documentaires et ressources numériques accessibles à tous.' },
              { icon: '💻', title: 'Ressources numériques', desc: 'Accès aux bases de données en ligne, encyclopédies numériques et sites éducatifs sélectionnés.' },
              { icon: '🎨', title: 'Ateliers', desc: 'Ateliers tricot, lecture, jeux de société et clubs thématiques tout au long de l\'année.' },
            ].map(s => (
              <div key={s.title} className="bg-cream rounded-xl p-6 border border-border">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-display text-xl text-navy mb-2">{s.title}</h3>
                <p className="text-[.84rem] text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
