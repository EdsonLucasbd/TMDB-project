export interface MediaItem {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  release_date?: string
  first_air_date?: string
  genre_ids: number[]
  media_type: "movie" | "tv"
}

export interface Genre {
  id: number
  name: string
}

export interface GenreListResponse {
  genres: Genre[]
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
}

export interface MovieDetails {
  id: number
  title: string
  overview: string
  tagline: string | null
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  release_date: string
  runtime: number | null
  genres: Genre[]
  credits?: {
    cast: CastMember[]
    crew: CrewMember[]
  }
}

export interface TVShowDetails {
  id: number
  name: string
  overview: string
  tagline: string | null
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  first_air_date: string
  number_of_episodes: number
  number_of_seasons: number
  genres: Genre[]
  credits?: {
    cast: CastMember[]
    crew: CrewMember[]
  }
}

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
