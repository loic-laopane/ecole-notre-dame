import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
export default function MentionsLegalesPage() {
  return (
    <PageLayout>
      <PageHero title="Mentions légales" breadcrumbs={[{ label: 'Mentions légales' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8 space-y-8">
          {[
            { title: 'Éditeur du site', content: 'Ensemble Scolaire Notre-Dame Saint-Louis\n5, rue de la Sangle – 78200 Mantes-la-Jolie\nTél : 01 34 97 97 97 – accueilnd@ndsl78.fr\nAssociation loi 1901 sous contrat avec l\'Éducation Nationale' },
            { title: 'Directeur de la publication', content: 'Le Chef d\'établissement de l\'Ensemble Scolaire Notre-Dame Saint-Louis' },
            { title: 'Hébergement', content: 'Vercel Inc.\n340 Pine Street, Suite 701\nSan Francisco, CA 94104, USA\nhttps://vercel.com' },
            { title: 'Propriété intellectuelle', content: 'L\'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de l\'Ensemble Scolaire Notre-Dame Saint-Louis. Toute reproduction est interdite sans autorisation préalable.' },
            { title: 'Données personnelles', content: 'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à accueilnd@ndsl78.fr.' },
          ].map(s => (
            <div key={s.title}>
              <h2 className="font-display text-xl text-navy mb-3 pb-2 border-b border-border">{s.title}</h2>
              <p className="text-muted text-[.88rem] whitespace-pre-line leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
