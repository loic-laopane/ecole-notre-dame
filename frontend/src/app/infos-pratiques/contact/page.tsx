import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function ContactInfosPage() {
  return (
    <PageLayout>
      <PageHero title="Contact & permanences téléphoniques"
        breadcrumbs={[{ label: 'Infos pratiques', href: '/infos-pratiques' }, { label: 'Contact' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Secrétariat Collège', tel: '01 34 97 97 97', email: 'accueilnd@ndsl78.fr', horaires: ['Lundi – Vendredi : 8h00 – 17h30', 'Mercredi : 8h00 – 12h30'] },
              { title: 'Secrétariat Lycée',   tel: '01 34 97 97 97', email: 'accueilnd@ndsl78.fr', horaires: ['Lundi – Vendredi : 8h00 – 18h00', 'Mercredi : 8h00 – 13h00'] },
              { title: 'Vie Scolaire',        tel: '01 34 97 97 97', email: 'accueilnd@ndsl78.fr', horaires: ['Lundi – Vendredi : 8h00 – 17h00'] },
              { title: 'Direction',           tel: '01 34 97 97 97', email: 'direction@ndsl78.fr',  horaires: ['Sur rendez-vous uniquement'] },
            ].map(c => (
              <div key={c.title} className="bg-cream rounded-xl p-6 border border-border">
                <h3 className="font-display text-xl text-navy mb-4 pb-2 border-b border-border">{c.title}</h3>
                <div className="space-y-2 text-[.85rem]">
                  <p>📞 <a href={`tel:${c.tel.replace(/\s/g,'')}`} className="text-sky hover:text-navy">{c.tel}</a></p>
                  <p>✉️ <a href={`mailto:${c.email}`} className="text-sky hover:text-navy">{c.email}</a></p>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-muted font-medium mb-1 text-[.78rem] uppercase tracking-wide">Permanences</p>
                    {c.horaires.map(h => <p key={h} className="text-muted">{h}</p>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
