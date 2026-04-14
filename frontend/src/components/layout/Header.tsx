'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface NavItem {
  href: string
  label: string
  children?: { href: string; label: string }[]
}

const NAV: NavItem[] = [
  { href: '/', label: 'Accueil' },
  {
    href: '/infos-pratiques', label: 'Infos pratiques',
    children: [
      { href: '/infos-pratiques/documents-de-rentree', label: 'Documents de rentrée' },
      { href: '/infos-pratiques/horaires',             label: 'Horaires des cours' },
      { href: '/infos-pratiques/acces',                label: 'Accès' },
      { href: '/infos-pratiques/contact',              label: 'Contact & permanences' },
      { href: '/infos-pratiques/inscriptions',         label: 'Inscriptions' },
    ],
  },
  {
    href: '/college', label: 'Collège',
    children: [
      { href: '/college/equipe-educative',  label: 'Équipe éducative' },
      { href: '/college/organisation',      label: 'Organisation de la scolarité' },
      { href: '/college/inscription-as',    label: 'Inscription AS 2025-2026' },
    ],
  },
  {
    href: '/lycee', label: 'Lycée',
    children: [
      { href: '/lycee/equipe-educative', label: 'Équipe éducative' },
      { href: '/lycee/seconde',          label: 'Classe de seconde' },
      { href: '/lycee/orientation',      label: 'Orientation' },
      { href: '/lycee/fce',              label: 'First Certificate in English' },
      { href: '/lycee/espagnol',         label: 'Espagnol – ELYTE & eTwinning' },
    ],
  },
  {
    href: '/pastorale', label: 'Pastorale',
    children: [
      { href: '/pastorale/actualites',  label: 'Actualités pastorales' },
      { href: '/pastorale/culture',     label: 'Culture' },
      { href: '/pastorale/celebrations',label: 'Célébrations' },
      { href: '/pastorale/engagement',  label: 'Engagement & solidarité' },
    ],
  },
  {
    href: '/cdi', label: 'CDI',
    children: [
      { href: '/cdi/college', label: 'CDI Collège' },
      { href: '/cdi/lycee',   label: 'CDI Lycée' },
    ],
  },
  { href: '/as-ateliers',  label: 'AS & Ateliers' },
  { href: '/albums-photos', label: 'Albums photos' },
  { href: '/contact',      label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled]   = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gold text-navy text-center py-2 px-4 text-[.75rem] font-semibold tracking-[.04em]">
        🎓 Inscriptions 2025–2026 ouvertes —{' '}
        <Link href="/infos-pratiques/inscriptions" className="underline hover:opacity-75">
          Prendre rendez-vous →
        </Link>
      </div>

      {/* Header */}
      <header className={`bg-white px-6 flex justify-between items-center border-b border-border
                          sticky top-0 z-50 h-[70px] transition-shadow duration-200
                          ${scrolled ? 'shadow-md' : 'shadow-[0_1px_28px_rgba(28,43,69,.06)]'}`}>
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Ensemble Scolaire Notre-Dame Saint-Louis"
            width={200} height={54}
            className="h-[54px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav ref={dropdownRef} className="hidden xl:flex items-stretch h-full" aria-label="Menu principal">
          {NAV.map((item) => (
            <div key={item.href} className="relative flex items-stretch">
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                    className="text-navy text-[.72rem] font-medium px-[.7rem] flex items-center gap-1
                               border-b-[3px] border-transparent uppercase tracking-[.04em]
                               transition-all hover:text-gold hover:border-gold cursor-pointer bg-none border-t-0 border-l-0 border-r-0"
                  >
                    {item.label}
                    <span className={`text-[.6rem] transition-transform ${openDropdown === item.href ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {openDropdown === item.href && (
                    <div className="absolute top-full left-0 bg-white border border-border
                                    shadow-lg rounded-b-lg min-w-[220px] z-50 py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[.78rem] text-navy hover:bg-cream
                                     hover:text-gold transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-navy text-[.72rem] font-medium px-[.7rem] flex items-center
                             border-b-[3px] border-transparent uppercase tracking-[.04em]
                             transition-all hover:text-gold hover:border-gold"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
          <Link href="/infos-pratiques/inscriptions"
            className="bg-gold text-navy text-[.72rem] font-semibold uppercase tracking-[.04em]
                       px-3 py-2 rounded-sm transition-all hover:bg-gold2">
            Inscription
          </Link>
        </div>

        {/* Burger */}
        <button
          className="xl:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer z-[310]"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden fixed inset-0 bg-navy z-[300] overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-1 min-h-full">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-white/60 text-2xl mb-4 bg-transparent border-none cursor-pointer"
              aria-label="Fermer"
            >✕</button>
            {NAV.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white font-medium uppercase tracking-[.05em] text-[.9rem]
                             py-3 border-b border-white/10 hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-white/60 text-[.82rem] py-2 hover:text-gold transition-colors"
                      >
                        → {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/infos-pratiques/inscriptions"
              onClick={() => setMenuOpen(false)}
              className="mt-6 bg-gold text-navy font-semibold uppercase tracking-[.05em]
                         px-6 py-3 rounded-sm text-center text-[.88rem]"
            >
              Inscription
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
