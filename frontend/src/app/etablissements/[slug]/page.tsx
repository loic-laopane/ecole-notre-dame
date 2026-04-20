import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { getEtablissement, getEtablissements, MOCK_ETABLISSEMENTS, NIVEAU_LABELS } from '@/lib/api'

export const revalidate = 3600

interface Props { params: Promise<{ slug: string }> }

export default async function EtablissementDetailPage({ params }: Props) {
  const { slug } = await params

  let etab = await getEtablissement(slug)
  if (!etab) etab = MOCK_ETABLISSEMENTS.find((e) => e.slug === slug) ?? null
  if (!etab) notFound()

  return (
    <PageLayout>
      <PageHero
        title={etab.name}
        subtitle={NIVEAU_LABELS[etab.niveau] ?? etab.niveau}
        breadcrumbs={[
          { label: 'Établissements', href: '/etablissements' },
          { label: etab.name },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main content */}
            <div className="lg:col-span-2">
              {etab.excerpt && (
                <p className="text-[1rem] text-muted leading-relaxed mb-6 font-medium
                               border-l-4 border-gold pl-5 italic">
                  {etab.excerpt}
                </p>
              )}

              {etab.content ? (
                <div className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: etab.content }} />
              ) : (
                <div className="bg-cream rounded-xl p-8 border border-border">
                  <span className="text-4xl mb-4 block">{etab.icon ?? '🏫'}</span>
                  <p className="text-muted text-[.88rem] leading-relaxed">
                    La présentation détaillée de cet établissement sera disponible prochainement.
                    N'hésitez pas à nous contacter pour obtenir plus d'informations.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              {/* Contact card */}
              <div className="bg-cream rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg text-navy mb-4">Contact</h3>
                <div className="space-y-3 text-[.84rem]">
                  {etab.address && etab.city && (
                    <div className="flex gap-2">
                      <span className="flex-shrink-0">📍</span>
                      <span className="text-muted">{etab.address}<br />{etab.city}</span>
                    </div>
                  )}
                  {etab.phone && (
                    <div className="flex gap-2">
                      <span className="flex-shrink-0">📞</span>
                      <a href={`tel:${etab.phone.replace(/\s/g, '')}`}
                         className="text-sky hover:text-navy transition-colors">
                        {etab.phone}
                      </a>
                    </div>
                  )}
                  {etab.email && (
                    <div className="flex gap-2">
                      <span className="flex-shrink-0">✉️</span>
                      <a href={`mailto:${etab.email}`}
                         className="text-sky hover:text-navy transition-colors break-all">
                        {etab.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-navy rounded-xl p-6 text-center">
                <p className="text-white/70 text-[.82rem] mb-4">
                  Intéressé(e) par cet établissement ?
                </p>
                <Link href="/infos-pratiques/inscriptions" className="btn-primary block text-center">
                  S'inscrire
                </Link>
                <Link href="/contact" className="block text-white/60 text-[.78rem] mt-3 hover:text-gold transition-colors">
                  Nous contacter →
                </Link>
              </div>

              <Link href="/etablissements"
                className="text-muted text-[.8rem] hover:text-gold transition-colors text-center">
                ← Tous les établissements
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export async function generateStaticParams() {
  const items = await getEtablissements()
  const list = items.length > 0 ? items : MOCK_ETABLISSEMENTS
  return list.map((e) => ({ slug: e.slug }))
}
