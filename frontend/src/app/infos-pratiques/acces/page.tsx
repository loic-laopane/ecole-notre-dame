import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function AccesPage() {
  return (
    <PageLayout>
      <PageHero title="Accès" subtitle="Collège et Lycée Notre-Dame – Mantes-la-Jolie"
        breadcrumbs={[{ label: 'Infos pratiques', href: '/infos-pratiques' }, { label: 'Accès' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <h2 className="font-display text-2xl text-navy mb-6">📍 Adresses</h2>
              <div className="space-y-6">
                {[
                  { name: 'Collège & Lycée Notre-Dame', addr: '5, rue de la Sangle\n78200 Mantes-la-Jolie', tel: '01 34 97 97 97', email: 'accueilnd@ndsl78.fr' },
                  { name: 'École Notre-Dame',            addr: '20, rue Saint-Fiacre\n78200 Mantes-la-Jolie', tel: '01 34 97 97 95', email: 'ecolend@ndsl78.fr' },
                  { name: 'Lycée Professionnel',         addr: '15, rue de Strasbourg\n78200 Mantes-la-Jolie', tel: '01 34 97 76 03', email: 'lyceeprofessionnel@ndsl78.fr' },
                  { name: 'École & Collège Saint-Louis', addr: '23, rue G. Herrewyn\n78270 Bonnières-sur-Seine', tel: '01 30 93 01 21', email: 'accueilsl@ndsl78.fr' },
                ].map(e => (
                  <div key={e.name} className="bg-cream rounded-lg p-5 border border-border">
                    <h3 className="font-semibold text-navy mb-2">{e.name}</h3>
                    <p className="text-[.83rem] text-muted whitespace-pre-line mb-2">{e.addr}</p>
                    <p className="text-[.83rem]">📞 {e.tel} · ✉️ {e.email}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl text-navy mb-6">🚌 Comment venir</h2>
              <div className="space-y-4">
                {[
                  { icon: '🚆', title: 'En train', desc: 'Gare de Mantes-Station (3 min à pied). Ligne J Paris-Saint-Lazare via Poissy ou Conflans-Sainte-Honorine.' },
                  { icon: '🚗', title: 'En voiture', desc: 'À 3 minutes de l\'autoroute de l\'Ouest (A13). Parking disponible à proximité.' },
                  { icon: '🚌', title: 'En bus', desc: 'Lignes de bus du réseau SQYBUS et Transdev desservant le centre-ville de Mantes-la-Jolie.' },
                ].map(t => (
                  <div key={t.title} className="flex gap-4 p-4 bg-cream rounded-lg border border-border">
                    <span className="text-2xl flex-shrink-0">{t.icon}</span>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">{t.title}</h4>
                      <p className="text-[.83rem] text-muted">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-navy rounded-xl p-5">
                <p className="text-white/80 text-[.83rem]">📌 Situé en centre-ville de Mantes-la-Jolie, entre la Collégiale Notre-Dame et la Seine.</p>
              </div>
            </div>
          </div>
          {/* Map placeholder */}
          <div className="bg-cream rounded-xl h-64 flex items-center justify-center border border-border">
            <p className="text-muted text-[.9rem]">🗺️ Carte Google Maps – à intégrer via l'API Google Maps</p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
