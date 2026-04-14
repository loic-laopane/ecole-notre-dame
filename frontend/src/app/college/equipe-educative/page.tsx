import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function EquipeCollegePage() {
  return (
    <PageLayout>
      <PageHero title="Équipe éducative – Collège"
        breadcrumbs={[{ label: 'Collège', href: '/college' }, { label: 'Équipe éducative' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: 'Direction', name: 'Chef d\'établissement', icon: '🎓' },
              { role: 'Vie scolaire', name: 'CPE', icon: '👁️' },
              { role: 'Adjoint pastoral', name: 'Aumônerie', icon: '✝️' },
              { role: 'Français', name: 'Professeur', icon: '📖' },
              { role: 'Mathématiques', name: 'Professeur', icon: '📐' },
              { role: 'Histoire-Géographie', name: 'Professeur', icon: '🌍' },
              { role: 'Anglais LV1', name: 'Professeur', icon: '🇬🇧' },
              { role: 'Espagnol LV2', name: 'Professeur', icon: '🇪🇸' },
              { role: 'Sciences (SVT)', name: 'Professeur', icon: '🔬' },
            ].map(m => (
              <div key={m.role} className="bg-cream rounded-xl p-6 border border-border text-center">
                <div className="text-4xl mb-3">{m.icon}</div>
                <h3 className="font-semibold text-navy">{m.role}</h3>
                <p className="text-[.8rem] text-muted mt-1">{m.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-navy/5 rounded-xl p-6 border border-navy/10 text-center">
            <p className="text-muted text-[.85rem]">Pour contacter un membre de l'équipe éducative, adressez-vous au secrétariat au <strong>01 34 97 97 97</strong></p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
