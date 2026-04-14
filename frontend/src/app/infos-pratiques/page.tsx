import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

const SECTIONS = [
  { href: '/infos-pratiques/documents-de-rentree', icon: '📄', title: 'Documents de rentrée',     desc: 'Listes de fournitures, règlement intérieur, formulaires à compléter.' },
  { href: '/infos-pratiques/horaires',             icon: '🕐', title: 'Horaires des cours',        desc: 'Emplois du temps et horaires d\'ouverture du collège et du lycée.' },
  { href: '/infos-pratiques/acces',                icon: '📍', title: 'Accès',                     desc: '5 rue de la Sangle, Mantes-la-Jolie. À 3 min de l\'autoroute de l\'Ouest.' },
  { href: '/infos-pratiques/contact',              icon: '📞', title: 'Contact & permanences',     desc: 'Numéros de téléphone, e-mails et horaires des permanences téléphoniques.' },
  { href: '/infos-pratiques/inscriptions',         icon: '✏️', title: 'Inscriptions',              desc: 'Procédure d\'inscription au collège et au lycée Notre-Dame.' },
]

export default function InfosPratiquesPage() {
  return (
    <PageLayout>
      <PageHero title="Infos pratiques" subtitle="Tout ce dont vous avez besoin pour la vie scolaire au quotidien."
        breadcrumbs={[{ label: 'Infos pratiques' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map(s => (
            <Link key={s.href} href={s.href}
              className="ndsl-card p-8 flex flex-col gap-3 group">
              <span className="text-4xl">{s.icon}</span>
              <h2 className="font-display text-xl text-navy group-hover:text-gold transition-colors">{s.title}</h2>
              <p className="text-[.85rem] text-muted leading-relaxed">{s.desc}</p>
              <span className="text-gold text-[.78rem] font-semibold uppercase tracking-[.05em] mt-auto">Voir →</span>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
