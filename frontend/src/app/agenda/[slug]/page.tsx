import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { getEvenement, MOCK_EVENEMENTS, formatDate } from '@/lib/api'

export const revalidate = 300

interface Props { params: Promise<{ slug: string }> }

export default async function EvenementDetailPage({ params }: Props) {
  const { slug } = await params

  let ev = await getEvenement(slug)
  if (!ev) ev = MOCK_EVENEMENTS.find((e) => e.slug === slug) ?? null
  if (!ev) notFound()

  const d = new Date(ev.eventDate)

  return (
    <PageLayout>
      <PageHero
        title={ev.title}
        breadcrumbs={[{ label: 'Agenda', href: '/agenda' }, { label: ev.title }]}
      />

      <article className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-8">

          {/* Event info card */}
          <div className="bg-cream rounded-xl p-8 border border-border mb-8 grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[.72rem] text-muted uppercase tracking-wide font-semibold mb-1">Date</p>
              <p className="text-navy font-semibold">{formatDate(ev.eventDate)}</p>
            </div>
            {ev.eventTime && (
              <div>
                <p className="text-[.72rem] text-muted uppercase tracking-wide font-semibold mb-1">Heure</p>
                <p className="text-navy font-semibold">{ev.eventTime}</p>
              </div>
            )}
            {ev.location && (
              <div>
                <p className="text-[.72rem] text-muted uppercase tracking-wide font-semibold mb-1">Lieu</p>
                <p className="text-navy font-semibold">{ev.location}</p>
              </div>
            )}
            {ev.type && (
              <div>
                <p className="text-[.72rem] text-muted uppercase tracking-wide font-semibold mb-1">Catégorie</p>
                <span className="inline-block bg-gold/15 text-gold text-[.72rem] font-semibold
                                 px-3 py-1 rounded-full uppercase tracking-[.06em] border border-gold/30">
                  {ev.type}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {ev.description ? (
            <div className="prose prose-lg max-w-none text-text"
              dangerouslySetInnerHTML={{ __html: ev.description }} />
          ) : (
            <div className="bg-cream rounded-xl p-8 border border-border text-center">
              <span className="text-4xl mb-3 block">📅</span>
              <p className="text-muted text-[.88rem]">
                Les détails de cet événement seront disponibles prochainement.
                <br />Pour plus d'informations, contactez le{' '}
                <a href="tel:+33134979797" className="text-sky hover:text-navy">01 34 97 97 97</a>.
              </p>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/agenda" className="btn-ghost-dark inline-block">← Retour à l'agenda</Link>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}

export async function generateStaticParams() {
  return MOCK_EVENEMENTS.map((e) => ({ slug: e.slug }))
}
