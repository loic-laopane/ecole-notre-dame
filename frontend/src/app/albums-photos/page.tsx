import PageLayout from '@/components/layout/PageLayout'
import PageHero from '@/components/ui/PageHero'
export default function AlbumPhotosPage() {
  return (
    <PageLayout>
      <PageHero title="Albums photos" subtitle="Les souvenirs de la vie scolaire à Notre-Dame" breadcrumbs={[{ label: 'Albums photos' }]} />
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { year: '2024-2025', count: 'En cours' }, { year: '2023-2024', count: '12 albums' },
              { year: '2022-2023', count: '9 albums'  }, { year: '2021-2022', count: '8 albums'  },
              { year: '2020-2021', count: '6 albums'  }, { year: '2019-2020', count: '7 albums'  },
              { year: '2018-2019', count: '10 albums' }, { year: 'Vie au CDI', count: 'Albums CDI'},
            ].map(a => (
              <div key={a.year} className="bg-cream rounded-xl p-6 text-center border border-border hover:border-gold transition-colors cursor-pointer group">
                <div className="text-4xl mb-3">📷</div>
                <h3 className="font-display text-lg text-navy group-hover:text-gold transition-colors">{a.year}</h3>
                <p className="text-[.78rem] text-muted mt-1">{a.count}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-navy/5 rounded-xl p-6 text-center border border-navy/10">
            <p className="text-muted text-[.85rem]">📸 Les photos sont réservées à la communauté scolaire. Connexion requise pour accéder aux albums complets.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
