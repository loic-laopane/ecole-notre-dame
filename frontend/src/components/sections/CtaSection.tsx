import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-[860px] mx-auto px-8 text-center">
        <span className="ndsl-tag justify-center">Inscriptions</span>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-navy mt-1">
          Rejoindre Notre-Dame<br />Saint-Louis
        </h2>
        <div className="ndsl-divider-center" />
        <p className="text-muted max-w-[560px] mx-auto mb-8 leading-7">
          Vous souhaitez inscrire votre enfant dans notre ensemble scolaire ? Découvrez la
          procédure d'admission et prenez rendez-vous avec notre équipe.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Redirige vers la page inscriptions (via /inscription → redirect) */}
          <Link href="/infos-pratiques/inscriptions" className="btn-dark text-center">
            Demander une inscription
          </Link>
          <Link href="/contact" className="btn-ghost-dark text-center">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  )
}
