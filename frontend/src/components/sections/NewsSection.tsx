import Link from 'next/link'
import type { Actualite, Evenement } from '@/lib/api'
import { formatDate } from '@/lib/api'

// ── NEWS SECTION ─────────────────────────────────────────

export default function NewsSection({
  actualites, evenements,
}: {
  actualites: Actualite[]
  evenements: Evenement[]
}) {
  const featured = actualites[0]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">

          {/* Featured article */}
          <div>
            <div className="flex justify-between items-end flex-wrap gap-3 mb-2">
              <div>
                <span className="ndsl-tag">Actualités</span>
                <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold text-navy mt-1">
                  La vie de l'école
                </h2>
                <div className="ndsl-divider" />
              </div>
              <Link href="/actualites"
                className="text-sky text-[.76rem] font-semibold uppercase tracking-[.04em]
                           hover:text-navy transition-colors">
                Tout voir →
              </Link>
            </div>

            {featured ? (
              <article className="bg-cream rounded-xl overflow-hidden shadow-sm
                                  transition-transform hover:-translate-y-1">
                <div className="h-[240px] bg-gradient-to-br from-navy to-sky relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  {featured.category && (
                    <span className="absolute bottom-4 left-4 z-10 bg-gold text-navy
                                     text-[.65rem] font-bold px-2 py-[.18rem] rounded-sm
                                     uppercase tracking-[.08em]">
                      {featured.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-[.72rem] text-muted mb-2">
                    {featured.publishedAt ? formatDate(featured.publishedAt) : ''}
                  </p>
                  <h3 className="font-display text-[1.4rem] text-navy mb-2 leading-snug">
                    {featured.title}
                  </h3>
                  <p className="text-[.83rem] text-muted leading-relaxed mb-4">
                    {featured.excerpt}
                  </p>
                  <Link href={`/actualites/${featured.slug}`}
                    className="text-sky text-[.76rem] font-semibold uppercase tracking-[.04em]
                               hover:text-navy transition-colors">
                    Lire la suite →
                  </Link>
                </div>
              </article>
            ) : (
              <div className="bg-cream rounded-xl p-8 text-center text-muted">
                Aucune actualité pour le moment.
              </div>
            )}
          </div>

          {/* Events sidebar */}
          <div>
            <h3 className="font-display text-[1.45rem] text-navy mb-4 pb-3
                           border-b-2 border-gold">
              Prochains événements
            </h3>
            <div className="space-y-1">
              {evenements.length > 0 ? evenements.map(ev => {
                const d    = new Date(ev.eventDate)
                const day  = d.toLocaleDateString('fr-FR', { day: '2-digit' })
                const mois = d.toLocaleDateString('fr-FR', { month: 'short' })
                return (
                  <Link key={ev.id} href={`/agenda/${ev.slug}`}
                    className="flex gap-3 p-3 rounded-lg border border-transparent
                               hover:bg-cream hover:border-border transition-all">
                    <div className="event-date-badge">
                      <span className="font-display text-[1.15rem] font-bold leading-none">{day}</span>
                      <span className="text-[.58rem] uppercase opacity-70">{mois}</span>
                    </div>
                    <div>
                      <h4 className="text-[.84rem] font-semibold text-navy mb-[.18rem] leading-snug">
                        {ev.title}
                      </h4>
                      <span className="text-[.72rem] text-gold uppercase tracking-[.05em]">
                        {ev.type ?? 'Événement'}
                      </span>
                    </div>
                  </Link>
                )
              }) : (
                <p className="text-muted text-[.85rem] py-4">Aucun événement à venir.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
