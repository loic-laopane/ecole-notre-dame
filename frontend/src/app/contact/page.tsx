import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import ContactForm from '@/components/ui/ContactForm'

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHero
        title="Contact"
        subtitle="Contactez le Collège et Lycée Notre-Dame de Mantes-la-Jolie"
        breadcrumbs={[{ label: 'Contact' }]}
      />
      <section className="py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Coordonnées */}
            <div>
              <span className="ndsl-tag">Nos coordonnées</span>
              <h2 className="font-display text-2xl text-navy mt-1 mb-6">
                Tous nos établissements
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'Collège & Lycée Notre-Dame', addr: '5, rue de la Sangle, 78200 Mantes-la-Jolie',      tel: '01 34 97 97 97', email: 'accueilnd@ndsl78.fr',            color: 'border-l-sky'  },
                  { name: 'École Notre-Dame',            addr: '20, rue Saint-Fiacre, 78200 Mantes-la-Jolie',    tel: '01 34 97 97 95', email: 'ecolend@ndsl78.fr',             color: 'border-l-gold' },
                  { name: 'Lycée Professionnel',         addr: '15, rue de Strasbourg, 78200 Mantes-la-Jolie',   tel: '01 34 97 76 03', email: 'lyceeprofessionnel@ndsl78.fr', color: 'border-l-sage' },
                  { name: 'École & Collège Saint-Louis', addr: '23, rue G. Herrewyn, 78270 Bonnières-sur-Seine', tel: '01 30 93 01 21', email: 'accueilsl@ndsl78.fr',           color: 'border-l-navy' },
                ].map((e) => (
                  <div key={e.name} className={`bg-cream rounded-r-xl p-5 border-l-4 ${e.color}`}>
                    <h3 className="font-semibold text-navy mb-1 text-[.9rem]">{e.name}</h3>
                    <p className="text-[.8rem] text-muted mb-2">📍 {e.addr}</p>
                    <p className="text-[.8rem]">
                      📞{' '}
                      <a href={`tel:${e.tel.replace(/\s/g, '')}`} className="text-sky hover:text-navy">
                        {e.tel}
                      </a>
                      {' · '}
                      ✉️{' '}
                      <a href={`mailto:${e.email}`} className="text-sky hover:text-navy">
                        {e.email}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire (Client Component) */}
            <div>
              <span className="ndsl-tag">Formulaire de contact</span>
              <h2 className="font-display text-2xl text-navy mt-1 mb-6">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  )
}
