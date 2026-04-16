import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import GoogleMap from '@/components/ui/GoogleMap'

const ETABLISSEMENTS = [
  {
    name: 'Collège & Lycée Notre-Dame',
    addr: '5, rue de la Sangle',
    city: '78200 Mantes-la-Jolie',
    tel: '01 34 97 97 97',
    email: 'accueilnd@ndsl78.fr',
    color: 'border-l-sky',
    // Coordonnées GPS – 5 rue de la Sangle, Mantes-la-Jolie
    lat: 48.9897,
    lng: 1.7167,
    mapQuery: '5+rue+de+la+Sangle+78200+Mantes-la-Jolie',
    isMain: true,
  },
  {
    name: 'École Notre-Dame',
    addr: '20, rue Saint-Fiacre',
    city: '78200 Mantes-la-Jolie',
    tel: '01 34 97 97 95',
    email: 'ecolend@ndsl78.fr',
    color: 'border-l-gold',
    lat: 48.9910,
    lng: 1.7180,
    mapQuery: '20+rue+Saint-Fiacre+78200+Mantes-la-Jolie',
    isMain: false,
  },
  {
    name: 'Lycée Professionnel',
    addr: '15, rue de Strasbourg',
    city: '78200 Mantes-la-Jolie',
    tel: '01 34 97 76 03',
    email: 'lyceeprofessionnel@ndsl78.fr',
    color: 'border-l-sage',
    lat: 48.9880,
    lng: 1.7150,
    mapQuery: '15+rue+de+Strasbourg+78200+Mantes-la-Jolie',
    isMain: false,
  },
  {
    name: 'École & Collège Saint-Louis',
    addr: '23, rue G. Herrewyn',
    city: '78270 Bonnières-sur-Seine',
    tel: '01 30 93 01 21',
    email: 'accueilsl@ndsl78.fr',
    color: 'border-l-navy',
    lat: 49.0270,
    lng: 1.5780,
    mapQuery: '23+rue+G.+Herrewyn+78270+Bonnieres-sur-Seine',
    isMain: false,
  },
]

const TRANSPORTS = [
  {
    icon: '🚆',
    title: 'En train',
    desc: 'Gare de Mantes-Station (3 min à pied). Ligne J Paris-Saint-Lazare via Poissy ou Conflans-Sainte-Honorine.',
  },
  {
    icon: '🚗',
    title: 'En voiture',
    desc: 'À 3 minutes de l\'autoroute de l\'Ouest (A13). Parking disponible rue de la Sangle et à proximité.',
  },
  {
    icon: '🚌',
    title: 'En bus',
    desc: 'Lignes du réseau SQYBUS et Transdev desservant le centre-ville de Mantes-la-Jolie.',
  },
]

export default function AccesPage() {
  return (
    <PageLayout>
      <PageHero
        title="Accès"
        subtitle="Retrouvez tous nos établissements à Mantes-la-Jolie et Bonnières-sur-Seine"
        breadcrumbs={[{ label: 'Infos pratiques', href: '/infos-pratiques' }, { label: 'Accès' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-8">

          {/* ── Carte principale : Collège & Lycée Notre-Dame ── */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="ndsl-tag">Collège & Lycée Notre-Dame</span>
              <span className="text-muted text-[.82rem]">5, rue de la Sangle – 78200 Mantes-la-Jolie</span>
            </div>

            <GoogleMap
              query="Collège+et+Lycée+Notre-Dame+5+rue+de+la+Sangle+Mantes-la-Jolie"
              label="Collège & Lycée Notre-Dame – 5, rue de la Sangle, Mantes-la-Jolie"
              height="420px"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=5+rue+de+la+Sangle+78200+Mantes-la-Jolie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sky text-[.82rem] font-semibold
                           hover:text-navy transition-colors"
              >
                📍 Ouvrir dans Google Maps →
              </a>
              <a
                href="https://maps.google.com/maps/dir//5+rue+de+la+Sangle+78200+Mantes-la-Jolie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sky text-[.82rem] font-semibold
                           hover:text-navy transition-colors"
              >
                🧭 Calculer un itinéraire →
              </a>
            </div>
          </div>

          {/* ── Grille : adresses + transports ── */}
          <div className="grid md:grid-cols-2 gap-10 mb-14">

            {/* Adresses */}
            <div>
              <h2 className="font-display text-2xl text-navy mb-5">📍 Tous nos établissements</h2>
              <div className="space-y-3">
                {ETABLISSEMENTS.map((e) => (
                  <div key={e.name} className={`bg-cream rounded-r-xl p-5 border-l-4 ${e.color}`}>
                    <h3 className="font-semibold text-navy mb-1 text-[.9rem]">{e.name}</h3>
                    <p className="text-[.8rem] text-muted mb-2">
                      {e.addr}<br />{e.city}
                    </p>
                    <p className="text-[.8rem] flex flex-wrap gap-3">
                      <a
                        href={`tel:${e.tel.replace(/\s/g, '')}`}
                        className="text-sky hover:text-navy transition-colors"
                      >
                        📞 {e.tel}
                      </a>
                      <a
                        href={`mailto:${e.email}`}
                        className="text-sky hover:text-navy transition-colors"
                      >
                        ✉️ {e.email}
                      </a>
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${e.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-[.75rem] text-muted hover:text-gold
                                 transition-colors underline underline-offset-2"
                    >
                      Voir sur la carte →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Transports */}
            <div>
              <h2 className="font-display text-2xl text-navy mb-5">🚌 Comment venir</h2>
              <div className="space-y-4 mb-6">
                {TRANSPORTS.map((t) => (
                  <div key={t.title} className="flex gap-4 p-5 bg-cream rounded-xl border border-border">
                    <span className="text-2xl flex-shrink-0">{t.icon}</span>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">{t.title}</h4>
                      <p className="text-[.83rem] text-muted leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info pratique */}
              <div className="bg-navy rounded-xl p-5">
                <p className="text-white/80 text-[.83rem] leading-relaxed">
                  📌 Le Collège &amp; Lycée Notre-Dame est situé en centre-ville de
                  Mantes-la-Jolie, entre la Collégiale Notre-Dame et la Seine,
                  à <strong className="text-white">3 minutes à pied</strong> de la gare
                  de Mantes-Station.
                </p>
              </div>
            </div>
          </div>

          {/* ── Carte Bonnières-sur-Seine ── */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="ndsl-tag">École & Collège Saint-Louis</span>
              <span className="text-muted text-[.82rem]">23, rue G. Herrewyn – 78270 Bonnières-sur-Seine</span>
            </div>

            <GoogleMap
              query="École+Saint-Louis+23+rue+G+Herrewyn+Bonnieres-sur-Seine"
              label="École & Collège Saint-Louis – 23, rue G. Herrewyn, Bonnières-sur-Seine"
              height="300px"
            />

            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=23+rue+G+Herrewyn+78270+Bonnieres-sur-Seine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sky text-[.82rem] font-semibold
                           hover:text-navy transition-colors"
              >
                📍 Ouvrir dans Google Maps →
              </a>
            </div>
          </div>

        </div>
      </section>
    </PageLayout>
  )
}
