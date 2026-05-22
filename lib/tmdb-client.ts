const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function tmdbFetch<T>(
  endpoint: string,
  queryParams: Record<string, string | number | boolean | undefined> = {},
  options: RequestInit = {}
): Promise<T> {
  const token = process.env.TMDB_API_ACCESS_TOKEN

  if (!token) {
    throw new Error(
      "TMDB_API_ACCESS_TOKEN não está configurado. Verifique o seu arquivo .env.local."
    )
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  const url = new URL(`${TMDB_BASE_URL}${cleanEndpoint}`)

  // Set default language
  url.searchParams.set("language", "pt-BR")

  // Set custom query parameters
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  })

  const headers = new Headers(options.headers)
  headers.set("Authorization", `Bearer ${token}`)
  headers.set("accept", "application/json")

  const response = await fetch(url.toString(), {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "")
    throw new Error(
      `Erro na requisição da API TMDB: [${response.status}] ${response.statusText}. ${errorBody}`
    )
  }

  return response.json() as Promise<T>
}
