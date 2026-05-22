import { tmdbFetch } from "@/lib/tmdb-client"
import { GenreListResponse, Genre } from "@/types/tmdb"

export async function getMovieGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<GenreListResponse>("/genre/movie/list")
  return data.genres
}

export async function getTVGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<GenreListResponse>("/genre/tv/list")
  return data.genres
}

export async function getAllGenres(): Promise<Genre[]> {
  const [movieGenres, tvGenres] = await Promise.all([
    getMovieGenres(),
    getTVGenres(),
  ])

  const genreMap = new Map<number, Genre>()
  movieGenres.forEach((g) => genreMap.set(g.id, g))
  tvGenres.forEach((g) => genreMap.set(g.id, g))

  return Array.from(genreMap.values())
}
