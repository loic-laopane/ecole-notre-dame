import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function InscriptionASPage() {
  return (
    <PageLayout>
      <PageHero title="Inscription AS 2025-2026" subtitle="Association Sportive du Collège Notre-Dame"
        breadcrumbs={[{ label: 'Collège', href: '/college' }, { label: 'Inscription AS' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="bg-gold/10 border border-gold rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl text-navy mb-2">⚽ Inscriptions ouvertes !</h2>
            <p className="text-[.88rem] text-muted">Les inscriptions à l'Association Sportive pour l'année 2025-2026 sont ouvertes. Rejoignez-nous pour pratiquer votre sport préféré dans un esprit de fair-play et de convivialité.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {['Football', 'Basketball', 'Volleyball', 'Athlétisme', 'Tennis de table', 'Cross-country'].map(sport => (
              <div key={sport} className="bg-cream rounded-lg p-4 text-center border border-border hover:border-gold transition-colors">
                <p className="font-medium text-navy">{sport}</p>
              </div>
            ))}
          </div>
          <div className="bg-navy rounded-xl p-6 text-white">
            <h3 className="font-display text-xl mb-3">Comment s'inscrire</h3>
            <ol className="space-y-2 text-[.85rem] text-white/80">
              <li>1. Récupérer le formulaire d'inscription au secrétariat</li>
              <li>2. Le faire signer par vos parents</li>
              <li>3. Joindre un certificat médical de non contre-indication</li>
              <li>4. Remettre le dossier complet au professeur d'EPS</li>
            </ol>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
