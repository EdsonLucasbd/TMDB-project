# Data Model: Hero Carousel (Top 5 Trending)

## Entidades

### 1. TrendingItem

A entidade `TrendingItem` representa um item retornado pela API do TMDB no endpoint `/trending/all/day`. Contém dados unificados tanto para filmes quanto para séries.

| Campo | Tipo | Descrição | Regras / Validações |
|---|---|---|---|
| `id` | `number` | Identificador único do título no TMDB. | Obrigatório, deve ser positivo. |
| `title` | `string` | Título do filme. | Opcional (presente se `media_type === "movie"`). |
| `name` | `string` | Título da série. | Opcional (presente se `media_type === "tv"`). |
| `overview` | `string` | Sinopse do título localizada em português. | Obrigatório. Se ausente da API, deve ter fallback. |
| `backdrop_path` | `string \| null` | Caminho relativo da imagem de plano de fundo do TMDB. | Opcional. Se nulo, aciona o comportamento de fallback. |
| `media_type` | `"movie" \| "tv"` | Tipo de conteúdo (filme ou série). | Obrigatório, define a rota de detalhes. |
| `vote_average` | `number` | Média de votos/avaliação do título (de 0 a 10). | Obrigatório. Exibido formatado com uma casa decimal (ex: 8.2). |

---

## Estrutura de Integração com o Componente

O componente React do carrossel receberá um array de `MediaItem` (que mapeia diretamente a entidade `TrendingItem` do TMDB):

```typescript
// types/tmdb.ts (reutilizado)
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
```

No Client Component do carrossel (`HeroCarouselProps`):

```typescript
export interface HeroCarouselProps {
  items: MediaItem[]
}
```
