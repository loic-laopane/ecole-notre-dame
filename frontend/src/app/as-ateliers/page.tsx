import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
export default function ASAteliersPage() {
  return (
    <PageLayout>
      <PageHero title="AS & Ateliers" subtitle="Association Sportive et ateliers parascolaires" breadcrumbs={[{ label: 'AS & Ateliers' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div>
              <span className="ndsl-tag">Association Sportive</span>
              <h2 className="font-display text-2xl text-navy mt-1 mb-3">Le sport à Notre-Dame</h2>
              <p className="text-muted mb-6">L'Association Sportive propose de nombreuses activités sportives encadrées par les professeurs d'EPS. Compétitions UNSS, entraînements hebdomadaires et tournois inter-établissements rythment l'année.</p>
              <div className="grid grid-cols-2 gap-3">
                {['Football', 'Basketball', 'Volleyball', 'Athlétisme', 'Tennis de table', 'Cross-country', 'Badminton', 'Natation'].map(s => (
                  <div key={s} className="bg-cream rounded-lg p-3 text-center text-[.84rem] font-medium text-navy border border-border">{s}</div>
                ))}
              </div>
            </div>
            <div>
              <span className="ndsl-tag">Ateliers</span>
              <h2 className="font-display text-2xl text-navy mt-1 mb-3">Activités parascolaires</h2>
              <div className="space-y-3">
                {[
                  { icon: '🎭', title: 'Théâtre', desc: 'Atelier hebdomadaire ouvert à tous les niveaux, avec représentation en fin d\'année.' },
                  { icon: '🎵', title: 'Chorale', desc: 'Chant choral en lien avec la pastorale, participation aux célébrations liturgiques.' },
                  { icon: '🖥️', title: 'Informatique', desc: 'Club numérique, initiation à la programmation et aux outils créatifs.' },
                  { icon: '🧶', title: 'Tricot & couture', desc: 'Atelier créatif au CDI, ouvert à tous les élèves chaque semaine.' },
                ].map(a => (
                  <div key={a.title} className="flex gap-3 p-4 bg-cream rounded-lg border border-border">
                    <span className="text-2xl flex-shrink-0">{a.icon}</span>
                    <div><h4 className="font-semibold text-navy text-[.88rem]">{a.title}</h4><p className="text-[.8rem] text-muted">{a.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
