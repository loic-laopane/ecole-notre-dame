import Link from 'next/link'
import type { Evenement } from '@/lib/api'
import { formatDateShort } from '@/lib/api'

export default function AgendaSection({ evenements }: { evenements: Evenement[] }) {
  return (
    <section className="py-16 bg-navy">
      <div className="max-w-[1200px] mx-auto px-8
                      grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
        {/* Title */}
        <div>
          <span className="inline-flex items-center gap-1 text-gold2 text-[.7rem] font-semibold
                           tracking-[.12em] uppercase mb-2">
            <span className="block w-[18px] h-[1.5px] bg-[#e8cf85]" />
            Agenda complet
          </span>
          <h2 className="font-display text-white text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight mt-1">
            Dates importantes à retenir
          </h2>
          <p className="text-white/60 text-[.88rem] leading-7 mt-3">
            Suivez les temps forts de l'année scolaire pour tous les établissements.
          </p>
          <Link
            href="/agenda"
            className="inline-block mt-6 border border-white/30 text-white
                       px-5 py-[.6rem] rounded-sm text-[.76rem] font-medium
                       uppercase tracking-[.06em] transition-all
                       hover:border-gold hover:text-gold"
          >
            Voir tout l'agenda →
          </Link>
        </div>

        {/* Events list */}
        <div className="flex flex-col">
          {evenements.length > 0 ? (
            evenements.map((ev) => {
              const { day, month } = formatDateShort(ev.eventDate)
              return (
                <Link
                  key={ev.id}
                  href={`/agenda/${ev.slug}`}
                  className="flex gap-5 items-center px-4 py-4 rounded-lg
                             hover:bg-white/5 transition-colors"
                >
                  <div className="w-[50px] text-center flex-shrink-0">
                    <div className="font-display text-[1.75rem] font-bold text-gold leading-none">{day}</div>
                    <div className="text-[.62rem] text-white/50 uppercase tracking-[.08em]">{month}</div>
                  </div>
                  <div className="w-[2px] h-10 bg-white/10 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-white text-[.88rem] font-medium mb-[.18rem]">{ev.title}</h4>
                    <p className="text-white/50 text-[.76rem]">
                      {[ev.eventTime, ev.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  {ev.type && (
                    <span className="bg-gold/15 border border-gold/30 text-gold
                                     text-[.63rem] font-semibold px-2 py-[.13rem]
                                     rounded-full uppercase tracking-[.06em] whitespace-nowrap flex-shrink-0">
                      {ev.type}
                    </span>
                  )}
                </Link>
              )
            })
          ) : (
            <p className="text-white/40 text-[.9rem] py-6">Aucun événement à venir.</p>
          )}
        </div>
      </div>
    </section>
  )
}
