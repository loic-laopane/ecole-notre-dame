import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHero title="Contact" subtitle="Contactez le Collège et Lycée Notre-Dame de Mantes-la-Jolie"
        breadcrumbs={[{ label: 'Contact' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Coordonnées */}
            <div>
              <span className="ndsl-tag">Nos coordonnées</span>
              <h2 className="font-display text-2xl text-navy mt-1 mb-6">Tous nos établissements</h2>
              <div className="space-y-4">
                {[
                  { name: 'Collège & Lycée Notre-Dame', addr: '5, rue de la Sangle, 78200 Mantes-la-Jolie', tel: '01 34 97 97 97', email: 'accueilnd@ndsl78.fr', color: 'border-l-sky' },
                  { name: 'École Notre-Dame',            addr: '20, rue Saint-Fiacre, 78200 Mantes-la-Jolie', tel: '01 34 97 97 95', email: 'ecolend@ndsl78.fr', color: 'border-l-gold' },
                  { name: 'Lycée Professionnel',         addr: '15, rue de Strasbourg, 78200 Mantes-la-Jolie', tel: '01 34 97 76 03', email: 'lyceeprofessionnel@ndsl78.fr', color: 'border-l-sage' },
                  { name: 'École & Collège Saint-Louis', addr: '23, rue G. Herrewyn, 78270 Bonnières-sur-Seine', tel: '01 30 93 01 21', email: 'accueilsl@ndsl78.fr', color: 'border-l-navy' },
                ].map(e => (
                  <div key={e.name} className={`bg-cream rounded-r-xl p-5 border-l-4 ${e.color}`}>
                    <h3 className="font-semibold text-navy mb-1 text-[.9rem]">{e.name}</h3>
                    <p className="text-[.8rem] text-muted mb-2">📍 {e.addr}</p>
                    <p className="text-[.8rem]">
                      📞 <a href={`tel:${e.tel.replace(/\s/g,'')}`} className="text-sky hover:text-navy">{e.tel}</a>
                      {' · '}
                      ✉️ <a href={`mailto:${e.email}`} className="text-sky hover:text-navy">{e.email}</a>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div>
              <span className="ndsl-tag">Formulaire de contact</span>
              <h2 className="font-display text-2xl text-navy mt-1 mb-6">Envoyez-nous un message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[.8rem] font-medium text-navy mb-1">Prénom *</label>
                    <input type="text" className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem] focus:border-gold focus:outline-none" placeholder="Marie" />
                  </div>
                  <div>
                    <label className="block text-[.8rem] font-medium text-navy mb-1">Nom *</label>
                    <input type="text" className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem] focus:border-gold focus:outline-none" placeholder="Dupont" />
                  </div>
                </div>
                <div>
                  <label className="block text-[.8rem] font-medium text-navy mb-1">E-mail *</label>
                  <input type="email" className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem] focus:border-gold focus:outline-none" placeholder="marie.dupont@email.fr" />
                </div>
                <div>
                  <label className="block text-[.8rem] font-medium text-navy mb-1">Établissement concerné</label>
                  <select className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem] focus:border-gold focus:outline-none bg-white">
                    <option>Collège & Lycée Notre-Dame (Mantes-la-Jolie)</option>
                    <option>École Notre-Dame (Mantes-la-Jolie)</option>
                    <option>Lycée Professionnel (Mantes-la-Jolie)</option>
                    <option>École & Collège Saint-Louis (Bonnières)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[.8rem] font-medium text-navy mb-1">Sujet *</label>
                  <input type="text" className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem] focus:border-gold focus:outline-none" placeholder="Demande d'information..." />
                </div>
                <div>
                  <label className="block text-[.8rem] font-medium text-navy mb-1">Message *</label>
                  <textarea rows={5} className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem] focus:border-gold focus:outline-none resize-none" placeholder="Votre message..." />
                </div>
                <button type="submit" className="btn-dark w-full text-center">Envoyer le message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
