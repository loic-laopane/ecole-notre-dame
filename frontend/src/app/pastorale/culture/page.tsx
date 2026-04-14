import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'

export default function Page() {
  return (
    <PageLayout>
      <PageHero title="Culture" subtitle="" breadcrumbs={[{ label: "Pastorale", href: "/pastorale" }, { label: "Culture" }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="bg-cream rounded-xl p-8 border border-border text-center">
            <span className="text-5xl">✝️</span>
            <h2 className="font-display text-2xl text-navy mt-4 mb-2">Culture</h2>
            <p className="text-muted">Le contenu de cette section sera publié prochainement. Pour toute question, contactez l'équipe pastorale au <strong>01 34 97 97 97</strong>.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
