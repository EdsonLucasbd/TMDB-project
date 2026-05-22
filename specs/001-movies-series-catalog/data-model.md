# Data Models: Movie & Series Catalog

Este documento define os modelos de dados e interfaces TypeScript para representar as entidades retornadas pela API do TMDB.

## 1. TMDB Common Types

### MediaItem (Base para Filmes e Séries no Grid)
Representa um item resumido retornado pelas buscas ou listagens de descoberta.

```typescript
export interface MediaItem {
  id: number;
  title?: string;        // Presente em Filmes (Movie)
  name?: string;         // Presente em Séries (TV Show)
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string; // Presente em Filmes (Movie)
  first_air_date?: string; // Presente em Séries (TV Show)
  genre_ids: number[];
  media_type: 'movie' | 'tv';
}
```

---

## 2. Gêneros

### Genre
Representa a categoria associada ao filme ou série.

```typescript
export interface Genre {
  id: number;
  name: string;
}

export interface GenreListResponse {
  genres: Genre[];
}
```

---

## 3. Detalhes do Título (Movie & TV Show Details)

### CastMember
Representa um integrante do elenco principal.

```typescript
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}
```

### CrewMember
Representa um integrante da equipe de produção técnica.

```typescript
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}
```

### MovieDetails
Representa a resposta detalhada de um filme (com créditos anexados via `append_to_response`).

```typescript
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  tagline: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number | null;
  genres: Genre[];
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}
```

### TVShowDetails
Representa a resposta detalhada de uma série de TV (com créditos anexados via `append_to_response`).

```typescript
export interface TVShowDetails {
  id: number;
  name: string;
  overview: string;
  tagline: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  genres: Genre[];
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}
```

---

## 4. Respostas de API (Paginadas)

### PaginatedResponse<T>
Representa o envelope padrão de paginação do TMDB.

```typescript
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
```
