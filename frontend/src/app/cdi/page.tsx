import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
export default function CDIPage() {
  return (
    <PageLayout>
      <PageHero title="CDI" subtitle="Centre de Documentation et d'Information" breadcrumbs={[{ label: 'CDI' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8 grid md:grid-cols-2 gap-8">
          {[
            { href: '/cdi/college', title: 'CDI Collège', icon: '📚', desc: 'Le CDI du collège propose un large fonds documentaire, des ateliers de recherche documentaire et un espace de travail calme pour les collégiens.' },
            { href: '/cdi/lycee',   title: 'CDI Lycée',   icon: '📖', desc: 'Le CDI du lycée accompagne les lycéens dans leurs recherches, la préparation du bac et l\'orientation avec des ressources numériques et papier.' },
          ].map(c => (
            <Link key={c.href} href={c.href} className="ndsl-card p-8 flex flex-col gap-3 group">
              <span className="text-5xl">{c.icon}</span>
              <h2 className="font-display text-xl text-navy group-hover:text-gold transition-colors">{c.title}</h2>
              <p className="text-[.85rem] text-muted">{c.desc}</p>
              <span className="text-gold text-[.78rem] font-semibold uppercase tracking-[.05em] mt-auto">Découvrir →</span>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
