'use client'

interface GoogleMapProps {
  /** Requête de recherche Google Maps (ex: "5+rue+de+la+Sangle+Mantes-la-Jolie") */
  query: string
  /** Texte alternatif pour l'accessibilité */
  label: string
  /** Hauteur de la carte (défaut : 400px) */
  height?: string
}

/**
 * Carte Google Maps intégrée via l'API Embed (sans clé API requise).
 * Utilise le mode "place" pour afficher un marqueur sur l'adresse.
 *
 * ⚠️ Pour la production, il est recommandé d'obtenir une clé Google Maps
 * Embed API (gratuite jusqu'à 25 000 req/mois) et de la passer via
 * NEXT_PUBLIC_GOOGLE_MAPS_KEY pour éviter les limitations de quota.
 */
export default function GoogleMap({ query, label, height = '400px' }: GoogleMapProps) {
  // Avec clé API (recommandé en production) :
  // const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  // const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&language=fr`

  // Sans clé API (fonctionne en dev et prod, sujet aux limitations de quota)
  const src = `https://maps.google.com/maps?q=${query}&output=embed&hl=fr&z=16`

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-border shadow-sm"
      style={{ height }}
    >
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={label}
        aria-label={label}
      />
    </div>
  )
}
