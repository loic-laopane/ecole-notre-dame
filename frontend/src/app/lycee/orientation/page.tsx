import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function OrientationPage() {
  return (
    <PageLayout>
      <PageHero title="Orientation" subtitle="Préparer son avenir avec l'équipe du Lycée Notre-Dame"
        breadcrumbs={[{ label: 'Lycée', href: '/lycee' }, { label: 'Orientation' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {[
              { icon: '🧭', title: 'Parcoursup', desc: 'Accompagnement complet pour la saisie des vœux Parcoursup : ateliers collectifs, suivi individuel, lettres de motivation.' },
              { icon: '🎓', title: 'Journées portes ouvertes', desc: 'Aide à la préparation des visites dans les établissements d\'enseignement supérieur : BTS, IUT, licences, classes prépa.' },
              { icon: '💼', title: 'Forums & salons', desc: 'Participation aux salons de l\'étudiant et organisation de rencontres avec des professionnels et anciens élèves.' },
              { icon: '📊', title: 'Suivi personnalisé', desc: 'Entretiens réguliers avec le professeur principal et le conseiller d\'orientation pour construire un projet cohérent.' },
            ].map(r => (
              <div key={r.title} className="bg-cream rounded-xl p-6 border border-border">
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="font-display text-xl text-navy mb-2">{r.title}</h3>
                <p className="text-[.84rem] text-muted">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-cream rounded-xl p-6 border border-border">
            <h3 className="font-display text-xl text-navy mb-4">Liens utiles</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Parcoursup', url: 'https://www.parcoursup.fr' },
                { label: 'ONISEP',     url: 'https://www.onisep.fr' },
                { label: 'Mon Stage de Seconde', url: 'https://www.monstagedeseconde.gouv.fr' },
                { label: 'Studyrama', url: 'https://www.studyrama.com' },
              ].map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener"
                  className="flex items-center gap-2 p-3 bg-white border border-border rounded-lg hover:border-gold transition-colors text-[.84rem] font-medium text-sky">
                  🔗 {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
