import {
  getTrendingContent,
  searchContent,
  discoverMoviesByGenre,
  discoverTVShowsByGenre,
} from "@/services/movies"
import { getAllGenres } from "@/services/genres"
import { MovieGrid } from "@/components/movies/movie-grid"
import { SearchBar } from "@/components/shared/search-bar"
import { FilterBar } from "@/components/shared/filter-bar"
import { HeroCarousel } from "@/components/movies/hero-carousel"
import { Suspense } from "react"

interface PageProps {
  searchParams: Promise<{
    search?: string
    genre?: string
    page?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  // Await searchParams in Next.js 16
  const params = await searchParams
  const searchQuery = params.search || ""
  const genreIdStr = params.genre || ""
  const pageNum = Number(params.page) || 1

  // Fetch genres for the FilterBar
  const genres = await getAllGenres()

  let title = "Em Alta Hoje"
  let subtitle = "Os filmes e séries mais populares do momento"
  let data

  if (searchQuery) {
    data = await searchContent(searchQuery, pageNum)
    title = `Resultados para "${searchQuery}"`
    subtitle = `Encontramos ${data.total_results || 0} títulos relacionados`
  } else if (genreIdStr) {
    const genreId = Number(genreIdStr)
    // Discover both movies and TV shows for this genre in parallel
    const [moviesData, tvData] = await Promise.all([
      discoverMoviesByGenre(genreId, pageNum),
      discoverTVShowsByGenre(genreId, pageNum),
    ])

    // Merge results and sort by rating/popularity
    const combinedResults = [...moviesData.results, ...tvData.results].sort(
      (a, b) => b.vote_average - a.vote_average
    )

    data = {
      page: pageNum,
      results: combinedResults,
      total_pages: Math.max(moviesData.total_pages, tvData.total_pages),
      total_results: moviesData.total_results + tvData.total_results,
    }

    const activeGenre = genres.find((g) => String(g.id) === genreIdStr)
    title = activeGenre ? `Gênero: ${activeGenre.name}` : "Explorar Gênero"
    subtitle = activeGenre
      ? `Filmes e séries de ${activeGenre.name.toLowerCase()} em destaque`
      : "Títulos recomendados nesta categoria"
  } else {
    data = await getTrendingContent(pageNum)
  }

  const items = data.results || []

  // Use the first 5 items of the trending list for the hero carousel in discovery mode
  const featuredItems =
    !searchQuery && !genreIdStr && items.length > 0 ? items.slice(0, 5) : []
  const gridItems =
    featuredItems.length > 0 ? items.slice(featuredItems.length) : items

  return (
    <div className="flex w-full flex-col gap-12 pb-12">
      {featuredItems.length > 0 && <HeroCarousel items={featuredItems} />}

      <main className="container mx-auto max-w-7xl space-y-12 px-4">
        {/* Main Grid Section */}
        <section className="space-y-6">
          {/* Toolbar Header */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-col gap-1 border-l-4 border-primary pl-4">
              <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                {title}
              </h2>
              <p className="text-xs text-muted-foreground md:text-sm">
                {subtitle}
              </p>
            </div>

            <Suspense
              fallback={
                <div className="h-10 w-full max-w-md animate-pulse rounded-xl bg-card/45" />
              }
            >
              <SearchBar />
            </Suspense>
          </div>

          {/* Genre Filter Bar */}
          <Suspense
            fallback={
              <div className="h-8 w-full animate-pulse rounded bg-muted" />
            }
          >
            <FilterBar genres={genres} />
          </Suspense>

          <MovieGrid items={gridItems} />
        </section>
      </main>
    </div>
  )
}
