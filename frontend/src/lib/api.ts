const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface Actualite {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content?: string
  featuredImage: string | null
  category: string | null
  niveau: string | null
  published: boolean
  publishedAt: string | null
}

export interface Evenement {
  id: number
  title: string
  slug: string
  description?: string
  eventDate: string
  eventTime: string | null
  location: string | null
  type: string | null
  etablissement: string | null
}

export interface Etablissement {
  id: number
  name: string
  slug: string
  niveau: string
  excerpt: string | null
  content?: string
  address: string | null
  city: string | null
  phone: string | null
  email: string | null
  colorDot: string | null
  icon: string | null
  featuredImage: string | null
  position: number
}

interface HydraCollection<T> {
  'hydra:member': T[]
  'hydra:totalItems': number
}

// ─────────────────────────────────────────────
// Core fetcher – returns null when API is down
// ─────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: 'application/json', ...options?.headers },
      ...options,
    })
    if (!res.ok) return null
    return await res.json() as T
  } catch {
    return null
  }
}

// ─────────────────────────────────────────────
// Actualités
// ─────────────────────────────────────────────

export async function getActualites(params?: {
  page?: number
  category?: string
  niveau?: string
}): Promise<{ items: Actualite[]; total: number }> {
  const qs = new URLSearchParams()
  if (params?.page)     qs.set('page',     String(params.page))
  if (params?.category) qs.set('category', params.category)
  if (params?.niveau)   qs.set('niveau',   params.niveau)
  qs.set('published', 'true')

  const data = await apiFetch<HydraCollection<Actualite>>(
    `/actualites?${qs}`,
    { next: { revalidate: 60, tags: ['actualites'] } },
  )
  return { items: data?.['hydra:member'] ?? [], total: data?.['hydra:totalItems'] ?? 0 }
}

export async function getActualite(slug: string): Promise<Actualite | null> {
  const data = await apiFetch<HydraCollection<Actualite>>(
    `/actualites?slug=${encodeURIComponent(slug)}&published=true`,
    { next: { revalidate: 300, tags: [`actualite-${slug}`] } },
  )
  return data?.['hydra:member']?.[0] ?? null
}

// ─────────────────────────────────────────────
// Événements
// ─────────────────────────────────────────────

export async function getEvenements(params?: {
  upcoming?: boolean
  limit?: number
}): Promise<{ items: Evenement[]; total: number }> {
  const qs = new URLSearchParams()
  if (params?.upcoming) {
    qs.set('eventDate[after]', new Date().toISOString().split('T')[0])
    qs.set('order[eventDate]', 'asc')
  }
  if (params?.limit) qs.set('itemsPerPage', String(params.limit))
  qs.set('published', 'true')

  const data = await apiFetch<HydraCollection<Evenement>>(
    `/evenements?${qs}`,
    { next: { revalidate: 60, tags: ['evenements'] } },
  )
  return { items: data?.['hydra:member'] ?? [], total: data?.['hydra:totalItems'] ?? 0 }
}

export async function getEvenement(slug: string): Promise<Evenement | null> {
  const data = await apiFetch<HydraCollection<Evenement>>(
    `/evenements?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 300, tags: [`evenement-${slug}`] } },
  )
  return data?.['hydra:member']?.[0] ?? null
}

// ─────────────────────────────────────────────
// Établissements
// ─────────────────────────────────────────────

export async function getEtablissements(): Promise<Etablissement[]> {
  const data = await apiFetch<HydraCollection<Etablissement>>(
    '/etablissements',
    { next: { revalidate: 3600, tags: ['etablissements'] } },
  )
  return data?.['hydra:member'] ?? []
}

export async function getEtablissement(slug: string): Promise<Etablissement | null> {
  const data = await apiFetch<HydraCollection<Etablissement>>(
    `/etablissements?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 3600, tags: [`etablissement-${slug}`] } },
  )
  return data?.['hydra:member']?.[0] ?? null
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

export function formatDate(dateStr: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
    ...opts,
  }).format(new Date(dateStr))
}

export function formatDateShort(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr)
  return {
    day:   d.toLocaleDateString('fr-FR', { day: '2-digit' }),
    month: d.toLocaleDateString('fr-FR', { month: 'short' }),
  }
}

export function imageUrl(path: string | null): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  const base = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000').replace('/api', '')
  return `${base}${path}`
}

export const CATEGORY_LABELS: Record<string, string> = {
  evenement:      'Événement',
  pastorale:      'Pastorale',
  resultats:      'Résultats',
  'vie-scolaire': 'Vie scolaire',
  sport:          'Sport',
  culture:        'Culture',
}

export const NIVEAU_LABELS: Record<string, string> = {
  maternelle:  'Maternelle',
  elementaire: 'Élémentaire',
  college:     'Collège',
  lycee:       'Lycée',
  tous:        'Tous niveaux',
}

// ─────────────────────────────────────────────
// Mock data – shown when API is not yet ready
// ─────────────────────────────────────────────

