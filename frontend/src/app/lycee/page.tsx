import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

export default function LyceePage() {
  return (
    <PageLayout>
      <PageHero title="Lycée Notre-Dame" subtitle="Bienvenue au Lycée Général Notre-Dame de Mantes-la-Jolie"
        breadcrumbs={[{ label: 'Lycée' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <span className="ndsl-tag">Notre lycée</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] text-navy mt-1 mb-0">Excellence et épanouissement</h2>
              <div className="ndsl-divider" />
              <p className="mb-4">Le Lycée Notre-Dame propose une voie générale et technologique, avec un taux de réussite au baccalauréat supérieur à la moyenne nationale. Notre équipe pédagogique accompagne chaque lycéen dans la construction de son projet d'orientation.</p>
              <p className="mb-4">En seconde, les élèves découvrent les différentes spécialités et reçoivent un accompagnement personnalisé pour choisir leur voie. En première et terminale, ils approfondissent leurs spécialités et préparent le Grand Oral.</p>
              <p>Des certifications internationales sont proposées : First Certificate in English (FCE Cambridge) et certification ELYTE en espagnol.</p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { href: '/lycee/seconde',          icon: '🎒', label: 'Classe de seconde' },
                { href: '/lycee/orientation',      icon: '🧭', label: 'Orientation' },
                { href: '/lycee/fce',              icon: '🇬🇧', label: 'First Certificate (FCE)' },
                { href: '/lycee/espagnol',         icon: '🇪🇸', label: 'Espagnol – ELYTE' },
                { href: '/lycee/equipe-educative', icon: '👩‍🏫', label: 'Équipe éducative' },
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
            {[['95%', 'Taux bac'], ['2nde → Tle', '3 niveaux'], ['FCE & ELYTE', 'Certifications'], ['Parcoursup', 'Orientation']].map(([v, l]) => (
              <div key={v} className="bg-navy text-center rounded-xl p-5">
                <div className="font-display text-white text-xl font-bold">{v}</div>
                <div className="text-white/50 text-[.7rem] uppercase tracking-wide mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
