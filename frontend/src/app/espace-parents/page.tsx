import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

// TODO: protect this route with next-auth middleware once OAuth2 is configured
// middleware.ts should redirect to /api/auth/signin when not authenticated

export default function EspaceParentsPage() {
  return (
    <PageLayout>
      <PageHero
        title="Espace Parents"
        subtitle="Accédez aux informations de votre enfant"
        breadcrumbs={[{ label: 'Espace Parents' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-[520px] mx-auto px-8 text-center">

          {/* Lock icon */}
          <div className="w-20 h-20 bg-cream border-2 border-border rounded-full
                          flex items-center justify-center text-4xl mx-auto mb-6">
            🔒
          </div>

          <h2 className="font-display text-2xl text-navy mb-3">Connexion requise</h2>
          <p className="text-muted text-[.9rem] leading-relaxed mb-8">
            L'espace parents est un espace sécurisé. Connectez-vous avec votre compte Google
            ou Microsoft pour accéder aux notes, absences et communications de l'établissement.
          </p>

          {/* OAuth2 buttons — will call /api/auth/signin once backend is ready */}
          <div className="flex flex-col gap-3 mb-8">
            <a
              href="/api/auth/signin?callbackUrl=/espace-parents"
              className="flex items-center justify-center gap-3 w-full py-3 px-6
                         bg-white border-2 border-border rounded-xl text-navy font-medium
                         text-[.9rem] hover:border-gold hover:shadow-md transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuer avec Google
            </a>

            <a
              href="/api/auth/signin?callbackUrl=/espace-parents"
              className="flex items-center justify-center gap-3 w-full py-3 px-6
                         bg-[#0078d4] text-white rounded-xl font-medium text-[.9rem]
                         hover:bg-[#106ebe] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 2L2 7.5v9L11.5 22l9.5-5.5v-9L11.5 2zm-1 14.3l-4-2.3v-4l4 2.3v4zm1-5.7L7.5 8.3l4-2.3 4 2.3L11.5 10.6zm5 3.4l-4 2.3v-4l4-2.3v4z"/>
              </svg>
              Continuer avec Microsoft
            </a>
          </div>

          {/* Info notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
            <p className="text-[.78rem] text-amber-800 font-semibold mb-1">
              🚧 Fonctionnalité en cours de déploiement
            </p>
            <p className="text-[.76rem] text-amber-700">
              L'authentification OAuth2 sera activée dès que le backend Symfony sera déployé.
              En attendant, contactez le secrétariat au{' '}
              <a href="tel:+33134979797" className="underline">01 34 97 97 97</a>.
            </p>
          </div>

          <p className="text-[.78rem] text-muted mt-6">
            Problème de connexion ?{' '}
            <Link href="/contact" className="text-sky hover:text-navy transition-colors">
              Contactez-nous
            </Link>
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
