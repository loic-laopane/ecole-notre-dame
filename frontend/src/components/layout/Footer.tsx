import Link from 'next/link'
import Image from 'next/image'

const COL_ETABLISSEMENTS = [
  { href: '/etablissements/maternelle',  label: 'École Maternelle' },
  { href: '/etablissements/elementaire', label: 'École Élémentaire' },
  { href: '/etablissements/college',     label: 'Collège Notre-Dame' },
  { href: '/etablissements/lycee',       label: 'Lycée NDSL' },
]
const COL_ENSEMBLE = [
  { href: '/projet-educatif', label: 'Projet éducatif' },
  { href: '/pastorale',       label: 'Pastorale' },
  { href: '/associations',    label: 'Associations' },
  { href: '/recrutement',     label: 'Recrutement' },
]
const COL_PRATIQUE = [
  { href: '/inscription',     label: 'Inscription' },
  { href: '/espace-parents',  label: 'Espace Parents' },
  { href: 'tel:+33134985000', label: '01 34 98 50 00' },
  { href: 'mailto:contact@ndsl-mantes.fr', label: 'contact@ndsl-mantes.fr' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d1826] text-white/60">
      {/* Top grid */}
      <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-10
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Image
            src="/images/logo.png"
            alt="Notre-Dame Saint-Louis"
            width={200}
            height={50}
            className="h-[50px] w-auto brightness-0 invert opacity-70"
          />
          <p className="text-[.82rem] leading-7 mt-4 mb-6">
            Ensemble Scolaire Notre-Dame Saint-Louis · Établissement catholique
            d'enseignement sous contrat avec l'État · Mantes-la-Jolie &amp;
            Bonnières-sur-Seine.
          </p>
          <div className="flex gap-2">
            {[
              { href: '#', label: 'f',  aria: 'Facebook' },
              { href: '#', label: '▶', aria: 'YouTube'  },
              { href: '#', label: '📸', aria: 'Instagram'},
            ].map(({ href, label, aria }) => (
              <a
                key={aria}
                href={href}
                aria-label={aria}
                className="w-8 h-8 border border-white/15 rounded flex items-center
                           justify-center text-white/50 text-xs
                           transition-all hover:border-gold hover:text-gold"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Col: Établissements */}
        <FooterCol title="Établissements" links={COL_ETABLISSEMENTS} />
        <FooterCol title="L'Ensemble"     links={COL_ENSEMBLE} />
        <FooterCol title="Infos pratiques" links={COL_PRATIQUE} />
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[.07]">
        <div className="max-w-[1200px] mx-auto px-8 py-4
                        flex flex-wrap justify-between items-center gap-3 text-[.72rem]">
          <span>© {new Date().getFullYear()} Ensemble Scolaire Notre-Dame Saint-Louis</span>
          <nav className="flex flex-wrap gap-4">
            {[
              { href: '/mentions-legales',   label: 'Mentions légales' },
              { href: '/confidentialite',    label: 'Confidentialité' },
              { href: '/plan-du-site',       label: 'Plan du site' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/35 hover:text-gold transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-white font-display text-[1.05rem] mb-4">{title}</h4>
      <ul className="space-y-[.38rem]">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-white/50 text-[.8rem] hover:text-gold transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
