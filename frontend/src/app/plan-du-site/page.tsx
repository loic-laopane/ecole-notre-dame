import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

const SITEMAP = [
  { section: 'Accueil',          links: [{ href: '/', label: 'Page d\'accueil' }] },
  { section: 'Infos pratiques',  links: [{ href: '/infos-pratiques', label: 'Infos pratiques' }, { href: '/infos-pratiques/documents-de-rentree', label: 'Documents de rentrée' }, { href: '/infos-pratiques/horaires', label: 'Horaires' }, { href: '/infos-pratiques/acces', label: 'Accès' }, { href: '/infos-pratiques/contact', label: 'Contact & permanences' }, { href: '/infos-pratiques/inscriptions', label: 'Inscriptions' }] },
  { section: 'Collège',          links: [{ href: '/college', label: 'Collège' }, { href: '/college/equipe-educative', label: 'Équipe éducative' }, { href: '/college/organisation', label: 'Organisation scolarité' }, { href: '/college/inscription-as', label: 'Inscription AS' }] },
  { section: 'Lycée',            links: [{ href: '/lycee', label: 'Lycée' }, { href: '/lycee/seconde', label: 'Classe de seconde' }, { href: '/lycee/orientation', label: 'Orientation' }, { href: '/lycee/fce', label: 'FCE Cambridge' }, { href: '/lycee/espagnol', label: 'Espagnol ELYTE' }, { href: '/lycee/equipe-educative', label: 'Équipe éducative' }] },
  { section: 'Pastorale',        links: [{ href: '/pastorale', label: 'Pastorale' }, { href: '/pastorale/actualites', label: 'Actualités pastorales' }, { href: '/pastorale/culture', label: 'Culture' }, { href: '/pastorale/celebrations', label: 'Célébrations' }, { href: '/pastorale/engagement', label: 'Engagement & solidarité' }] },
  { section: 'CDI',              links: [{ href: '/cdi', label: 'CDI' }, { href: '/cdi/college', label: 'CDI Collège' }, { href: '/cdi/lycee', label: 'CDI Lycée' }] },
  { section: 'Vie scolaire',     links: [{ href: '/as-ateliers', label: 'AS & Ateliers' }, { href: '/albums-photos', label: 'Albums photos' }] },
  { section: 'Informations',     links: [{ href: '/contact', label: 'Contact' }, { href: '/actualites', label: 'Actualités' }, { href: '/agenda', label: 'Agenda' }] },
  { section: 'Légal',            links: [{ href: '/mentions-legales', label: 'Mentions légales' }, { href: '/confidentialite', label: 'Politique de confidentialité' }, { href: '/plan-du-site', label: 'Plan du site' }] },
]

export default function PlanDuSitePage() {
  return (
    <PageLayout>
      <PageHero title="Plan du site" breadcrumbs={[{ label: 'Plan du site' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITEMAP.map(s => (
            <div key={s.section}>
              <h2 className="font-display text-lg text-navy mb-3 pb-2 border-b-2 border-gold">{s.section}</h2>
              <ul className="space-y-1">
                {s.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[.85rem] text-muted hover:text-gold transition-colors">→ {l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
