import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function DocumentsPage() {
  return (
    <PageLayout>
      <PageHero title="Documents de rentrée"
        breadcrumbs={[{ label: 'Infos pratiques', href: '/infos-pratiques' }, { label: 'Documents de rentrée' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8 prose prose-lg">
          <div className="bg-cream rounded-xl p-8 border border-border mb-8">
            <h2 className="font-display text-2xl text-navy mb-4">📄 Documents disponibles</h2>
            <p className="text-muted">Les documents de rentrée seront mis à disposition ici dès la fin du mois de juin. Revenez consulter cette page régulièrement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Liste de fournitures – Collège', 'Liste de fournitures – Lycée', 'Règlement intérieur', 'Charte informatique', 'Formulaire de renseignements', 'Autorisation sortie scolaire'].map(doc => (
              <div key={doc} className="flex items-center gap-3 p-4 bg-white border border-border rounded-lg hover:border-gold transition-colors cursor-pointer">
                <span className="text-2xl">📋</span>
                <span className="text-[.88rem] font-medium text-navy">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
