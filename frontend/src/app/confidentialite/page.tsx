import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
export default function ConfidentialitePage() {
  return (
    <PageLayout>
      <PageHero title="Politique de confidentialité" breadcrumbs={[{ label: 'Confidentialité' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8 space-y-8">
          {[
            { title: 'Collecte des données', content: 'Nous collectons uniquement les données nécessaires au fonctionnement des services proposés sur ce site : formulaires de contact, espace parents/élèves.' },
            { title: 'Utilisation des données', content: 'Les données collectées sont utilisées exclusivement pour répondre à vos demandes et améliorer nos services. Elles ne sont jamais vendues ni transmises à des tiers.' },
            { title: 'Conservation des données', content: 'Les données sont conservées pour la durée strictement nécessaire à l\'accomplissement des finalités pour lesquelles elles ont été collectées, conformément à la réglementation.' },
            { title: 'Vos droits', content: 'Conformément au RGPD (Règlement Général sur la Protection des Données), vous disposez des droits suivants : accès, rectification, effacement, portabilité et opposition. Pour exercer ces droits : accueilnd@ndsl78.fr.' },
            { title: 'Cookies', content: 'Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de traçage n\'est utilisé.' },
          ].map(s => (
            <div key={s.title}>
              <h2 className="font-display text-xl text-navy mb-3 pb-2 border-b border-border">{s.title}</h2>
              <p className="text-muted text-[.88rem] leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
