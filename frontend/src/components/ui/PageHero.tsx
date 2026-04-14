import Link from 'next/link'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

export default function PageHero({ title, subtitle, breadcrumbs = [] }: PageHeroProps) {
  return (
    <div className="bg-navy py-14 px-6 relative overflow-hidden">
      {/* Cross watermark */}
      <span className="absolute right-[5%] top-1/2 -translate-y-1/2
                       font-display text-[12rem] text-white/[.03] pointer-events-none select-none">
        ✝
      </span>
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-white/50 text-[.75rem] mb-4 flex-wrap">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {b.href && i < breadcrumbs.length - 1 ? (
                  <Link href={b.href} className="hover:text-gold transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-gold">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-white text-[clamp(1.8rem,4vw,3rem)] font-bold">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/60 mt-2 text-[.95rem] max-w-[600px]">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
