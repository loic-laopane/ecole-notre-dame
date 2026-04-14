'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/',               label: 'Accueil' },
  { href: '/etablissements', label: 'Établissements' },
  { href: '/actualites',     label: 'Actualités' },
  { href: '/agenda',         label: 'Agenda' },
  { href: '/contact',        label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]= useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gold text-navy text-center py-2 px-4 text-[.78rem] font-semibold tracking-[.04em]">
        🎓 Inscriptions 2025–2026 ouvertes —{' '}
        <Link href="/inscription" className="underline hover:opacity-75">
          Prendre rendez-vous →
        </Link>
      </div>

      {/* Header */}
      <header
        className={`bg-white px-6 flex justify-between items-center border-b border-border
                    sticky top-0 z-50 h-[74px] transition-shadow duration-200
                    ${scrolled ? 'shadow-md' : 'shadow-[0_1px_28px_rgba(28,43,69,.06)]'}`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Ensemble Scolaire Notre-Dame Saint-Louis"
            width={220}
            height={58}
            className="h-[58px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-stretch h-full" aria-label="Menu principal">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-navy text-[.78rem] font-medium px-[.85rem] flex items-center
                         border-b-[3px] border-transparent uppercase tracking-[.05em]
                         transition-all duration-200 hover:text-gold hover:border-gold"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/espace-parents"
            className="border-[1.5px] border-navy text-navy text-[.76rem] font-semibold
                       uppercase tracking-[.05em] px-4 py-2 rounded-sm
                       transition-all duration-200 hover:bg-navy hover:text-white"
          >
            Espace Parents
          </Link>
          <Link
            href="/inscription"
            className="bg-gold text-navy text-[.76rem] font-semibold
                       uppercase tracking-[.05em] px-4 py-2 rounded-sm
                       transition-all duration-200 hover:bg-gold2"
          >
            Inscription
          </Link>
        </div>

        {/* Burger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2 bg-none border-none cursor-pointer z-[310]"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300
            ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300
            ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300
            ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-navy z-[300] flex flex-col
                     items-center justify-center gap-5"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-lg font-medium uppercase tracking-[.06em]
                         px-8 py-3 rounded hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/inscription"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-gold text-navy font-semibold uppercase tracking-[.05em]
                       px-8 py-3 rounded-sm text-[.9rem]"
          >
            Inscription
          </Link>
        </div>
      )}
    </>
  )
}
