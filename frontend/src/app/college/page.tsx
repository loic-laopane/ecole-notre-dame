import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

export default function CollegePage() {
  return (
    <PageLayout>
      <PageHero title="Collège Notre-Dame" subtitle="Bienvenue au Collège Notre-Dame de Mantes-la-Jolie"
        breadcrumbs={[{ label: 'Collège' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <span className="ndsl-tag">Notre collège</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] text-navy mt-1 mb-0">Un lieu de vie et d'apprentissage</h2>
              <div className="ndsl-divider" />
              <p className="mb-4">Le Collège Notre-Dame accueille les élèves de la 6ème à la 3ème dans un cadre bienveillant, exigeant et ancré dans les valeurs chrétiennes. Notre équipe pédagogique s'engage à accompagner chaque élève dans sa réussite scolaire et son épanouissement personnel.</p>
              <p className="mb-4">Le collège propose un enseignement complet avec des options enrichissantes : latin, espagnol LV2, section sportive, et de nombreux projets culturels et humanitaires.</p>
              <p>La pastorale tient une place importante dans la vie du collège, avec des temps forts tout au long de l'année : retraites, célébrations, engagement solidaire.</p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { href: '/college/equipe-educative',  icon: '👩‍🏫', label: 'Équipe éducative' },
                { href: '/college/organisation',       icon: '📚', label: 'Organisation scolarité' },
                { href: '/college/inscription-as',     icon: '⚽', label: 'Inscription AS 2025-2026' },
                { href: '/infos-pratiques/inscriptions', icon: '✏️', label: 'S\'inscrire au collège' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center gap-3 p-4 bg-cream rounded-lg border border-border hover:border-gold transition-all group">
                  <span className="text-2xl">{l.icon}</span>
                  <span className="text-[.88rem] font-medium text-navy group-hover:text-gold transition-colors">{l.label}</span>
                  <span className="ml-auto text-muted">›</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[['6ème – 3ème', '4 niveaux'], ['Latin & LV2', 'Options'], ['Pastorale', 'Vie spirituelle'], ['AS & projets', 'Activités']].map(([v, l]) => (
              <div key={v} className="bg-navy text-center rounded-xl p-5">
                <div className="font-display text-white text-xl font-bold">{v}</div>
                <div className="text-white/60 text-[.7rem] uppercase tracking-wide mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
