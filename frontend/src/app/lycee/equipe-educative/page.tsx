import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function EquipeLyceePage() {
  return (
    <PageLayout>
      <PageHero title="Équipe éducative – Lycée" breadcrumbs={[{ label: 'Lycée', href: '/lycee' }, { label: 'Équipe éducative' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: 'Direction', icon: '🎓' }, { role: 'Vie scolaire – CPE', icon: '👁️' },
              { role: 'Adjointe pastorale', icon: '✝️' }, { role: 'Français', icon: '📖' },
              { role: 'Philosophie', icon: '💭' }, { role: 'Histoire-Géographie', icon: '🌍' },
              { role: 'Mathématiques', icon: '📐' }, { role: 'Physique-Chimie', icon: '⚗️' },
              { role: 'SVT', icon: '🔬' }, { role: 'Anglais LV1', icon: '🇬🇧' },
              { role: 'Espagnol LV2', icon: '🇪🇸' }, { role: 'SES', icon: '📊' },
            ].map(m => (
              <div key={m.role} className="bg-cream rounded-xl p-6 border border-border text-center">
                <div className="text-4xl mb-3">{m.icon}</div>
                <h3 className="font-semibold text-navy">{m.role}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-navy/5 rounded-xl p-6 text-center">
            <p className="text-muted text-[.85rem]">Secrétariat : <strong>01 34 97 97 97</strong> · <strong>accueilnd@ndsl78.fr</strong></p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
