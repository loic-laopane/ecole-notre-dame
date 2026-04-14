'use client'

import { useState } from 'react'
import type { Etablissement } from '@/lib/api'

const STATIC_PROGS = [
  { icon: '🌸', title: 'Petite & Grande Section', desc: 'Éveil sensoriel, langage et motricité dans un cadre sécurisant.', niveau: 'maternelle' },
  { icon: '📖', title: 'Cycle Élémentaire',        desc: 'Socle commun renforcé, anglais dès le CP, pratiques numériques.', niveau: 'elementaire' },
  { icon: '🔬', title: 'Collège & Brevet',          desc: 'Option Latin, section Euro Anglais, classes à projets innovants.', niveau: 'college' },
  { icon: '🎓', title: 'Baccalauréat Général',      desc: 'Spécialités LLCE, Maths, SVT, SES, HGéo ; Grand Oral préparé.', niveau: 'lycee' },
]

const TABS = [
  { id: 'all',         label: 'Tous' },
  { id: 'maternelle',  label: 'Maternelle' },
  { id: 'elementaire', label: 'Élémentaire' },
  { id: 'college',     label: 'Collège' },
  { id: 'lycee',       label: 'Lycée' },
]

const NIVEAU_LABEL: Record<string, string> = {
  maternelle: 'Maternelle', elementaire: 'Élémentaire',
  college: 'Collège', lycee: 'Lycée',
}

export default function ProgrammesSection({ etablissements }: { etablissements: Etablissement[] }) {
  const [active, setActive] = useState('all')

  const cards = etablissements.length
    ? etablissements.map(e => ({
        icon: (e as any).icon ?? '🏫',
        title: e.name,
        desc: e.excerpt ?? '',
        niveau: e.niveau,
      }))
    : STATIC_PROGS

  const visible = cards.filter(c => active === 'all' || c.niveau === active)

  return (
    <section id="etablissements" className="py-20 bg-cream">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="ndsl-tag justify-center">Offre pédagogique</span>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold text-navy mt-1">
            Nos filières et programmes
          </h2>
          <div className="ndsl-divider-center" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-9">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-5 py-[.45rem] rounded-full border text-[.76rem] font-medium
                          uppercase tracking-[.04em] transition-all
                          ${active === t.id
                            ? 'bg-navy text-white border-navy'
                            : 'bg-white text-muted border-border hover:border-navy hover:text-navy'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visible.map(card => (
            <div key={card.title} className="ndsl-card p-7 text-center">
              <div className="text-[2rem] mb-3">{card.icon}</div>
              <h3 className="text-[1.2rem] mb-2">{card.title}</h3>
              <p className="text-[.8rem] leading-relaxed mb-3">{card.desc}</p>
              <span className="text-[.67rem] uppercase tracking-[.08em] text-gold font-semibold">
                {NIVEAU_LABEL[card.niveau] ?? card.niveau}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
