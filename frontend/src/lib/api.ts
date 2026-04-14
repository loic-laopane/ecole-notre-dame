const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api'

// ── Types ────────────────────────────────────────────────

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

interface ApiCollection<T> {
  'hydra:member': T[]
  'hydra:totalItems': number
}

// ── Fetcher ──────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Accept: 'application/json', ...options?.headers },
    ...options,
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`)
  }

  return res.json() as Promise<T>
}

// ── Actualités ───────────────────────────────────────────

export async function getActualites(params?: {
  page?: number
  category?: string
  niveau?: string
}): Promise<ApiCollection<Actualite>> {
  const qs = new URLSearchParams()
  if (params?.page)     qs.set('page',     String(params.page))
  if (params?.category) qs.set('category', params.category)
  if (params?.niveau)   qs.set('niveau',   params.niveau)
  qs.set('published', 'true')

  return apiFetch<ApiCollection<Actualite>>(
    `/actualites?${qs.toString()}`,
    { next: { revalidate: 60, tags: ['actualites'] } },
  )
}

export async function getActualite(slug: string): Promise<Actualite> {
  const col = await apiFetch<ApiCollection<Actualite>>(
    `/actualites?slug=${encodeURIComponent(slug)}&published=true`,
    { next: { revalidate: 300, tags: [`actualite-${slug}`] } },
  )
  const item = col['hydra:member'][0]
  if (!item) throw new Error(`Actualité not found: ${slug}`)
  return item
}

// ── Événements ───────────────────────────────────────────

export async function getEvenements(params?: {
  upcoming?: boolean
  limit?: number
}): Promise<ApiCollection<Evenement>> {
  const qs = new URLSearchParams()
  if (params?.upcoming) {
    qs.set('eventDate[after]', new Date().toISOString().split('T')[0])
    qs.set('order[eventDate]', 'asc')
  }
  if (params?.limit) qs.set('itemsPerPage', String(params.limit))
  qs.set('published', 'true')

  return apiFetch<ApiCollection<Evenement>>(
    `/evenements?${qs.toString()}`,
    { next: { revalidate: 60, tags: ['evenements'] } },
  )
}

// ── Établissements ───────────────────────────────────────

export async function getEtablissements(): Promise<Etablissement[]> {
  const col = await apiFetch<ApiCollection<Etablissement>>(
    '/etablissements',
    { next: { revalidate: 3600, tags: ['etablissements'] } },
  )
  return col['hydra:member']
}

export async function getEtablissement(slug: string): Promise<Etablissement> {
  const col = await apiFetch<ApiCollection<Etablissement>>(
    `/etablissements?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 3600, tags: [`etablissement-${slug}`] } },
  )
  const item = col['hydra:member'][0]
  if (!item) throw new Error(`Établissement not found: ${slug}`)
  return item
}

// ── Helpers ──────────────────────────────────────────────

export function formatDate(dateStr: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
    ...opts,
  }).format(new Date(dateStr))
}

export function imageUrl(path: string | null): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  const base = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ?? 'http://localhost:8000'
  return `${base}${path}`
}
