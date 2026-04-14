import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ensemble Scolaire Notre-Dame Saint-Louis',
    template: '%s | Notre-Dame Saint-Louis',
  },
  description:
    'École catholique sous contrat – Mantes-la-Jolie & Bonnières-sur-Seine. Maternelle, Élémentaire, Collège, Lycée.',
  keywords: ['école catholique', 'Mantes-la-Jolie', 'Notre-Dame Saint-Louis', 'NDSL', 'Bonnières-sur-Seine'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Ensemble Scolaire Notre-Dame Saint-Louis',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body text-[#333] bg-white overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  )
}
