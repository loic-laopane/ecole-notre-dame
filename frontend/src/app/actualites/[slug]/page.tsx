import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { getActualite, MOCK_ACTUALITES, CATEGORY_LABELS, NIVEAU_LABELS, formatDate } from '@/lib/api'

export const revalidate = 300

interface Props { params: Promise<{ slug: string }> }

export default async function ActualiteDetailPage({ params }: Props) {
  const { slug } = await params

  // Try API first, fall back to mock
  let actu = await getActualite(slug)
  if (!actu) {
    actu = MOCK_ACTUALITES.find((a) => a.slug === slug) ?? null
  }

  if (!actu) notFound()

  return (
    <PageLayout>
      <PageHero
        title={actu.title}
        breadcrumbs={[
          { label: 'Actualités', href: '/actualites' },
          { label: actu.title },
        ]}
      />

      <article className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-8">

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-border">
            {actu.publishedAt && (
              <span className="text-[.8rem] text-muted">
                📅 {formatDate(actu.publishedAt)}
              </span>
            )}
            {actu.category && (
              <span className="bg-gold/15 text-gold text-[.72rem] font-semibold px-3 py-1
                               rounded-full uppercase tracking-[.06em]">
                {CATEGORY_LABELS[actu.category] ?? actu.category}
              </span>
            )}
            {actu.niveau && actu.niveau !== 'tous' && (
              <span className="bg-navy/10 text-navy text-[.72rem] font-semibold px-3 py-1
                               rounded-full uppercase tracking-[.06em]">
                {NIVEAU_LABELS[actu.niveau] ?? actu.niveau}
              </span>
            )}
          </div>

          {/* Excerpt */}
          {actu.excerpt && (
            <p className="text-[1rem] text-muted leading-relaxed mb-8 font-medium italic
                           border-l-4 border-gold pl-5">
              {actu.excerpt}
            </p>
          )}

          {/* Content */}
          {actu.content ? (
            <div
              className="prose prose-lg max-w-none text-text"
              dangerouslySetInnerHTML={{ __html: actu.content }}
            />
          ) : (
            <div className="bg-cream rounded-xl p-8 border border-border text-center">
              <span className="text-4xl mb-3 block">📝</span>
              <p className="text-muted text-[.88rem]">
                Le contenu complet sera disponible dès que l'API backend sera connectée.
              </p>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/actualites" className="btn-ghost-dark inline-block">
              ← Retour aux actualités
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}

// Pre-generate mock slugs at build time
export async function generateStaticParams() {
  return MOCK_ACTUALITES.map((a) => ({ slug: a.slug }))
}
