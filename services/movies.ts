import { tmdbFetch } from "@/lib/tmdb-client"
import {
  MediaItem,
  MovieDetails,
  TVShowDetails,
  PaginatedResponse,
} from "@/types/tmdb"

export async function getTrendingContent(
  page: number = 1
): Promise<PaginatedResponse<MediaItem>> {
  return tmdbFetch<PaginatedResponse<MediaItem>>("/trending/all/day", { page })
}

export async function searchContent(
  query: string,
  page: number = 1
): Promise<PaginatedResponse<MediaItem>> {
  if (!query.trim()) {
    return getTrendingContent(page)
  }
  return tmdbFetch<PaginatedResponse<MediaItem>>("/search/multi", {
    query,
    page,
  })
}

export async function getMovieDetails(
  id: number | string
): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${id}`, {
    append_to_response: "credits",
  })
}

export async function getTVShowDetails(
  id: number | string
): Promise<TVShowDetails> {
  return tmdbFetch<TVShowDetails>(`/tv/${id}`, {
    append_to_response: "credits",
  })
}

export async function discoverMoviesByGenre(
  genreId: number,
  page: number = 1
): Promise<PaginatedResponse<MediaItem>> {
  const response = await tmdbFetch<
    PaginatedResponse<Omit<MediaItem, "media_type">>
  >("/discover/movie", {
    with_genres: genreId,
    page,
  })

  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "movie",
    })),
  }
}

export async function discoverTVShowsByGenre(
  genreId: number,
  page: number = 1
): Promise<PaginatedResponse<MediaItem>> {
  const response = await tmdbFetch<
    PaginatedResponse<Omit<MediaItem, "media_type">>
  >("/discover/tv", {
    with_genres: genreId,
    page,
  })

  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "tv",
    })),
  }
}
