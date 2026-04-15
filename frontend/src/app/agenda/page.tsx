import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { getEvenements, MOCK_EVENEMENTS, formatDate, formatDateShort } from '@/lib/api'

export const revalidate = 60

const TYPE_COLORS: Record<string, string> = {
  'Événement':  'bg-sky/15 text-sky border-sky/30',
  'Pastorale':  'bg-gold/15 text-gold border-gold/30',
  'Calendrier': 'bg-sage/15 text-sage border-sage/30',
  'Résultats':  'bg-rose/15 text-rose border-rose/30',
}

export default async function AgendaPage() {
  const { items } = await getEvenements({ upcoming: true })
  const evenements = items.length > 0 ? items : MOCK_EVENEMENTS
  const isApi = items.length > 0

  return (
    <PageLayout>
      <PageHero
        title="Agenda"
        subtitle="Les prochains événements de l'Ensemble Scolaire Notre-Dame Saint-Louis"
        breadcrumbs={[{ label: 'Agenda' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8">

          {!isApi && (
            <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg px-5 py-3 text-[.82rem] text-amber-800">
              📡 Événements d'exemple — l'agenda réel sera affiché dès que l'API backend sera connectée.
            </div>
          )}

          <div className="flex flex-col gap-3">
            {evenements.map((ev) => {
              const { day, month } = formatDateShort(ev.eventDate)
              const typeColor = TYPE_COLORS[ev.type ?? ''] ?? 'bg-navy/10 text-navy border-navy/20'
              return (
                <Link
                  key={ev.id}
                  href={`/agenda/${ev.slug}`}
                  className="flex items-center gap-5 p-5 bg-white border border-border rounded-xl
                             hover:border-gold hover:shadow-md transition-all group"
                >
                  {/* Date badge */}
                  <div className="bg-navy text-white rounded-xl w-14 h-14 flex flex-col
                                  items-center justify-center flex-shrink-0">
                    <span className="font-display text-xl font-bold leading-none text-gold">{day}</span>
                    <span className="text-[.6rem] uppercase opacity-70">{month}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-navy text-[.95rem] group-hover:text-gold
                                   transition-colors truncate">
                      {ev.title}
                    </h2>
                    <p className="text-[.78rem] text-muted mt-1">
                      {[ev.eventTime, ev.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>

                  {/* Type badge */}
                  {ev.type && (
                    <span className={`border text-[.65rem] font-semibold px-2.5 py-1
                                      rounded-full uppercase tracking-[.06em] flex-shrink-0 ${typeColor}`}>
                      {ev.type}
                    </span>
                  )}

                  <span className="text-muted text-lg flex-shrink-0 group-hover:text-gold transition-colors">›</span>
                </Link>
              )
            })}
          </div>

          {evenements.length === 0 && (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">📅</span>
              <p className="text-muted">Aucun événement à venir pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
