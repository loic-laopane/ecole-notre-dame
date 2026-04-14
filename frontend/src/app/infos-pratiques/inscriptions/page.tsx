import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

export default function InscriptionsPage() {
  return (
    <PageLayout>
      <PageHero title="Inscriptions" subtitle="Inscriptions au Collège et Lycée Notre-Dame – Mantes-la-Jolie"
        breadcrumbs={[{ label: 'Infos pratiques', href: '/infos-pratiques' }, { label: 'Inscriptions' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="bg-gold/10 border border-gold rounded-xl p-6 mb-10">
            <h2 className="font-display text-xl text-navy mb-2">📅 Inscriptions 2025-2026 ouvertes</h2>
            <p className="text-[.88rem] text-muted">Pour toute demande d'inscription, contactez le secrétariat au <strong>01 34 97 97 97</strong> ou venez directement au 5 rue de la Sangle, Mantes-la-Jolie.</p>
          </div>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Prise de contact', desc: 'Appelez le secrétariat ou envoyez un e-mail pour exprimer votre souhait d\'inscription et obtenir un rendez-vous.' },
              { step: '2', title: 'Rendez-vous d\'accueil', desc: 'Rencontre avec la direction pour présenter l\'établissement, ses valeurs et son projet éducatif.' },
              { step: '3', title: 'Constitution du dossier', desc: 'Remise des bulletins scolaires des deux dernières années, livret de famille et documents administratifs.' },
              { step: '4', title: 'Confirmation d\'inscription', desc: 'Signature du contrat d\'inscription et règlement des frais de scolarité.' },
            ].map(s => (
              <div key={s.step} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-display font-bold text-lg flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">{s.title}</h3>
                  <p className="text-[.85rem] text-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-dark text-center">Nous contacter</Link>
            <Link href="/infos-pratiques/acces" className="btn-ghost-dark text-center">Nous trouver</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
