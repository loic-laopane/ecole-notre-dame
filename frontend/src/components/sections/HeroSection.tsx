import Link from 'next/link'
import type { Etablissement } from '@/lib/api'

interface Props { etablissements: Etablissement[] }

const DOT_COLORS: Record<string, string> = {
  sky:  'bg-sky',
  sage: 'bg-sage',
  gold: 'bg-gold',
  navy: 'bg-navy',
}
const FALLBACK_ETABS = [
  { slug: 'maternelle',  name: 'École Maternelle Notre-Dame',   city: 'Mantes-la-Jolie',     colorDot: 'sky'  },
  { slug: 'elementaire', name: 'École Élémentaire Saint-Louis', city: 'Mantes-la-Jolie',     colorDot: 'sage' },
  { slug: 'college',     name: 'Collège Notre-Dame',            city: 'Bonnières-sur-Seine', colorDot: 'gold' },
  { slug: 'lycee',       name: 'Lycée Notre-Dame Saint-Louis',  city: 'Mantes-la-Jolie',     colorDot: 'navy' },
]

export default function HeroSection({ etablissements }: Props) {
  const etabs = etablissements.length ? etablissements : FALLBACK_ETABS

  return (
    <section className="grid lg:grid-cols-2 min-h-[88vh]" aria-label="Présentation">
      {/* ── Left ── */}
      <div className="bg-navy flex flex-col justify-center
                      px-6 py-16 lg:px-16 lg:pl-[8%]
                      relative overflow-hidden animate-fade-left">
        {/* Glow */}
        <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full
                        bg-[radial-gradient(circle,rgba(201,168,76,.18)_0%,transparent_70%)]
                        pointer-events-none" />

        <div className="flex items-center gap-3 text-gold text-[.72rem] font-semibold
                        tracking-[.12em] uppercase mb-6">
          <span className="block w-7 h-[2px] bg-gold" />
          École catholique · Depuis 1904
        </div>

        <h1 className="font-display text-white font-bold leading-[1.05]
                       text-[clamp(2.2rem,4.5vw,4rem)] mb-6">
          Éduquer avec{' '}
          <span className="text-gold italic">cœur</span>
          <br />et excellence
        </h1>

        <p className="text-white/72 text-[clamp(.85rem,1.6vw,1rem)] leading-[1.8]
                      mb-9 max-w-[440px]">
          L'Ensemble Scolaire Notre-Dame Saint-Louis accompagne plus de 1&nbsp;800 élèves
          de la maternelle au lycée, dans un cadre bienveillant nourri de valeurs chrétiennes.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <Link href="/etablissements" className="btn-primary text-center">
            Découvrir l'école
          </Link>
          <Link href="#etablissements" className="btn-outline-white text-center">
            Nos établissements
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 mt-9">
          {['Sous contrat avec l\'État', '95% de réussite au bac', 'Maternelle → Lycée'].map(b => (
            <span key={b} className="flex items-center gap-2 text-white/58 text-[.76rem]">
              <span className="text-gold font-bold">✓</span>{b}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right ── */}
      <div className="bg-cream flex flex-col justify-center
                      px-6 py-10 lg:px-[5%] lg:pl-12 gap-5 animate-fade-right">

        {/* Etablissements widget */}
        <div className="bg-white rounded-xl p-7 shadow-[0_4px_28px_rgba(28,43,69,.07)] border border-border">
          <h3 className="font-display text-[1.35rem] text-navy mb-4">Nos établissements</h3>
          <div className="flex flex-col gap-1">
            {etabs.map((e, i) => (
              <Link
                key={e.slug}
                href={`/etablissements/${e.slug}`}
                className="flex items-center gap-3 p-[.65rem] rounded border border-transparent
                           transition-all hover:bg-cream hover:border-border"
              >
                <span className={`w-[9px] h-[9px] rounded-full flex-shrink-0 ${
                  DOT_COLORS[(e as any).colorDot ?? FALLBACK_ETABS[i % 4].colorDot] ?? 'bg-gold'
                }`} />
                <span className="text-navy text-[.88rem] font-medium flex-1">{e.name}</span>
                <small className="text-muted text-[.72rem]">{(e as any).city ?? ''}</small>
                <span className="text-muted text-[.8rem]">›</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { num: '1 800', lbl: 'Élèves',        hl: false },
            { num: '95%',   lbl: 'Réussite bac',  hl: true  },
            { num: '180',   lbl: 'Enseignants',    hl: false },
            { num: '120',   lbl: 'Ans d\'histoire',hl: false },
          ].map(({ num, lbl, hl }) => (
            <div key={lbl}
              className={`rounded-xl p-4 text-center border shadow-sm
                ${hl
                  ? 'bg-navy border-navy'
                  : 'bg-white border-border shadow-[0_2px_14px_rgba(28,43,69,.06)]'
                }`}
            >
              <span className={`font-display text-[2rem] font-bold block leading-none
                ${hl ? 'text-gold' : 'text-navy'}`}>{num}</span>
              <span className={`text-[.7rem] uppercase tracking-[.07em] mt-1 block
                ${hl ? 'text-white/50' : 'text-muted'}`}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
