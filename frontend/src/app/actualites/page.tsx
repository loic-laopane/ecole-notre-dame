import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { getActualites, MOCK_ACTUALITES, CATEGORY_LABELS, NIVEAU_LABELS, formatDate } from '@/lib/api'

export const revalidate = 60

export default async function ActualitesPage() {
  const { items, total } = await getActualites()
  const actualites = items.length > 0 ? items : MOCK_ACTUALITES
  const isApi = items.length > 0

  return (
    <PageLayout>
      <PageHero
        title="Actualités"
        subtitle="Toute la vie du Collège et Lycée Notre-Dame de Mantes-la-Jolie"
        breadcrumbs={[{ label: 'Actualités' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">

          {/* API status notice */}
          {!isApi && (
            <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg px-5 py-3 text-[.82rem] text-amber-800">
              📡 Contenu d'exemple — les actualités réelles seront affichées dès que l'API backend sera connectée.
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <p className="text-muted text-[.88rem]">
              {isApi ? `${total} article${total > 1 ? 's' : ''}` : `${actualites.length} articles d'exemple`}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actualites.map((actu) => (
              <article key={actu.id} className="ndsl-card overflow-hidden flex flex-col group">
                {/* Thumbnail */}
                <div className="h-48 bg-gradient-to-br from-navy to-sky relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  {actu.category && (
                    <span className="absolute bottom-3 left-3 bg-gold text-navy text-[.65rem]
                                     font-bold px-2 py-[.18rem] rounded-sm uppercase tracking-[.08em]">
                      {CATEGORY_LABELS[actu.category] ?? actu.category}
                    </span>
                  )}
                  {actu.niveau && actu.niveau !== 'tous' && (
                    <span className="absolute top-3 right-3 bg-white/20 text-white text-[.65rem]
                                     font-semibold px-2 py-[.18rem] rounded-sm uppercase tracking-[.08em]">
                      {NIVEAU_LABELS[actu.niveau] ?? actu.niveau}
                    </span>
                  )}
                </div>
                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[.72rem] text-muted mb-2">
                    {actu.publishedAt ? formatDate(actu.publishedAt) : ''}
                  </p>
                  <h2 className="font-display text-[1.15rem] text-navy mb-2 leading-snug
                                 group-hover:text-gold transition-colors line-clamp-2">
                    {actu.title}
                  </h2>
                  {actu.excerpt && (
                    <p className="text-[.83rem] text-muted leading-relaxed mb-4 line-clamp-3 flex-1">
                      {actu.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/actualites/${actu.slug}`}
                    className="text-sky text-[.78rem] font-semibold uppercase tracking-[.04em]
                               hover:text-navy transition-colors mt-auto"
                  >
                    Lire la suite →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {actualites.length === 0 && (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">📰</span>
              <p className="text-muted">Aucune actualité pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
