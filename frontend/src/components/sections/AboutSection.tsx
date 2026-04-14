// AboutSection.tsx
export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Visual – desktop only */}
          <div className="hidden lg:block relative">
            <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-sky to-navy
                            flex items-center justify-center overflow-hidden">
              <span className="font-display text-[5rem] text-white/10">N·D</span>
            </div>
            <div className="absolute bottom-[-1.8rem] right-[-1.8rem] w-[45%] aspect-square
                            rounded-xl bg-gradient-to-br from-gold to-rose
                            flex items-center justify-center shadow-xl text-[4rem] text-white/20">
              ✝
            </div>
            <div className="absolute top-5 left-[-1.8rem] bg-white rounded-xl p-4 shadow-xl
                            border-l-[3px] border-gold max-w-[190px] z-10">
              <p className="text-[.75rem] italic text-navy leading-relaxed">
                "Chaque enfant est unique et mérite le meilleur."
              </p>
              <small className="text-[.65rem] text-muted mt-1 block">Projet éducatif NDSL</small>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="ndsl-tag">Qui sommes-nous</span>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold mt-1 mb-0">
              Un ensemble scolaire au cœur de la communauté
            </h2>
            <div className="ndsl-divider" />
            <p className="mb-4">
              Fondé en 1904, l'Ensemble Scolaire Notre-Dame Saint-Louis est un établissement
              catholique d'enseignement sous contrat avec l'État, implanté à Mantes-la-Jolie
              et à Bonnières-sur-Seine.
            </p>
            <p className="mb-4">
              Notre ambition : offrir à chaque élève un parcours d'excellence, ancré dans des
              valeurs humaines et spirituelles solides, dans un environnement bienveillant.
            </p>

            {[
              { icon: '🙏', title: 'Une pastorale vivante',
                desc: 'Aumônerie, retraites, temps forts liturgiques : une vie spirituelle ouverte à tous.' },
              { icon: '🎨', title: 'Culture & parascolaire',
                desc: 'Théâtre, musique, sport, clubs scientifiques : une offre riche pour l\'épanouissement.' },
              { icon: '💼', title: 'Orientation & insertion',
                desc: 'Un suivi personnalisé de l\'orientation, du collège au post-bac.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 mt-5 pt-5 border-t border-border">
                <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <h4 className="text-[.9rem] font-semibold text-navy mb-1">{title}</h4>
                  <p className="text-[.8rem] text-muted m-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
