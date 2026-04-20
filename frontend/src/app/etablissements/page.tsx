import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { getEtablissements, MOCK_ETABLISSEMENTS, NIVEAU_LABELS } from '@/lib/api'

export const revalidate = 3600

export default async function EtablissementsPage() {
  const items = await getEtablissements()
  const etablissements = items.length > 0 ? items : MOCK_ETABLISSEMENTS
  const isApi = items.length > 0

  return (
    <PageLayout>
      <PageHero
        title="Nos établissements"
        subtitle="Un parcours complet de la maternelle au lycée, à Mantes-la-Jolie et Bonnières-sur-Seine"
        breadcrumbs={[{ label: 'Établissements' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">

          {!isApi && (
            <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg px-5 py-3 text-[.82rem] text-amber-800">
              📡 Données d'exemple — les établissements réels seront affichés dès que l'API backend sera connectée.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {etablissements.map((etab) => (
              <Link
                key={etab.id}
                href={`/etablissements/${etab.slug}`}
                className="ndsl-card p-8 flex flex-col gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{etab.icon ?? '🏫'}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: etab.colorDot ?? '#c8a951' }} />
                      <span className="text-[.7rem] text-muted uppercase tracking-[.08em] font-semibold">
                        {NIVEAU_LABELS[etab.niveau] ?? etab.niveau}
                      </span>
                    </div>
                    <h2 className="font-display text-xl text-navy group-hover:text-gold transition-colors">
                      {etab.name}
                    </h2>
                  </div>
                </div>

                {etab.excerpt && (
                  <p className="text-[.85rem] text-muted leading-relaxed">{etab.excerpt}</p>
                )}

                <div className="flex flex-wrap gap-4 text-[.78rem] text-muted mt-auto pt-4 border-t border-border">
                  {etab.city && <span>📍 {etab.city}</span>}
                  {etab.phone && <span>📞 {etab.phone}</span>}
                </div>

                <span className="text-gold text-[.78rem] font-semibold uppercase tracking-[.05em]">
                  Découvrir →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