export const MOCK_ACTUALITES: Actualite[] = [
  { id: 1, title: 'Portes ouvertes 2025', slug: 'portes-ouvertes-2025', excerpt: 'Venez découvrir notre établissement lors de nos journées portes ouvertes.', category: 'evenement', niveau: 'tous', published: true, publishedAt: '2025-01-15T00:00:00+00:00', featuredImage: null },
  { id: 2, title: 'Retraite spirituelle des 3ème à Taizé', slug: 'retraite-3eme', excerpt: 'Un week-end de ressourcement pour nos élèves de troisième.', category: 'pastorale', niveau: 'college', published: true, publishedAt: '2025-01-10T00:00:00+00:00', featuredImage: null },
  { id: 3, title: 'Baccalauréat 2024 : 97% de réussite', slug: 'bac-2024', excerpt: 'Un excellent cru pour nos terminales, avec 14 mentions Très Bien.', category: 'resultats', niveau: 'lycee', published: true, publishedAt: '2025-01-05T00:00:00+00:00', featuredImage: null },
  { id: 4, title: 'Cross du Collège – octobre 2025', slug: 'cross-college-2025', excerpt: 'Retour sur le cross annuel du collège avec plus de 300 participants.', category: 'sport', niveau: 'college', published: true, publishedAt: '2024-10-20T00:00:00+00:00', featuredImage: null },
  { id: 5, title: 'Journée contre le harcèlement', slug: 'journee-harcelement', excerpt: 'Sensibilisation et ateliers pour toute la communauté scolaire.', category: 'vie-scolaire', niveau: 'tous', published: true, publishedAt: '2024-11-08T00:00:00+00:00', featuredImage: null },
  { id: 6, title: 'Atelier tricot au CDI', slug: 'atelier-tricot-cdi', excerpt: 'Chaque jeudi, venez rejoindre l\'atelier tricot au CDI du collège.', category: 'culture', niveau: 'college', published: true, publishedAt: '2024-10-10T00:00:00+00:00', featuredImage: null },
]

export const MOCK_EVENEMENTS: Evenement[] = [
  { id: 1, title: 'Portes Ouvertes Lycée', slug: 'portes-ouvertes-lycee-2025', eventDate: '2025-02-08', eventTime: '9h – 12h', location: 'Lycée Notre-Dame Saint-Louis', type: 'Événement', etablissement: 'lycee' },
  { id: 2, title: 'Conseil de classe – 2ème trimestre', slug: 'conseil-classe-t2', eventDate: '2025-02-14', eventTime: null, location: 'Tous établissements', type: 'Calendrier', etablissement: 'tous' },
  { id: 3, title: 'Vacances de Février', slug: 'vacances-fevrier-2025', eventDate: '2025-02-22', eventTime: null, location: null, type: 'Calendrier', etablissement: 'tous' },
  { id: 4, title: 'Portes Ouvertes Collège', slug: 'portes-ouvertes-college-2025', eventDate: '2025-03-15', eventTime: '10h – 17h', location: 'Collège Notre-Dame', type: 'Événement', etablissement: 'college' },
  { id: 5, title: 'Chemin de Croix', slug: 'chemin-de-croix-2025', eventDate: '2025-03-29', eventTime: '14h', location: 'Ensemble scolaire', type: 'Pastorale', etablissement: 'tous' },
]

export const MOCK_ETABLISSEMENTS: Etablissement[] = [
  { id: 1, name: 'École Maternelle Notre-Dame', slug: 'maternelle', niveau: 'maternelle', excerpt: 'Un cadre bienveillant pour l\'éveil et l\'épanouissement des tout-petits, de la PS à la GS.', address: '20, rue Saint-Fiacre', city: 'Mantes-la-Jolie', phone: '01 34 97 97 95', email: 'ecolend@ndsl78.fr', colorDot: 'sky', icon: '🌸', featuredImage: null, position: 1 },
  { id: 2, name: 'École Élémentaire Saint-Louis', slug: 'elementaire', niveau: 'elementaire', excerpt: 'Des fondamentaux solides et une ouverture sur le monde dès le primaire, du CP au CM2.', address: '23, rue G. Herrewyn', city: 'Bonnières-sur-Seine', phone: '01 30 93 01 21', email: 'ecolesl@ndsl78.fr', colorDot: 'sage', icon: '📖', featuredImage: null, position: 2 },
  { id: 3, name: 'Collège Notre-Dame', slug: 'college', niveau: 'college', excerpt: 'Accompagnement individualisé et projets innovants pour chaque collégien, de la 6ème à la 3ème.', address: '5, rue de la Sangle', city: 'Mantes-la-Jolie', phone: '01 34 97 97 97', email: 'accueilnd@ndsl78.fr', colorDot: 'gold', icon: '🔬', featuredImage: null, position: 3 },
  { id: 4, name: 'Lycée Notre-Dame Saint-Louis', slug: 'lycee', niveau: 'lycee', excerpt: '95% de réussite au bac. Voie générale avec spécialités variées et certifications internationales.', address: '5, rue de la Sangle', city: 'Mantes-la-Jolie', phone: '01 34 97 97 97', email: 'accueilnd@ndsl78.fr', colorDot: 'navy', icon: '🎓', featuredImage: null, position: 4 },
]
